'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Send, Image as ImageIcon, MapPin, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils/cn';

/**
 * Props del componente CommentForm
 */
interface CommentFormProps {
  postId: string;
  parentCommentId?: string;
  replyToUserId?: string;
  replyToUserName?: string;
  onCommentAdded?: (comment: any) => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  compact?: boolean;
}

/**
 * CommentForm Component
 * 
 * Formulario para crear comentarios y replies
 */
export function CommentForm({
  postId,
  parentCommentId,
  replyToUserId,
  replyToUserName,
  onCommentAdded,
  onCancel,
  placeholder = 'Escribe un comentario...',
  autoFocus = false,
  compact = false,
}: CommentFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<{ coordinates: [number, number]; address?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Contador de caracteres
  const charCount = content.length;
  const maxChars = 2000;
  const isOverLimit = charCount > maxChars;

  // Validación
  const canSubmit = content.trim().length > 0 && !isOverLimit && !isSubmitting;

  /**
   * Manejar cambio de texto
   */
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setError(null);
  };

  /**
   * Manejar selección de imágenes
   */
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validar máximo 3 imágenes
    if (images.length + files.length > 3) {
      setError('Máximo 3 imágenes por comentario');
      return;
    }

    try {
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validar tamaño (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError('Las imágenes deben pesar menos de 5MB');
          continue;
        }

        // Convertir a base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        await new Promise((resolve) => {
          reader.onload = () => {
            newImages.push(reader.result as string);
            resolve(null);
          };
        });
      }

      setImages([...images, ...newImages]);
    } catch (err) {
      console.error('Error al cargar imágenes:', err);
      setError('Error al cargar las imágenes');
    }
  };

  /**
   * Eliminar imagen
   */
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /**
   * Enviar comentario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Construir el body solo con campos definidos
      const requestBody: any = {
        postId,
        content: content.trim(),
      };

      if (parentCommentId) {
        requestBody.parentCommentId = parentCommentId;
      }

      if (replyToUserId) {
        requestBody.replyToUserId = replyToUserId;
      }

      if (images.length > 0) {
        requestBody.images = images;
      }

      if (location) {
        requestBody.location = location;
      }

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Error response:', data);
        throw new Error(data.error || 'Error al crear el comentario');
      }

      const data = await response.json();

      // Limpiar formulario
      setContent('');
      setImages([]);
      setLocation(null);

      // Callback
      onCommentAdded?.(data.comment);

    } catch (err) {
      console.error('Error al enviar comentario:', err);
      setError(err instanceof Error ? err.message : 'Error al enviar el comentario');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si no hay sesión, no mostrar formulario
  if (!session) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-3', compact && 'space-y-2')}>
      {/* Header con avatar y reply info */}
      <div className="flex gap-3">
        {/* Avatar del usuario */}
        {session.user.image ? (
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
              src={session.user.image}
              alt={session.user.name || 'Usuario'}
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
              {session.user.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        )}

        {/* Campo de texto */}
        <div className="flex-1">
          {/* Info de reply */}
          {replyToUserName && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">
                Respondiendo a <span className="font-medium text-[#001D68]">@{replyToUserName}</span>
              </span>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Textarea */}
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={cn(
              'resize-none border-gray-300 focus:border-[#001D68] focus:ring-[#001D68]',
              compact ? 'min-h-[80px]' : 'min-h-[100px]'
            )}
            disabled={isSubmitting}
          />

          {/* Contador de caracteres */}
          <div className="flex items-center justify-between mt-2">
            <span className={cn(
              'text-xs',
              isOverLimit ? 'text-red-600 font-medium' : 'text-gray-500'
            )}>
              {charCount}/{maxChars}
            </span>
          </div>

          {/* Preview de imágenes */}
          {images.length > 0 && (
            <div className="flex gap-2 mt-3">
              {images.map((img, index) => (
                <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between pl-11">
        {/* Botones de acción */}
        <div className="flex items-center gap-2">
          {/* Botón de imagen */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
              disabled={isSubmitting || images.length >= 3}
            />
            <div className={cn(
              'p-2 rounded-full hover:bg-gray-100 transition-colors',
              images.length >= 3 && 'opacity-50 cursor-not-allowed'
            )}>
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </div>
          </label>

          {/* Botón de ubicación (placeholder) */}
          {/* <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            disabled={isSubmitting}
          >
            <MapPin className="w-5 h-5 text-gray-600" />
          </button> */}
        </div>

        {/* Botones de cancelar/enviar */}
        <div className="flex items-center gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}

          <Button
            type="submit"
            size="sm"
            disabled={!canSubmit}
            className="bg-[#001D68] hover:bg-[#1A3D8F] text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {parentCommentId ? 'Responder' : 'Comentar'}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
