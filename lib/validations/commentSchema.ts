import { z } from 'zod';

/**
 * Schema de validación para crear un comentario
 */
export const createCommentSchema = z.object({
  content: z
    .string({
      message: 'El contenido es requerido',
    })
    .min(1, 'El comentario no puede estar vacío')
    .max(1000, 'El comentario no puede exceder 1000 caracteres')
    .trim(),
  parentCommentId: z.string().optional(),
  replyToUserId: z.string().optional(),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string(),
      })
    )
    .max(3, 'No puedes agregar más de 3 imágenes en un comentario')
    .optional(),
  location: z
    .object({
      coordinates: z.tuple([z.number(), z.number()]),
      address: z.string().optional(),
    })
    .optional(),
});

/**
 * Types inferidos del schema
 */
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
