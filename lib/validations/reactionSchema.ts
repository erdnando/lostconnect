import { z } from 'zod';

/**
 * Schema de validación para reacciones
 */
export const reactionSchema = z.object({
  type: z.enum(['like', 'helpful', 'found'], {
    message: 'El tipo de reacción es requerido',
  }),
});

/**
 * Types inferidos del schema
 */
export type ReactionInput = z.infer<typeof reactionSchema>;
