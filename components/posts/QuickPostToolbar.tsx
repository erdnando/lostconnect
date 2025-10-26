'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Edit3 } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Props del QuickPostToolbar
 */
interface QuickPostToolbarProps {
  onOpenCreatePost: () => void;
}

/**
 * QuickPostToolbar
 * 
 * Componente estilo Facebook para iniciar la creación de un post.
 * Muestra avatar + input fake que abre el modal de creación.
 * 
 * @example
 * <QuickPostToolbar onOpenCreatePost={() => setShowDrawer(true)} />
 */
export function QuickPostToolbar({ onOpenCreatePost }: QuickPostToolbarProps) {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-3">
        {/* Avatar del usuario */}
        <div className="flex-shrink-0">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'Usuario'}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {session.user.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
        </div>

        {/* Input fake (solo visual) */}
        <button
          onClick={onOpenCreatePost}
          className="flex-1 text-left px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 text-sm"
        >
          ¿Perdiste o encontraste algo?
        </button>

        {/* Botón de post con ícono */}
        <button
          onClick={onOpenCreatePost}
          className="flex-shrink-0 p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white"
          aria-label="Crear publicación"
        >
          <Edit3 className="h-5 w-5" />
        </button>
      </div>
    </Card>
  );
}
