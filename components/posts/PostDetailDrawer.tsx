'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { X, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CommentList } from '@/components/comments/CommentList';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

/**
 * Props del PostDetailDrawer
 */
interface PostDetailDrawerProps {
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCommentsCountChange?: (newCount: number) => void;
}

/**
 * PostDetailDrawer Component
 * 
 * Drawer para mostrar detalle del post y comentarios
 * Se abre al hacer click en el icono de comentarios del PostCard
 */
export function PostDetailDrawer({ post, open, onOpenChange, onCommentsCountChange }: PostDetailDrawerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const isLost = post.type === 'lost';
  const currentImage = post.images[currentImageIndex];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[95vh] p-0 overflow-hidden flex flex-col rounded-t-2xl"
      >
        {/* Header con título del post */}
        <SheetHeader className="px-4 py-3 border-b bg-white sticky top-0 z-10 flex-shrink-0 rounded-t-2xl">
          <div className="flex items-center justify-between gap-3">
            {/* Título del post - alineado a la izquierda */}
            <SheetTitle className="text-base font-semibold text-left line-clamp-1 flex-1 pr-2" style={{ color: '#111827' }}>
              {post.title}
            </SheetTitle>
            
            {/* Botón cerrar personalizado - oculta el del Sheet */}
            <button 
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0 z-[60]"
              aria-label="Cerrar"
            >
              <X className="h-[18px] w-[18px] text-gray-700" strokeWidth={2} />
            </button>
          </div>
        </SheetHeader>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {/* Sección 1: Descripción del Post */}
            <div className="px-4 py-4 bg-white border-b">
              {post.description && (
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-normal" style={{ color: '#000000', fontWeight: 500 }}>
                  {post.description}
                </p>
              )}
              {!post.description && (
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-normal text-red-600">
                  [Sin descripción]
                </p>
              )}

              {/* Info adicional */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs" style={{ color: '#6b7280' }}>
                {/* Ubicación */}
                {post.location && (post.location.city || post.location.address) && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {post.location.city && post.location.country
                        ? `${post.location.city}, ${post.location.country}`
                        : post.location.address || post.location.city}
                    </span>
                  </div>
                )}

                {/* Fecha */}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {format(new Date(post.createdAt), "d 'de' MMM, yyyy", {
                      locale: es,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Sección 2: Imagen(es) del Post */}
            {post.images && post.images.length > 0 && (
              <div className="bg-gray-100">
                {/* Imagen principal */}
                <div className="relative w-full aspect-video bg-gray-900">
                  <Image
                    src={currentImage.url}
                    alt={post.title}
                    fill
                    className="object-contain"
                    priority
                  />
                  
                  {/* Ribbon de "ENCONTRADO" cuando type es found */}
                  {post.type === 'found' && (
                    <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden pointer-events-none z-20">
                      <div 
                        className="absolute transform rotate-45 text-white text-center font-black uppercase tracking-wider shadow-2xl"
                        style={{
                          top: '28px',
                          right: '-42px',
                          width: '180px',
                          padding: '10px 0',
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          fontSize: '14px',
                          letterSpacing: '2px',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.4), inset 0 -2px 5px rgba(0,0,0,0.2)',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderBottom: '3px solid rgba(0,0,0,0.2)'
                        }}
                      >
                        ✓ ENCONTRADO
                      </div>
                    </div>
                  )}
                </div>

                {/* Miniaturas (si hay más de 1 imagen) */}
                {post.images.length > 1 && (
                  <div className="p-3 flex gap-2 overflow-x-auto bg-white border-b">
                    {post.images.map((image, index) => (
                      <button
                        key={image.publicId}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          'relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all',
                          currentImageIndex === index
                            ? 'border-[#001D68] scale-105'
                            : 'border-gray-200 opacity-60 hover:opacity-100'
                        )}
                      >
                        <Image
                          src={image.url}
                          alt={`Imagen ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sección 3: Info de la Publicación (Badges y Autor) */}
            <div className="px-4 py-3 bg-white border-b">
              <div className="flex items-start gap-2 flex-wrap mb-3">
                {/* Badge de tipo - Solo mostrar si es LOST (found tiene ribbon) */}
                {post.type === 'lost' && (
                  <Badge
                    className="text-xs font-bold px-3 py-1 bg-[#CE1126] text-white shadow-sm"
                  >
                    🔍 PERDIDO
                  </Badge>
                )}

                {/* Badge de categoría */}
                {post.category && (
                  <Badge variant="outline" className="text-xs font-medium border-gray-300 bg-white text-gray-700">
                    📦 {post.category}
                  </Badge>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <>
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-medium bg-gray-100 text-gray-600"
                      >
                        #{tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs font-medium bg-gray-100 text-gray-600">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </>
                )}
              </div>

              {/* Autor */}
              <div className="flex items-center gap-3">
                {post.userId.image ? (
                  <div 
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      overflow: 'hidden', 
                      flexShrink: 0,
                      backgroundColor: '#e5e7eb',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={post.userId.image}
                      alt={post.userId.name}
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        display: 'block'
                      }}
                    />
                  </div>
                ) : (
                  <div 
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(0, 29, 104, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#001D68' }}>
                      {post.userId.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#111827' }}>
                    {post.userId.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Sección 4: Comentarios */}
            <div className="px-4 py-6 bg-gray-50">
              <CommentList 
                postId={post._id} 
                initialCommentsCount={post.commentsCount}
                onCommentsCountChange={onCommentsCountChange}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
