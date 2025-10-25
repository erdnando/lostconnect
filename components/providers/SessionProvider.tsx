"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * Provider de Sesión de NextAuth
 * 
 * Envuelve la aplicación para proporcionar el contexto de sesión
 * a todos los componentes client-side.
 * 
 * Debe usarse en el layout raíz.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
