# 📁 Estructura de Archivos del Proyecto

Este documento describe la organización y propósito de cada carpeta y archivo clave en el proyecto.

## 🏗️ Arquitectura de Carpetas

```
network-social/
│
├── 📁 app/                          # Next.js App Router (v13+)
│   ├── 📁 api/                      # API Routes (Backend)
│   │   ├── 📁 auth/                 # Endpoints de autenticación
│   │   │   └── [...nextauth]/      # NextAuth.js configuration
│   │   │       └── route.ts
│   │   ├── 📁 posts/                # CRUD de posts
│   │   │   ├── route.ts             # GET (list), POST (create)
│   │   │   └── [id]/
│   │   │       └── route.ts         # GET, PATCH, DELETE
│   │   ├── 📁 comments/             # Sistema de comentarios
│   │   │   ├── route.ts             # GET, POST
│   │   │   └── [id]/
│   │   │       └── route.ts         # DELETE
│   │   ├── 📁 reactions/            # Reacciones (likes, etc.)
│   │   │   └── route.ts
│   │   └── 📁 upload/               # Upload de imágenes
│   │       └── route.ts
│   │
│   ├── 📁 post/                     # Páginas de posts
│   │   ├── 📁 new/                  # Crear nuevo post
│   │   │   └── page.tsx
│   │   └── 📁 [id]/                 # Detalle de post
│   │       └── page.tsx
│   │
│   ├── 📁 profile/                  # Perfiles de usuario
│   │   ├── 📁 me/                   # Mi perfil
│   │   │   └── page.tsx
│   │   └── 📁 [userId]/             # Perfil público
│   │       └── page.tsx
│   │
│   ├── 📁 auth/                     # Páginas de autenticación
│   │   ├── 📁 signin/
│   │   │   └── page.tsx
│   │   └── 📁 error/
│   │       └── page.tsx
│   │
│   ├── page.tsx                     # Home (Feed principal)
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Estilos globales
│
├── 📁 components/                   # Componentes React reutilizables
│   ├── 📁 ui/                       # Componentes UI base (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── avatar.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   │
│   ├── 📁 posts/                    # Componentes de posts
│   │   ├── PostCard.tsx             # Tarjeta de post en feed
│   │   ├── PostDetail.tsx           # Vista detallada
│   │   ├── PostForm.tsx             # Formulario crear/editar
│   │   ├── PostGallery.tsx          # Galería de imágenes
│   │   └── PostActions.tsx          # Acciones (edit, delete)
│   │
│   ├── 📁 comments/                 # Componentes de comentarios
│   │   ├── CommentList.tsx          # Lista de comentarios
│   │   ├── CommentItem.tsx          # Comentario individual
│   │   ├── CommentForm.tsx          # Formulario de comentario
│   │   ├── ReplyButton.tsx          # Botón responder
│   │   └── CommentThread.tsx        # Hilo de respuestas
│   │
│   ├── 📁 layout/                   # Componentes de layout
│   │   ├── Navbar.tsx               # Barra de navegación
│   │   ├── BottomNav.tsx            # Nav móvil (inferior)
│   │   ├── Sidebar.tsx              # Sidebar (futuro)
│   │   └── Footer.tsx               # Footer
│   │
│   └── 📁 shared/                   # Componentes compartidos
│       ├── LoadingSpinner.tsx
│       ├── ErrorMessage.tsx
│       ├── InfiniteScroll.tsx
│       └── ImageUploader.tsx
│
├── 📁 lib/                          # Lógica de negocio
│   ├── 📁 db/                       # Database
│   │   └── mongodb.ts               # Conexión a MongoDB
│   │
│   ├── 📁 models/                   # Modelos Mongoose
│   │   ├── User.ts
│   │   ├── Post.ts
│   │   ├── Comment.ts
│   │   └── Reaction.ts
│   │
│   ├── 📁 services/                 # Lógica de servicios
│   │   ├── postService.ts           # Operaciones de posts
│   │   ├── commentService.ts        # Operaciones de comentarios
│   │   ├── userService.ts           # Operaciones de usuarios
│   │   └── uploadService.ts         # Upload a Cloudinary
│   │
│   ├── 📁 utils/                    # Utilidades generales
│   │   ├── cn.ts                    # classNames utility
│   │   ├── formatDate.ts            # Formateo de fechas
│   │   ├── imageOptimizer.ts        # Optimización de imágenes
│   │   └── errorHandler.ts          # Manejo de errores
│   │
│   ├── 📁 validations/              # Esquemas de validación Zod
│   │   ├── postSchema.ts
│   │   ├── commentSchema.ts
│   │   └── userSchema.ts
│   │
│   └── 📁 auth/                     # Configuración de auth
│       ├── auth.config.ts           # NextAuth config
│       └── middleware.ts            # Auth middleware
│
├── 📁 types/                        # TypeScript Types/Interfaces
│   ├── index.ts                     # Exports centralizados
│   ├── post.ts                      # Types de Post
│   ├── comment.ts                   # Types de Comment
│   ├── user.ts                      # Types de User
│   └── api.ts                       # Types de API responses
│
├── 📁 public/                       # Assets estáticos
│   ├── 📁 images/
│   │   ├── logo.svg
│   │   └── placeholder.png
│   ├── favicon.ico
│   └── robots.txt
│
├── 📁 hooks/                        # Custom React Hooks (futuro)
│   ├── useAuth.ts
│   ├── usePosts.ts
│   └── useComments.ts
│
├── 📄 .env.example                  # Ejemplo de variables de entorno
├── 📄 .env.local                    # Variables locales (NO commitear)
├── 📄 .gitignore                    # Git ignore rules
├── 📄 .eslintrc.json                # ESLint config
├── 📄 next.config.js                # Next.js config
├── 📄 tailwind.config.ts            # Tailwind config
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 package.json                  # Dependencies
├── 📄 README.md                     # Documentación principal
├── 📄 PLAN_MAESTRO.md               # Plan estratégico completo
└── 📄 ESTRUCTURA.md                 # Este archivo
```

## 📝 Descripción de Carpetas Principales

### `/app` - Next.js App Router
Contiene todas las rutas, páginas y API endpoints. Usa el nuevo App Router de Next.js 13+.

**Subcarpetas clave:**
- `api/`: Endpoints de backend (API Routes)
- `post/`: Páginas relacionadas con posts
- `profile/`: Páginas de perfiles
- `auth/`: Páginas de autenticación

### `/components` - Componentes React
Todos los componentes reutilizables organizados por feature.

**Organización:**
- `ui/`: Componentes base de shadcn/ui
- `posts/`: Componentes específicos de posts
- `comments/`: Componentes de sistema de comentarios
- `layout/`: Componentes de estructura (navbar, footer)

### `/lib` - Lógica de Backend
Toda la lógica de negocio separada de la UI.

**Subcarpetas:**
- `db/`: Conexión a base de datos
- `models/`: Esquemas de Mongoose
- `services/`: Lógica de servicios (business logic)
- `utils/`: Funciones utilitarias
- `validations/`: Esquemas de validación con Zod

### `/types` - TypeScript Types
Definiciones de tipos e interfaces para type safety en todo el proyecto.

## 🎯 Convenciones de Nomenclatura

### Archivos y Carpetas
- **Componentes**: PascalCase (`PostCard.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Pages**: lowercase con guiones (`route.ts`, `page.tsx`)
- **Carpetas**: lowercase (`components/`, `lib/`)

### Código
- **Componentes**: PascalCase (`function PostCard()`)
- **Funciones**: camelCase (`function formatDate()`)
- **Constantes**: UPPER_SNAKE_CASE (`const MAX_IMAGES = 5`)
- **Interfaces**: PascalCase con prefijo I (`interface IUser`)
- **Types**: PascalCase (`type PostType`)

## 🔄 Flujo de Datos

```
User Interaction (components/)
        ↓
API Route (app/api/)
        ↓
Service Layer (lib/services/)
        ↓
Model/Validation (lib/models/ + lib/validations/)
        ↓
Database (MongoDB via Mongoose)
```

## 📦 Imports Organizados

Orden recomendado de imports:

```typescript
// 1. External libraries
import React from 'react';
import { NextResponse } from 'next/server';

// 2. Internal modules
import { Post } from '@/lib/models/Post';
import { postSchema } from '@/lib/validations/postSchema';

// 3. Components
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/posts/PostCard';

// 4. Utils & Helpers
import { formatDate } from '@/lib/utils/formatDate';

// 5. Types
import type { PostType } from '@/types/post';

// 6. Styles
import styles from './styles.module.css';
```

## 🛡️ Buenas Prácticas

1. **Separación de concerns**: UI en `components/`, lógica en `lib/`
2. **Single Responsibility**: Cada archivo/función hace UNA cosa
3. **DRY (Don't Repeat Yourself)**: Reutiliza código en `lib/utils/`
4. **Type Safety**: Usa TypeScript en TODOS los archivos
5. **Validación**: Server-side validation en API routes
6. **Error Handling**: Usa try-catch y error boundaries

## 🔧 Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `next.config.js` | Configuración de Next.js |
| `tailwind.config.ts` | Configuración de Tailwind |
| `tsconfig.json` | Configuración de TypeScript |
| `.eslintrc.json` | Reglas de linting |
| `package.json` | Dependencias y scripts |
| `.env.local` | Variables de entorno (local) |

## 📚 Recursos Adicionales

- Ver `PLAN_MAESTRO.md` para arquitectura completa
- Ver `README.md` para setup e instalación
- Cada carpeta importante tendrá su propio README (próximamente)

---

_Esta estructura está diseñada para escalabilidad y mantenibilidad del proyecto._
