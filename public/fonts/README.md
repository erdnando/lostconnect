# Fuentes Indivisa - ✅ INSTALADAS

Este proyecto utiliza la tipografía **Indivisa**, la fuente corporativa de la familia lasallista mundial.

## ✅ Estado: Fuentes Instaladas y Configuradas

Las fuentes Indivisa ya están descargadas e integradas en el proyecto.

## 📂 Estructura Actual

```
public/fonts/
├── woff2/                      # Fuentes principales (formato moderno)
│   ├── indivisa_text_sans-light.woff2
│   ├── indivisa_text_sans-regular.woff2
│   ├── indivisa_text_sans-bold.woff2
│   ├── indivisa_text_sans-black.woff2
│   ├── indivisa_text_serif_light.woff2
│   ├── indivisa_text_serif_regular.woff2
│   ├── indivisa_text_serif_bold.woff2
│   ├── indivisa_text_serif_black.woff2
│   └── [+ variantes italic y display]
├── woff/                       # Respaldo formato WOFF
├── ttf/                        # TrueType (para diseñadores)
├── otf/                        # OpenType (para diseñadores)
└── README.md                   # Este archivo
```

## 🎨 Fuentes Configuradas

### Indivisa Text Sans (Fuente Principal)
- **Light (300)**: Textos ligeros
- **Regular (400)**: Texto normal del cuerpo
- **Bold (700)**: Énfasis y botones
- **Black (900)**: Títulos destacados

### Indivisa Text Serif (Fuente Secundaria)
- **Light (300)**: Títulos elegantes
- **Regular (400)**: Encabezados con serifas
- **Bold (700)**: Títulos prominentes
- **Black (900)**: Impacto visual máximo

Todas incluyen variantes **italic** (cursiva).

## 💻 Uso en el Código

### Aplicación Automática
```tsx
// Por defecto, todo el body usa Indivisa Text Sans
<p>Este texto usa Indivisa Text Sans</p>
```

### Clases de Tailwind
```tsx
// Sans Serif (default)
<div className="font-sans">Texto con Indivisa Sans</div>

// Serif para títulos
<h1 className="font-serif text-4xl font-bold">
  Título con Indivisa Serif
</h1>

// Diferentes pesos
<p className="font-light">Texto ligero (300)</p>
<p className="font-normal">Texto normal (400)</p>
<p className="font-bold">Texto bold (700)</p>
<p className="font-black">Texto black (900)</p>

// Cursiva
<p className="italic">Texto en cursiva</p>
```

## 🔧 Configuración Técnica

### Archivos Configurados

1. **`app/globals.css`** - Declaraciones @font-face
   - Define todas las variantes de peso
   - Incluye versiones italic
   - Rutas a /fonts/woff2/ y /fonts/woff/

2. **`app/layout.tsx`** - Metadata actualizado
   - Título incluye "La Salle Nezahualcóyotl"
   - Descripción con identidad lasallista

3. **Variables CSS**
   ```css
   :root {
     --font-indivisa-sans: 'Indivisa Text Sans', -apple-system, ...;
     --font-indivisa-serif: 'Indivisa Text Serif', Georgia, ...;
   }
   ```

## 🎯 Verificación

Para verificar que las fuentes están cargando:

1. **Abre el navegador**: http://localhost:3000
2. **Inspecciona** (F12) > Pestaña Network > Filter "font"
3. **Deberías ver**: indivisa_text_sans-regular.woff2 (200 OK)
4. **Aplica estilos**: Usa la consola para verificar:
   ```javascript
   window.getComputedStyle(document.body).fontFamily
   // Debería mostrar: "Indivisa Text Sans", ...
   ```

## 📊 Pesos de Archivos

| Formato | Peso Aproximado por Variante |
|---------|------------------------------|
| WOFF2   | ~40-60 KB (óptimo para web) |
| WOFF    | ~60-80 KB (respaldo)         |
| TTF     | ~100-150 KB                  |
| OTF     | ~100-150 KB                  |

**Total descargado**: ~150-200 KB (solo woff2 necesarios)

## 🚀 Performance

- ✅ **font-display: swap** - Muestra texto inmediatamente con fuente de respaldo
- ✅ **Formatos modernos primero** - woff2 se carga primero (mejor compresión)
- ✅ **Lazy loading** - Solo se descargan las variantes usadas
- ✅ **Cacheo del navegador** - Las fuentes se cachean automáticamente

## 🌐 Compatibilidad

| Navegador | WOFF2 | WOFF | Fallback |
|-----------|-------|------|----------|
| Chrome 36+ | ✅ | ✅ | - |
| Firefox 39+ | ✅ | ✅ | - |
| Safari 10+ | ✅ | ✅ | - |
| Edge 14+ | ✅ | ✅ | - |
| IE 11 | ❌ | ✅ | System fonts |

## 📚 Recursos

- **Sitio oficial**: https://indivisafont.org/
- **Manual de usuario**: [PDF](https://indivisafont.org/descargables/Indivisa_Manual_Espanol.pdf)
- **Instagram**: [@indivisafont](https://www.instagram.com/indivisafont/)
- **Soporte**: indivisafont@lasalle.org

## 🎓 Sobre Indivisa

> *"En un mundo diverso, nuestra tipografía es un elemento unificador que nos permite reconocernos como parte de una gran familia, y al mismo tiempo, celebrar la diversidad."*

**Indivisa** representa a más de 1 millón de estudiantes lasallistas en 80 países, con 25,000 glifos que soportan 270 idiomas.

### Premios
🏆 Premio al Ganador Absoluto en Diseño de Comunicaciones Visuales 2018  
🏆 Mejor Proyecto - Publicaciones Editoriales 2018

---

## ✅ Checklist de Integración

- [x] Fuentes descargadas (woff2, woff, ttf, otf)
- [x] @font-face declarados en globals.css
- [x] Variables CSS configuradas
- [x] Fallbacks definidos
- [x] Layout actualizado con metadata lasallista
- [x] Documentación README actualizada
- [x] Servidor de desarrollo corriendo

---

<div align="center">

**Indivisa Manent** ✨ *Permanecen Indivisos*

**La Salle Nezahualcóyotl**  
Preparatoria / Bachillerato  
Estado de México 🇲🇽

Parte de la familia lasallista mundial desde 1680

</div>
