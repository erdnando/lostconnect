import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db/mongodb';
import Reaction, { ReactionType } from '@/lib/models/Reaction';
import { z } from 'zod';

/**
 * Esquema de validación para reacciones
 */
const reactionSchema = z.object({
  postId: z.string().min(1, 'El ID del post es requerido'),
  type: z.enum(['like', 'helpful', 'found'], {
    message: 'El tipo debe ser: like, helpful o found',
  }),
});

/**
 * POST /api/reactions
 * Toggle de reacción (crear, actualizar o eliminar)
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
    const validation = reactionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    const { postId, type } = validation.data;

    // 4. Toggle de reacción
    const result = await Reaction.toggleReaction(
      session.user.id,
      postId,
      type as ReactionType
    );

    // 5. Obtener conteos actualizados
    const counts = await Reaction.getReactionCounts(postId);

    // 6. Obtener reacción actual del usuario
    const userReaction = await Reaction.getUserReaction(
      session.user.id,
      postId
    );

    return NextResponse.json(
      {
        success: true,
        action: result.action,
        type: result.type,
        previousType: result.previousType,
        counts,
        userReaction: userReaction ? userReaction.type : null,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en POST /api/reactions:', error);
    
    // Manejar error de índice único duplicado
    if ((error as any).code === 11000) {
      return NextResponse.json(
        { error: 'Ya existe una reacción para este post' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Error al procesar la reacción' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reactions?postId=xxx
 * Obtener conteos y reacción del usuario para un post
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Obtener postId de query params
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'El postId es requerido' },
        { status: 400 }
      );
    }

    // 2. Conectar a la base de datos
    await dbConnect();

    // 3. Obtener conteos
    const counts = await Reaction.getReactionCounts(postId);

    // 4. Si hay sesión, obtener reacción del usuario
    const session = await auth();
    let userReaction = null;

    if (session?.user?.id) {
      const reaction = await Reaction.getUserReaction(
        session.user.id,
        postId
      );
      userReaction = reaction ? reaction.type : null;
    }

    return NextResponse.json(
      {
        success: true,
        counts,
        userReaction,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en GET /api/reactions:', error);
    return NextResponse.json(
      { error: 'Error al obtener las reacciones' },
      { status: 500 }
    );
  }
}
