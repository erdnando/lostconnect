import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPost extends Document {
  userId: Types.ObjectId;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  images: {
    url: string;
    publicId: string;
    width?: number;
    height?: number;
  }[];
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
    address?: string;
    city?: string;
    country?: string;
  };
  status: 'active' | 'resolved' | 'closed';
  tags: string[];
  commentsCount: number;
  reactionsCount: {
    like: number;
    helpful: number;
    found: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
    },
    title: {
      type: String,
      required: [true, 'El título es requerido'],
      minlength: [5, 'El título debe tener al menos 5 caracteres'],
      maxlength: [100, 'El título no puede exceder 100 caracteres'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      minlength: [20, 'La descripción debe tener al menos 20 caracteres'],
      maxlength: [2000, 'La descripción no puede exceder 2000 caracteres'],
    },
    category: {
      type: String,
      required: true,
      enum: ['electronics', 'documents', 'pets', 'clothing', 'accessories', 'other'],
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        width: Number,
        height: Number,
      },
    ],
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
      address: String,
      city: String,
      country: String,
    },
    status: {
      type: String,
      enum: ['active', 'resolved', 'closed'],
      default: 'active',
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    commentsCount: {
      type: Number,
      default: 0,
    },
    reactionsCount: {
      like: { type: Number, default: 0 },
      helpful: { type: Number, default: 0 },
      found: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Índices
PostSchema.index({ userId: 1 });
PostSchema.index({ createdAt: -1 });
PostSchema.index({ status: 1, createdAt: -1 });
PostSchema.index({ category: 1 });
PostSchema.index({ location: '2dsphere' }); // Para búsquedas geoespaciales

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
