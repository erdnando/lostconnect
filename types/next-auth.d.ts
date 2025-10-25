import "next-auth";
import "next-auth/jwt";

/**
 * Extensiones de tipos para NextAuth.js
 * 
 * Permite agregar propiedades personalizadas a los tipos de NextAuth
 */

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider?: string;
  }
}
