'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, MessageCircle } from 'lucide-react';
import { ReactionBar } from './ReactionButton';
import { ReactionType } from '@/lib/models/Reaction';
import { PostDetailDrawer } from './PostDetailDrawer';

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
    userReaction?: ReactionType | null;
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
    userReaction,
    userId,
    createdAt,
  } = post;

  // Estado local para conteos de reacciones (actualización optimista)
  const [localReactionCounts, setLocalReactionCounts] = useState(reactionsCount);
  
  // Estado local para contador de comentarios
  const [localCommentsCount, setLocalCommentsCount] = useState(commentsCount);
  
  // Estado para el drawer de comentarios
  const [showDrawer, setShowDrawer] = useState(false);

  // Imagen principal (primera del array)
  const mainImage = images[0];

  // Formatear fecha relativa
  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: es,
  });

  // Total de reacciones
  const totalReactions = Object.values(localReactionCounts).reduce((a, b) => a + b, 0);

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200">
      {/* Enlace en la imagen y contenido */}
      <Link href={`/post/${_id}`}>
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
            
            {/* Ribbon de "ENCONTRADO" cuando type es found */}
            {type === 'found' && (
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none z-20">
                <div 
                  className="absolute transform rotate-45 text-white text-center font-black uppercase tracking-wider shadow-2xl"
                  style={{
                    top: '22px',
                    right: '-35px',
                    width: '150px',
                    padding: '8px 0',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.4), inset 0 -2px 5px rgba(0,0,0,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderBottom: '3px solid rgba(0,0,0,0.2)'
                  }}
                >
                  ✓ ENCONTRADO
                </div>
              </div>
            )}
            
            {/* Badge de tipo en la esquina - Solo PERDIDO (found tiene ribbon) */}
            {type === 'lost' && (
              <div className="absolute top-3 left-3">
                <Badge
                  variant="destructive"
                  className="text-xs font-semibold shadow-lg backdrop-blur-sm border-2 bg-red-600/90 text-white border-red-800"
                >
                  🔍 Perdido
                </Badge>
              </div>
            )}
            
            {/* Badge de categoría */}
            <div className="absolute top-3 right-3">
              <Badge 
                variant="secondary" 
                className="text-xs bg-gray-900/90 text-white backdrop-blur-sm shadow-lg border-2 border-gray-700"
              >
                {CATEGORY_LABELS[category] || category}
              </Badge>
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          {/* Título */}
          <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Descripción */}
          <p className="text-sm text-gray-700 line-clamp-2 mt-1">
            {description}
          </p>
        </CardHeader>

        <CardContent className="pb-3">
          {/* Ubicación */}
          {location && (location.city || location.address) && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
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
                <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-900">
                  #{tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-900">
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
                <span className="text-xs font-semibold text-gray-900">
                  {userId.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userId.name}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar className="h-3 w-3" />
              <time>{timeAgo}</time>
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Footer con reacciones interactivas */}
      <CardFooter className="pt-3 pb-4 border-t flex-col items-start gap-3">
        {/* Barra de Reacciones */}
        <div className="w-full" onClick={(e) => e.stopPropagation()}>
          <ReactionBar
            postId={_id}
            initialCounts={reactionsCount}
            initialUserReaction={userReaction || null}
            onReactionChange={setLocalReactionCounts}
          />
        </div>

        {/* Estadísticas secundarias */}
        <div className="flex items-center gap-4 text-sm text-gray-600 w-full">
          {/* Comentarios - Abre drawer */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDrawer(true);
            }}
            className="flex items-center gap-1.5 hover:text-[#001D68] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{localCommentsCount} comentario{localCommentsCount !== 1 ? 's' : ''}</span>
          </button>

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

      {/* Drawer para ver detalles y comentarios */}
      <PostDetailDrawer
        post={{
          ...post,
          commentsCount: localCommentsCount,
          reactionsCount: localReactionCounts,
        }}
        open={showDrawer}
        onOpenChange={setShowDrawer}
        onCommentsCountChange={setLocalCommentsCount}
      />
    </Card>
  );
}
