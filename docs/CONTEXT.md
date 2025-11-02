# 📝 Documento de Contexto - LostConnect

> **Última actualización:** 02 de Noviembre, 2025  
> **Estado del proyecto:** Fase 2 Completada + Diseño Lasallista Integrado (55% del MVP)  
> **Próximo sprint:** 3.1 - Sistema de Reacciones

---

## 🎯 Resumen Ejecutivo

**LostConnect** es una red social para reportar objetos perdidos y encontrados. Actualmente estamos en la **Semana 4 del desarrollo** con el **50% del MVP completado**.

### Estado Actual
- ✅ **Fase 1**: Setup y Autenticación - COMPLETADO
- ✅ **Fase 2**: Sistema de Posts - COMPLETADO
- ⏳ **Fase 3**: Interacciones (Reacciones + Comentarios) - SIGUIENTE
- ⏳ **Fase 4**: Perfil y Polish - PENDIENTE

---

## 🏗️ Stack Tecnológico

```yaml
Frontend:
  - Next.js: 15.0.0 (App Router, Server Components)
  - React: 19.0.0
  - TypeScript: 5.x
  - Tailwind CSS: 4.x
  - shadcn/ui: Latest
  - React Hook Form: 7.x
  - Zod: 3.x

Backend:
  - Next.js API Routes (Serverless en Vercel)
  - NextAuth.js: 5.x (Google OAuth)
  - MongoDB: 7.x (MongoDB Atlas)
  - Mongoose: 8.x

Storage:
  - Cloudinary: Imágenes (CDN + Transformaciones)

Deployment:
  - Vercel: https://lostconnect.vercel.app
  - GitHub: erdnando/lostconnect (rama main)
```

---

## 📂 Estructura del Proyecto

```
network-social/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── signin/              # Página de login
│   │   └── error/               # Errores de auth
│   ├── post/
│   │   ├── [id]/                # Detalle de post
│   │   │   └── page.tsx         # Server Component
│   │   └── new/                 # Crear post (legacy, no usado)
│   ├── api/                     # API Routes (Serverless)
│   │   ├── auth/[...nextauth]/  # NextAuth endpoints
│   │   ├── posts/               # CRUD de posts
│   │   ├── categories/          # Catálogo de categorías
│   │   └── upload/              # Upload a Cloudinary
│   ├── layout.tsx               # Layout raíz
│   └── page.tsx                 # Feed principal (/)
│
├── components/
│   ├── posts/
│   │   ├── PostCard.tsx         # Tarjeta de post en feed
│   │   ├── PostCreationDrawer.tsx  # Modal estilo Facebook ✨
│   │   └── PostDetailClient.tsx    # Cliente para detalle
│   ├── feed/
│   │   └── FeedContent.tsx      # Feed con FAB + pull-to-refresh
│   ├── ui/                      # shadcn/ui components
│   └── ...
│
├── lib/
│   ├── db/
│   │   └── mongodb.ts           # Conexión a MongoDB
│   ├── models/
│   │   ├── User.ts              # Modelo de usuario
│   │   ├── Post.ts              # Modelo de post
│   │   └── Category.ts          # Modelo de categoría
│   ├── services/
│   │   ├── postService.ts       # Lógica de negocio de posts
│   │   ├── categoryService.ts   # Lógica de categorías
│   │   └── cloudinary.ts        # Upload de imágenes
│   ├── validations/
│   │   └── postSchema.ts        # Zod schemas
│   └── utils.ts                 # Utilidades generales
│
├── types/                        # TypeScript types
├── public/                       # Assets estáticos
├── docs/                         # Documentación adicional
│
├── CHECKLIST.md                  # Checklist de tareas ⭐
├── PLAN_MAESTRO.md               # Plan completo del proyecto ⭐
├── CONTEXT.md                    # Este archivo ⭐
├── ROADMAP.md                    # Roadmap de features
├── DEPLOYMENT.md                 # Guía de deployment
└── README.md                     # Documentación principal
```

---

## 🗄️ Modelos de Datos (MongoDB)

### User
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  image?: string,
  emailVerified?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Post
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: "lost" | "found",
  title: string (5-50 caracteres),
  description: string (20-255 caracteres),
  category: string (dinámico desde DB),
  images: [{
    url: string,
    publicId: string,
    width?: number,
    height?: number
  }],
  location?: {
    type: "Point",
    coordinates: [number, number],
    address?: string
  },
  status: "active" | "resolved" | "closed",
  tags: string[],
  commentsCount: number,
  reactionsCount: {
    like: number,
    helpful: number,
    found: number
  },
  views: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Category
```typescript
{
  _id: ObjectId,
  name: string,
  slug: string (unique),
  icon?: string,
  color?: string,
  order: number,
  isActive: boolean,
  createdAt: Date
}
```

### Reaction (PRÓXIMO - Sprint 3.1)
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  postId: ObjectId (ref: Post),
  type: "like" | "helpful" | "found",
  createdAt: Date,
  
  // Índice único: userId + postId
}
```

### Comment (PRÓXIMO - Sprint 3.2)
```typescript
{
  _id: ObjectId,
  postId: ObjectId (ref: Post),
  userId: ObjectId (ref: User),
  content: string,
  parentCommentId?: ObjectId,
  replyToUserId?: ObjectId,
  images?: [{
    url: string,
    publicId: string
  }],
  location?: {
    type: "Point",
    coordinates: [number, number],
    address?: string
  },
  repliesCount: number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Features Implementadas (Fase 2 ✅)

### Autenticación
- ✅ Login con Google OAuth (NextAuth.js)
- ✅ Logout funcional
- ✅ Sesión persistente
- ✅ Middleware de protección de rutas
- ✅ Usuario guardado en MongoDB

### Sistema de Posts
- ✅ Crear posts con imágenes (hasta 5, max 5MB c/u)
- ✅ Compresión de imágenes antes de upload (max 1MB)
- ✅ Upload a Cloudinary con transformaciones
- ✅ Feed principal con infinite scroll
- ✅ Detalle de post (Server Component)
- ✅ Validación con Zod (client + server)
- ✅ Categorías dinámicas desde DB (API GET /api/categories)
- ✅ Character counters en formulario
- ✅ Animación shake para validación de categoría

### UX/UI Moderna
- ✅ PostCreationDrawer estilo Facebook
- ✅ FAB (Floating Action Button) que aparece al hacer scroll
- ✅ Pull-to-refresh en el feed
- ✅ Layout mejorado de detalle de post (título/descripción primero)
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Responsive design (mobile-first)

### Deployment
- ✅ Deployed en Vercel: https://lostconnect.vercel.app
- ✅ CI/CD automático con GitHub
- ✅ Variables de entorno configuradas
- ✅ Bugs de producción corregidos:
  - OAuth redirect fix
  - Cloudinary upload fix
  - Mongoose populate fix (User model import)

---

## 🐛 Bugs Críticos Resueltos

### 1. MissingSchemaError en Vercel (26 Oct 2025) ✅
**Problema:** Posts no se veían en producción con error "Schema hasn't been registered for model 'User'"

**Causa:** En Vercel serverless functions, cada ejecución es aislada. El servicio `postService.ts` hacía `.populate('userId')` pero no importaba el modelo User.

**Solución:** Agregar `import '@/lib/models/User';` en `postService.ts`

**Commit:** `8c36ef4` - "🐛 Fix: Import User model for populate() in Vercel serverless functions"

### 2. Categorías Hardcoded vs. Dinámicas (25 Oct 2025) ✅
**Problema:** Validación de categorías fallaba porque usaba enum hardcoded

**Causa:** Post model y Zod schema tenían enum fijo, pero se necesitaban categorías dinámicas desde DB

**Solución:**
- Cambiar Post model: `category: { type: String }` (sin enum)
- Cambiar Zod schema: `category: z.string().min(1)`
- Crear API GET /api/categories para obtener catálogo

### 3. Contraste de Texto Bajo (24 Oct 2025) ✅
**Problema:** Textos difíciles de leer en inputs, postcards y detalle

**Solución:** Cambiar colores a slate-900 para mejor contraste

---

## 📋 APIs Implementadas

### Posts
```
GET    /api/posts                 # Listar posts (paginación cursor-based)
  Query: limit, cursor, status
  
POST   /api/posts                 # Crear post
  Body: { title, description, type, category, images[], tags[] }
  
GET    /api/posts/[id]            # Detalle de post (no usado, se usa service directo)
  
PATCH  /api/posts/[id]            # Actualizar post (solo owner)
  
DELETE /api/posts/[id]            # Eliminar post (solo owner)
```

### Categorías
```
GET    /api/categories            # Obtener catálogo de categorías
  Response: [{ _id, name, slug, icon, color, order, isActive }]
```

### Upload
```
POST   /api/upload                # Subir imagen a Cloudinary
  Body: FormData con file
  Response: { url, publicId, width, height }
```

---

## 🎨 Componentes Clave

### PostCreationDrawer
**Ubicación:** `components/posts/PostCreationDrawer.tsx`

**Características:**
- Modal tipo Facebook/Instagram
- Character counters (título: 5-50, descripción: 20-255)
- Validación en tiempo real con React Hook Form + Zod
- Upload de hasta 5 imágenes con compresión (max 1MB c/u)
- Animación shake cuando falta categoría
- Reseteo de formulario al cerrar

**Props:**
```typescript
{
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}
```

### FeedContent
**Ubicación:** `components/feed/FeedContent.tsx`

**Características:**
- Infinite scroll con cursor-based pagination
- FAB que aparece al hacer scroll hacia abajo
- Pull-to-refresh gesture
- Loading states y skeletons
- Empty state cuando no hay posts

### PostCard
**Ubicación:** `components/posts/PostCard.tsx`

**Características:**
- Muestra resumen del post
- Imágenes con Next/Image optimizadas
- Badge de tipo (Lost/Found)
- Badge de categoría
- Tags
- Contador de comentarios (placeholder)
- Contador de reacciones (placeholder)
- Click → Navega a /post/[id]

---

## 🔐 Autenticación y Seguridad

### NextAuth.js Configuración
**Archivo:** `app/api/auth/[...nextauth]/route.ts`

- Provider: Google OAuth 2.0
- Session strategy: JWT
- Callbacks:
  - `signIn`: Guarda/actualiza usuario en MongoDB
  - `jwt`: Agrega userId al token
  - `session`: Agrega userId y name a session

### Middleware
**Archivo:** `middleware.ts`

- Protege rutas privadas: `/`, `/post/*`, `/profile/*`
- Permite rutas públicas: `/api/*`, `/signin`, `/_next/*`, `/favicon.ico`
- Redirige a `/signin` si no hay sesión

### Variables de Entorno
**Archivo:** `.env.local` (no commiteado)

```bash
# Database
MONGODB_URI=mongodb+srv://...

# NextAuth
NEXTAUTH_URL=https://lostconnect.vercel.app
NEXTAUTH_SECRET=***

# Google OAuth
GOOGLE_CLIENT_ID=***
GOOGLE_CLIENT_SECRET=***

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=***
CLOUDINARY_API_KEY=***
CLOUDINARY_API_SECRET=***

# Environment
NODE_ENV=production
```

---

## 🧪 Testing

### Testing Manual
Se realiza testing manual exhaustivo para cada feature:
- Crear posts con/sin imágenes
- Upload de imágenes (tamaño, cantidad, formatos)
- Validaciones de formularios
- Responsive (mobile 375px, tablet 768px, desktop 1920px)
- Navegadores: Chrome, Safari, Firefox, Edge

### Testing Automatizado
❌ No implementado en MVP (Fase 2+)

---

## 📦 Deployment

### Producción
- **URL:** https://lostconnect.vercel.app
- **Hosting:** Vercel (Serverless)
- **Base de datos:** MongoDB Atlas (Free tier)
- **CDN:** Cloudinary (Free tier)

### CI/CD Pipeline
```
Git Push → GitHub (main)
     ↓
Vercel detecta cambio
     ↓
Build automático
     ├── npm install
     ├── npm run build
     └── Type check
     ↓
Deploy (si build exitoso)
     ↓
URL disponible en ~2-3 minutos
```

### Comandos Útiles
```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Lint
npm run lint

# Desplegar manualmente (Vercel CLI)
vercel --prod
```

---

## 🚧 Problemas Conocidos

### 1. TypeScript Types en Populate
**Estado:** Workaround temporal

Cuando Mongoose hace `.populate('userId')`, el tipo cambia de `ObjectId` a `IUser` pero TypeScript no lo detecta automáticamente.

**Workaround actual:**
```typescript
// En PostDetailClient.tsx
const userName = (post.userId as any)?.name || 'Usuario';
```

**Solución futura:** Crear type guards o usar Mongoose types generics

### 2. Reacciones y Comentarios
**Estado:** No implementado

Actualmente los contadores aparecen pero no son funcionales. Se implementarán en Sprint 3.1 y 3.2.

---

## 📍 Decisiones de Diseño Importantes

### 1. Categorías Dinámicas
**Decisión:** Usar base de datos en vez de enum hardcoded

**Razón:** Permite agregar/editar categorías sin redeploy, más flexible para escalar.

**Implementación:**
- Modelo Category en MongoDB
- API GET /api/categories
- Validación en Zod: `z.string().min(1)` (cualquier categoría válida)

### 2. Tipografía Indivisa (La Salle)
**Decisión:** Usar las fuentes corporativas lasallistas en todo el proyecto

**Razón:** Identidad visual auténtica, alineación con valores institucionales, profesionalismo.

**Implementación:**
- Fuentes Indivisa Text Sans (principal) e Indivisa Text Serif (títulos)
- Descargadas desde indivisafont.org
- Configuradas en `app/globals.css` con 16 variantes @font-face
- Pesos disponibles: Light (300), Regular (400), Bold (700), Black (900)
- Formatos: WOFF2 (principal) + WOFF (fallback)
- Página de prueba: http://localhost:3000/fonts-test
- Documentación completa: `FONTS_SETUP.md`

**Características Indivisa:**
- 25,000 glifos para 270 idiomas
- Ganadora del Premio al Diseño 2018
- Representa la red lasallista mundial (80 países, 1M+ estudiantes)
- Lema: "Indivisa Manent" (Permanecen Indivisos)

### 3. Compresión de Imágenes
**Decisión:** Comprimir en cliente antes de subir a Cloudinary

**Razón:** Ahorra ancho de banda, mejora UX en conexiones lentas.

**Implementación:**
- Biblioteca `browser-image-compression`
- Max size: 1MB por imagen
- Max width/height: 1920px
- Quality: 0.8

### 4. Server Components vs. Client Components
**Decisión:** Usar Server Components donde sea posible

**Razones:**
- Mejor SEO
- Menor JavaScript en cliente
- Carga inicial más rápida

**Implementación:**
- Feed y detalle de post: Server Components
- Formularios e interacciones: Client Components

### 5. Paginación Cursor-based
**Decisión:** Usar cursor en vez de offset/limit

**Razón:** Más eficiente en datasets grandes, evita duplicados en tiempo real.

**Implementación:**
```typescript
GET /api/posts?limit=20&cursor=<postId>

// Response
{
  success: true,
  data: [...],
  meta: {
    nextCursor: "<nextPostId>",
    hasMore: true
  }
}
```

---

## 🎯 Próximos Pasos (Sprint 3.1)

### Sistema de Reacciones
**Duración estimada:** 2-3 días (6-8 horas)

#### Tareas
1. **Modelo Reaction** (1h)
   - Crear schema en `lib/models/Reaction.ts`
   - Índice único: `userId + postId`
   - Tipos: like, helpful, found

2. **API de Reacciones** (2-3h)
   - POST `/api/posts/[postId]/reactions` - Toggle reacción
   - GET `/api/posts/[postId]/reactions` - Obtener reacciones
   - Actualizar contador en Post

3. **Componente ReactionButton** (2h)
   - Iconos animados (Lucide React)
   - Estado activo/inactivo
   - Optimistic updates

4. **Integración** (1-2h)
   - Agregar en PostCard
   - Agregar en PostDetail
   - Mostrar contador con highlight si usuario reaccionó

#### Criterios de Éxito
- ✅ Puedo dar/quitar reacciones
- ✅ Solo una reacción por usuario
- ✅ Contadores actualizan en tiempo real
- ✅ UI muestra mi reacción actual
- ✅ Animaciones fluidas

---

## 💡 Tips para Retomar el Proyecto

### Al Iniciar Sesión
1. **Leer este documento completo** (CONTEXT.md)
2. **Revisar CHECKLIST.md** para ver progreso
3. **Leer PLAN_MAESTRO.md** sección del sprint actual
4. **Ejecutar `npm run dev`** y probar funcionalidad existente
5. **Verificar deployment** en https://lostconnect.vercel.app

### Estructura de Trabajo
1. **Crear rama nueva** para features grandes
   ```bash
   git checkout -b feature/reactions
   ```

2. **Commits descriptivos** con emojis
   ```bash
   git commit -m "✨ feat: Add reaction model and API"
   git commit -m "🐛 fix: Resolve optimistic update issue"
   git commit -m "📝 docs: Update CONTEXT.md"
   ```

3. **Push frecuente** a GitHub
   ```bash
   git push origin feature/reactions
   ```

4. **Merge a main** cuando esté testeado
   ```bash
   git checkout main
   git merge feature/reactions
   git push origin main
   ```

### Debugging en Vercel
1. **Ver logs:** https://vercel.com/erdnandos-projects/lostconnect/deployments
2. **Filtrar por tipo:** Error, Warning, Info
3. **Buscar errores recientes:** Last 1 hour
4. **Copiar error completo** para análisis

### Comandos Git Útiles
```bash
# Ver estado
git status

# Ver cambios
git diff

# Ver historial
git log --oneline --graph

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Ver branches
git branch -a

# Cambiar de branch
git checkout <branch-name>
```

---

## 📚 Recursos Útiles

### Documentación
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

### Herramientas
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI para MongoDB
- [Postman](https://www.postman.com/) - Testing de APIs
- [Vercel CLI](https://vercel.com/docs/cli) - Deploy desde terminal

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

## 📊 Métricas de Progreso

### Progreso por Fase
```
FASE 1: Setup y Fundación      [██████████] 100% ✅
FASE 2: Posts                   [██████████] 100% ✅
FASE 3: Interacciones           [░░░░░░░░░░]   0% ⏳
FASE 4: Perfil y Polish         [░░░░░░░░░░]   0% ⏳

TOTAL MVP                       [█████░░░░░]  50%
```

### Timeline
```
Semana 1-2:  Setup + Auth                    ✅ COMPLETADO
Semana 3-4:  Posts (crear, ver, listar)      ✅ COMPLETADO
Semana 5-6:  Comentarios + Reacciones        ⏳ SIGUIENTE
Semana 7-8:  Perfil + UX Polish              ⏳ PENDIENTE

Fecha Inicio: 25 Oct 2025
Fecha Actual: 26 Oct 2025
Progreso: 4/8 semanas (50%)
```

### Features Completadas
- ✅ 25 de 50 features del MVP (~50%)
- ✅ 2 de 4 fases completadas
- ✅ 0 bugs críticos pendientes

---

## 🎉 Logros Destacados

1. **Sistema de Posts Completo** (26 Oct 2025)
   - Crear, listar, ver posts
   - Upload de imágenes con compresión
   - Categorías dinámicas
   - UX moderna tipo Facebook

2. **Deployment en Producción** (24 Oct 2025)
   - URL: https://lostconnect.vercel.app
   - CI/CD automático
   - Zero downtime

3. **Bugs Críticos Resueltos** (26 Oct 2025)
   - MissingSchemaError en Vercel
   - OAuth redirect en producción
   - Categorías dinámicas

---

## 🤝 Contribución

Este es un proyecto escolar individual, pero si quieres contribuir:

1. Fork el repo
2. Crea una rama feature
3. Haz commits descriptivos
4. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto bajo licencia MIT.

---

## 📞 Contacto

**Desarrollador:** Erdnando Rodriguez  
**GitHub:** [@erdnando](https://github.com/erdnando)  
**Proyecto:** [lostconnect](https://github.com/erdnando/lostconnect)

---

**⚡ TL;DR para GitHub Copilot:**

```
Proyecto: Red social de objetos perdidos
Stack: Next.js 15 + TypeScript + MongoDB + NextAuth + Cloudinary
Estado: Fase 2 completa (50% MVP)
Próximo: Sprint 3.1 - Sistema de Reacciones
Deployment: https://lostconnect.vercel.app
Docs clave: CHECKLIST.md, PLAN_MAESTRO.md, CONTEXT.md
```

---

_Este documento se actualiza regularmente. Última revisión: 26 Oct 2025_
