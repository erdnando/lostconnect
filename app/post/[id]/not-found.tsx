import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <SearchX className="h-24 w-24 mx-auto text-gray-300" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Post no encontrado</h1>
        <p className="text-muted-foreground mb-6">
          Lo sentimos, no pudimos encontrar la publicación que buscas. Es posible
          que haya sido eliminada o que la URL sea incorrecta.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
