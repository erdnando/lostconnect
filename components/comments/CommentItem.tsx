'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageCircle, Trash2, MapPin, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

/**
 * Props del componente CommentItem
 */
interface CommentItemProps {
  comment: {
    _id: string;
    content: string;
    userId: {
      _id: string;
      name: string;
      email: string;
      image?: string;
    };
    replyToUserId?: {
      _id: string;
      name: string;
    };
    images?: Array<{
      url: string;
      publicId: string;
    }>;
    location?: {
      coordinates: [number, number];
      address?: string;
    };
    repliesCount: number;
    createdAt: string;
    updatedAt: string;
  };
  onReply?: (commentId: string, userId: string, userName: string) => void;
  onDelete?: (commentId: string) => void;
  onLoadReplies?: (commentId: string) => void;
  showRepliesButton?: boolean;
  isReply?: boolean;
}

/**
 * CommentItem Component
 * 
 * Muestra un comentario individual con todas sus propiedades
 */
export function CommentItem({
  comment,
  onReply,
  onDelete,
  onLoadReplies,
  showRepliesButton = true,
  isReply = false,
}: CommentItemProps) {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isOwner = session?.user?.id === comment.userId._id;

  // Formatear fecha
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: es,
  });

  /**
   * Manejar eliminación
   */
  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/comments/${comment._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al eliminar el comentario');
      }

      onDelete?.(comment._id);
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      alert(error instanceof Error ? error.message : 'Error al eliminar el comentario');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn(
      'flex gap-3 group',
      isReply && 'ml-11'
    )}>
      {/* Avatar */}
      {comment.userId.image ? (
        <div 
          style={{ 
            width: isReply ? '32px' : '40px', 
            height: isReply ? '32px' : '40px', 
            borderRadius: '50%', 
            overflow: 'hidden',
            flexShrink: 0
          }}
        >
          <img
            src={comment.userId.image}
            alt={comment.userId.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
        </div>
      ) : (
        <div className={cn(
          'rounded-full bg-[#001D68]/10 flex items-center justify-center flex-shrink-0',
          isReply ? 'w-8 h-8' : 'w-10 h-10'
        )}>
          <span className={cn('font-semibold text-[#001D68]', isReply ? 'text-sm' : 'text-base')}>
            {comment.userId.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-gray-900 text-sm">
                {comment.userId.name}
              </span>
              <span className="text-xs text-gray-500">
                {timeAgo}
              </span>
            </div>

            {/* Reply to */}
            {comment.replyToUserId && (
              <div className="text-xs text-gray-500 mt-0.5">
                respondiendo a <span className="font-medium text-[#001D68]">@{comment.replyToUserId.name}</span>
              </div>
            )}
          </div>

          {/* Menú de opciones */}
          {isOwner && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                disabled={isDeleting}
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>

              {showMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />

                  {/* Menú */}
                  <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[120px]">
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Contenido del comentario */}
        <div className="mt-1">
          <p className="text-gray-800 text-sm whitespace-pre-wrap break-words">
            {comment.content}
          </p>
        </div>

        {/* Imágenes */}
        {comment.images && comment.images.length > 0 && (
          <div className={cn(
            'mt-3 grid gap-2',
            comment.images.length === 1 && 'grid-cols-1',
            comment.images.length === 2 && 'grid-cols-2',
            comment.images.length === 3 && 'grid-cols-3'
          )}>
            {comment.images.map((img, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={img.url}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => window.open(img.url, '_blank')}
                />
              </div>
            ))}
          </div>
        )}

        {/* Ubicación */}
        {comment.location && comment.location.address && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
            <MapPin className="w-3 h-3" />
            <span>{comment.location.address}</span>
          </div>
        )}

        {/* Acciones */}
        <div className="mt-2 flex items-center gap-4">
          {/* Botón de responder */}
          {!isReply && onReply && (
            <button
              onClick={() => onReply(comment._id, comment.userId._id, comment.userId.name)}
              className="text-xs font-medium text-gray-600 hover:text-[#001D68] transition-colors"
            >
              Responder
            </button>
          )}

          {/* Botón de ver respuestas */}
          {showRepliesButton && comment.repliesCount > 0 && onLoadReplies && (
            <button
              onClick={() => onLoadReplies(comment._id)}
              className="flex items-center gap-1 text-xs font-medium text-[#001D68] hover:text-[#1A3D8F] transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              Ver {comment.repliesCount} respuesta{comment.repliesCount !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
