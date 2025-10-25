import { handlers } from "@/lib/auth";

/**
 * API Route Handler para NextAuth.js
 * 
 * Este archivo maneja todas las rutas de autenticación:
 * - GET  /api/auth/signin - Página de login
 * - POST /api/auth/signin/google - Iniciar OAuth con Google
 * - GET  /api/auth/callback/google - Callback de Google OAuth
 * - POST /api/auth/signout - Cerrar sesión
 * - GET  /api/auth/session - Obtener sesión actual
 * - GET  /api/auth/providers - Lista de proveedores disponibles
 * - GET  /api/auth/csrf - Token CSRF
 * 
 * Next.js 13+ App Router usa el pattern [...nextauth] para catch-all routes
 */

export const { GET, POST } = handlers;
