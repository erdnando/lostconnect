import { Metadata } from 'next';
import { PostForm } from '@/components/posts/PostForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Crear Publicación | Network Social',
  description: 'Publica sobre un objeto perdido o encontrado',
};

/**
 * Página para crear un nuevo post
 * 
 * Características:
 * - Usa el componente PostForm
 * - Header con botón de volver
 * - Layout responsive con mejor diseño
 */
export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header mejorado */}
      <div className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al feed
            </Link>
          </div>
          <h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Crear Publicación
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Completa el formulario para publicar sobre un objeto perdido o encontrado
          </p>
        </div>
      </div>

      {/* Contenido con mejor diseño */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl shadow-gray-200/50">
          <PostForm />
        </div>
      </div>
    </div>
  );
}
