import type { Adapter, AdapterUser, AdapterSession, AdapterAccount, VerificationToken } from "next-auth/adapters";
import connectDB from "@/lib/db/mongodb";
import { User } from "@/lib/models/User";

/**
 * Adaptador personalizado de MongoDB para NextAuth.js v5
 * 
 * Este adaptador conecta NextAuth con nuestros modelos de Mongoose,
 * permitiendo persistir usuarios, cuentas y sesiones en MongoDB.
 * 
 * Basado en: https://authjs.dev/guides/creating-a-database-adapter
 */
export function MongoDBAdapter(): Adapter {
  return {
    // Crear un nuevo usuario
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      await connectDB();
      
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified,
      });

      return {
        id: String(newUser._id),
        name: newUser.name,
        email: newUser.email,
        emailVerified: newUser.emailVerified ?? null,
        image: newUser.image,
      };
    },

    // Obtener usuario por ID
    async getUser(id: string): Promise<AdapterUser | null> {
      await connectDB();
      
      const user = await User.findById(id);
      if (!user) return null;

      return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified ?? null,
        image: user.image,
      };
    },

    // Obtener usuario por email
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      await connectDB();
      
      const user = await User.findOne({ email });
      if (!user) return null;

      return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified ?? null,
        image: user.image,
      };
    },

    // Obtener usuario por cuenta (Google, GitHub, etc.)
    async getUserByAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }): Promise<AdapterUser | null> {
      await connectDB();
      
      // Buscar usuario que tenga esta cuenta vinculada
      const user = await User.findOne({
        [`accounts.${provider}`]: providerAccountId,
      });

      if (!user) return null;

      return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified ?? null,
        image: user.image,
      };
    },

    // Actualizar usuario
    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Promise<AdapterUser> {
      await connectDB();
      
      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        {
          $set: {
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.emailVerified,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return {
        id: String(updatedUser._id),
        name: updatedUser.name,
        email: updatedUser.email,
        emailVerified: updatedUser.emailVerified ?? null,
        image: updatedUser.image,
      };
    },

    // Eliminar usuario
    async deleteUser(userId: string): Promise<void> {
      await connectDB();
      await User.findByIdAndDelete(userId);
    },

    // Vincular cuenta a usuario (Google, GitHub, etc.)
    async linkAccount(account: AdapterAccount): Promise<void> {
      await connectDB();
      
      // Guardar la cuenta en el usuario
      await User.findByIdAndUpdate(account.userId, {
        $set: {
          [`accounts.${account.provider}`]: account.providerAccountId,
        },
      });
    },

    // Desvincular cuenta
    async unlinkAccount({
      providerAccountId,
      provider,
    }: {
      providerAccountId: string;
      provider: string;
    }): Promise<void> {
      await connectDB();
      
      await User.findOneAndUpdate(
        { [`accounts.${provider}`]: providerAccountId },
        {
          $unset: {
            [`accounts.${provider}`]: "",
          },
        }
      );
    },

    // Crear sesión (no usado con JWT strategy)
    async createSession(session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> {
      // No implementado porque usamos JWT strategy
      return session as AdapterSession;
    },

    // Obtener sesión por token (no usado con JWT strategy)
    async getSessionAndUser(sessionToken: string): Promise<{
      session: AdapterSession;
      user: AdapterUser;
    } | null> {
      // No implementado porque usamos JWT strategy
      return null;
    },

    // Actualizar sesión (no usado con JWT strategy)
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null | undefined> {
      // No implementado porque usamos JWT strategy
      return null;
    },

    // Eliminar sesión (no usado con JWT strategy)
    async deleteSession(sessionToken: string): Promise<void> {
      // No implementado porque usamos JWT strategy
    },

    // Crear token de verificación (para email verification)
    async createVerificationToken(token: VerificationToken): Promise<VerificationToken | null | undefined> {
      // Implementación básica - puedes expandir según necesites
      return token;
    },

    // Usar token de verificación
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      // Implementación básica - puedes expandir según necesites
      return null;
    },
  };
}
