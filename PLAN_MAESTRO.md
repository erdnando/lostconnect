# 📋 Plan Maestro - Red Social de Objetos Perdidos

**Nombre del Proyecto:** LostConnect  
**Versión:** 1.0.0 (MVP)  
**Fecha de Inicio:** 25 de Octubre, 2025  
**Tipo:** Proyecto Académico/Escolar  
**Duración Estimada:** 3-4 meses

---

## 📑 Tabla de Contenido

1. [Visión General](#1-visión-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Arquitectura del Sistema](#3-arquitectura-del-sistema)
4. [Modelo de Datos](#4-modelo-de-datos)
5. [Diseño de API](#5-diseño-de-api)
6. [Sitemap y Navegación](#6-sitemap-y-navegación)
7. [Casos de Uso](#7-casos-de-uso)
8. [Diagramas de Secuencia](#8-diagramas-de-secuencia)
9. [Plan de Desarrollo (MVP)](#9-plan-de-desarrollo-mvp)
10. [Infraestructura y Deployment](#10-infraestructura-y-deployment)
11. [Diseño UI/UX](#11-diseño-uiux)
12. [Seguridad y Best Practices](#12-seguridad-y-best-practices)
13. [Testing](#13-testing)
14. [Fases Futuras](#14-fases-futuras)

---

## 1. Visión General

### 1.1 Descripción del Proyecto

**LostConnect** es una red social enfocada en ayudar a las personas a reportar, buscar y recuperar objetos perdidos. Los usuarios pueden:

- Publicar reportes de objetos perdidos con fotos, descripción y ubicación
- Ver un feed social con todos los reportes activos
- Interactuar mediante reacciones y comentarios
- Responder a comentarios (hilos de conversación)
- Compartir fotos y ubicaciones en los comentarios

### 1.2 Objetivos del MVP

✅ Sistema de autenticación con Google  
✅ Feed principal de reportes  
✅ Crear reportes con fotos y ubicación  
✅ Sistema de comentarios con respuestas (replies)  
✅ Reacciones a reportes  
✅ Responsive (Mobile-first + Desktop)  
✅ Perfil básico de usuario  

### 1.3 Limitaciones del MVP

❌ Sin videos/audios (Fase 2)  
❌ Sin chat privado directo (Fase 2)  
❌ Sin notificaciones push (Fase 2)  
❌ Sin búsqueda avanzada/filtros (Fase 2)  
❌ Sin sistema de mensajería (Fase 2)  

---

## 2. Stack Tecnológico

### 2.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 15.x | Framework principal (App Router) |
| **React** | 19.x | Librería UI |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Estilos y diseño responsive |
| **shadcn/ui** | Latest | Componentes UI reutilizables |
| **React Hook Form** | 7.x | Manejo de formularios |
| **Zod** | 3.x | Validación de esquemas |
| **Lucide React** | Latest | Iconos modernos |
| **date-fns** | Latest | Manejo de fechas |

### 2.2 Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js API Routes** | 15.x | Endpoints REST API |
| **NextAuth.js** | 5.x | Autenticación (Google OAuth) |
| **MongoDB** | 7.x | Base de datos NoSQL |
| **Mongoose** | 8.x | ODM para MongoDB |
| **Cloudinary** | Latest | Almacenamiento de imágenes |

### 2.3 Herramientas de Desarrollo

- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Git**: Control de versiones
- **Vercel**: Deployment y hosting

### 2.4 Razones de la Elección del Stack

✅ **Next.js 15**: Framework moderno, SSR, API routes integradas, excelente SEO  
✅ **MongoDB**: Flexible schema, ideal para datos no relacionales como posts y comentarios  
✅ **TypeScript**: Previene errores, mejor DX (Developer Experience)  
✅ **Tailwind CSS**: Desarrollo rápido, diseños consistentes, mobile-first  
✅ **NextAuth**: Solución madura para auth, soporta OAuth directamente  
✅ **shadcn/ui**: Componentes accesibles y customizables sin dependencias pesadas  

---

## 3. Arquitectura del Sistema

### 3.1 Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENTE (Browser)                       │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │   Mobile   │  │  Tablet    │  │      Desktop         │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────┐
│                    NEXT.JS APPLICATION                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              APP ROUTER (Pages)                       │  │
│  │  /          /auth        /profile      /post/[id]    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         SERVER COMPONENTS + CLIENT COMPONENTS         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API ROUTES (/api/*)                      │  │
│  │  /posts   /comments   /reactions   /upload           │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────┬──────────────────────┬──────────────────────┘
                │                      │
    ┌───────────▼──────────┐  ┌────────▼──────────┐
    │   NextAuth.js        │  │   Cloudinary      │
    │   (Google OAuth)     │  │   (Image CDN)     │
    └───────────┬──────────┘  └───────────────────┘
                │
    ┌───────────▼──────────┐
    │   MongoDB Atlas      │
    │   (Database)         │
    └──────────────────────┘
```

### 3.2 Patrones de Arquitectura

#### 3.2.1 Separación de Responsabilidades

```
/app                    # Rutas y páginas (UI Layer)
/components             # Componentes reutilizables
/lib                    # Lógica de negocio
  /db                   # Conexión a MongoDB
  /models               # Modelos Mongoose
  /services             # Lógica de servicios
  /utils                # Utilidades generales
/types                  # TypeScript types/interfaces
/public                 # Assets estáticos
```

#### 3.2.2 Flujo de Datos

```
User Action → Client Component → API Route → Service Layer → Model → MongoDB
                                      ↓
                                  Validation (Zod)
                                      ↓
                                  Authentication Check
                                      ↓
                                  Business Logic
```

### 3.3 Estrategia de Renderizado

- **Server Components**: Feed, perfil, detalles de post (SEO, performance)
- **Client Components**: Formularios, modales, interacciones (likes, comments)
- **API Routes**: Todas las operaciones de escritura (POST, PUT, DELETE)

---

## 4. Modelo de Datos

### 4.1 Esquema de MongoDB

#### 4.1.1 Collection: `users`

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,              // Único
  image?: string,             // URL de avatar (de Google)
  emailVerified?: Date,
  createdAt: Date,
  updatedAt: Date,
  
  // Índices
  // email: unique index
}
```

#### 4.1.2 Collection: `posts`

```typescript
{
  _id: ObjectId,
  userId: ObjectId,           // Ref: users
  type: "lost" | "found",     // Tipo de reporte
  
  // Contenido
  title: string,              // "Perdí mi mochila azul"
  description: string,        // Descripción detallada
  category: string,           // "electronics", "documents", "pets", etc.
  
  // Multimedia
  images: [
    {
      url: string,            // URL de Cloudinary
      publicId: string,       // Para borrar de Cloudinary
      width?: number,
      height?: number
    }
  ],
  
  // Ubicación
  location?: {
    type: "Point",
    coordinates: [number, number], // [longitude, latitude]
    address?: string,         // Dirección legible
    city?: string,
    country?: string
  },
  
  // Metadata
  status: "active" | "resolved" | "closed",
  tags: string[],
  
  // Contadores (desnormalizados para performance)
  commentsCount: number,
  reactionsCount: {
    like: number,
    helpful: number,
    found: number
  },
  
  createdAt: Date,
  updatedAt: Date,
  
  // Índices
  // userId: 1
  // createdAt: -1
  // status: 1, createdAt: -1
  // location: 2dsphere (geoespacial)
}
```

#### 4.1.3 Collection: `comments`

```typescript
{
  _id: ObjectId,
  postId: ObjectId,           // Ref: posts
  userId: ObjectId,           // Ref: users
  
  content: string,
  
  // Para replies/hilos
  parentCommentId?: ObjectId, // null si es comentario principal
  replyToUserId?: ObjectId,   // Usuario al que responde
  
  // Multimedia en comentarios
  images?: [
    {
      url: string,
      publicId: string
    }
  ],
  
  location?: {
    type: "Point",
    coordinates: [number, number],
    address?: string
  },
  
  // Contadores
  repliesCount: number,
  
  createdAt: Date,
  updatedAt: Date,
  
  // Índices
  // postId: 1, createdAt: 1
  // postId: 1, parentCommentId: 1
  // userId: 1, createdAt: -1
}
```

#### 4.1.4 Collection: `reactions`

```typescript
{
  _id: ObjectId,
  userId: ObjectId,           // Ref: users
  postId: ObjectId,           // Ref: posts
  type: "like" | "helpful" | "found",
  createdAt: Date,
  
  // Índices
  // userId: 1, postId: 1 (unique compound index)
  // postId: 1, type: 1
}
```

### 4.2 Relaciones entre Entidades

```
User (1) ──────── (N) Posts
  │
  └────────────── (N) Comments
  │
  └────────────── (N) Reactions

Post (1) ──────── (N) Comments
  │
  └────────────── (N) Reactions

Comment (1) ─────── (N) Replies (Comments)
```

### 4.3 Estrategia de Desnormalización

Para optimizar performance en el MVP:

1. **Contadores en Posts**: `commentsCount`, `reactionsCount` (evita COUNT queries)
2. **User info en responses**: Incluir `name` e `image` del usuario en APIs
3. **No eager loading**: Los replies se cargan bajo demanda

---

## 5. Diseño de API

### 5.1 Endpoints Principales

#### 5.1.1 Autenticación

```
POST   /api/auth/signin           # NextAuth - Google OAuth
POST   /api/auth/signout          # Cerrar sesión
GET    /api/auth/session          # Obtener sesión actual
```

#### 5.1.2 Posts (Reportes)

```
GET    /api/posts                 # Listar posts (feed)
  Query params:
    - limit (default: 20)
    - cursor (para paginación)
    - status (active|resolved|closed)
    
POST   /api/posts                 # Crear nuevo reporte
  Body: {
    title, description, category, type,
    images[], location?, tags[]
  }
  
GET    /api/posts/[id]            # Detalle de un post
  
PATCH  /api/posts/[id]            # Actualizar post (solo owner)
  Body: { status?, description?, ... }
  
DELETE /api/posts/[id]            # Eliminar post (solo owner)
```

#### 5.1.3 Comentarios

```
GET    /api/posts/[postId]/comments    # Comentarios de un post
  Query params:
    - limit (default: 20)
    - parentCommentId (para replies)
    
POST   /api/posts/[postId]/comments    # Crear comentario
  Body: {
    content, images[]?, location?,
    parentCommentId?, replyToUserId?
  }
  
DELETE /api/comments/[id]              # Eliminar comentario
```

#### 5.1.4 Reacciones

```
POST   /api/posts/[postId]/reactions   # Toggle reacción
  Body: { type: "like" | "helpful" | "found" }
  
GET    /api/posts/[postId]/reactions   # Obtener reacciones
```

#### 5.1.5 Usuario

```
GET    /api/user/profile              # Perfil del usuario autenticado
GET    /api/user/[userId]/posts       # Posts de un usuario
```

#### 5.1.6 Upload

```
POST   /api/upload                    # Subir imagen a Cloudinary
  Body: FormData con archivo
  Response: { url, publicId }
```

### 5.2 Formato de Respuesta Estándar

#### Success Response
```typescript
{
  success: true,
  data: any,
  meta?: {
    cursor?: string,    // Para paginación
    hasMore?: boolean,
    total?: number
  }
}
```

#### Error Response
```typescript
{
  success: false,
  error: {
    code: string,      // "UNAUTHORIZED", "VALIDATION_ERROR", etc.
    message: string,   // Mensaje para el usuario
    details?: any      // Detalles técnicos (solo en dev)
  }
}
```

### 5.3 Paginación (Cursor-based)

```typescript
// Request
GET /api/posts?limit=20&cursor=6543a1b2c3d4e5f6g7h8i9j0

// Response
{
  success: true,
  data: [...],
  meta: {
    nextCursor: "7654b2c3d4e5f6g7h8i9j0k1",
    hasMore: true
  }
}
```

---

## 6. Sitemap y Navegación

### 6.1 Estructura de Páginas

```
/                           # Feed principal (Home)
├── /auth
│   ├── /signin            # Login con Google
│   └── /error             # Error de autenticación
│
├── /post
│   ├── /new               # Crear nuevo reporte
│   └── /[id]              # Detalle de reporte
│
├── /profile
│   ├── /[userId]          # Perfil público de usuario
│   └── /me                # Mi perfil
│
└── /about                 # Sobre el proyecto (opcional)
```

### 6.2 Flujo de Navegación Principal

```
┌─────────────┐
│   Landing   │ (Si no auth)
└──────┬──────┘
       │ Click "Iniciar Sesión"
       ▼
┌─────────────┐
│  Auth Page  │ (Google OAuth)
└──────┬──────┘
       │ Success
       ▼
┌─────────────┐
│  Feed (/)   │ ◄──────────────┐
└──────┬──────┘                │
       │                       │
       ├─► Ver Post (/post/[id])
       │   ├─► Comentar
       │   ├─► Reaccionar
       │   └─► Volver al Feed ─┘
       │
       ├─► Crear Post (/post/new)
       │   └─► Publicar → Feed
       │
       └─► Mi Perfil (/profile/me)
           └─► Ver mis posts
```

### 6.3 Componentes de Navegación

#### 6.3.1 Navbar (Desktop)
```
[Logo] [Feed] [Crear Post]              [Buscar] [Perfil ▼]
                                                   ├─ Mi Perfil
                                                   └─ Cerrar Sesión
```

#### 6.3.2 Bottom Navigation (Mobile)
```
┌──────────────────────────────────────┐
│ [🏠] [🔍] [➕] [👤]                   │
│ Feed  Buscar Crear Perfil            │
└──────────────────────────────────────┘
```

---

## 7. Casos de Uso

### 7.1 Caso de Uso Principal: Reportar Objeto Perdido

**Actor:** Usuario registrado  
**Precondición:** Usuario autenticado  
**Flujo Principal:**

1. Usuario navega al feed
2. Usuario hace clic en "Crear Reporte" o botón "+"
3. Sistema muestra formulario con campos:
   - Título del reporte
   - Descripción detallada
   - Tipo: ¿Perdido o Encontrado?
   - Categoría (dropdown)
   - Cargar fotos (máx 5)
   - Agregar ubicación (opcional)
   - Tags (opcional)
4. Usuario completa formulario y hace clic en "Publicar"
5. Sistema valida datos
6. Sistema sube imágenes a Cloudinary
7. Sistema guarda reporte en MongoDB
8. Sistema redirige al feed
9. Usuario ve su reporte publicado

**Flujos Alternativos:**
- 5a. Validación falla → Mostrar errores en formulario
- 6a. Error al subir imagen → Mostrar mensaje, permitir reintentar

### 7.2 Caso de Uso: Ver Feed de Reportes

**Actor:** Usuario registrado  
**Flujo Principal:**

1. Usuario accede a la página principal (/)
2. Sistema carga últimos 20 reportes activos
3. Usuario ve tarjetas con:
   - Foto del objeto
   - Título y descripción breve
   - Usuario que publicó
   - Fecha de publicación
   - Ubicación (si disponible)
   - Contador de comentarios y reacciones
4. Usuario hace scroll hacia abajo
5. Sistema carga más reportes (infinite scroll)

### 7.3 Caso de Uso: Interactuar con Reporte

**Actor:** Usuario registrado  
**Flujo Principal:**

1. Usuario hace clic en un reporte del feed
2. Sistema muestra vista detallada:
   - Todas las imágenes (galería)
   - Descripción completa
   - Mapa con ubicación
   - Información del autor
   - Sección de comentarios
3. Usuario puede:
   - **Reaccionar:** Click en emoji (like, helpful, found)
   - **Comentar:** Escribir texto, agregar foto/ubicación
   - **Responder comentario:** Click en "Responder"
4. Sistema actualiza en tiempo real (o refresh)

### 7.4 Caso de Uso: Sistema de Comentarios con Replies

**Flujo Principal:**

1. Usuario lee comentario en un post
2. Usuario hace clic en "Responder"
3. Sistema muestra campo de texto bajo el comentario
4. Usuario escribe respuesta (puede agregar imagen/ubicación)
5. Usuario hace clic en "Enviar"
6. Sistema guarda reply con `parentCommentId`
7. Sistema incrementa `repliesCount` del comentario padre
8. Sistema muestra reply anidado visualmente

**Visualización:**
```
Comentario Principal (usuario1)
  └─ Respuesta 1 (usuario2)
  └─ Respuesta 2 (usuario3)
     └─ Respuesta a Respuesta (usuario1)
```

---

## 8. Diagramas de Secuencia

### 8.1 Autenticación con Google

```
Usuario          Next.js         NextAuth        Google          MongoDB
  │                │                │               │               │
  │─── Click ────→│                │               │               │
  │   "Sign In"    │                │               │               │
  │                │─── Redirect ──→│               │               │
  │                │                │─── OAuth ────→│               │
  │                │                │   Request     │               │
  │                │                │               │               │
  │                │                │←── Consent ───│               │
  │←───── Google Login Screen ──────────────────────┤               │
  │                │                │               │               │
  │──── Accept ────────────────────────────────────→│               │
  │                │                │               │               │
  │                │                │←── Token ─────┤               │
  │                │                │   + Profile   │               │
  │                │                │               │               │
  │                │                │───── Save ─────────────────→│
  │                │                │   User Data   │               │
  │                │                │               │               │
  │                │                │←───── OK ──────────────────────│
  │                │                │               │               │
  │                │←── Session ────│               │               │
  │                │   Cookie       │               │               │
  │                │                │               │               │
  │←── Redirect ───│                │               │               │
  │   to Feed      │                │               │               │
```

### 8.2 Crear Reporte con Imágenes

```
Usuario       Next.js (UI)    API Route       Cloudinary      MongoDB
  │               │               │               │               │
  │─── Fill ────→│               │               │               │
  │   Form        │               │               │               │
  │               │               │               │               │
  │─── Submit ───→│               │               │               │
  │               │               │               │               │
  │               │─── POST ─────→│               │               │
  │               │   /api/posts  │               │               │
  │               │               │               │               │
  │               │               │─── Auth ─────→│               │
  │               │               │   Check       │               │
  │               │               │               │               │
  │               │               │─── Upload ────→│               │
  │               │               │   Images      │               │
  │               │               │               │               │
  │               │               │←── URLs ──────┤               │
  │               │               │               │               │
  │               │               │──── Insert ────────────────→│
  │               │               │    Post Data  │               │
  │               │               │               │               │
  │               │               │←───── Post ─────────────────────│
  │               │               │    Created    │               │
  │               │               │               │               │
  │               │←── 201 ───────│               │               │
  │               │   Created     │               │               │
  │               │               │               │               │
  │←── Redirect ──│               │               │               │
  │   to Post     │               │               │               │
```

### 8.3 Sistema de Comentarios y Replies

```
Usuario       Next.js       API Route       MongoDB
  │               │               │               │
  │─── Click ────→│               │               │
  │   "Reply"     │               │               │
  │               │               │               │
  │─── Write ────→│               │               │
  │   Comment     │               │               │
  │               │               │               │
  │─── Submit ───→│               │               │
  │               │               │               │
  │               │─── POST ─────→│               │
  │               │   /api/       │               │
  │               │   comments    │               │
  │               │               │               │
  │               │               │─── Insert ───→│
  │               │               │   Comment     │
  │               │               │   with        │
  │               │               │   parentId    │
  │               │               │               │
  │               │               │─── Update ───→│
  │               │               │   Parent      │
  │               │               │   repliesCount│
  │               │               │               │
  │               │               │─── Update ───→│
  │               │               │   Post        │
  │               │               │   commentsCount│
  │               │               │               │
  │               │               │←──── OK ──────│
  │               │               │               │
  │               │←── 201 ───────│               │
  │               │               │               │
  │←── Update ────│               │               │
  │   UI          │               │               │
```

---

## 9. Plan de Desarrollo (MVP)

### 9.1 Fases de Desarrollo

#### **FASE 1: Setup y Fundación (Semana 1-2)**

**Sprint 1.1: Infraestructura Base**
- ✅ Inicializar proyecto Next.js + TypeScript
- ✅ Configurar Tailwind CSS
- ✅ Instalar shadcn/ui
- ✅ Configurar ESLint + Prettier
- ✅ Setup MongoDB Atlas
- ✅ Crear conexión a MongoDB
- ✅ Configurar variables de entorno

**Sprint 1.2: Autenticación**
- Instalar NextAuth.js
- Configurar Google OAuth Provider
- Crear modelos de User
- Implementar páginas de auth
- Proteger rutas privadas
- Crear middleware de autenticación

**Entregables Fase 1:**
- Proyecto configurado y corriendo
- Login/Logout funcional con Google
- Base de datos conectada

---

#### **FASE 2: Core Features - Posts (Semana 3-4)**

**Sprint 2.1: Modelo y API de Posts**
- Crear modelo de Post (Mongoose)
- Implementar API GET /api/posts (feed)
- Implementar API POST /api/posts
- Implementar API GET /api/posts/[id]
- Configurar Cloudinary para imágenes
- Crear servicio de upload

**Sprint 2.2: UI de Posts**
- Crear componente PostCard
- Crear página de Feed (/)
- Crear formulario de nuevo post (/post/new)
- Implementar upload de múltiples imágenes
- Agregar selector de ubicación (mapa simple)
- Crear página de detalle de post

**Entregables Fase 2:**
- Usuarios pueden crear reportes
- Feed funcional con lista de posts
- Subida de imágenes operativa

---

#### **FASE 3: Interacciones - Comentarios y Reacciones (Semana 5-6)**

**Sprint 3.1: Sistema de Reacciones**
- Crear modelo de Reaction
- Implementar API de reacciones
- Crear componente ReactionButton
- Agregar contadores en PostCard
- Actualizar contadores en tiempo real

**Sprint 3.2: Sistema de Comentarios**
- Crear modelo de Comment
- Implementar API de comentarios
- Crear componente CommentItem
- Crear formulario de comentario
- Implementar sistema de replies (anidados)
- Agregar upload de imagen en comentarios
- Agregar ubicación en comentarios

**Entregables Fase 3:**
- Reacciones funcionando (like, helpful, found)
- Comentarios con respuestas
- Historial de interacciones guardado

---

#### **FASE 4: Perfil y UX (Semana 7-8)**

**Sprint 4.1: Perfiles de Usuario**
- Crear página de perfil (/profile/me)
- Crear página de perfil público (/profile/[userId])
- Mostrar posts del usuario
- Agregar estadísticas básicas

**Sprint 4.2: Mejoras de UX/UI**
- Implementar infinite scroll en feed
- Agregar loading states y skeletons
- Implementar error boundaries
- Optimizar imágenes (Next.js Image)
- Agregar transiciones y animaciones
- Mejorar responsive design (mobile-first)

**Sprint 4.3: Polish Final**
- Agregar toast notifications
- Implementar validaciones completas
- Agregar confirmaciones (borrar post, etc.)
- Testing manual exhaustivo
- Corregir bugs encontrados

**Entregables Fase 4:**
- Perfiles de usuario funcionales
- UX pulida y fluida
- Aplicación responsive

---

### 9.2 Timeline Estimado

```
Semana 1-2:  Setup + Auth
Semana 3-4:  Posts (crear, ver, listar)
Semana 5-6:  Comentarios + Reacciones
Semana 7-8:  Perfil + UX Polish

TOTAL: 2 meses para MVP completo
```

### 9.3 Priorización de Features (MoSCoW)

#### Must Have (MVP)
- ✅ Autenticación con Google
- ✅ Crear reportes con fotos y ubicación
- ✅ Feed de reportes
- ✅ Comentarios con replies
- ✅ Reacciones
- ✅ Responsive design

#### Should Have (MVP+)
- 🟡 Búsqueda básica
- 🟡 Filtros por categoría
- 🟡 Editar/eliminar posts propios
- 🟡 Notificaciones en UI

#### Could Have (Fase 2)
- 🔵 Notificaciones push
- 🔵 Chat directo
- 🔵 Videos y audios
- 🔵 Compartir en redes sociales

#### Won't Have (Fuera de scope inicial)
- ⚫ Sistema de reportes/moderación
- ⚫ Gamificación/puntos
- ⚫ Sistema de verificación

---

## 10. Infraestructura y Deployment

### 10.1 Entorno de Desarrollo

```
Local Machine:
├── Node.js 20+
├── npm/yarn
├── Git
├── VS Code (recomendado)
└── MongoDB Compass (opcional, para ver DB)

Servicios Cloud (Free Tier):
├── MongoDB Atlas (512 MB, suficiente para MVP)
├── Cloudinary (25 créditos/mes)
└── Vercel (Deploy ilimitado)
```

### 10.2 Variables de Entorno

**Archivo: `.env.local`**
```bash
# Database
MONGODB_URI=mongodb+srv://...

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-generado

# Google OAuth
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# Environment
NODE_ENV=development
```

### 10.3 Deployment (Vercel)

**Pasos:**
1. Push código a GitHub
2. Conectar repo con Vercel
3. Configurar variables de entorno en Vercel
4. Deploy automático en cada push a `main`

**URLs:**
- Production: `https://lostconnect.vercel.app`
- Preview: `https://lostconnect-git-branch.vercel.app`

### 10.4 CI/CD Pipeline

```
Git Push → GitHub
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
URL disponible
```

---

## 11. Diseño UI/UX

### 11.1 Principios de Diseño

1. **Mobile-First**: Diseñar primero para móvil, luego expandir a desktop
2. **Accesibilidad**: Contraste adecuado, textos legibles, navegación por teclado
3. **Simplicidad**: Interfaces limpias, sin sobrecarga visual
4. **Feedback Inmediato**: Confirmaciones visuales de cada acción
5. **Consistencia**: Patrones de diseño repetidos en toda la app

### 11.2 Paleta de Colores (Propuesta)

```css
/* Tema Claro (Default) */
--primary: #3B82F6        /* Blue-500 - Acciones principales */
--secondary: #8B5CF6      /* Purple-500 - Secundarias */
--success: #10B981        /* Green-500 - Éxito/Encontrado */
--warning: #F59E0B        /* Amber-500 - Advertencias */
--danger: #EF4444         /* Red-500 - Errores/Eliminar */
--background: #FFFFFF
--foreground: #0F172A     /* Slate-900 */
--muted: #F1F5F9          /* Slate-100 */
--border: #E2E8F0         /* Slate-200 */

/* Tema Oscuro (Opcional Fase 2) */
```

### 11.3 Tipografía

```css
/* Font Stack */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Tamaños */
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
```

### 11.4 Componentes UI Clave

#### 11.4.1 PostCard (Tarjeta de Reporte)

```
┌─────────────────────────────────────┐
│ [@avatar] Juan Pérez · Hace 2h      │
│                                     │
│ [📸 Imagen del objeto perdido]      │
│                                     │
│ Perdí mi mochila azul               │
│ Descripción breve del objeto...    │
│                                     │
│ 📍 Centro, Ciudad                   │
│                                     │
│ [❤️ 5] [💬 3] [🔍 Útil]            │
└─────────────────────────────────────┘
```

#### 11.4.2 CommentSection (Sección de Comentarios)

```
┌─────────────────────────────────────┐
│ 💬 3 Comentarios                    │
├─────────────────────────────────────┤
│ [@avatar] María · Hace 1h           │
│ Creo que vi algo parecido cerca...  │
│ [Responder] [❤️ 2]                  │
│                                     │
│   └─ [@avatar] Juan · Hace 30min   │
│      ¿En dónde exactamente?         │
│      [Responder]                    │
│                                     │
├─────────────────────────────────────┤
│ [Escribe un comentario...]          │
│ [📷] [📍] [Enviar]                  │
└─────────────────────────────────────┘
```

#### 11.4.3 CreatePostForm (Formulario de Creación)

```
┌─────────────────────────────────────┐
│ Crear Reporte                       │
├─────────────────────────────────────┤
│ Tipo: ○ Perdido  ● Encontrado      │
│                                     │
│ Título:                             │
│ [_________________________________] │
│                                     │
│ Descripción:                        │
│ [_________________________________] │
│ [_________________________________] │
│ [_________________________________] │
│                                     │
│ Categoría:                          │
│ [Seleccionar... ▼]                  │
│                                     │
│ Fotos: (máx 5)                      │
│ [+] [📷] [📷]                       │
│                                     │
│ Ubicación (opcional):               │
│ [📍 Agregar ubicación]              │
│                                     │
│ [Cancelar] [Publicar Reporte]       │
└─────────────────────────────────────┘
```

### 11.5 Flujos de Usuario (User Flows)

#### Flujo 1: Primera Visita
```
Landing Page → Click "Entrar" → Google OAuth → Feed con tutorial tooltip
```

#### Flujo 2: Crear Primer Reporte
```
Feed → Botón "+" → Formulario guiado → Confirmación → Ver en feed
```

#### Flujo 3: Interactuar con Reporte
```
Feed → Click en Post → Ver detalles → Scroll a comentarios → Agregar comentario → Ver actualizado
```

### 11.6 Consideraciones de UX

#### Mobile (< 768px)
- Navegación inferior fija (bottom nav)
- Formularios en pantalla completa
- Imágenes optimizadas para 4G
- Touch targets mínimo 44x44px

#### Desktop (> 768px)
- Navbar superior
- Sidebar opcional (futuro: filtros, trending)
- Grid de 2-3 columnas en feed
- Modals para formularios

#### Accesibilidad
- Alt text en todas las imágenes
- Labels en todos los inputs
- Navegación por teclado
- Focus visible
- ARIA attributes donde sea necesario

---

## 12. Seguridad y Best Practices

### 12.1 Autenticación y Autorización

✅ **Implementado:**
- OAuth 2.0 con Google (NextAuth.js)
- Session-based auth con cookies HTTP-only
- Middleware para proteger rutas

✅ **En API Routes:**
```typescript
// Verificar autenticación
const session = await getServerSession(authOptions);
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Verificar ownership
if (post.userId.toString() !== session.user.id) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

### 12.2 Validación de Datos

✅ **Client-side:** React Hook Form + Zod
```typescript
const postSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(2000),
  category: z.enum(['electronics', 'documents', 'pets', 'clothing', 'other']),
  images: z.array(z.string().url()).max(5),
});
```

✅ **Server-side:** Misma validación en API routes

### 12.3 Prevención de Ataques

#### XSS (Cross-Site Scripting)
- React escapa contenido por defecto
- Sanitizar HTML si se permite rich text (usar DOMPurify)
- CSP headers en Next.js config

#### CSRF (Cross-Site Request Forgery)
- NextAuth maneja CSRF tokens automáticamente
- SameSite cookies

#### SQL/NoSQL Injection
- Mongoose escapa queries automáticamente
- No usar `$where` con input de usuario
- Validar tipos de datos

#### Rate Limiting
```typescript
// Opcional: Usar `@upstash/ratelimit` para limitar requests
// Ejemplo: 10 posts por hora por usuario
```

### 12.4 Manejo de Imágenes

✅ **Validaciones:**
- Tipo de archivo: JPG, PNG, WebP
- Tamaño máximo: 5MB por imagen
- Dimensiones máximas: 4000x4000px
- Scan de virus (opcional con Cloudinary)

✅ **Cloudinary:**
- Transformaciones automáticas
- CDN global
- URLs firmadas para uploads

### 12.5 Variables de Entorno

⚠️ **NUNCA commitear:**
- `.env.local`
- Secrets/API keys

✅ **Separar:**
- `NEXT_PUBLIC_*` para variables del cliente
- Variables sin prefijo solo para servidor

---

## 13. Testing

### 13.1 Estrategia de Testing (MVP Simplificado)

Dado que es un proyecto escolar con tiempo limitado, priorizamos:

#### 13.1.1 Testing Manual (Obligatorio)
- ✅ Checklist de funcionalidades
- ✅ Pruebas en múltiples dispositivos
- ✅ Navegadores: Chrome, Safari, Firefox
- ✅ Responsive: Mobile (375px), Tablet (768px), Desktop (1920px)

#### 13.1.2 Testing Automatizado (Opcional/Fase 2)
- Unit tests: Funciones utilitarias
- Integration tests: API routes
- E2E tests: Flujos críticos (Playwright)

### 13.2 Checklist de Testing Manual

```markdown
## Autenticación
- [ ] Login con Google funciona
- [ ] Logout funciona
- [ ] Rutas protegidas redirigen a login
- [ ] Session persiste al recargar

## Posts
- [ ] Crear post con imágenes
- [ ] Crear post sin imágenes
- [ ] Crear post con ubicación
- [ ] Ver detalle de post
- [ ] Editar post propio
- [ ] No poder editar post ajeno
- [ ] Eliminar post propio

## Feed
- [ ] Se cargan posts iniciales
- [ ] Infinite scroll funciona
- [ ] Posts ordenados por fecha
- [ ] Loading state se muestra
- [ ] Error state se muestra

## Comentarios
- [ ] Agregar comentario
- [ ] Responder a comentario
- [ ] Ver hilos de replies
- [ ] Agregar imagen en comentario
- [ ] Contador de comentarios actualiza

## Reacciones
- [ ] Dar like
- [ ] Quitar like
- [ ] Toggle entre tipos de reacción
- [ ] Contador actualiza

## Responsive
- [ ] Layout mobile correcto
- [ ] Bottom nav funciona
- [ ] Formularios usables en móvil
- [ ] Imágenes se adaptan
- [ ] Touch targets suficientes
```

---

## 14. Fases Futuras

### 14.1 Fase 2: Mejoras y Features Avanzadas (Meses 3-4)

**Features:**
- 🔔 Notificaciones en tiempo real (Socket.io o Pusher)
- 🎥 Soporte para videos
- 🎤 Soporte para audios
- 💬 Chat directo entre usuarios
- 🔍 Búsqueda avanzada con filtros
- 🗺️ Mapa interactivo con clusters de posts
- 📊 Dashboard con estadísticas
- 🏆 Sistema de reputación/karma

### 14.2 Fase 3: Escalabilidad y Optimización (Mes 5-6)

**Mejoras:**
- 🚀 Server-side caching (Redis)
- 📱 PWA (Progressive Web App)
- 🌐 Internacionalización (i18n)
- 🌙 Dark mode
- 📧 Email notifications
- 🔐 Two-factor authentication
- 📈 Analytics (Google Analytics/Mixpanel)
- 🐛 Error tracking (Sentry)

### 14.3 Fase 4: Monetización/Sostenibilidad (Si es exitoso)

**Opciones:**
- Ads no intrusivos
- Plan premium (sin ads, features extra)
- Donaciones (Patreon/Ko-fi)
- Partnerships con autoridades locales

---

## 15. Anexos

### 15.1 Recursos Útiles

**Documentación:**
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

**Tutoriales:**
- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [MongoDB + Mongoose](https://mongoosejs.com/docs/guide.html)

**Herramientas:**
- [Excalidraw](https://excalidraw.com/) - Diagramas
- [Figma](https://figma.com/) - Diseño UI
- [Postman](https://www.postman.com/) - Testing de APIs

### 15.2 Glosario

- **MVP:** Minimum Viable Product - Versión mínima funcional
- **SSR:** Server-Side Rendering
- **CSR:** Client-Side Rendering
- **ODM:** Object Document Mapper (Mongoose)
- **OAuth:** Open Authorization
- **CDN:** Content Delivery Network
- **API Route:** Endpoint de backend en Next.js
- **Server Component:** Componente que se renderiza en servidor
- **Client Component:** Componente interactivo (usa hooks)

### 15.3 Contacto y Mantenimiento

**Este documento es vivo y debe actualizarse:**
- Cada vez que se agrega una feature
- Cuando cambia la arquitectura
- Al descubrir mejores prácticas
- Después de feedback de usuarios

**Control de Versiones del Documento:**
- v1.0.0 - 25 Oct 2025 - Documento inicial

---

## 🎯 Resumen Ejecutivo (TL;DR)

### Stack
Next.js 15 + TypeScript + Tailwind + MongoDB + NextAuth + Cloudinary

### Features MVP
Login (Google) → Feed de posts → Crear reportes → Comentarios con replies → Reacciones

### Timeline
8 semanas (2 meses) para MVP completo

### Arquitectura
Monolito con Next.js (frontend + API routes), MongoDB Atlas, Vercel hosting

### Prioridad
Mobile-first, UX simple, despliegue rápido, iterar basado en feedback

---

**🚀 ¡Listo para empezar a construir!**

_Este documento debe ser tu north star durante todo el desarrollo. Consulta cada sección según vayas avanzando en el proyecto._
