"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Componente con SearchParams
 */
function SignInContent() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        {/* Logo y Título */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            LostConnect
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Red social de objetos perdidos y encontrados
          </p>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            {error === "OAuthSignin" && "Error al iniciar sesión con Google"}
            {error === "OAuthCallback" && "Error en el callback de Google"}
            {error === "OAuthCreateAccount" && "Error al crear la cuenta"}
            {error === "EmailCreateAccount" && "Error al crear la cuenta"}
            {error === "Callback" && "Error de callback"}
            {error === "OAuthAccountNotLinked" &&
              "Esta cuenta ya está vinculada con otro método"}
            {error === "EmailSignin" && "Error al enviar el email"}
            {error === "CredentialsSignin" && "Credenciales inválidas"}
            {error === "SessionRequired" && "Por favor inicia sesión"}
            {!error && "Ha ocurrido un error. Por favor intenta de nuevo."}
          </div>
        )}

        {/* Botón de Google Sign In */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {isLoading ? "Cargando..." : "Continuar con Google"}
            </span>
          </button>

          {/* Información adicional */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Al continuar, aceptas nuestros Términos de Servicio y Política de
            Privacidad
          </p>
        </div>

        {/* Features */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-medium">
            ¿Qué puedes hacer con LostConnect?
          </p>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Publicar objetos perdidos o encontrados</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Conectar con personas de tu comunidad</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Recibir notificaciones en tiempo real</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Página de Inicio de Sesión con Suspense
 */
export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
