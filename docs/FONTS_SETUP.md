# 🎨 Configuración de Fuentes Indivisa

Este proyecto utiliza la tipografía **Indivisa**, la fuente corporativa oficial de la familia lasallista mundial. Esta guía te ayudará a configurar las fuentes correctamente en tu entorno de desarrollo.

---

## 📖 Sobre Indivisa Font

![Indivisa Banner](https://indivisafont.org/img/banner-indivisa.jpg)

**Indivisa** es una tipografía gratuita y de libre acceso creada para la comunidad lasallista global. Representa la unidad en la diversidad de más de 1 millón de estudiantes en 80 países.

### Características:
- ✨ **28 variantes tipográficas** (Text + Display)
- 🌍 **25,000 glifos** para 270 idiomas del alfabeto latino
- 📚 **2 familias**: Sans Serif y Serif
- 🏆 **Premio al Diseño de Comunicaciones Visuales 2018**
- 🆓 **Gratuita** para uso educativo y lasallista

---

## 📥 Descarga e Instalación

### Paso 1: Descargar las Fuentes

1. Visita la página oficial: **[https://indivisafont.org/](https://indivisafont.org/)**
2. Haz clic en la sección **"Descargas"**
3. Descarga el **"Set para aplicaciones Web"** (28 variantes en formato woff/woff2)
   - Este set incluye: `.eot`, `.otf`, `.svg`, `.ttf`, `.woff`, `.woff2`
   - Peso aproximado: ~15-20 MB

### Paso 2: Extraer los Archivos

Una vez descargado el archivo ZIP:

1. Extrae el contenido del archivo
2. Busca las carpetas con las fuentes en formato `.woff2` (preferible para web)
3. Organiza los archivos según la siguiente estructura

### Paso 3: Estructura de Carpetas

Coloca las fuentes en la siguiente estructura dentro del proyecto:

```
public/fonts/
├── indivisa-text-sans/
│   ├── IndivisaTextSans-Light.woff2
│   ├── IndivisaTextSans-LightItalic.woff2
│   ├── IndivisaTextSans-Regular.woff2
│   ├── IndivisaTextSans-Italic.woff2
│   ├── IndivisaTextSans-Bold.woff2
│   ├── IndivisaTextSans-BoldItalic.woff2
│   ├── IndivisaTextSans-Black.woff2
│   └── IndivisaTextSans-BlackItalic.woff2
│
├── indivisa-text-serif/
│   ├── IndivisaTextSerif-Light.woff2
│   ├── IndivisaTextSerif-LightItalic.woff2
│   ├── IndivisaTextSerif-Regular.woff2
│   ├── IndivisaTextSerif-Italic.woff2
│   ├── IndivisaTextSerif-Bold.woff2
│   ├── IndivisaTextSerif-BoldItalic.woff2
│   ├── IndivisaTextSerif-Black.woff2
│   └── IndivisaTextSerif-BlackItalic.woff2
│
├── indivisa-display-sans/
│   └── [Variantes Display Sans - Opcional para MVP]
│
└── indivisa-display-serif/
    └── [Variantes Display Serif - Opcional para MVP]
```

### Paso 4: Verificación

Para verificar que las fuentes están correctamente instaladas:

```powershell
# En la raíz del proyecto (PowerShell)
Get-ChildItem -Path "public\fonts\" -Recurse -Filter "*.woff2" | Select-Object Name

# Deberías ver al menos 8-16 archivos .woff2
```

---

## ⚙️ Configuración Técnica

### Archivos Ya Configurados

El proyecto ya incluye la configuración necesaria en:

1. **`app/globals.css`** - Declaraciones `@font-face`
2. **`app/layout.tsx`** - Metadata y configuración de fuentes
3. **Fallbacks** - Si no tienes las fuentes, el proyecto usará Geist Sans como respaldo

### Fuentes Utilizadas en el Proyecto

**Fuente Principal:**
- `Indivisa Text Sans` → Para cuerpo de texto, UI, botones
- Pesos: Light (300), Regular (400), Bold (700), Black (900)

**Fuente Secundaria:**
- `Indivisa Text Serif` → Para títulos, encabezados especiales
- Pesos: Regular (400), Bold (700)

**Fuente Monoespaciada:**
- `Geist Mono` → Para código, números, datos técnicos

---

## 🎨 Uso en Componentes

### Aplicación Automática

Por defecto, todo el proyecto usa `Indivisa Text Sans`:

```tsx
// Ya configurado en globals.css
body {
  font-family: var(--font-indivisa-sans);
}
```

### Uso de Serif en Componentes Específicos

Para usar la variante Serif en títulos o secciones especiales:

```tsx
<h1 className="font-serif text-4xl font-bold">
  Título con Indivisa Serif
</h1>
```

### Clases de Tailwind Disponibles

- `font-sans` → Indivisa Text Sans
- `font-serif` → Indivisa Text Serif
- `font-mono` → Geist Mono

Pesos:
- `font-light` → Light (300)
- `font-normal` → Regular (400)
- `font-bold` → Bold (700)
- `font-black` → Black (900)

---

## 🔍 Solución de Problemas

### Las fuentes no se cargan

**Problema:** Veo fuentes genéricas en vez de Indivisa.

**Solución:**
1. Verifica que los archivos `.woff2` están en `public/fonts/`
2. Revisa que los nombres de archivo coincidan exactamente
3. Reinicia el servidor de desarrollo: `npm run dev`
4. Limpia el caché del navegador (Ctrl + F5)

### Error 404 al cargar fuentes

**Problema:** En la consola del navegador veo errores 404.

**Solución:**
1. Verifica la estructura de carpetas (case-sensitive en producción)
2. Asegúrate de que las rutas en `globals.css` son correctas
3. Comprueba que los archivos existen: `ls public/fonts/indivisa-text-sans/`

### Fuentes no se ven en producción

**Problema:** Funciona en local pero no en Vercel.

**Solución:**
1. Las fuentes deben estar en el repositorio Git (no en `.gitignore`)
2. Vercel debe incluir la carpeta `public/fonts/` en el build
3. Revisa el tamaño de los archivos (límite ~25MB por deployment en Free tier)

---

## 📚 Recursos Adicionales

### Documentación Oficial
- **Web oficial:** [https://indivisafont.org/](https://indivisafont.org/)
- **Manual de usuario:** [Descargar PDF](https://indivisafont.org/descargables/Indivisa_Manual_Espanol.pdf)
- **Guía Print & Web:** [Descargar PDF](https://indivisafont.org/descargables/GUIA-PRINT-WEB_ES.pdf)

### Soporte
- **Reportar problemas con las fuentes:** [indivisafont@lasalle.org](mailto:indivisafont@lasalle.org)
- **Instagram:** [@indivisafont](https://www.instagram.com/indivisafont/)

### Términos de Uso
- Gratuita para comunidad lasallista y uso educativo
- Consulta términos en: [lasalle.mx/terminos-y-condiciones](http://www.lasalle.mx/terminos-y-condiciones/)

---

## 🚀 Modo Rápido (Sin Descargar Fuentes)

Si no puedes descargar las fuentes pero quieres trabajar en el proyecto:

### Opción 1: Usar Google Fonts Similar

Edita `app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Usar en el body:
<body className={inter.className}>
```

### Opción 2: Usar Fuentes del Sistema

Edita `app/globals.css`:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
               sans-serif;
}
```

---

## ✅ Checklist Final

Antes de hacer commit o deploy:

- [ ] Las fuentes están en `public/fonts/`
- [ ] Al menos las variantes Text Sans están instaladas
- [ ] El servidor local muestra Indivisa correctamente
- [ ] No hay errores 404 en la consola del navegador
- [ ] Los archivos `.woff2` están en Git (no ignorados)
- [ ] El proyecto se ve profesional con la identidad lasallista

---

## 🎓 Identidad Lasallista

Usar Indivisa Font en este proyecto es más que estética - es parte de nuestra identidad:

> *"En un mundo diverso, nuestra tipografía es un elemento unificador que nos permite reconocernos como parte de una gran familia, y al mismo tiempo, celebrar la diversidad."*

**Indivisa Manent** - *Permanecen Indivisos*

---

<div align="center">

**🏫 La Salle Nezahualcóyotl**  
Preparatoria / Bachillerato  
Estado de México, México

Parte de la red mundial lasallista  
**80 países** | **1,000+ instituciones** | **1 millón+ estudiantes**

</div>
