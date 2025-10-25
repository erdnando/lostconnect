import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { uploadImage, validateImageFile } from '@/lib/services/cloudinary';

/**
 * POST /api/upload
 * 
 * Endpoint para subir imágenes a Cloudinary
 * 
 * Body:
 * {
 *   image: string (base64),
 *   folder?: string
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     url: string,
 *     publicId: string,
 *     width: number,
 *     height: number
 *   }
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

    // 2. Obtener datos del body
    const body = await request.json();
    const { image, folder = 'lostconnect/posts' } = body;

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Imagen requerida' },
        { status: 400 }
      );
    }

    // 3. Validar que sea base64
    if (!image.startsWith('data:image/')) {
      return NextResponse.json(
        { success: false, error: 'Formato de imagen inválido' },
        { status: 400 }
      );
    }

    // 4. Subir a Cloudinary
    const result = await uploadImage(image, { folder });

    // 5. Retornar resultado
    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error al subir imagen',
      },
      { status: 500 }
    );
  }
}
