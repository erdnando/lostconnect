'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PostCard } from '@/components/posts/PostCard';
import { PostCardSkeleton } from '@/components/posts/PostCardSkeleton';
import { QuickPostToolbar } from '@/components/posts/QuickPostToolbar';
import { PostCreationDrawer } from '@/components/posts/PostCreationDrawer';
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
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [showFAB, setShowFAB] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullStartY, setPullStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);

  // Detectar scroll para mostrar/ocultar FAB
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFAB(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pull-to-refresh handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setPullStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && pullStartY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - pullStartY;
      if (distance > 0 && distance < 150) {
        setPullDistance(distance);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 80) {
      refreshPosts();
    }
    setPullStartY(0);
    setPullDistance(0);
  };

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

  /**
   * Refresh posts (pull-to-refresh)
   */
  async function refreshPosts() {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
  }

  return (
    <>
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-blue-600 to-indigo-700 backdrop-blur-sm sticky top-0 z-10 shadow-md">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
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
              <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                LostConnect
              </h1>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="container mx-auto max-w-4xl px-4 py-6 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull-to-refresh indicator */}
        {pullDistance > 0 && (
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-200"
            style={{ 
              transform: `translate(-50%, ${Math.min(pullDistance - 40, 40)}px)`,
              opacity: Math.min(pullDistance / 80, 1)
            }}
          >
            <div className="bg-blue-600 text-white rounded-full p-3 shadow-lg">
              <svg
                className={`h-5 w-5 ${pullDistance > 80 ? 'animate-spin' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Refreshing indicator */}
        {isRefreshing && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-sm font-medium">Actualizando...</span>
          </div>
        )}
        {/* QuickPost Toolbar (solo si está autenticado) */}
        {session && (
          <QuickPostToolbar onOpenCreatePost={() => setShowCreateDrawer(true)} />
        )}

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
              <Button 
                onClick={() => setShowCreateDrawer(true)} 
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Crear Publicación
              </Button>
            )}
          </div>
        )}

        {/* Lista de Posts */}
        {!loading && !error && posts.length > 0 && (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <div key={post._id}>
                <PostCard post={post} />
                {/* Divisor entre posts (excepto el último) */}
                {index < posts.length - 1 && (
                  <div className="mt-8 border-b-2 border-gray-200" />
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button (FAB) */}
      {session && showFAB && (
        <button
          onClick={() => setShowCreateDrawer(true)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            showFAB ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          aria-label="Crear nueva publicación"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}

      {/* PostCreationDrawer */}
      <PostCreationDrawer 
        open={showCreateDrawer} 
        onOpenChange={setShowCreateDrawer}
      />
    </>
  );
}
