'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { Button } from '@/components/ui/button';

/**
 * Props del componente CommentList
 */
interface CommentListProps {
  postId: string;
  initialCommentsCount?: number;
  onCommentsCountChange?: (newCount: number) => void;
}

/**
 * Interface para comentarios con replies cargados
 */
interface CommentWithReplies {
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
  replies?: CommentWithReplies[];
  showReplies?: boolean;
}

/**
 * CommentList Component
 * 
 * Lista de comentarios con soporte para replies anidados
 */
export function CommentList({ postId, initialCommentsCount = 0, onCommentsCountChange }: CommentListProps) {
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localCommentsCount, setLocalCommentsCount] = useState(initialCommentsCount);

  // Estado para reply
  const [replyingTo, setReplyingTo] = useState<{
    commentId: string;
    userId: string;
    userName: string;
  } | null>(null);

  /**
   * Cargar comentarios iniciales
   */
  const loadComments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/comments?postId=${postId}&limit=10`);

      if (!response.ok) {
        throw new Error('Error al cargar los comentarios');
      }

      const data = await response.json();

      setComments(data.comments || []);
      setHasMore(data.pagination?.hasMore || false);
      setCursor(data.pagination?.nextCursor || null);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar los comentarios');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cargar más comentarios
   */
  const loadMoreComments = async () => {
    if (!cursor || isLoadingMore) return;

    try {
      setIsLoadingMore(true);

      const response = await fetch(`/api/comments?postId=${postId}&limit=10&cursor=${cursor}`);

      if (!response.ok) {
        throw new Error('Error al cargar más comentarios');
      }

      const data = await response.json();

      setComments([...comments, ...(data.comments || [])]);
      setHasMore(data.pagination?.hasMore || false);
      setCursor(data.pagination?.nextCursor || null);
    } catch (err) {
      console.error('Error al cargar más comentarios:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  /**
   * Cargar replies de un comentario
   */
  const loadReplies = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}&parentCommentId=${commentId}&limit=20`);

      if (!response.ok) {
        throw new Error('Error al cargar las respuestas');
      }

      const data = await response.json();

      // Actualizar el comentario con sus replies
      setComments(comments.map(comment => {
        if (comment._id === commentId) {
          return {
            ...comment,
            replies: data.comments || [],
            showReplies: true,
          };
        }
        return comment;
      }));
    } catch (err) {
      console.error('Error al cargar replies:', err);
    }
  };

  /**
   * Toggle replies
   */
  const toggleReplies = (commentId: string) => {
    const comment = comments.find(c => c._id === commentId);

    if (!comment) return;

    if (comment.replies && comment.replies.length > 0) {
      // Si ya están cargados, solo toggle
      setComments(comments.map(c => {
        if (c._id === commentId) {
          return { ...c, showReplies: !c.showReplies };
        }
        return c;
      }));
    } else {
      // Si no están cargados, cargarlos
      loadReplies(commentId);
    }
  };

  /**
   * Manejar nuevo comentario
   */
  const handleCommentAdded = (newComment: any) => {
    // Agregar al inicio de la lista
    setComments([newComment, ...comments]);
    setReplyingTo(null);
    
    // Actualizar contador local
    const newCount = localCommentsCount + 1;
    setLocalCommentsCount(newCount);
    
    // Notificar al componente padre
    onCommentsCountChange?.(newCount);
  };

  /**
   * Manejar nuevo reply
   */
  const handleReplyAdded = (newReply: any) => {
    // Agregar el reply al comentario correspondiente
    setComments(comments.map(comment => {
      if (comment._id === newReply.parentCommentId) {
        return {
          ...comment,
          repliesCount: comment.repliesCount + 1,
          replies: comment.replies ? [newReply, ...comment.replies] : [newReply],
          showReplies: true,
        };
      }
      return comment;
    }));
    setReplyingTo(null);
  };

  /**
   * Manejar eliminación de comentario
   */
  const handleCommentDeleted = (commentId: string) => {
    setComments(comments.filter(c => c._id !== commentId));
    
    // Actualizar contador local
    const newCount = localCommentsCount - 1;
    setLocalCommentsCount(newCount);
    
    // Notificar al componente padre
    onCommentsCountChange?.(newCount);
  };

  /**
   * Manejar eliminación de reply
   */
  const handleReplyDeleted = (parentCommentId: string, replyId: string) => {
    setComments(comments.map(comment => {
      if (comment._id === parentCommentId && comment.replies) {
        return {
          ...comment,
          repliesCount: Math.max(0, comment.repliesCount - 1),
          replies: comment.replies.filter(r => r._id !== replyId),
        };
      }
      return comment;
    }));
  };

  /**
   * Effect: Cargar comentarios al montar
   */
  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-[#001D68]" />
        <h3 className="text-lg font-semibold text-gray-900">
          Comentarios ({comments.length})
        </h3>
      </div>

      {/* Formulario de nuevo comentario */}
      <CommentForm
        postId={postId}
        onCommentAdded={handleCommentAdded}
        placeholder="Escribe un comentario..."
      />

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#001D68]" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-8 text-red-600">
          {error}
        </div>
      )}

      {/* Lista de comentarios */}
      {!isLoading && comments.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-600">No hay comentarios aún</p>
          <p className="text-sm text-gray-500 mt-1">Sé el primero en comentar</p>
        </div>
      )}

      {!isLoading && comments.length > 0 && (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="space-y-4">
              {/* Comentario principal */}
              <CommentItem
                comment={comment}
                onReply={(commentId, userId, userName) => {
                  setReplyingTo({ commentId, userId, userName });
                }}
                onDelete={handleCommentDeleted}
                onLoadReplies={toggleReplies}
                showRepliesButton={true}
              />

              {/* Formulario de reply */}
              {replyingTo?.commentId === comment._id && (
                <div className="ml-11">
                  <CommentForm
                    postId={postId}
                    parentCommentId={comment._id}
                    replyToUserId={replyingTo.userId}
                    replyToUserName={replyingTo.userName}
                    onCommentAdded={handleReplyAdded}
                    onCancel={() => setReplyingTo(null)}
                    placeholder={`Responder a ${replyingTo.userName}...`}
                    autoFocus={true}
                    compact={true}
                  />
                </div>
              )}

              {/* Replies */}
              {comment.showReplies && comment.replies && comment.replies.length > 0 && (
                <div className="space-y-4 ml-11">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply._id}
                      comment={reply}
                      onDelete={(replyId) => handleReplyDeleted(comment._id, replyId)}
                      isReply={true}
                      showRepliesButton={false}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Botón cargar más */}
      {hasMore && !isLoading && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={loadMoreComments}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Cargando...
              </>
            ) : (
              'Cargar más comentarios'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
