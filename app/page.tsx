import { Suspense } from 'react';
import { FeedContent } from '@/components/feed/FeedContent';
import { PostCardSkeleton } from '@/components/posts/PostCardSkeleton';

/**
 * Página principal - Feed de Posts
 * 
 * Muestra todos los posts activos ordenados por fecha
 * con infinite scroll
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Suspense fallback={<FeedLoadingSkeleton />}>
        <FeedContent />
      </Suspense>
    </div>
  );
}

/**
 * Skeleton para la carga inicial del feed
 */
function FeedLoadingSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl p-4 space-y-4">
      <div className="h-12 w-64 bg-muted rounded-lg animate-pulse mb-6" />
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}
