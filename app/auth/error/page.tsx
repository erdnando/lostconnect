"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

/**
 * Página de Error de Autenticación
 * 
 * Muestra mensajes de error específicos según el tipo de error de NextAuth
 */
export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, { title: string; message: string }> = {
    Configuration: {
      title: "Error de Configuración",
      message:
        "Hay un problema con la configuración del servidor. Por favor contacta al administrador.",
    },
    AccessDenied: {
      title: "Acceso Denegado",
      message:
        "No tienes permisos para acceder a este recurso. Si crees que esto es un error, contacta al soporte.",
    },
    Verification: {
      title: "Error de Verificación",
      message:
        "El token de verificación ha expirado o ya fue utilizado. Por favor solicita uno nuevo.",
    },
    OAuthSignin: {
      title: "Error al Iniciar Sesión con Google",
      message:
        "Hubo un problema al intentar iniciar sesión con Google. Por favor intenta nuevamente.",
    },
    OAuthCallback: {
      title: "Error de Callback",
      message:
        "Hubo un problema al procesar la respuesta de Google. Por favor intenta nuevamente.",
    },
    OAuthCreateAccount: {
      title: "Error al Crear Cuenta",
      message:
        "No se pudo crear tu cuenta. Es posible que ya exista una cuenta con este email.",
    },
    EmailCreateAccount: {
      title: "Error al Crear Cuenta",
      message: "No se pudo crear tu cuenta. Por favor intenta nuevamente.",
    },
    Callback: {
      title: "Error de Callback",
      message:
        "Hubo un error al procesar tu inicio de sesión. Por favor intenta nuevamente.",
    },
    OAuthAccountNotLinked: {
      title: "Cuenta No Vinculada",
      message:
        "Este email ya está asociado con otra cuenta. Por favor inicia sesión con el método original.",
    },
    EmailSignin: {
      title: "Error al Enviar Email",
      message:
        "No se pudo enviar el email de verificación. Por favor intenta nuevamente.",
    },
    CredentialsSignin: {
      title: "Credenciales Inválidas",
      message:
        "El email o contraseña son incorrectos. Por favor verifica e intenta nuevamente.",
    },
    SessionRequired: {
      title: "Sesión Requerida",
      message: "Debes iniciar sesión para acceder a esta página.",
    },
    Default: {
      title: "Error de Autenticación",
      message:
        "Ha ocurrido un error inesperado. Por favor intenta nuevamente más tarde.",
    },
  };

  const errorInfo = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        {/* Icono de Error */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-red-600 dark:text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {errorInfo.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {errorInfo.message}
          </p>
        </div>

        {/* Detalles técnicos (solo en desarrollo) */}
        {process.env.NODE_ENV === "development" && error && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-xs font-mono text-gray-600 dark:text-gray-300">
              Error Code: <span className="font-semibold">{error}</span>
            </p>
          </div>
        )}

        {/* Acciones */}
        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Intentar Nuevamente
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Volver al Inicio
          </Link>
        </div>

        {/* Ayuda adicional */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            ¿Necesitas ayuda?{" "}
            <a
              href="mailto:support@lostconnect.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contacta soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
