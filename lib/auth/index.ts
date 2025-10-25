import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/**
 * Exportaciones centralizadas de NextAuth
 * 
 * Uso:
 * - auth(): Obtener sesión del lado del servidor
 * - signIn(): Iniciar sesión
 * - signOut(): Cerrar sesión
 * - handlers: { GET, POST } para API routes
 */
export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
