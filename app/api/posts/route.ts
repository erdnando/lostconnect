import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createPost, getPosts } from '@/lib/services/postService';
import { createPostSchema } from '@/lib/validations/postSchema';
import { ZodError } from 'zod';

/**
 * GET /api/posts
 * 
 * Obtiene el feed de posts con paginación cursor-based
 * 
 * Query params:
 * - limit: número de posts a obtener (default: 10)
 * - cursor: ID del último post cargado
 * - type: 'lost' | 'found' (opcional)
 * - status: 'active' | 'resolved' | 'closed' (default: 'active')
 * 
 * Response:
 * {
 *   success: true,
 *   posts: Post[],
 *   pagination: {
 *     hasMore: boolean,
 *     nextCursor: string | null
 *   }
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Obtener query params
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const cursor = searchParams.get('cursor') || undefined;
    const type = searchParams.get('type') as 'lost' | 'found' | undefined;
    const status = searchParams.get('status') as 'active' | 'resolved' | 'closed' | undefined;

    // 2. Validar límite
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { success: false, error: 'Límite debe estar entre 1 y 50' },
        { status: 400 }
      );
    }

    // 3. Obtener posts
    const result = await getPosts({
      limit,
      cursor,
      type,
      status: status || 'active',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error getting posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener posts',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * 
 * Crea un nuevo post
 * 
 * Body:
 * {
 *   type: 'lost' | 'found',
 *   title: string (5-100 chars),
 *   description: string (20-2000 chars),
 *   category: string,
 *   images: string[] (1-5 base64 images),
 *   location?: {
 *     coordinates: [number, number],
 *     address?: string,
 *     city?: string,
 *     country?: string
 *   },
 *   tags?: string[]
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   post: Post
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verificar autenticación
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }

    // 2. Obtener y parsear body
    const body = await request.json();

    // 3. Validar con Zod
    try {
      createPostSchema.parse(body);
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

    // 4. Crear post
    const result = await createPost({
      userId: session.user.id,
      type: body.type,
      title: body.title,
      description: body.description,
      category: body.category,
      images: body.images || [],
      location: body.location,
      tags: body.tags,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear post',
      },
      { status: 500 }
    );
  }
}
