# 🗓️ Roadmap de Desarrollo - LostConnect

Este documento describe el plan de implementación detallado, sprint por sprint, para el MVP de LostConnect.

---

## 📊 Timeline General

**Duración Total MVP:** 8 semanas (2 meses)

```
┌──────────┬──────────┬──────────┬──────────┐
│ Semana 1-2│ Semana 3-4│ Semana 5-6│ Semana 7-8│
│   Setup   │   Posts   │Comentarios│  Polish   │
│   + Auth  │   + Feed  │ + Reaccio │  + Perfil │
└──────────┴──────────┴──────────┴──────────┘
```

---

## 🎯 FASE 1: Setup y Fundación (Semana 1-2)

### Sprint 1.1: Infraestructura Base (3-4 días)

**Objetivos:**
- ✅ Proyecto Next.js inicializado
- ✅ Estructura de carpetas configurada
- ✅ MongoDB conectado
- ✅ Variables de entorno configuradas

**Tareas Completadas:**
- [x] Inicializar proyecto con `create-next-app`
- [x] Configurar TypeScript
- [x] Configurar Tailwind CSS
- [x] Instalar dependencias principales
- [x] Crear estructura de carpetas
- [x] Configurar conexión a MongoDB
- [x] Crear modelos de Mongoose (User, Post, Comment, Reaction)
- [x] Crear esquemas de validación Zod
- [x] Documentación inicial

**Próximas Tareas:**
- [ ] Configurar shadcn/ui components
- [ ] Crear componentes UI base (Button, Card, Input, etc.)
- [ ] Configurar ESLint rules custom
- [ ] Setup de Git hooks (opcional: Husky + lint-staged)

---

### Sprint 1.2: Autenticación (3-4 días)

**Objetivos:**
- Implementar login/logout con Google OAuth
- Proteger rutas privadas
- Crear páginas de autenticación

**Tareas:**
- [ ] Instalar y configurar NextAuth.js v5
- [ ] Crear archivo de configuración auth (`lib/auth/auth.config.ts`)
- [ ] Implementar API route `[...nextauth]/route.ts`
- [ ] Configurar Google OAuth Provider
- [ ] Crear página de Sign In (`app/auth/signin/page.tsx`)
- [ ] Crear página de Error (`app/auth/error/page.tsx`)
- [ ] Implementar middleware para proteger rutas
- [ ] Crear hook personalizado `useSession`
- [ ] Testear flujo completo de autenticación

**Criterios de Aceptación:**
- ✅ Usuario puede hacer login con Google
- ✅ Usuario puede cerrar sesión
- ✅ Session persiste al recargar página
- ✅ Rutas protegidas redirigen a login
- ✅ Datos de usuario se guardan en MongoDB

**Archivos a Crear:**
```
lib/auth/
  ├── auth.config.ts
  └── middleware.ts
app/auth/
  ├── signin/page.tsx
  └── error/page.tsx
app/api/auth/
  └── [...nextauth]/route.ts
```

---

## 🚀 FASE 2: Core Features - Posts (Semana 3-4)

### Sprint 2.1: Modelo y API de Posts (4-5 días)

**Objetivos:**
- Implementar CRUD completo de posts
- Configurar upload de imágenes
- Crear servicios de posts

**Tareas:**
- [ ] Crear servicio de Cloudinary (`lib/services/uploadService.ts`)
- [ ] Implementar API `POST /api/posts` (crear post)
  - [ ] Validación con Zod
  - [ ] Upload de imágenes a Cloudinary
  - [ ] Guardar en MongoDB
- [ ] Implementar API `GET /api/posts` (listar posts)
  - [ ] Paginación cursor-based
  - [ ] Ordenar por fecha desc
  - [ ] Popular con info de usuario
- [ ] Implementar API `GET /api/posts/[id]` (detalle)
- [ ] Implementar API `PATCH /api/posts/[id]` (actualizar)
  - [ ] Verificar ownership
- [ ] Implementar API `DELETE /api/posts/[id]` (eliminar)
  - [ ] Verificar ownership
  - [ ] Eliminar imágenes de Cloudinary
- [ ] Crear `lib/services/postService.ts` con lógica de negocio

**Criterios de Aceptación:**
- ✅ API endpoints funcionan correctamente
- ✅ Validaciones correctas en todas las rutas
- ✅ Solo el owner puede editar/eliminar su post
- ✅ Imágenes se suben a Cloudinary
- ✅ Paginación funciona correctamente

**Archivos a Crear:**
```
app/api/
  ├── posts/
  │   ├── route.ts (GET, POST)
  │   └── [id]/route.ts (GET, PATCH, DELETE)
  └── upload/
      └── route.ts
lib/services/
  ├── postService.ts
  └── uploadService.ts
```

---

### Sprint 2.2: UI de Posts (4-5 días)

**Objetivos:**
- Crear interfaz para visualizar y crear posts
- Implementar feed principal
- Implementar formulario de creación

**Tareas:**
- [ ] Crear componente `PostCard` (`components/posts/PostCard.tsx`)
  - [ ] Mostrar imagen principal
  - [ ] Info del usuario (avatar, nombre)
  - [ ] Título y descripción
  - [ ] Fecha relativa
  - [ ] Ubicación (si existe)
  - [ ] Contadores (comentarios, reacciones)
- [ ] Crear página Feed (`app/page.tsx`)
  - [ ] Listar posts con `PostCard`
  - [ ] Implementar infinite scroll
  - [ ] Loading skeletons
  - [ ] Empty state
- [ ] Crear `PostForm` (`components/posts/PostForm.tsx`)
  - [ ] React Hook Form + Zod
  - [ ] Campos: tipo, título, descripción, categoría
  - [ ] Upload múltiple de imágenes (preview)
  - [ ] Selector de ubicación (map básico o input)
  - [ ] Tags input
- [ ] Crear página "Nuevo Post" (`app/post/new/page.tsx`)
- [ ] Crear página "Detalle de Post" (`app/post/[id]/page.tsx`)
  - [ ] Galería de imágenes
  - [ ] Descripción completa
  - [ ] Mapa con ubicación
  - [ ] Botón editar (si es owner)
- [ ] Crear componente `ImageUploader`
- [ ] Crear componente `PostActions` (edit, delete)

**Criterios de Aceptación:**
- ✅ Feed muestra posts correctamente
- ✅ Infinite scroll funciona
- ✅ Se pueden crear posts con imágenes
- ✅ Formulario tiene validaciones visuales
- ✅ Preview de imágenes funciona
- ✅ Responsive en mobile

**Archivos a Crear:**
```
components/posts/
  ├── PostCard.tsx
  ├── PostForm.tsx
  ├── PostGallery.tsx
  ├── PostActions.tsx
  └── PostDetail.tsx
components/shared/
  ├── ImageUploader.tsx
  ├── InfiniteScroll.tsx
  └── LoadingSpinner.tsx
app/
  ├── page.tsx (Feed)
  └── post/
      ├── new/page.tsx
      └── [id]/page.tsx
```

---

## 💬 FASE 3: Interacciones (Semana 5-6)

### Sprint 3.1: Sistema de Reacciones (2-3 días)

**Objetivos:**
- Implementar sistema de reacciones (like, helpful, found)
- Mostrar contadores en tiempo real

**Tareas:**
- [ ] Implementar API `POST /api/reactions` (toggle reaction)
  - [ ] Verificar autenticación
  - [ ] Si ya existe, eliminar
  - [ ] Si no existe, crear
  - [ ] Actualizar contador en Post
- [ ] Implementar API `GET /api/posts/[id]/reactions`
- [ ] Crear componente `ReactionButton`
  - [ ] Iconos animados
  - [ ] Estado activo/inactivo
  - [ ] Optimistic updates
- [ ] Integrar reacciones en `PostCard`
- [ ] Integrar reacciones en `PostDetail`

**Criterios de Aceptación:**
- ✅ Usuario puede dar/quitar reacción
- ✅ Solo una reacción por usuario por post
- ✅ Contadores actualizan en tiempo real
- ✅ UI refleja el estado actual

**Archivos a Crear:**
```
app/api/reactions/
  └── route.ts
components/
  └── ReactionButton.tsx
```

---

### Sprint 3.2: Sistema de Comentarios (5-6 días)

**Objetivos:**
- Implementar comentarios con sistema de replies
- Permitir imágenes y ubicación en comentarios

**Tareas:**
- [ ] Implementar API `POST /api/posts/[postId]/comments`
  - [ ] Validación
  - [ ] Guardar comentario
  - [ ] Incrementar `commentsCount` en Post
  - [ ] Si es reply, incrementar `repliesCount` en comentario padre
- [ ] Implementar API `GET /api/posts/[postId]/comments`
  - [ ] Cargar solo comentarios principales (sin parentCommentId)
  - [ ] Popular con info de usuario
  - [ ] Ordenar por fecha
- [ ] Implementar API `GET /api/comments/[id]/replies`
  - [ ] Cargar replies de un comentario
- [ ] Implementar API `DELETE /api/comments/[id]`
  - [ ] Verificar ownership
  - [ ] Decrementar contadores
- [ ] Crear `CommentList` (`components/comments/CommentList.tsx`)
- [ ] Crear `CommentItem` (`components/comments/CommentItem.tsx`)
  - [ ] Mostrar contenido
  - [ ] Info de usuario
  - [ ] Imágenes (si tiene)
  - [ ] Ubicación (si tiene)
  - [ ] Botón "Responder"
  - [ ] Contador de replies
  - [ ] Botón eliminar (si es owner)
- [ ] Crear `CommentForm` (`components/comments/CommentForm.tsx`)
  - [ ] Input de texto
  - [ ] Upload de imagen (opcional)
  - [ ] Agregar ubicación (opcional)
- [ ] Crear `CommentThread` (para replies anidados)
- [ ] Integrar en `PostDetail`

**Criterios de Aceptación:**
- ✅ Usuario puede comentar en posts
- ✅ Usuario puede responder a comentarios
- ✅ Replies se muestran anidados visualmente
- ✅ Se pueden agregar imágenes en comentarios
- ✅ Se puede agregar ubicación
- ✅ Historial completo se mantiene

**Archivos a Crear:**
```
app/api/
  ├── posts/[postId]/comments/route.ts
  └── comments/
      ├── [id]/route.ts
      └── [id]/replies/route.ts
components/comments/
  ├── CommentList.tsx
  ├── CommentItem.tsx
  ├── CommentForm.tsx
  ├── CommentThread.tsx
  └── ReplyButton.tsx
```

---

## 👤 FASE 4: Perfil y UX Polish (Semana 7-8)

### Sprint 4.1: Perfiles de Usuario (3 días)

**Objetivos:**
- Crear páginas de perfil
- Mostrar posts del usuario

**Tareas:**
- [ ] Implementar API `GET /api/user/profile`
- [ ] Implementar API `GET /api/user/[userId]/posts`
- [ ] Crear página "Mi Perfil" (`app/profile/me/page.tsx`)
  - [ ] Info del usuario
  - [ ] Estadísticas (posts, comentarios)
  - [ ] Lista de mis posts
- [ ] Crear página "Perfil Público" (`app/profile/[userId]/page.tsx`)
  - [ ] Similar a "Mi Perfil"
  - [ ] Sin opciones de edición
- [ ] Crear componente `UserCard`
- [ ] Crear componente `UserStats`

**Criterios de Aceptación:**
- ✅ Se puede ver el perfil propio
- ✅ Se puede ver perfil de otros usuarios
- ✅ Muestra todos los posts del usuario
- ✅ Estadísticas correctas

**Archivos a Crear:**
```
app/
  └── profile/
      ├── me/page.tsx
      └── [userId]/page.tsx
app/api/user/
  ├── profile/route.ts
  └── [userId]/posts/route.ts
components/
  ├── UserCard.tsx
  └── UserStats.tsx
```

---

### Sprint 4.2: Mejoras de UX/UI (3-4 días)

**Objetivos:**
- Pulir experiencia de usuario
- Optimizar rendimiento
- Mejorar diseño responsive

**Tareas:**
- [ ] Implementar infinite scroll con `react-intersection-observer`
- [ ] Crear loading skeletons para:
  - [ ] PostCard
  - [ ] CommentItem
  - [ ] UserCard
- [ ] Implementar Error Boundaries
- [ ] Optimizar imágenes con `next/image`
- [ ] Agregar transiciones y animaciones
  - [ ] Framer Motion (opcional)
  - [ ] CSS transitions
- [ ] Mejorar responsive design
  - [ ] Testear en múltiples dispositivos
  - [ ] Ajustar breakpoints
- [ ] Crear Navbar/Header
  - [ ] Logo
  - [ ] Links de navegación
  - [ ] User menu dropdown
- [ ] Crear BottomNav para móvil
- [ ] Implementar toast notifications
  - [ ] Éxito al crear post
  - [ ] Error en operaciones
- [ ] Agregar confirmaciones
  - [ ] Confirmar antes de eliminar post
  - [ ] Confirmar antes de eliminar comentario

**Criterios de Aceptación:**
- ✅ Infinite scroll fluido
- ✅ Loading states en todas las acciones
- ✅ Errores se muestran correctamente
- ✅ Imágenes optimizadas
- ✅ Animaciones suaves
- ✅ Responsive perfecto (mobile + desktop)
- ✅ Navegación intuitiva

**Archivos a Crear:**
```
components/layout/
  ├── Navbar.tsx
  ├── BottomNav.tsx
  ├── Footer.tsx
  └── ErrorBoundary.tsx
components/ui/
  ├── skeleton.tsx
  ├── toast.tsx
  ├── alert-dialog.tsx
  └── dropdown-menu.tsx
```

---

### Sprint 4.3: Testing y Bug Fixes (2-3 días)

**Objetivos:**
- Testing manual exhaustivo
- Corregir bugs encontrados
- Optimizaciones finales

**Tareas:**
- [ ] Testing manual con checklist (ver PLAN_MAESTRO.md)
- [ ] Testear en múltiples navegadores
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Testear en múltiples dispositivos
  - [ ] iPhone (Safari)
  - [ ] Android (Chrome)
  - [ ] Tablet
  - [ ] Desktop
- [ ] Corregir bugs encontrados
- [ ] Optimizar queries a MongoDB
- [ ] Revisar performance (Lighthouse)
- [ ] Limpieza de código
  - [ ] Eliminar console.logs
  - [ ] Eliminar código comentado
  - [ ] Optimizar imports
- [ ] Documentar código complejo
- [ ] Actualizar README con instrucciones finales

**Criterios de Aceptación:**
- ✅ Todos los features del MVP funcionan
- ✅ No hay bugs críticos
- ✅ Performance aceptable (Lighthouse > 70)
- ✅ Responsive en todos los dispositivos
- ✅ Código limpio y documentado

---

## 🚀 Deployment y Launch (Final de Semana 8)

**Tareas:**
- [ ] Crear cuenta de Vercel
- [ ] Conectar repo de GitHub
- [ ] Configurar variables de entorno en Vercel
- [ ] Deploy inicial
- [ ] Testear en producción
- [ ] Configurar dominio custom (opcional)
- [ ] Configurar Analytics (opcional)
- [ ] Preparar demo para presentación

---

## 📊 Métricas de Éxito del MVP

Al finalizar las 8 semanas, el MVP debe cumplir:

### Funcionalidades
- ✅ Autenticación con Google
- ✅ CRUD completo de posts
- ✅ Sistema de comentarios con replies
- ✅ Sistema de reacciones
- ✅ Perfiles de usuario
- ✅ Feed con paginación

### Performance
- ⚡ Lighthouse Score > 70
- ⚡ Time to Interactive < 3s
- ⚡ First Contentful Paint < 1.5s

### UX
- 📱 100% responsive
- 🎨 UI atractiva y moderna
- ♿ Básicamente accesible

### Código
- 🔒 No vulnerabilidades críticas
- ✅ Sin errores de TypeScript
- ✅ Linting pasando

---

## 🔮 Fases Futuras (Post-MVP)

### Fase 2: Features Avanzadas (Mes 3-4)
- Búsqueda y filtros
- Notificaciones en tiempo real
- Videos y audios
- Chat directo
- Mapa interactivo

### Fase 3: Escalabilidad (Mes 5-6)
- Caching con Redis
- PWA
- Dark mode
- i18n
- Email notifications
- 2FA
- Analytics
- Error tracking

---

## 📝 Notas Importantes

### Priorización
Si vas atrasado, prioriza en este orden:
1. **Crítico**: Auth, Posts CRUD, Feed
2. **Importante**: Comentarios, Reacciones
3. **Nice to have**: Perfil avanzado, Animaciones

### Timeboxing
- No dediques más de 1 día a un solo bug
- Si algo toma mucho tiempo, documenta y pasa al siguiente
- Puedes volver a optimizar después

### Documentación
- Actualiza PLAN_MAESTRO.md conforme avanzas
- Documenta decisiones importantes
- Mantén README actualizado

---

**💪 ¡Éxito con el desarrollo! Recuerda: done is better than perfect.**
