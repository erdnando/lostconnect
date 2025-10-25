'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PostCard } from '@/components/posts/PostCard';
import { PostCardSkeleton } from '@/components/posts/PostCardSkeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, Search } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';

/**
 * Tipo de Post
 */
interface Post {
  _id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  images: Array<{
    url: string;
    publicId: string;
    width?: number;
    height?: number;
  }>;
  location?: {
    city?: string;
    country?: string;
    address?: string;
  };
  tags?: string[];
  status: 'active' | 'resolved' | 'closed';
  commentsCount: number;
  reactionsCount: {
    like: number;
    helpful: number;
    found: number;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * FeedContent
 * 
 * Componente principal del feed que:
 * - Carga posts desde la API
 * - Muestra filtros
 * - Implementa infinite scroll
 * - Maneja estados de carga y vacío
 */
export function FeedContent() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');

  // Cargar posts iniciales
  useEffect(() => {
    fetchPosts();
  }, [filter]);

  /**
   * Fetch posts from API
   */
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        limit: '10',
        status: 'active',
      });

      if (filter !== 'all') {
        params.append('type', filter);
      }

      const response = await fetch(`/api/posts?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.posts);
      } else {
        setError(data.error || 'Error al cargar posts');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
              <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">
                LostConnect
              </h1>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {session ? (
                <Link href="/post/new">
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Nuevo Post</span>
                  </Button>
                </Link>
              ) : null}
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-6">
        {/* Filtros */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Feed de Publicaciones
            </h2>
          </div>

          {/* Botones de filtro */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-gray-500" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter('all')}
              className={
                filter === 'all'
                  ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100 font-medium'
              }
            >
              Todos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter('lost')}
              className={
                filter === 'lost'
                  ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-red-50 hover:border-red-300 font-medium'
              }
            >
              🔍 Perdidos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilter('found')}
              className={
                filter === 'found'
                  ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-green-50 hover:border-green-300 font-medium'
              }
            >
              ✅ Encontrados
            </Button>
          </div>
        </div>

        {/* Estados */}
        {loading && (
          <div className="space-y-4">
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <Button onClick={fetchPosts} className="mt-4">
              Reintentar
            </Button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay publicaciones todavía
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? 'Sé el primero en publicar un objeto perdido o encontrado'
                : `No hay objetos ${filter === 'lost' ? 'perdidos' : 'encontrados'} en este momento`}
            </p>
            {session && (
              <Link href="/post/new">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Crear Publicación
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Lista de Posts */}
        {!loading && !error && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
