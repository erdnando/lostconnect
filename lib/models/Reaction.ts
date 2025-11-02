import mongoose, { Document, Schema, Types, Model } from 'mongoose';

/**
 * Tipos de reacciones disponibles
 */
export type ReactionType = 'like' | 'helpful' | 'found';

/**
 * Interface para el documento Reaction
 */
export interface IReaction extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  type: ReactionType;
  createdAt: Date;
}

/**
 * Interface para métodos estáticos
 */
export interface IReactionModel extends Model<IReaction> {
  toggleReaction(
    userId: string | Types.ObjectId,
    postId: string | Types.ObjectId,
    type: ReactionType
  ): Promise<{ action: 'created' | 'updated' | 'removed'; type: ReactionType; previousType?: ReactionType }>;
  
  getReactionCounts(postId: string | Types.ObjectId): Promise<{
    like: number;
    helpful: number;
    found: number;
  }>;
  
  getUserReaction(
    userId: string | Types.ObjectId,
    postId: string | Types.ObjectId
  ): Promise<IReaction | null>;
}

const ReactionSchema = new Schema<IReaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El ID del usuario es requerido'],
      index: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'El ID del post es requerido'],
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: ['like', 'helpful', 'found'],
        message: 'El tipo debe ser: like, helpful o found',
      },
      required: [true, 'El tipo de reacción es requerido'],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

/**
 * Índices
 */

// Índice compuesto único: Un usuario solo puede tener una reacción por post
ReactionSchema.index({ userId: 1, postId: 1 }, { unique: true });

// Índice para queries de conteo por tipo
ReactionSchema.index({ postId: 1, type: 1 });

/**
 * Métodos estáticos
 */

/**
 * Toggle de reacción: Crea, actualiza o elimina una reacción
 */
ReactionSchema.statics.toggleReaction = async function (
  userId: string | Types.ObjectId,
  postId: string | Types.ObjectId,
  type: ReactionType
) {
  const userObjectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
  const postObjectId = typeof postId === 'string' ? new Types.ObjectId(postId) : postId;

  // Buscar reacción existente
  const existingReaction = await this.findOne({
    userId: userObjectId,
    postId: postObjectId,
  });

  let result: { action: 'created' | 'updated' | 'removed'; type: ReactionType; previousType?: ReactionType };

  if (existingReaction) {
    if (existingReaction.type === type) {
      // Si es el mismo tipo, eliminar (toggle off)
      await existingReaction.deleteOne();
      result = { action: 'removed', type };
    } else {
      // Si es diferente tipo, actualizar
      const previousType = existingReaction.type;
      existingReaction.type = type;
      await existingReaction.save();
      result = { action: 'updated', type, previousType };
    }
  } else {
    // Crear nueva reacción
    await this.create({
      userId: userObjectId,
      postId: postObjectId,
      type,
    });
    result = { action: 'created', type };
  }

  // Actualizar el contador de reacciones en el Post
  try {
    // Obtener los conteos actualizados de la colección de reacciones
    const counts = await this.aggregate([
      { $match: { postId: postObjectId } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    // Formatear resultado
    const updatedCounts = {
      like: 0,
      helpful: 0,
      found: 0,
    };

    counts.forEach((item: { _id: ReactionType; count: number }) => {
      updatedCounts[item._id] = item.count;
    });

    // Actualizar el documento Post
    const Post = mongoose.model('Post');
    await Post.findByIdAndUpdate(postObjectId, {
      reactionsCount: updatedCounts,
    });
  } catch (error) {
    console.error('Error updating post reaction counts:', error);
    // No lanzamos el error para no interrumpir el flujo principal
  }

  return result;
};

/**
 * Obtener conteo de reacciones por tipo para un post
 */
ReactionSchema.statics.getReactionCounts = async function (
  postId: string | Types.ObjectId
) {
  const postObjectId = typeof postId === 'string' ? new Types.ObjectId(postId) : postId;

  const counts = await this.aggregate([
    { $match: { postId: postObjectId } },
    { $group: { _id: '$type', count: { $sum: 1 } } },
  ]);

  // Formatear resultado
  const result = {
    like: 0,
    helpful: 0,
    found: 0,
  };

  counts.forEach((item: { _id: ReactionType; count: number }) => {
    result[item._id] = item.count;
  });

  return result;
};

/**
 * Obtener la reacción de un usuario para un post
 */
ReactionSchema.statics.getUserReaction = async function (
  userId: string | Types.ObjectId,
  postId: string | Types.ObjectId
) {
  const userObjectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
  const postObjectId = typeof postId === 'string' ? new Types.ObjectId(postId) : postId;

  return await this.findOne({
    userId: userObjectId,
    postId: postObjectId,
  });
};

// Evitar recrear el modelo en hot reload
const Reaction = (mongoose.models?.Reaction as IReactionModel) || mongoose.model<IReaction, IReactionModel>('Reaction', ReactionSchema);

export { Reaction };
export default Reaction;
