import { LaSalleLogo, LaSalleBadge } from '@/components/layout/LaSalleLogo';
import { lasalleColors, lasalleClasses } from '@/lib/utils/lasalle-colors';
import Link from 'next/link';

export default function BrandingPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-foreground">
            Identidad Visual La Salle
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Colores institucionales, tipografía Indivisa y elementos de branding
            de Universidad La Salle Nezahualcóyotl.
          </p>
          <Link 
            href="/"
            className={lasalleClasses.link}
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Logo Variants */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Logo Institucional</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Logo oficial de Universidad La Salle Nezahualcóyotl
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Logo en diferentes tamaños */}
            <div className="p-8 border rounded-lg bg-white space-y-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Tamaños del Logo
              </h3>
              <div className="space-y-6 flex flex-col items-start">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Small (24px)</p>
                  <LaSalleLogo size="sm" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Medium (32px)</p>
                  <LaSalleLogo size="md" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Large (48px)</p>
                  <LaSalleLogo size="lg" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Extra Large (64px)</p>
                  <LaSalleLogo size="xl" />
                </div>
              </div>
            </div>

            {/* Logo en fondos diferentes */}
            <div className="p-8 border rounded-lg space-y-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Logo en Diferentes Fondos
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white border rounded">
                  <LaSalleLogo size="md" />
                </div>
                <div className="p-4 bg-gray-100 rounded">
                  <LaSalleLogo size="md" />
                </div>
                <div className="p-4 bg-[#001D68] rounded">
                  <LaSalleLogo size="md" />
                </div>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="p-8 border rounded-lg bg-white">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">
              Badge para Footer
            </h3>
            <LaSalleBadge />
          </div>
        </section>

        {/* Colores Institucionales */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Colores Institucionales</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Paleta oficial según Manual de Identidad Corporativa
            </p>
          </div>

          {/* Rojo La Salle */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#CE1126]">
              Rojo La Salle - PANTONE 186 C
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#A00F1E] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">Dark</p>
                  <p className="text-muted-foreground">#A00F1E</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#CE1126] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">DEFAULT</p>
                  <p className="text-muted-foreground">#CE1126</p>
                  <p className="text-muted-foreground">RGB: 206, 17, 38</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#E63946] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">Light</p>
                  <p className="text-muted-foreground">#E63946</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg border-2 border-[#CE1126]" style={{ backgroundColor: lasalleColors.red.rgba(0.1) }} />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">10% Opacity</p>
                  <p className="text-muted-foreground">rgba(206, 17, 38, 0.1)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Azul La Salle */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#001D68]">
              Azul La Salle - PANTONE 2755 C
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#000D34] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">Dark</p>
                  <p className="text-muted-foreground">#000D34</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#001D68] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">DEFAULT</p>
                  <p className="text-muted-foreground">#001D68</p>
                  <p className="text-muted-foreground">RGB: 0, 29, 104</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#1A3D8F] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">Light</p>
                  <p className="text-muted-foreground">#1A3D8F</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg border-2 border-[#001D68]" style={{ backgroundColor: lasalleColors.blue.rgba(0.1) }} />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">10% Opacity</p>
                  <p className="text-muted-foreground">rgba(0, 29, 104, 0.1)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gris La Salle */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#8088A8]">
              Gris La Salle - PANTONE 2758 C al 50%
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#606888] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">Dark</p>
                  <p className="text-muted-foreground">#606888</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#8088A8] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">DEFAULT</p>
                  <p className="text-muted-foreground">#8088A8</p>
                  <p className="text-muted-foreground">RGB: 128, 136, 168</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#B0B5C8] shadow-md" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">Light</p>
                  <p className="text-muted-foreground">#B0B5C8</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg border-2 border-[#8088A8]" style={{ backgroundColor: lasalleColors.gray.rgba(0.1) }} />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">10% Opacity</p>
                  <p className="text-muted-foreground">rgba(128, 136, 168, 0.1)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Botones de Ejemplo */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Componentes con Branding</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Ejemplos de uso de colores institucionales en componentes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Botones */}
            <div className="p-8 border rounded-lg space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Botones
              </h3>
              <div className="space-y-3">
                <button className={`${lasalleClasses.button.primary} px-6 py-2 rounded-lg font-semibold transition-colors`}>
                  Botón Primario
                </button>
                <button className={`${lasalleClasses.button.secondary} px-6 py-2 rounded-lg font-semibold transition-colors`}>
                  Botón Secundario
                </button>
                <button className={`${lasalleClasses.button.outline} px-6 py-2 rounded-lg font-semibold transition-all`}>
                  Botón Outline
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="p-8 border rounded-lg space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Enlaces
              </h3>
              <div className="space-y-3">
                <p>
                  <a href="#" className={lasalleClasses.link}>
                    Enlace institucional
                  </a>
                </p>
                <p>
                  <span className={lasalleClasses.text.red}>Texto en rojo La Salle</span>
                </p>
                <p>
                  <span className={lasalleClasses.text.blue}>Texto en azul La Salle</span>
                </p>
                <p>
                  <span className={lasalleClasses.text.gray}>Texto en gris La Salle</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tipografía */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Tipografía Indivisa</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tipografía oficial Lasallista
            </p>
          </div>

          <div className="p-8 border rounded-lg space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Light (300)</p>
              <p className="text-2xl font-light">La transformación comienza con la educación</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Regular (400)</p>
              <p className="text-2xl font-normal">La transformación comienza con la educación</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Bold (700)</p>
              <p className="text-2xl font-bold">La transformación comienza con la educación</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Black (900)</p>
              <p className="text-2xl font-black">La transformación comienza con la educación</p>
            </div>
          </div>
        </section>

        {/* Valores Lasallistas */}
        <section className="p-8 border rounded-lg bg-gradient-to-br from-[#001D68] to-[#1A3D8F] text-white">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black">Valores Lasallistas</h2>
            <div className="flex flex-wrap justify-center gap-8 text-lg font-bold">
              <span>Fe</span>
              <span>•</span>
              <span>Fraternidad</span>
              <span>•</span>
              <span>Servicio</span>
              <span>•</span>
              <span>Compromiso</span>
              <span>•</span>
              <span>Justicia</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
