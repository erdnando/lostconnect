import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Calendar, Tag, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
    title: `${post.title} | Network Social`,
    description: post.description.slice(0, 160),
  };
}

/**
 * Obtener post desde el API
 */
async function getPost(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/posts/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.post : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Traducción de categorías
 */
const CATEGORY_LABELS: Record<string, string> = {
  electronics: 'Electrónicos',
  clothing: 'Ropa',
  accessories: 'Accesorios',
  documents: 'Documentos',
  pets: 'Mascotas',
  vehicles: 'Vehículos',
  jewelry: 'Joyería',
  keys: 'Llaves',
  bags: 'Bolsos/Mochilas',
  other: 'Otro',
};

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
          {/* Columna principal - Imágenes y descripción */}
          <div className="lg:col-span-2 space-y-6">
            {/* Imágenes */}
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
              {post.images && post.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 p-4">
                  {/* Imagen principal */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={post.images[0].url}
                      alt={post.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Miniaturas */}
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

            {/* Descripción */}
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Descripción</h2>
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {post.description}
              </p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="bg-white rounded-lg border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Etiquetas</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-gray-200 text-gray-900">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Info del post */}
          <div className="space-y-6">
            {/* Info principal */}
            <div className="bg-white rounded-lg border p-6 shadow-sm space-y-4">
              {/* Badge de tipo */}
              <Badge
                className={
                  isLost
                    ? 'bg-red-100 text-red-700 hover:bg-red-100'
                    : 'bg-green-100 text-green-700 hover:bg-green-100'
                }
              >
                {isLost ? '🔍 Perdido' : '✅ Encontrado'}
              </Badge>

              {/* Título */}
              <h1 className="text-2xl font-bold leading-tight text-gray-900">{post.title}</h1>

              {/* Categoría */}
              <div className="flex items-start gap-2 text-sm">
                <span className="font-medium text-gray-700">Categoría:</span>
                <Badge variant="outline" className="border-gray-300 text-gray-900">
                  {CATEGORY_LABELS[post.category] || post.category}
                </Badge>
              </div>

              {/* Ubicación */}
              {post.location?.city && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {post.location.city}
                    {post.location.state && `, ${post.location.state}`}
                    {post.location.country && ` • ${post.location.country}`}
                  </span>
                </div>
              )}

              {/* Fecha */}
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  {format(new Date(post.createdAt), "d 'de' MMMM, yyyy", {
                    locale: es,
                  })}
                </span>
              </div>

              {/* Estadísticas */}
              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{post.views || 0}</p>
                    <p className="text-xs text-gray-600">Vistas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {post.reactions?.likes || 0}
                    </p>
                    <p className="text-xs text-gray-600">Me gusta</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {post.reactions?.comments || 0}
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
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {post.userId?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.userId?.name || 'Usuario'}</p>
                  <p className="text-sm text-gray-600">
                    {post.userId?.email}
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-4 pt-4 border-t space-y-2">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Contactar</Button>
                {/* TODO: Mostrar solo si es el owner */}
                {/* <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div> */}
              </div>
            </div>

            {/* Status del post */}
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
      </div>
    </div>
  );
}
