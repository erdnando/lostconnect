/**
 * Utilidades de colores institucionales La Salle
 * Para usar en componentes y estilos de la aplicación
 */

export const lasalleColors = {
  // Rojo La Salle - PANTONE 186 C
  red: {
    DEFAULT: '#CE1126',
    light: '#E63946',
    dark: '#A00F1E',
    rgb: 'rgb(206, 17, 38)',
    rgba: (opacity: number) => `rgba(206, 17, 38, ${opacity})`,
  },
  
  // Azul La Salle - PANTONE 2755 C
  blue: {
    DEFAULT: '#001D68',
    light: '#1A3D8F',
    dark: '#000D34',
    rgb: 'rgb(0, 29, 104)',
    rgba: (opacity: number) => `rgba(0, 29, 104, ${opacity})`,
  },
  
  // Gris La Salle - PANTONE 2758 C al 50%
  gray: {
    DEFAULT: '#8088A8',
    light: '#B0B5C8',
    dark: '#606888',
    rgb: 'rgb(128, 136, 168)',
    rgba: (opacity: number) => `rgba(128, 136, 168, ${opacity})`,
  },
} as const;

/**
 * Clases CSS de Tailwind para colores La Salle
 * Usar en className de componentes
 */
export const lasalleClasses = {
  // Backgrounds
  bg: {
    red: 'bg-[#CE1126] hover:bg-[#A00F1E]',
    redLight: 'bg-[#E63946] hover:bg-[#CE1126]',
    blue: 'bg-[#001D68] hover:bg-[#1A3D8F]',
    blueLight: 'bg-[#1A3D8F] hover:bg-[#001D68]',
    gray: 'bg-[#8088A8] hover:bg-[#606888]',
  },
  
  // Textos
  text: {
    red: 'text-[#CE1126]',
    blue: 'text-[#001D68]',
    gray: 'text-[#8088A8]',
  },
  
  // Bordes
  border: {
    red: 'border-[#CE1126]',
    blue: 'border-[#001D68]',
    gray: 'border-[#8088A8]',
  },
  
  // Botones con hover
  button: {
    primary: 'bg-[#CE1126] hover:bg-[#A00F1E] text-white',
    secondary: 'bg-[#001D68] hover:bg-[#1A3D8F] text-white',
    outline: 'border-2 border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white',
  },
  
  // Links
  link: 'text-[#001D68] hover:text-[#1A3D8F] underline-offset-4 hover:underline',
} as const;

/**
 * Variantes de componentes con branding La Salle
 */
export type LaSalleVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export const getLaSalleVariantClasses = (variant: LaSalleVariant): string => {
  const variants = {
    primary: 'bg-[#CE1126] hover:bg-[#A00F1E] text-white shadow-md hover:shadow-lg',
    secondary: 'bg-[#001D68] hover:bg-[#1A3D8F] text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white',
    ghost: 'text-[#001D68] hover:bg-[#001D68]/10',
  };
  
  return variants[variant];
};

/**
 * Gradientes con colores La Salle
 */
export const lasalleGradients = {
  redBlue: 'bg-gradient-to-r from-[#CE1126] to-[#001D68]',
  blueRed: 'bg-gradient-to-r from-[#001D68] to-[#CE1126]',
  redLight: 'bg-gradient-to-br from-[#CE1126] to-[#E63946]',
  blueLight: 'bg-gradient-to-br from-[#001D68] to-[#1A3D8F]',
} as const;
