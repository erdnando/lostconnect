import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db/mongodb';
import Comment from '@/lib/models/Comment';
import { Post } from '@/lib/models/Post';
import { uploadMultipleImages } from '@/lib/services/cloudinary';
import { z } from 'zod';
import { Types } from 'mongoose';

/**
 * Esquema de validación para comentarios
 */
const commentSchema = z.object({
  postId: z.string().min(1, 'El ID del post es requerido'),
  content: z.string()
    .min(1, 'El contenido es requerido')
    .max(2000, 'El comentario no puede exceder 2000 caracteres'),
  parentCommentId: z.string().optional(),
  replyToUserId: z.string().optional(),
  images: z.array(z.string()).max(3, 'Máximo 3 imágenes').optional(),
  location: z.object({
    coordinates: z.tuple([z.number(), z.number()]),
    address: z.string().optional(),
  }).optional(),
});

/**
 * POST /api/comments
 * Crear un nuevo comentario o reply
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verificar autenticación
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // 2. Conectar a la base de datos
    await dbConnect();

    // 3. Parsear y validar el body
    const body = await request.json();
    console.log('📝 Comment API - Body recibido:', JSON.stringify(body, null, 2));
    
    const validation = commentSchema.safeParse(body);

    if (!validation.success) {
      console.error('❌ Validation error:', validation.error.issues);
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    const { postId, content, parentCommentId, replyToUserId, images, location } = validation.data;

    // 4. Verificar que el post existe
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    // 5. Si es un reply, verificar que el comentario padre existe
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return NextResponse.json(
          { error: 'Comentario padre no encontrado' },
          { status: 404 }
        );
      }
    }

    // 6. Procesar imágenes si existen
    let uploadedImages: { url: string; publicId: string }[] = [];
    
    if (images && images.length > 0) {
      const cloudinaryResults = await uploadMultipleImages(images, {
        folder: 'lostconnect/comments',
      });

      uploadedImages = cloudinaryResults.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
      }));
    }

    // 7. Crear comentario
    const commentData: any = {
      postId: new Types.ObjectId(postId),
      userId: new Types.ObjectId(session.user.id),
      content,
      repliesCount: 0,
    };

    if (parentCommentId) {
      commentData.parentCommentId = new Types.ObjectId(parentCommentId);
    }

    if (replyToUserId) {
      commentData.replyToUserId = new Types.ObjectId(replyToUserId);
    }

    if (uploadedImages.length > 0) {
      commentData.images = uploadedImages;
    }

    if (location) {
      commentData.location = {
        type: 'Point',
        coordinates: location.coordinates,
        address: location.address,
      };
    }

    const comment = await Comment.create(commentData);

    // 8. Actualizar contador en el post
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });

    // 9. Si es un reply, actualizar contador en el comentario padre
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $inc: { repliesCount: 1 },
      });
    }

    // 10. Popular el usuario para devolver datos completos
    await comment.populate('userId', 'name email image');
    if (replyToUserId) {
      await comment.populate('replyToUserId', 'name');
    }

    return NextResponse.json(
      {
        success: true,
        comment: comment.toObject(),
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error en POST /api/comments:', error);
    return NextResponse.json(
      { error: 'Error al crear el comentario' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/comments?postId=xxx&parentCommentId=xxx&limit=20&cursor=xxx
 * Obtener comentarios de un post o replies de un comentario
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Obtener query params
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const parentCommentId = searchParams.get('parentCommentId');
    const limit = parseInt(searchParams.get('limit') || '20');
    const cursor = searchParams.get('cursor');

    if (!postId) {
      return NextResponse.json(
        { error: 'El postId es requerido' },
        { status: 400 }
      );
    }

    // 2. Conectar a la base de datos
    await dbConnect();

    // 3. Construir filtros
    const filters: any = { postId: new Types.ObjectId(postId) };

    // Si hay parentCommentId, obtener replies; si no, obtener comentarios raíz
    if (parentCommentId) {
      filters.parentCommentId = new Types.ObjectId(parentCommentId);
    } else {
      filters.parentCommentId = null; // Solo comentarios raíz
    }

    // Si hay cursor, obtener comentarios después de ese cursor
    if (cursor) {
      filters._id = { $lt: new Types.ObjectId(cursor) };
    }

    // 4. Obtener comentarios
    const comments = await Comment.find(filters)
      .sort({ createdAt: -1 }) // Más recientes primero
      .limit(limit + 1) // +1 para saber si hay más
      .populate('userId', 'name email image')
      .populate('replyToUserId', 'name')
      .lean();

    // 5. Determinar si hay más comentarios
    const hasMore = comments.length > limit;
    const commentsToReturn = hasMore ? comments.slice(0, limit) : comments;

    // 6. Obtener el cursor del último comentario
    const nextCursor = hasMore
      ? commentsToReturn[commentsToReturn.length - 1]._id.toString()
      : null;

    return NextResponse.json(
      {
        success: true,
        comments: commentsToReturn,
        pagination: {
          hasMore,
          nextCursor,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en GET /api/comments:', error);
    return NextResponse.json(
      { error: 'Error al obtener los comentarios' },
      { status: 500 }
    );
  }
}
