import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IReaction extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  type: 'like' | 'helpful' | 'found';
  createdAt: Date;
}

const ReactionSchema = new Schema<IReaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    type: {
      type: String,
      enum: ['like', 'helpful', 'found'],
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Índice único compuesto: un usuario solo puede tener una reacción por post
ReactionSchema.index({ userId: 1, postId: 1 }, { unique: true });
ReactionSchema.index({ postId: 1, type: 1 });

export const Reaction = mongoose.models.Reaction || mongoose.model<IReaction>('Reaction', ReactionSchema);
