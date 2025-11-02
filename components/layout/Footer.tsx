import Link from 'next/link';
import { LaSalleBadge } from './LaSalleLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Acerca de */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">
              Acerca de LostConnect
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Red social para recuperar objetos perdidos mediante la colaboración
              comunitaria.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-[#001D68] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/me"
                  className="text-muted-foreground hover:text-[#001D68] transition-colors"
                >
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link
                  href="/post/new"
                  className="text-muted-foreground hover:text-[#001D68] transition-colors"
                >
                  Publicar
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">
              Recursos
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/docs/GETTING_STARTED"
                  className="text-muted-foreground hover:text-[#001D68] transition-colors"
                >
                  Guía de Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/CONTEXT"
                  className="text-muted-foreground hover:text-[#001D68] transition-colors"
                >
                  Documentación
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/erdnando/lostconnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#001D68] transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Institucional */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">
              Institucional
            </h3>
            <div className="space-y-3">
              <LaSalleBadge />
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Proyecto educativo desarrollado por estudiantes de Preparatoria
                La Salle Nezahualcóyotl.
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {currentYear} LostConnect. Todos los derechos reservados.
            </p>

            {/* Valores Lasallistas */}
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="hidden sm:inline">Valores Lasallistas:</span>
              <span className="font-medium text-[#001D68]">Fe</span>
              <span>•</span>
              <span className="font-medium text-[#001D68]">Fraternidad</span>
              <span>•</span>
              <span className="font-medium text-[#001D68]">Servicio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
