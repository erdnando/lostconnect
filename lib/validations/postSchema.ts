import { z } from 'zod';

/**
 * Schema de validación para crear un post
 */
export const createPostSchema = z.object({
  type: z.enum(['lost', 'found'], {
    message: 'El tipo debe ser "lost" o "found"',
  }),
  title: z
    .string({
      message: 'El título es requerido',
    })
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres')
    .trim(),
  description: z
    .string({
      message: 'La descripción es requerida',
    })
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres')
    .trim(),
  category: z
    .string({
      message: 'La categoría es requerida',
    })
    .min(1, 'Debes seleccionar una categoría')
    .trim(),
  images: z
    .array(
      z.object({
        url: z.string().url('URL de imagen inválida'),
        publicId: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      })
    )
    .min(1, 'Debes agregar al menos una imagen')
    .max(5, 'No puedes agregar más de 5 imágenes'),
  location: z
    .object({
      coordinates: z.tuple([z.number(), z.number()]).optional(), // [longitude, latitude] - ahora opcional
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(), // Agregado state
      country: z.string().optional(),
    })
    .optional(),
  tags: z.array(z.string().toLowerCase().trim()).max(10, 'No puedes agregar más de 10 tags').optional(),
});

/**
 * Schema de validación para actualizar un post
 */
export const updatePostSchema = z.object({
  title: z.string().min(5).max(100).trim().optional(),
  description: z.string().min(20).max(2000).trim().optional(),
  status: z.enum(['active', 'resolved', 'closed']).optional(),
  tags: z.array(z.string().toLowerCase().trim()).max(10).optional(),
});

/**
 * Types inferidos de los schemas
 */
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
