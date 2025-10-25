'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, MessageCircle, Heart } from 'lucide-react';

/**
 * Tipos de Post
 */
export interface PostCardProps {
  post: {
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
  };
}

/**
 * Mapeo de categorías a español
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
  bags: 'Bolsos',
  other: 'Otro',
};

/**
 * Componente PostCard
 * 
 * Muestra un post en formato card con:
 * - Imagen principal
 * - Tipo (perdido/encontrado)
 * - Título y descripción
 * - Autor y fecha
 * - Ubicación
 * - Tags
 * - Estadísticas (comentarios, likes)
 */
export function PostCard({ post }: PostCardProps) {
  const {
    _id,
    type,
    title,
    description,
    category,
    images,
    location,
    tags,
    status,
    commentsCount,
    reactionsCount,
    userId,
    createdAt,
  } = post;

  // Imagen principal (primera del array)
  const mainImage = images[0];

  // Formatear fecha relativa
  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: es,
  });

  // Total de reacciones
  const totalReactions = Object.values(reactionsCount).reduce((a, b) => a + b, 0);

  return (
    <Link href={`/post/${_id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Imagen Principal */}
        {mainImage && (
          <div className="relative aspect-video w-full bg-muted">
            <Image
              src={mainImage.url}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Badge de tipo en la esquina */}
            <div className="absolute top-3 left-3">
              <Badge
                variant={type === 'lost' ? 'destructive' : 'default'}
                className="text-xs font-semibold"
              >
                {type === 'lost' ? '🔍 Perdido' : '✅ Encontrado'}
              </Badge>
            </div>
            {/* Badge de categoría */}
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="text-xs">
                {CATEGORY_LABELS[category] || category}
              </Badge>
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          {/* Título */}
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Descripción */}
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
        </CardHeader>

        <CardContent className="pb-3">
          {/* Ubicación */}
          {location && (location.city || location.address) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">
                {location.city && location.country
                  ? `${location.city}, ${location.country}`
                  : location.address || location.city}
              </span>
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Autor y Fecha */}
          <div className="flex items-center gap-2">
            {userId.image ? (
              <Image
                src={userId.image}
                alt={userId.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold">
                  {userId.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userId.name}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <time>{timeAgo}</time>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 border-t">
          {/* Estadísticas */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground w-full">
            {/* Comentarios */}
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span>{commentsCount}</span>
            </div>

            {/* Reacciones */}
            {totalReactions > 0 && (
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                <span>{totalReactions}</span>
              </div>
            )}

            {/* Estado */}
            {status !== 'active' && (
              <div className="ml-auto">
                <Badge variant={status === 'resolved' ? 'default' : 'secondary'} className="text-xs">
                  {status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                </Badge>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
