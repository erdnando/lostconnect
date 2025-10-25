'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * PostCardSkeleton
 * 
 * Loading skeleton para PostCard mientras cargan los datos
 */
export function PostCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Skeleton de Imagen */}
      <Skeleton className="aspect-video w-full" />

      <CardHeader className="pb-3">
        {/* Skeleton de Título */}
        <Skeleton className="h-6 w-3/4" />
        {/* Skeleton de Descripción */}
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>

      <CardContent className="pb-3">
        {/* Skeleton de Ubicación */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Skeleton de Tags */}
        <div className="flex gap-1.5 mb-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>

        {/* Skeleton de Autor */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16 ml-auto" />
        </div>
      </CardContent>

      <CardFooter className="pt-0 border-t">
        {/* Skeleton de Estadísticas */}
        <div className="flex items-center gap-4 w-full">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardFooter>
    </Card>
  );
}
