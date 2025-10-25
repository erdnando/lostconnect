import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getPostById, updatePost, deletePost } from '@/lib/services/postService';
import { updatePostSchema } from '@/lib/validations/postSchema';
import { ZodError } from 'zod';

/**
 * GET /api/posts/[id]
 * 
 * Obtiene un post específico por ID
 * 
 * Response:
 * {
 *   success: true,
 *   post: Post
 * }
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validar que el ID sea válido
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, error: 'ID de post inválido' },
        { status: 400 }
      );
    }

    const result = await getPostById(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error getting post:', error);
    
    if (error instanceof Error && error.message === 'Post no encontrado') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener post',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/posts/[id]
 * 
 * Actualiza un post
 * Solo el dueño del post puede actualizarlo
 * 
 * Body:
 * {
 *   title?: string,
 *   description?: string,
 *   status?: 'active' | 'resolved' | 'closed',
 *   tags?: string[]
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   post: Post
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verificar autenticación
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // 2. Validar ID
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, error: 'ID de post inválido' },
        { status: 400 }
      );
    }

    // 3. Obtener y validar body
    const body = await request.json();

    try {
      updatePostSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validación fallida',
            details: error.issues.map((e: any) => ({
              field: e.path.join('.'),
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // 4. Actualizar post
    const result = await updatePost(id, session.user.id, body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating post:', error);

    if (error instanceof Error) {
      if (error.message === 'Post no encontrado') {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 404 }
        );
      }
      if (error.message === 'No tienes permiso para editar este post') {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar post',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/posts/[id]
 * 
 * Elimina un post
 * Solo el dueño del post puede eliminarlo
 * También elimina las imágenes de Cloudinary
 * 
 * Response:
 * {
 *   success: true,
 *   message: string
 * }
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verificar autenticación
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // 2. Validar ID
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, error: 'ID de post inválido' },
        { status: 400 }
      );
    }

    // 3. Eliminar post
    const result = await deletePost(id, session.user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting post:', error);

    if (error instanceof Error) {
      if (error.message === 'Post no encontrado') {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 404 }
        );
      }
      if (error.message === 'No tienes permiso para eliminar este post') {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar post',
      },
      { status: 500 }
    );
  }
}
