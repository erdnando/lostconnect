'use client';

import { useState } from 'react';
import { Heart, ThumbsUp, CheckCircle } from 'lucide-react';
import { ReactionType } from '@/lib/models/Reaction';
import { cn } from '@/lib/utils/cn';

/**
 * Props del componente ReactionButton
 */
interface ReactionButtonProps {
  postId: string;
  type: ReactionType;
  count: number;
  isActive: boolean;
  onToggle: (type: ReactionType) => Promise<void>;
  disabled?: boolean;
}

/**
 * Configuración de iconos y estilos por tipo de reacción
 */
const reactionConfig = {
  like: {
    icon: Heart,
    label: 'Me gusta',
    activeColor: 'text-[#CE1126]',
    activeBg: 'bg-[#CE1126]/10 hover:bg-[#CE1126]/20',
    inactiveBg: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
    border: 'border-[#CE1126]/20',
  },
  helpful: {
    icon: ThumbsUp,
    label: 'Útil',
    activeColor: 'text-[#001D68]',
    activeBg: 'bg-[#001D68]/10 hover:bg-[#001D68]/20',
    inactiveBg: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
    border: 'border-[#001D68]/20',
  },
  found: {
    icon: CheckCircle,
    label: 'Encontrado',
    activeColor: 'text-green-600 dark:text-green-500',
    activeBg: 'bg-green-600/10 hover:bg-green-600/20',
    inactiveBg: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
    border: 'border-green-600/20',
  },
};

/**
 * ReactionButton Component
 * 
 * Botón de reacción individual con animación y estado optimista
 */
export function ReactionButton({
  postId,
  type,
  count,
  isActive,
  onToggle,
  disabled = false,
}: ReactionButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const config = reactionConfig[type];
  const Icon = config.icon;

  const handleClick = async () => {
    if (disabled || isLoading) return;

    try {
      setIsLoading(true);
      setIsAnimating(true);
      
      await onToggle(type);
      
      // Mantener animación por 300ms
      setTimeout(() => setIsAnimating(false), 300);
    } catch (error) {
      console.error(`Error al toggle ${type}:`, error);
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        'group flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'transition-all duration-200 ease-out',
        'border',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isActive ? [config.activeBg, config.border] : config.inactiveBg,
        isAnimating && 'scale-110'
      )}
      aria-label={`${config.label} - ${count}`}
      aria-pressed={isActive}
    >
      {/* Icono */}
      <Icon
        className={cn(
          'w-4 h-4 transition-all duration-200',
          isActive ? config.activeColor : 'text-gray-600 dark:text-gray-400',
          isActive && type === 'like' && 'fill-current',
          isAnimating && 'scale-125'
        )}
        strokeWidth={isActive ? 2.5 : 2}
      />

      {/* Contador */}
      <span
        className={cn(
          'text-sm font-medium transition-colors duration-200',
          isActive ? config.activeColor : 'text-gray-700 dark:text-gray-300'
        )}
      >
        {count}
      </span>

      {/* Label en hover (solo desktop) */}
      <span
        className={cn(
          'hidden xl:inline text-xs font-medium transition-opacity duration-200',
          'opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[4rem] overflow-hidden',
          'transition-all duration-300',
          isActive ? config.activeColor : 'text-gray-600 dark:text-gray-400'
        )}
      >
        {config.label}
      </span>
    </button>
  );
}

/**
 * Props del componente ReactionBar
 */
interface ReactionBarProps {
  postId: string;
  initialCounts: {
    like: number;
    helpful: number;
    found: number;
  };
  initialUserReaction: ReactionType | null;
  onReactionChange?: (counts: { like: number; helpful: number; found: number }) => void;
}

/**
 * ReactionBar Component
 * 
 * Barra con los 3 tipos de reacciones
 */
export function ReactionBar({
  postId,
  initialCounts,
  initialUserReaction,
  onReactionChange,
}: ReactionBarProps) {
  const [counts, setCounts] = useState(initialCounts);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(initialUserReaction);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleToggle = async (type: ReactionType) => {
    // Estado optimista
    const previousCounts = { ...counts };
    const previousReaction = userReaction;

    try {
      // Actualizar UI optimistamente
      const newCounts = { ...counts };
      
      if (userReaction === type) {
        // Quitar reacción
        newCounts[type] = Math.max(0, newCounts[type] - 1);
        setUserReaction(null);
      } else if (userReaction) {
        // Cambiar reacción
        newCounts[userReaction] = Math.max(0, newCounts[userReaction] - 1);
        newCounts[type] += 1;
        setUserReaction(type);
      } else {
        // Agregar reacción
        newCounts[type] += 1;
        setUserReaction(type);
      }

      setCounts(newCounts);
      onReactionChange?.(newCounts);

      // Llamada a la API
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, type }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar reacción');
      }

      const data = await response.json();

      // Actualizar con datos reales del servidor
      setCounts(data.counts);
      setUserReaction(data.userReaction);
      onReactionChange?.(data.counts);

    } catch (error) {
      console.error('Error al toggle reacción:', error);
      
      // Revertir a estado anterior en caso de error
      setCounts(previousCounts);
      setUserReaction(previousReaction);
      onReactionChange?.(previousCounts);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <ReactionButton
        postId={postId}
        type="like"
        count={counts.like}
        isActive={userReaction === 'like'}
        onToggle={handleToggle}
        disabled={isDisabled}
      />
      <ReactionButton
        postId={postId}
        type="helpful"
        count={counts.helpful}
        isActive={userReaction === 'helpful'}
        onToggle={handleToggle}
        disabled={isDisabled}
      />
      <ReactionButton
        postId={postId}
        type="found"
        count={counts.found}
        isActive={userReaction === 'found'}
        onToggle={handleToggle}
        disabled={isDisabled}
      />
    </div>
  );
}
