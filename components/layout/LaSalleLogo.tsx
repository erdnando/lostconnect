import React from 'react';
import Image from 'next/image';

interface LaSalleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Logo institucional oficial de Universidad La Salle Nezahualcóyotl
 * Usa el logo oficial SVG descargado del sitio web institucional
 */
export function LaSalleLogo({
  size = 'md',
  className = '',
}: LaSalleLogoProps) {
  const heights = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const widths = {
    sm: 70,
    md: 93,
    lg: 140,
    xl: 186,
  };

  return (
    <Image
      src="/images/lasalle-logo-azul.svg"
      alt="Universidad La Salle Nezahualcóyotl"
      width={widths[size]}
      height={heights[size]}
      className={`object-contain ${className}`}
      priority
    />
  );
}

/**
 * Badge discreto con logo La Salle para footer
 */
export function LaSalleBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#001D68]/5 border border-[#001D68]/10 hover:bg-[#001D68]/10 transition-colors">
      <LaSalleLogo size="sm" />
      <div className="flex flex-col leading-none">
        <span className="text-[9px] font-medium text-[#8088A8]">Proyecto de</span>
        <span className="text-[11px] font-bold text-[#001D68]">La Salle Neza</span>
      </div>
    </div>
  );
}
