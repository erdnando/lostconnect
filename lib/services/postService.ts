import { Types } from 'mongoose';
import { Post } from '@/lib/models/Post';
import connectDB from '@/lib/db/mongodb';
import { uploadMultipleImages, deleteMultipleImages } from './cloudinary';

/**
 * Servicio de Posts
 * 
 * Contiene toda la lógica de negocio para:
 * - Crear posts
 * - Obtener posts (feed, detalle)
 * - Actualizar posts
 * - Eliminar posts
 * - Validaciones y permisos
 */

/**
 * Tipos de datos
 */
export interface CreatePostData {
  userId: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  images: Array<{url: string; publicId: string} | string>; // Objetos con URLs o Base64 strings
  location?: {
    coordinates: [number, number]; // [longitude, latitude]
    address?: string;
    city?: string;
    country?: string;
  };
  tags?: string[];
}

export interface UpdatePostData {
  title?: string;
  description?: string;
  category?: string;
  status?: 'active' | 'resolved' | 'closed';
  location?: {
    coordinates: [number, number];
    address?: string;
    city?: string;
    country?: string;
  };
  tags?: string[];
}

export interface GetPostsQuery {
  limit?: number;
  cursor?: string; // ID del último post cargado (para cursor-based pagination)
  type?: 'lost' | 'found';
  status?: 'active' | 'resolved' | 'closed';
  userId?: string;
}

/**
 * Crea un nuevo post
 * 
 * @param data - Datos del post a crear
 * @returns Post creado con imágenes subidas a Cloudinary
 */
export async function createPost(data: CreatePostData) {
  await connectDB();

  try {
    // 1. Validar que el usuario exista (opcional, NextAuth ya lo valida)
    if (!data.userId) {
      throw new Error('Usuario no autenticado');
    }

    // 2. Procesar imágenes
    let uploadedImages: { url: string; publicId: string; width?: number; height?: number }[] = [];
    
    if (data.images && data.images.length > 0) {
      // Separar imágenes que ya están subidas (objetos) de las que son base64 (strings)
      const alreadyUploadedImages = data.images.filter(img => typeof img === 'object' && 'url' in img) as {url: string; publicId: string}[];
      const base64Images = data.images.filter(img => typeof img === 'string') as string[];

      // Agregar imágenes ya subidas
      uploadedImages = [...alreadyUploadedImages];

      // Subir imágenes base64 si hay
      if (base64Images.length > 0) {
        const cloudinaryResults = await uploadMultipleImages(base64Images, {
          folder: 'lostconnect/posts',
        });

        uploadedImages = [
          ...uploadedImages,
          ...cloudinaryResults.map((result) => ({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
          }))
        ];
      }
    }

    // 3. Preparar datos para MongoDB
    const postData: any = {
      userId: new Types.ObjectId(data.userId),
      type: data.type,
      title: data.title,
      description: data.description,
      category: data.category,
      images: uploadedImages,
      tags: data.tags || [],
      status: 'active',
      commentsCount: 0,
      reactionsCount: {
        like: 0,
        helpful: 0,
        found: 0,
      },
    };

    // 4. Agregar ubicación si existe
    if (data.location && data.location.coordinates) {
      postData.location = {
        type: 'Point',
        coordinates: data.location.coordinates,
        address: data.location.address,
        city: data.location.city,
        country: data.location.country,
      };
    }

    // 5. Crear post en la base de datos
    const post = await Post.create(postData);

    // 6. Popular el usuario para devolver datos completos
    await post.populate('userId', 'name email image');

    return {
      success: true,
      post: post.toObject(),
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

/**
 * Obtiene posts para el feed (con paginación cursor-based)
 * 
 * @param query - Parámetros de búsqueda y paginación
 * @returns Lista de posts y cursor para siguiente página
 */
export async function getPosts(query: GetPostsQuery = {}) {
  await connectDB();

  const {
    limit = 10,
    cursor,
    type,
    status = 'active',
    userId,
  } = query;

  try {
    // 1. Construir filtros
    const filters: any = { status };

    if (type) {
      filters.type = type;
    }

    if (userId) {
      filters.userId = new Types.ObjectId(userId);
    }

    // 2. Si hay cursor, obtener posts después de ese cursor
    if (cursor) {
      filters._id = { $lt: new Types.ObjectId(cursor) };
    }

    // 3. Obtener posts
    const posts = await Post.find(filters)
      .sort({ createdAt: -1 }) // Más recientes primero
      .limit(limit + 1) // +1 para saber si hay más
      .populate('userId', 'name email image')
      .lean();

    // 4. Determinar si hay más posts
    const hasMore = posts.length > limit;
    const postsToReturn = hasMore ? posts.slice(0, limit) : posts;

    // 5. Obtener el cursor del último post
    const nextCursor = hasMore
      ? postsToReturn[postsToReturn.length - 1]._id.toString()
      : null;

    return {
      success: true,
      posts: postsToReturn,
      pagination: {
        hasMore,
        nextCursor,
      },
    };
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
}

/**
 * Obtiene un post por ID
 * 
 * @param postId - ID del post
 * @returns Post con usuario populado
 */
export async function getPostById(postId: string) {
  await connectDB();

  try {
    const post = await Post.findById(postId)
      .populate('userId', 'name email image')
      .lean();

    if (!post) {
      throw new Error('Post no encontrado');
    }

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error('Error getting post by ID:', error);
    throw error;
  }
}

/**
 * Actualiza un post
 * 
 * @param postId - ID del post a actualizar
 * @param userId - ID del usuario que intenta actualizar
 * @param data - Datos a actualizar
 * @returns Post actualizado
 */
export async function updatePost(
  postId: string,
  userId: string,
  data: UpdatePostData
) {
  await connectDB();

  try {
    // 1. Verificar que el post existe y pertenece al usuario
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error('Post no encontrado');
    }

    if (post.userId.toString() !== userId) {
      throw new Error('No tienes permiso para editar este post');
    }

    // 2. Actualizar campos
    const updateData: any = {};

    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.category) updateData.category = data.category;
    if (data.status) updateData.status = data.status;
    if (data.tags) updateData.tags = data.tags;

    if (data.location) {
      updateData.location = {
        type: 'Point',
        coordinates: data.location.coordinates,
        address: data.location.address,
        city: data.location.city,
        country: data.location.country,
      };
    }

    // 3. Actualizar en la base de datos
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('userId', 'name email image');

    return {
      success: true,
      post: updatedPost,
    };
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

/**
 * Elimina un post
 * 
 * @param postId - ID del post a eliminar
 * @param userId - ID del usuario que intenta eliminar
 * @returns Confirmación de eliminación
 */
export async function deletePost(postId: string, userId: string) {
  await connectDB();

  try {
    // 1. Verificar que el post existe y pertenece al usuario
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error('Post no encontrado');
    }

    if (post.userId.toString() !== userId) {
      throw new Error('No tienes permiso para eliminar este post');
    }

    // 2. Eliminar imágenes de Cloudinary
    if (post.images && post.images.length > 0) {
      const publicIds = post.images.map((img) => img.publicId);
      await deleteMultipleImages(publicIds);
    }

    // 3. Eliminar post de la base de datos
    await Post.findByIdAndDelete(postId);

    return {
      success: true,
      message: 'Post eliminado correctamente',
    };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

/**
 * Incrementa el contador de comentarios de un post
 * 
 * @param postId - ID del post
 * @param increment - Cantidad a incrementar (puede ser negativa)
 */
export async function updateCommentsCount(postId: string, increment: number = 1) {
  await connectDB();

  try {
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: increment },
    });
  } catch (error) {
    console.error('Error updating comments count:', error);
    throw error;
  }
}

/**
 * Actualiza el contador de reacciones de un post
 * 
 * @param postId - ID del post
 * @param type - Tipo de reacción (like, helpful, found)
 * @param increment - Cantidad a incrementar (puede ser negativa)
 */
export async function updateReactionsCount(
  postId: string,
  type: 'like' | 'helpful' | 'found',
  increment: number = 1
) {
  await connectDB();

  try {
    const updateField = `reactionsCount.${type}`;
    await Post.findByIdAndUpdate(postId, {
      $inc: { [updateField]: increment },
    });
  } catch (error) {
    console.error('Error updating reactions count:', error);
    throw error;
  }
}
