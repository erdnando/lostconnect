import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  accounts?: {
    [provider: string]: string; // { google: "123456", github: "789" }
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Índice definido en el campo
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
    accounts: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Evitar recrear el modelo en hot reload
const User = (mongoose.models?.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export { User };
export default User;
