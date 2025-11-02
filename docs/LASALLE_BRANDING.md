# 🎨 Identidad Visual La Salle

## Colores Institucionales

Según el Manual de Identidad Corporativa de Universidad La Salle Nezahualcóyotl:

### Paleta de Colores Principal

#### Rojo La Salle
- **PANTONE**: 186 C
- **CMYK**: C 0 / M 100 / Y 81 / K 3
- **RGB**: R 206 / G 17 / B 38
- **HEX**: `#CE1126`
- **Uso**: Color principal institucional, elementos destacados, CTAs

#### Azul La Salle
- **PANTONE**: 2755 C
- **CMYK**: C 100 / M 90 / Y 0 / K 26
- **RGB**: R 0 / G 29 / B 104
- **HEX**: `#001D68`
- **Uso**: Color secundario, fondos, encabezados

#### Gris La Salle
- **PANTONE**: 2758 C al 50%
- **CMYK**: C 50 / M 40 / Y 0 / K 13
- **RGB**: R 128 / G 136 / B 168
- **HEX**: `#8088A8`
- **Uso**: Color terciario, textos secundarios, bordes

### Valores CSS

```css
:root {
  /* Colores Institucionales La Salle */
  --lasalle-red: #CE1126;
  --lasalle-blue: #001D68;
  --lasalle-gray: #8088A8;
  
  /* Variantes de Rojo */
  --lasalle-red-light: #E63946;
  --lasalle-red-dark: #A00F1E;
  --lasalle-red-50: rgba(206, 17, 38, 0.5);
  --lasalle-red-10: rgba(206, 17, 38, 0.1);
  
  /* Variantes de Azul */
  --lasalle-blue-light: #1A3D8F;
  --lasalle-blue-dark: #000D34;
  --lasalle-blue-50: rgba(0, 29, 104, 0.5);
  --lasalle-blue-10: rgba(0, 29, 104, 0.1);
  
  /* Variantes de Gris */
  --lasalle-gray-light: #B0B5C8;
  --lasalle-gray-dark: #606888;
  --lasalle-gray-50: rgba(128, 136, 168, 0.5);
  --lasalle-gray-10: rgba(128, 136, 168, 0.1);
}
```

### Uso en Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'lasalle': {
          red: {
            DEFAULT: '#CE1126',
            light: '#E63946',
            dark: '#A00F1E',
          },
          blue: {
            DEFAULT: '#001D68',
            light: '#1A3D8F',
            dark: '#000D34',
          },
          gray: {
            DEFAULT: '#8088A8',
            light: '#B0B5C8',
            dark: '#606888',
          }
        }
      }
    }
  }
}
```

## Logo Universidad La Salle Nezahualcóyotl

### Ubicaciones del Logo en la Aplicación

1. **Footer**: Discreto, tamaño pequeño (24-32px altura)
2. **About/Acerca de**: Sección institucional
3. **Página de Login**: Identidad institucional
4. **Metadata**: Favicon y Open Graph

### Reglas de Uso del Logo

- **Espacio de respiro**: Mínimo 20% del ancho del logo
- **Tamaño mínimo**: 80px de ancho en digital
- **Fondos permitidos**: Blanco, gris claro, azul La Salle
- **No distorsionar**: Mantener proporciones originales
- **Versiones**:
  - Logo horizontal (principal)
  - Logo vertical (espacios reducidos)
  - Versión en negativo (fondos oscuros)

## Tipografía Institucional

### Indivisa Font

- **Familia principal**: Indivisa Text Sans
- **Usos**:
  - Títulos: Indivisa Text Sans Bold (700)
  - Subtítulos: Indivisa Text Sans Regular (400)
  - Cuerpo: Indivisa Text Sans Light (300)
  - Énfasis: Indivisa Text Sans Black (900)

- **Familia secundaria**: Indivisa Text Serif
- **Usos**:
  - Contenido editorial
  - Citas destacadas
  - Textos largos

## Aplicación en LostConnect

### Elementos con Branding La Salle

1. **Botones principales**: Rojo La Salle (`#CE1126`)
2. **Links y vínculos**: Azul La Salle (`#001D68`)
3. **Textos secundarios**: Gris La Salle (`#8088A8`)
4. **Hover states**: Variantes light/dark
5. **Badges institucionales**: Combinación rojo + azul
6. **Footer branding**: Logo + colores institucionales

### Modo Oscuro

```css
:root[data-theme="dark"] {
  /* Ajustes para modo oscuro */
  --lasalle-red: #E63946;
  --lasalle-blue: #3D5FA8;
  --lasalle-gray: #B0B5C8;
}
```

## Referencias

- Manual de Identidad Corporativa Universidad La Salle Nezahualcóyotl
- Indivisa Font: https://indivisafont.org/
- Sitio oficial: https://ulsaneza.edu.mx/
