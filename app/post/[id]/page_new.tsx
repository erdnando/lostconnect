import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getPostById } from '@/lib/services/postService';
import { CommentList } from '@/components/comments/CommentList';

/**
 * Metadata dinámica
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: `${post.title} | LostConnect`,
    description: post.description.slice(0, 160),
  };
}

/**
 * Obtener post desde el servicio directamente
 */
async function getPost(id: string) {
  try {
    console.log('🔍 Buscando post con ID:', id);
    const result = await getPostById(id);
    console.log('✅ Post encontrado:', result.success);
    return result.success ? result.post : null;
  } catch (error) {
    console.error('❌ Error fetching post:', error);
    return null;
  }
}

/**
 * Página de detalle de un post
 */
export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const isLost = post.type === 'lost';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al feed
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Título y badges */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 flex-wrap">
                <Badge
                  className={cn(
                    "text-sm font-semibold px-3 py-1.5",
                    isLost
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  )}
                >
                  {isLost ? '🔍 Perdido' : '✅ Encontrado'}
                </Badge>
                
                {post.category && (
                  <Badge className="text-sm font-semibold px-3 py-1.5 bg-purple-500 text-white hover:bg-purple-600">
                    📦 {post.category}
                  </Badge>
                )}
                
                {post.tags && post.tags.length > 0 && (
                  <>
                    {post.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        className="text-sm font-semibold px-3 py-1.5 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </>
                )}
              </div>
              
              <h1 className="text-3xl font-bold leading-tight text-gray-900">{post.title}</h1>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Descripción</h2>
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {post.description}
              </p>
            </div>

            {/* Imágenes */}
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
              {post.images && post.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 p-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={post.images[0].url}
                      alt={post.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {post.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {post.images.slice(1).map((image: any, index: number) => (
                        <div
                          key={image._id || index}
                          className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={image.url}
                            alt={`${post.title} - imagen ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-600">Sin imágenes</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info principal */}
            <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4">
              {post.location?.city && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {post.location.city}
                    {(post.location as any).state && `, ${(post.location as any).state}`}
                    {post.location.country && ` • ${post.location.country}`}
                  </span>
                </div>
              )}

              <div className="flex items-start gap-2 text-sm text-gray-700">
                <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  {format(new Date(post.createdAt), "d 'de' MMMM, yyyy", {
                    locale: es,
                  })}
                </span>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{(post as any).views || 0}</p>
                    <p className="text-xs text-gray-600">Vistas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {(post as any).reactions?.likes || 0}
                    </p>
                    <p className="text-xs text-gray-600">Me gusta</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {post.commentsCount || 0}
                    </p>
                    <p className="text-xs text-gray-600">Comentarios</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info del autor */}
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-900">Publicado por</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {(post.userId as any)?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{(post.userId as any)?.name || 'Usuario'}</p>
                  <p className="text-sm text-gray-600">
                    {(post.userId as any)?.email}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t space-y-2">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Contactar</Button>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Estado</span>
                <Badge
                  variant={post.status === 'active' ? 'default' : 'secondary'}
                  className={post.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-900'}
                >
                  {post.status === 'active' ? 'Activo' : post.status}
                </Badge>
              </div>
              {post.status === 'active' && (
                <p className="text-xs text-gray-600">
                  Esta publicación está activa y visible para todos
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Comentarios */}
        <div className="mt-12">
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <CommentList postId={id} initialCommentsCount={post.commentsCount || 0} />
          </div>
        </div>
      </div>
    </div>
  );
}
