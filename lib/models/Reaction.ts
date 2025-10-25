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

// Evitar recrear el modelo en hot reload
const Reaction = (mongoose.models?.Reaction as mongoose.Model<IReaction>) || mongoose.model<IReaction>('Reaction', ReactionSchema);

export { Reaction };
export default Reaction;
