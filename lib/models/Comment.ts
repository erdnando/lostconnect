import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IComment extends Document {
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  parentCommentId?: Types.ObjectId;
  replyToUserId?: Types.ObjectId;
  images?: {
    url: string;
    publicId: string;
  }[];
  location?: {
    type: 'Point';
    coordinates: [number, number];
    address?: string;
  };
  repliesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'El contenido es requerido'],
      maxlength: [1000, 'El comentario no puede exceder 1000 caracteres'],
      trim: true,
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    replyToUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
      address: String,
    },
    repliesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Evitar recrear el modelo en hot reload
const Comment = (mongoose.models?.Comment as mongoose.Model<IComment>) || mongoose.model<IComment>('Comment', CommentSchema);

export { Comment };
export default Comment;
