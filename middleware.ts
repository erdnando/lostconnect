import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Middleware de Autenticación
 * 
 * Protege rutas que requieren autenticación y maneja redirecciones.
 * Se ejecuta en TODAS las rutas que coincidan con el matcher.
 * 
 * Flujo:
 * 1. Usuario no autenticado intenta acceder a ruta protegida → Redirige a /auth/signin
 * 2. Usuario autenticado intenta acceder a /auth/signin → Redirige a /
 * 3. Rutas públicas y API routes → Permite acceso
 */
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = [
    "/",
    "/api/health",
    "/auth/signin",
    "/auth/error",
  ];

  // Rutas de autenticación
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isApiRoute = nextUrl.pathname.startsWith("/api");

  // Permitir todas las rutas de API (incluyendo /api/posts, /api/upload, etc.)
  // La autenticación se maneja dentro de cada API route según sea necesario
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Si está en ruta de auth y ya está logueado, redirigir al home
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Si es ruta pública, permitir acceso
  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Si no está logueado y no es ruta pública, redirigir a signin
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Usuario autenticado en ruta protegida → permitir acceso
  return NextResponse.next();
});

/**
 * Configuración del Matcher
 * 
 * Define qué rutas debe procesar el middleware.
 * Excluye archivos estáticos y recursos de Next.js.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (*.png, *.jpg, *.svg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
