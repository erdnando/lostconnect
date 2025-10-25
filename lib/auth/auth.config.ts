import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@/lib/auth/mongodb-adapter";

/**
 * Configuración de NextAuth.js v5
 * 
 * Incluye:
 * - Proveedor de Google OAuth
 * - Adaptador personalizado para MongoDB
 * - Configuración de páginas personalizadas
 * - Callbacks para sesiones y JWT
 */
export const authConfig: NextAuthConfig = {
  // Adaptador de MongoDB para persistir usuarios y sesiones
  adapter: MongoDBAdapter(),

  // Proveedores de autenticación
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Scopes que solicitamos a Google
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // Páginas personalizadas
  pages: {
    signIn: "/auth/signin", // Página de login personalizada
    error: "/auth/error", // Página de error
    // newUser: "/onboarding", // Descomenta para onboarding de nuevos usuarios
  },

  // Callbacks para manejar sesiones y tokens
  callbacks: {
    // Se ejecuta cuando se crea un JWT
    async jwt({ token, user, account }) {
      // Al hacer login, agregar info del usuario al token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      // Agregar provider info
      if (account) {
        token.provider = account.provider;
      }

      return token;
    },

    // Se ejecuta cuando se crea una sesión
    async session({ session, token }) {
      // Agregar info del token a la sesión
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }

      return session;
    },

    // Control de acceso - se ejecuta en cada petición protegida
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = nextUrl.pathname.startsWith("/auth");

      // Si está en página de auth y logueado, redirigir al feed
      if (isOnAuthPage) {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
        return true; // Permitir acceso a auth pages sin login
      }

      // Rutas públicas que no requieren autenticación
      const publicRoutes = ["/", "/api/health"];
      if (publicRoutes.includes(nextUrl.pathname)) {
        return true;
      }

      // Para el resto de rutas, requiere autenticación
      return isLoggedIn;
    },
  },

  // Configuración de sesiones
  session: {
    strategy: "jwt", // Usar JWT en lugar de sesiones de DB
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },

  // Secret para firmar tokens
  secret: process.env.NEXTAUTH_SECRET,

  // Configuración de debug
  debug: process.env.NODE_ENV === "development",
};
