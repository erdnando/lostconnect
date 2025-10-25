# 🔍 LostConnect - Red Social de Objetos Perdidos

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

### Backend
- **Next.js API Routes** - Backend serverless
- **NextAuth.js** - Autenticación
- **MongoDB + Mongoose** - Base de datos NoSQL
- **Cloudinary** - CDN para imágenes

### Infrastructure
- **Vercel** - Deployment y hosting
- **MongoDB Atlas** - Base de datos en la nube

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

**👉 [INDEX.md](./INDEX.md) - Índice completo de toda la documentación**

Documentos principales:
- **[PLAN_MAESTRO.md](./PLAN_MAESTRO.md)** ⭐ - Plan estratégico completo (arquitectura, API, diagramas, etc.)
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Guía rápida de inicio (5 minutos)
- **[VISUAL_SUMMARY.md](./VISUAL_SUMMARY.md)** - Resumen visual del proyecto
- **[ESTRUCTURA.md](./ESTRUCTURA.md)** - Estructura de carpetas detallada
- **[ROADMAP.md](./ROADMAP.md)** - Plan de desarrollo por sprints
- **[CHECKLIST.md](./CHECKLIST.md)** - Lista de tareas del MVP
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Solución de problemas comunes

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

Este proyecto es para uso académico.

## 👥 Equipo

Proyecto escolar desarrollado como parte de un curso universitario.

## 🙏 Agradecimientos

- Next.js Team por el excelente framework
- shadcn por los componentes UI
- Vercel por el hosting gratuito
- MongoDB Atlas por la base de datos

---

**🔗 Links Útiles:**
- [Documentación de Next.js](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

_Hecho con ❤️ para ayudar a las personas a recuperar sus objetos perdidos_
