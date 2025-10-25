import { v2 as cloudinary } from 'cloudinary';

/**
 * Servicio de Cloudinary para manejo de imágenes
 * 
 * Funcionalidades:
 * - Upload de imágenes
 * - Eliminación de imágenes
 * - Transformaciones automáticas
 * - Optimización de tamaño
 */

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Tipos de respuesta de Cloudinary
 */
export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
}

/**
 * Configuración de upload
 */
interface UploadOptions {
  folder?: string;
  transformation?: any[];
  eager?: any[];
}

/**
 * Sube una imagen a Cloudinary
 * 
 * @param file - Archivo en base64 o buffer
 * @param options - Opciones de configuración
 * @returns Resultado del upload con URL y metadata
 */
export async function uploadImage(
  file: string | Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const {
    folder = 'lostconnect/posts',
    transformation = [
      { width: 1200, height: 1200, crop: 'limit' }, // Limitar tamaño máximo
      { quality: 'auto' }, // Calidad automática
      { fetch_format: 'auto' }, // Formato automático (WebP en navegadores compatibles)
    ],
  } = options;

  try {
    const result = await cloudinary.uploader.upload(file as string, {
      folder,
      transformation,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      resource_type: 'image',
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Sube múltiples imágenes a Cloudinary
 * 
 * @param files - Array de archivos en base64
 * @param options - Opciones de configuración
 * @returns Array de resultados del upload
 */
export async function uploadMultipleImages(
  files: string[],
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file, options));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw new Error('Failed to upload images');
  }
}

/**
 * Elimina una imagen de Cloudinary
 * 
 * @param publicId - ID público de la imagen en Cloudinary
 * @returns Resultado de la eliminación
 */
export async function deleteImage(publicId: string): Promise<{ result: string }> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}

/**
 * Elimina múltiples imágenes de Cloudinary
 * 
 * @param publicIds - Array de IDs públicos
 * @returns Array de resultados
 */
export async function deleteMultipleImages(
  publicIds: string[]
): Promise<{ result: string }[]> {
  try {
    const deletePromises = publicIds.map((id) => deleteImage(id));
    return await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting multiple images:', error);
    throw new Error('Failed to delete images');
  }
}

/**
 * Genera URL optimizada de Cloudinary con transformaciones
 * 
 * @param publicId - ID público de la imagen
 * @param options - Opciones de transformación
 * @returns URL optimizada
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}
): string {
  const {
    width = 800,
    height = 800,
    crop = 'limit',
    quality = 'auto',
    format = 'auto',
  } = options;

  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop },
      { quality },
      { fetch_format: format },
    ],
  });
}

/**
 * Valida que el archivo sea una imagen válida
 * 
 * @param file - Archivo a validar
 * @returns true si es válido, false si no
 */
export function validateImageFile(file: {
  type: string;
  size: number;
}): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de archivo no válido. Solo se permiten: JPG, PNG, WebP, GIF',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'El archivo es demasiado grande. Máximo 5MB',
    };
  }

  return { valid: true };
}

export default cloudinary;
