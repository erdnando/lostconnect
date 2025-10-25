import Image from "next/image";

import Link from "next/link";
import { AuthButton } from "@/components/auth/AuthButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-blue-50 to-white p-8">
      {/* Header con botón de autenticación */}
      <header className="w-full max-w-7xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            LostConnect
          </h1>
        </div>
        <AuthButton />
      </header>

      <main className="flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        {/* Logo/Header */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-blue-600">
            🔍 LostConnect
          </h1>
          <p className="text-xl text-gray-600">
            Red Social de Objetos Perdidos
          </p>
        </div>

        {/* Status Card */}
        <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Estado del Sistema
          </h2>
          
          <div className="space-y-4">
            {/* Verificar conexión */}
            <a
              href="/api/health"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏥</span>
                <span className="font-medium text-gray-700">
                  Verificar Estado de Conexión
                </span>
              </div>
              <span className="text-blue-600">→</span>
            </a>

            {/* Info */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                <strong>Nota:</strong> El proyecto está en fase de desarrollo inicial.
                <br />
                Haz clic en el botón de arriba para verificar:
              </p>
              <ul className="mt-2 list-inside list-disc text-left text-sm text-gray-600">
                <li>Conexión a MongoDB</li>
                <li>Variables de entorno</li>
                <li>Estado del servidor</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Progreso del MVP
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">✅ Fase 1: Setup & Auth</span>
              <span className="font-medium text-blue-600">80%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-4/5 bg-blue-600"></div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-gray-500">📋 Fase 2: Posts</span>
              <span className="font-medium text-gray-400">0%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-0 bg-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/erdnando/lostconnect"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            📚 GitHub
          </a>
          <a
            href="/PLAN_MAESTRO.md"
            className="rounded-lg border border-blue-300 bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            📋 Plan Maestro
          </a>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500">
          Proyecto académico · Octubre 2025
        </p>
      </main>

      <footer className="w-full max-w-7xl">
        {/* Espacio para footer si se necesita */}
      </footer>
    </div>
  );
}
