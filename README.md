# 🔍 LostConnect - Red Social de Objetos Perdidos

<div align="center">

![La Salle Logo](https://www.lasalle.mx/wp-content/uploads/2021/03/logo-lasalle-mexico.png)

**Proyecto Estudiantil**  
**La Salle Nezahualcóyotl**  
Preparatoria / Bachillerato

---

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Academic-orange)](LICENSE)

</div>

---

## 🎓 Sobre el Proyecto

**LostConnect** es un proyecto académico desarrollado por estudiantes de nivel preparatoria/bachillerato de **La Salle Nezahualcóyotl** como parte de su formación en desarrollo web y tecnologías de la información.

### Misión Lasallista
Este proyecto refleja los valores lasallistas de **servicio comunitario** y **solidaridad**, utilizando la tecnología para ayudar a las personas a recuperar sus objetos perdidos y fortalecer los lazos de nuestra comunidad educativa.

### Institución

**Colegio La Salle Nezahualcóyotl**
- 🏫 Nivel: Preparatoria / Bachillerato
- 📍 Ubicación: Nezahualcóyotl, Estado de México
- 🌐 Parte de la red mundial de instituciones lasallistas
- 🔗 [Red La Salle México](https://www.lasalle.mx/)

---

Una plataforma web moderna para reportar, buscar y recuperar objetos perdidos mediante una comunidad colaborativa.

## 📋 Descripción

**LostConnect** es una red social que conecta a personas que han perdido objetos con aquellos que pueden ayudar a encontrarlos. Los usuarios pueden publicar reportes con fotos, ubicación y descripción, mientras la comunidad colabora mediante comentarios, reacciones y compartiendo información.

## ✨ Features

### MVP (v1.0)
- ✅ Autenticación con Google OAuth
- ✅ Feed social de reportes
- ✅ Crear reportes con múltiples imágenes y ubicación
- ✅ Sistema de comentarios con respuestas anidadas
- ✅ Reacciones (like, helpful, found)
- ✅ Perfiles de usuario
- ✅ Diseño responsive (mobile-first)

### Roadmap (Fases Futuras)
- 🔜 Búsqueda y filtros avanzados
- 🔜 Notificaciones en tiempo real
- 🔜 Soporte para videos y audios
- 🔜 Chat directo entre usuarios
- 🔜 Mapa interactivo con geolocalización

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Componentes UI
- **React Hook Form + Zod** - Formularios y validación
- **Indivisa Font** - Tipografía corporativa lasallista

### Backend
- **Next.js API Routes** - Backend serverless
- **NextAuth.js** - Autenticación
- **MongoDB + Mongoose** - Base de datos NoSQL
- **Cloudinary** - CDN para imágenes

### Infrastructure
- **Vercel** - Deployment y hosting
- **MongoDB Atlas** - Base de datos en la nube

## 🎨 Diseño e Identidad

### Tipografía Indivisa

Este proyecto utiliza **[Indivisa](https://indivisafont.org/)**, la tipografía corporativa de la familia lasallista mundial. Indivisa representa la unidad y diversidad de la comunidad educativa lasallista presente en más de 80 países.

#### Características de Indivisa:
- ✨ 28 variantes tipográficas
- 🌍 25,000 glifos para 270 idiomas
- 📖 Familias Text (lectura) y Display (impacto)
- 🆓 Gratuita para la comunidad lasallista
- 🏆 Ganadora del Premio al Diseño de Comunicaciones Visuales 2018

#### Instalación de Fuentes

Para desarrolladores que deseen contribuir al proyecto:

1. Descarga el "Set para aplicaciones Web" desde [indivisafont.org](https://indivisafont.org/)
2. Extrae los archivos `.woff2` en `public/fonts/`
3. Sigue las instrucciones en `public/fonts/README.md`

Las fuentes Indivisa darán al proyecto la identidad visual lasallista auténtica. Si no están instaladas, el proyecto usará fuentes de respaldo del sistema.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm o yarn
- Cuenta de MongoDB Atlas
- Cuenta de Cloudinary
- Google OAuth credentials

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/lostconnect.git
cd lostconnect
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
- MongoDB URI
- NextAuth secret y URL
- Google OAuth Client ID y Secret
- Cloudinary credentials

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
network-social/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/         # Autenticación
│   │   ├── posts/        # CRUD de posts
│   │   ├── comments/     # CRUD de comentarios
│   │   ├── reactions/    # Reacciones
│   │   └── upload/       # Upload de imágenes
│   ├── post/             # Páginas de posts
│   ├── profile/          # Páginas de perfil
│   └── auth/             # Páginas de auth
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base (shadcn)
│   ├── posts/            # Componentes de posts
│   ├── comments/         # Componentes de comentarios
│   └── layout/           # Layout components
├── lib/                   # Lógica de negocio
│   ├── db/               # Conexión a MongoDB
│   ├── models/           # Modelos Mongoose
│   ├── services/         # Servicios
│   ├── utils/            # Utilidades
│   └── validations/      # Esquemas Zod
├── types/                 # TypeScript types
├── public/               # Assets estáticos
└── PLAN_MAESTRO.md       # Documentación completa
```

## 🗂️ Modelo de Datos

### Collections

- **users** - Información de usuarios
- **posts** - Reportes de objetos perdidos/encontrados
- **comments** - Comentarios y respuestas
- **reactions** - Reacciones a posts

Ver el `PLAN_MAESTRO.md` para esquemas detallados.

## 🎨 UI/UX

- **Mobile-first**: Diseñado primero para dispositivos móviles
- **Accesible**: Cumple estándares WCAG
- **Intuitivo**: Navegación simple y clara
- **Moderno**: Diseño limpio con Tailwind CSS

## 📚 Documentación

**👉 [INDEX.md](./docs/INDEX.md) - Índice completo de toda la documentación**

Documentos principales:
- **[PLAN_MAESTRO.md](./docs/PLAN_MAESTRO.md)** ⭐ - Plan estratégico completo (arquitectura, API, diagramas, etc.)
- **[GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - Guía rápida de inicio (5 minutos)
- **[VISUAL_SUMMARY.md](./docs/VISUAL_SUMMARY.md)** - Resumen visual del proyecto
- **[ESTRUCTURA.md](./docs/ESTRUCTURA.md)** - Estructura de carpetas detallada
- **[ROADMAP.md](./docs/ROADMAP.md)** - Plan de desarrollo por sprints
- **[CHECKLIST.md](./docs/CHECKLIST.md)** - Lista de tareas del MVP
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - Solución de problemas comunes

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm test

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📦 Deployment

### Vercel (Recomendado)

1. Push a GitHub
2. Conectar repo en [Vercel](https://vercel.com)
3. Configurar variables de entorno
4. Deploy automático

```bash
# O usando Vercel CLI
npm install -g vercel
vercel
```

## 🤝 Contribuir

Este es un proyecto académico, pero las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es para uso académico y educativo bajo los principios de la comunidad lasallista.

## 👥 Equipo

### Desarrolladores
Estudiantes de Preparatoria / Bachillerato  
**La Salle Nezahualcóyotl**  
Estado de México, México

### Agradecimientos Especiales

**Comunidad Lasallista**
- A San Juan Bautista De La Salle, fundador de las Escuelas Cristianas
- A los Hermanos de La Salle por su dedicación a la educación
- Al equipo de diseño de Indivisa Font por crear una tipografía para toda la familia lasallista

**Institucional**
- La Salle Nezahualcóyotl
- Red La Salle México
- Universidad La Salle México

**Valores Lasallistas en este Proyecto:**
- 🤝 **Solidaridad**: Ayudar a recuperar objetos perdidos
- 🌟 **Servicio**: Crear una herramienta útil para la comunidad
- 💡 **Innovación**: Usar tecnología para resolver problemas reales
- 🎓 **Educación**: Aprender haciendo, desarrollando un proyecto real

---

## 🌐 Red Lasallista Mundial

La Salle está presente en más de **80 países** con:
- 🏫 1,000+ instituciones educativas
- 👨‍🎓 1 millón+ de estudiantes
- 👨‍🏫 90,000+ educadores
- 🌍 5 continentes

Este proyecto se desarrolla bajo el lema lasallista:  
**"Indivisa Manent"** - *Permanecen Indivisos*

---

## 🔗 Enlaces Importantes

### Comunidad Lasallista
- [La Salle México](https://www.lasalle.mx/)
- [La Salle Mundial](https://www.lasalle.org/)
- [Indivisa Font](https://indivisafont.org/)

### Proyecto
- [Documentación de Next.js](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Tecnologías Utilizadas
- Next.js Team por el excelente framework
- shadcn por los componentes UI
- Vercel por el hosting gratuito
- MongoDB Atlas por la base de datos
- Universidad La Salle México por Indivisa Font

---

<div align="center">

### � En memoria de San Juan Bautista De La Salle
**Fundador de las Escuelas Cristianas**  
*"Entrégate a Dios, sé lleno de fe, y Él te dará todo lo que necesitas"*

---

**Indivisa Manent** ✨ *Permanecen Indivisos*

---

_Hecho con ❤️ por estudiantes lasallistas_  
_Para servir a nuestra comunidad_

**La Salle Nezahualcóyotl** | Preparatoria  
Estado de México, México 🇲🇽

</div>
