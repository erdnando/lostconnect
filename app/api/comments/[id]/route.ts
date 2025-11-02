import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db/mongodb';
import Comment from '@/lib/models/Comment';
import { Post } from '@/lib/models/Post';
import { deleteMultipleImages } from '@/lib/services/cloudinary';

/**
 * DELETE /api/comments/[id]
 * Eliminar un comentario (solo el owner)
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
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // 2. Conectar a la base de datos
    await dbConnect();

    // 3. Obtener el ID del comentario
    const { id } = await params;

    // 4. Buscar el comentario
    const comment = await Comment.findById(id).lean();
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Comentario no encontrado' },
        { status: 404 }
      );
    }

    // 5. Verificar ownership
    if (comment.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para eliminar este comentario' },
        { status: 403 }
      );
    }

    // 6. Verificar si tiene replies
    const repliesCount = await Comment.countDocuments({
      parentCommentId: comment._id,
    });

    if (repliesCount > 0) {
      // Opción A: No permitir eliminar si tiene replies
      return NextResponse.json(
        { 
          error: 'No puedes eliminar un comentario con respuestas',
          repliesCount 
        },
        { status: 400 }
      );
      
      // Opción B (alternativa): Eliminar en cascada
      // await Comment.deleteMany({ parentCommentId: comment._id });
    }

    // 7. Eliminar imágenes de Cloudinary si existen
    if (comment.images && comment.images.length > 0) {
      const publicIds = comment.images.map(img => img.publicId);
      await deleteMultipleImages(publicIds);
    }

    // 8. Eliminar el comentario
    await Comment.findByIdAndDelete(id);

    // 9. Actualizar contador en el post
    await Post.findByIdAndUpdate(comment.postId, {
      $inc: { commentsCount: -1 },
    });

    // 10. Si es un reply, actualizar contador en el comentario padre
    if (comment.parentCommentId) {
      await Comment.findByIdAndUpdate(comment.parentCommentId, {
        $inc: { repliesCount: -1 },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Comentario eliminado correctamente',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en DELETE /api/comments/[id]:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el comentario' },
      { status: 500 }
    );
  }
}
