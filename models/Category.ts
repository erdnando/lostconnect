import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface para Category
 */
export interface ICategory extends Document {
  value: string;      // ID único (electronics, pets, etc.)
  label: string;      // Nombre display (Electrónicos, Mascotas, etc.)
  icon: string;       // Emoji o icono
  order: number;      // Orden de visualización
  active: boolean;    // Si está activa o no
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Schema de Category
 */
const CategorySchema = new Schema<ICategory>(
  {
    value: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      default: '📦',
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índices
CategorySchema.index({ active: 1, order: 1 });
CategorySchema.index({ value: 1 });

// Evitar re-compilar el modelo en desarrollo (HMR)
const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
