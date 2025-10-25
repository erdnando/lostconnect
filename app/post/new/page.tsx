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
 * - Layout responsive
 */
export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al feed
            </Link>
          </div>
          <h1 className="text-2xl font-bold mt-2">Crear Publicación</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Completa el formulario para publicar sobre un objeto perdido o encontrado
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <PostForm />
        </div>
      </div>
    </div>
  );
}
