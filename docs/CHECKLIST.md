# ✅ Checklist de Desarrollo MVP

Usa este checklist para trackear tu progreso en el desarrollo del MVP.

---

## 📋 FASE 1: Setup y Fundación

### Sprint 1.1: Infraestructura Base
- [x] Inicializar proyecto Next.js
- [x] Configurar TypeScript
- [x] Configurar Tailwind CSS
- [x] Configurar ESLint
- [x] Crear estructura de carpetas
- [x] Instalar dependencias principales
- [x] Configurar MongoDB connection
- [x] Crear modelos Mongoose (User, Post, Comment, Reaction)
- [x] Crear esquemas de validación Zod
- [x] Crear utilidades básicas (cn, formatDate)
- [x] Documentación inicial (README, PLAN_MAESTRO, ESTRUCTURA)
- [x] Configurar shadcn/ui
- [x] Crear componentes UI base (Button, Input, Card, Badge, etc.)
- [ ] Configurar Git hooks (opcional)

### Sprint 1.2: Autenticación
- [x] Instalar NextAuth.js
- [x] Configurar Google OAuth Provider
- [x] Crear auth config file
- [x] Implementar API route [...nextauth]
- [x] Crear página Sign In
- [x] Crear página Error
- [x] Implementar middleware de protección
- [x] Crear hook useSession
- [x] Testear flujo completo
- [x] Verificar persistencia de sesión

**Criterios de Aceptación Fase 1:**
- [x] Login con Google funciona
- [x] Logout funciona
- [x] Sesión persiste al recargar
- [x] Rutas protegidas redirigen
- [x] Usuario se guarda en MongoDB

---

## 📝 FASE 2: Core Features - Posts

### Sprint 2.1: API de Posts
- [x] Crear servicio de Cloudinary
- [x] API: POST /api/posts (crear)
- [x] API: GET /api/posts (listar)
- [x] API: GET /api/posts/[id] (detalle)
- [x] API: PATCH /api/posts/[id] (actualizar)
- [x] API: DELETE /api/posts/[id] (eliminar)
- [x] API: POST /api/upload (subir imágenes)
- [x] Implementar paginación cursor-based
- [x] Crear postService con lógica de negocio
- [x] Testear todos los endpoints
- [x] Corregir middleware para permitir rutas API

### Sprint 2.2: UI de Posts
- [x] Configurar shadcn/ui
- [x] Crear componente PostCard
- [x] Crear página Feed (/)
- [x] Implementar filtros (Todos/Perdidos/Encontrados)
- [x] Crear loading skeletons
- [x] Crear empty state
- [x] Crear PostForm
- [x] Implementar React Hook Form + Zod
- [x] Crear ImageUploader con Cloudinary
- [x] Crear selector de ubicación
- [x] Crear página /post/new
- [x] Crear página /post/[id]
- [x] Deploy a Vercel
- [x] Corregir errores de OAuth en producción
- [x] Arreglar Cloudinary upload error
- [x] Mejorar contraste de textos (inputs, postcards, detalle)

**Sprint 2.3: UX Mejorado (Estilo Facebook)** ✅
- [x] Crear PostCreationDrawer (modal estilo Facebook)
- [x] Implementar FAB (Floating Action Button)
- [x] Sistema de categorías dinámicas desde DB
- [x] Crear API de categorías GET /api/categories
- [x] Character counters (título: 5-50, descripción: 20-255)
- [x] Animación shake para validación de categoría
- [x] Pull-to-refresh en el feed
- [x] Comprimir imágenes antes de upload (max 1MB)
- [x] Mejorar layout de detalle de post (título/descripción primero)

**Sprint 2.4: Bugs de Producción** ✅
- [x] Fix: MissingSchemaError en Vercel (import User model)
- [x] Fix: Posts no se ven en producción
- [x] Fix: Populate userId en serverless functions

**Criterios de Aceptación Fase 2:**
- [x] Feed muestra posts correctamente
- [x] Puedo crear posts con imágenes
- [x] Validaciones funcionan
- [x] Responsive en mobile
- [x] Deployed en Vercel
- [x] FAB funciona y aparece al hacer scroll
- [x] Modal de creación estilo Facebook
- [x] ImageUploader con compresión
- [x] Pull-to-refresh implementado
- [x] Categorías dinámicas desde DB
- [x] Posts se ven correctamente en producción ✅

---

## 💬 FASE 3: Interacciones

### Sprint 3.1: Reacciones
- [ ] API: POST /api/reactions (toggle)
- [ ] API: GET /api/posts/[id]/reactions
- [ ] Crear componente ReactionButton
- [ ] Iconos animados
- [ ] Optimistic updates
- [ ] Integrar en PostCard
- [ ] Integrar en PostDetail
- [ ] Testear toggle de reacciones

**Criterios:**
- [ ] Puedo dar/quitar reacción
- [ ] Solo una reacción por usuario
- [ ] Contadores actualizan
- [ ] UI muestra estado actual

### Sprint 3.2: Comentarios
- [ ] API: POST /api/posts/[postId]/comments
- [ ] API: GET /api/posts/[postId]/comments
- [ ] API: GET /api/comments/[id]/replies
- [ ] API: DELETE /api/comments/[id]
- [ ] Crear CommentList
- [ ] Crear CommentItem
- [ ] Crear CommentForm
- [ ] Crear CommentThread (replies)
- [ ] Implementar sistema de replies anidados
- [ ] Soporte para imágenes en comentarios
- [ ] Soporte para ubicación en comentarios
- [ ] Botón "Responder"
- [ ] Contador de replies
- [ ] Integrar en PostDetail

**Criterios:**
- [ ] Puedo comentar en posts
- [ ] Puedo responder a comentarios
- [ ] Replies se muestran anidados
- [ ] Puedo agregar imágenes
- [ ] Puedo agregar ubicación
- [ ] Puedo eliminar mis comentarios
- [ ] Historial se mantiene

---

## 👤 FASE 4: Perfil y Polish

### Sprint 4.1: Perfiles
- [ ] API: GET /api/user/profile
- [ ] API: GET /api/user/[userId]/posts
- [ ] Crear página /profile/me
- [ ] Crear página /profile/[userId]
- [ ] Crear UserCard
- [ ] Crear UserStats
- [ ] Mostrar posts del usuario
- [ ] Mostrar estadísticas

**Criterios:**
- [ ] Veo mi perfil
- [ ] Veo perfiles de otros
- [ ] Estadísticas correctas
- [ ] Posts del usuario se listan

### Sprint 4.2: UX/UI
- [ ] Implementar infinite scroll mejorado
- [ ] Loading skeletons para todo
- [ ] Error Boundaries
- [ ] Optimizar imágenes (next/image)
- [ ] Agregar transiciones
- [ ] Crear Navbar
- [ ] Crear BottomNav (móvil)
- [ ] Crear Footer
- [ ] Toast notifications
- [ ] Confirmaciones de eliminación
- [ ] Mejorar responsive
- [ ] Testear en múltiples dispositivos

**Criterios:**
- [ ] Infinite scroll fluido
- [ ] Loading states everywhere
- [ ] Errores se muestran bien
- [ ] Imágenes optimizadas
- [ ] Animaciones suaves
- [ ] 100% responsive
- [ ] Navegación intuitiva

### Sprint 4.3: Testing y Bugs
- [ ] Testing manual completo
- [ ] Testear en Chrome
- [ ] Testear en Firefox
- [ ] Testear en Safari
- [ ] Testear en Edge
- [ ] Testear en iPhone
- [ ] Testear en Android
- [ ] Testear en tablet
- [ ] Corregir bugs encontrados
- [ ] Optimizar queries MongoDB
- [ ] Performance audit (Lighthouse)
- [ ] Limpiar código
- [ ] Eliminar console.logs
- [ ] Documentar código complejo
- [ ] Actualizar README

**Criterios:**
- [ ] Todos los features funcionan
- [ ] No bugs críticos
- [ ] Lighthouse > 70
- [ ] Responsive perfecto
- [ ] Código limpio

---

## 🚀 Deployment

- [ ] Crear cuenta Vercel
- [ ] Conectar repo GitHub
- [ ] Configurar env vars en Vercel
- [ ] Deploy inicial
- [ ] Testear en producción
- [ ] Configurar dominio (opcional)
- [ ] Configurar Analytics (opcional)
- [ ] Preparar demo

---

## 🧪 Testing Manual Detallado

### Autenticación
- [ ] Login con Google funciona
- [ ] Logout funciona
- [ ] Rutas protegidas redirigen a login
- [ ] Session persiste al recargar

### Posts
- [ ] Crear post con imágenes
- [ ] Crear post sin imágenes
- [ ] Crear post con ubicación
- [ ] Ver detalle de post
- [ ] Editar post propio
- [ ] No poder editar post ajeno
- [ ] Eliminar post propio
- [ ] No poder eliminar post ajeno

### Feed
- [ ] Se cargan posts iniciales
- [ ] Infinite scroll funciona
- [ ] Posts ordenados por fecha
- [ ] Loading state se muestra
- [ ] Error state se muestra
- [ ] Empty state se muestra

### Comentarios
- [ ] Agregar comentario
- [ ] Agregar comentario con imagen
- [ ] Agregar comentario con ubicación
- [ ] Responder a comentario
- [ ] Ver hilos de replies
- [ ] Contador de comentarios actualiza
- [ ] Eliminar comentario propio
- [ ] No poder eliminar comentario ajeno

### Reacciones
- [ ] Dar like
- [ ] Quitar like
- [ ] Dar helpful
- [ ] Dar found
- [ ] Toggle entre tipos
- [ ] Contador actualiza
- [ ] UI muestra estado actual

### Perfil
- [ ] Ver mi perfil
- [ ] Ver mis posts
- [ ] Ver perfil de otro usuario
- [ ] Ver posts de otro usuario
- [ ] Estadísticas correctas

### Responsive
- [ ] Layout mobile correcto (< 640px)
- [ ] Layout tablet correcto (640-1024px)
- [ ] Layout desktop correcto (> 1024px)
- [ ] Bottom nav en móvil funciona
- [ ] Navbar en desktop funciona
- [ ] Formularios usables en móvil
- [ ] Imágenes se adaptan
- [ ] Touch targets suficientes (44x44px)
- [ ] Scroll funciona bien
- [ ] Modales se ajustan

### Performance
- [ ] Imágenes cargan rápido
- [ ] No hay memory leaks
- [ ] Scroll suave
- [ ] Transiciones fluidas
- [ ] API calls optimizados

---

## 📊 Métricas Finales

### Performance (Lighthouse)
- [ ] Performance: > 70
- [ ] Accessibility: > 80
- [ ] Best Practices: > 80
- [ ] SEO: > 80

### Funcionalidad
- [ ] Todos los features MVP completos
- [ ] Sin bugs bloqueantes
- [ ] UX fluida y agradable

### Código
- [ ] Sin errores TypeScript
- [ ] Linting pasa
- [ ] Código documentado
- [ ] READMEs actualizados

---

## 🎉 Launch Checklist

- [ ] Deployed en Vercel
- [ ] Dominio configurado (opcional)
- [ ] Todas las features testeadas
- [ ] Demo preparada
- [ ] Documentación completa
- [ ] README con instrucciones
- [ ] Screenshots/video para presentación

---

**Progreso General:**

```
FASE 1: Setup y Fundación      [██████████] 100% ✅
FASE 2: Posts                   [██████████] 100% ✅
FASE 3: Interacciones           [░░░░░░░░░░]   0%
FASE 4: Perfil y Polish         [░░░░░░░░░░]   0%
Deployment                      [██████████] 100% ✅

TOTAL MVP                       [█████░░░░░]  50%
```

---

## 🎯 PRÓXIMO PASO: Sprint 3.1 - Sistema de Reacciones

### ¿Qué sigue ahora?

Implementar el sistema completo de reacciones (likes, helpful, found) para que los usuarios puedan interactuar con los posts.

#### Sprint 3.1: Sistema de Reacciones (2-3 días)
**Objetivo:** Permitir a los usuarios reaccionar a posts con diferentes tipos de emociones.

**Tareas prioritarias:**
1. 🔲 Crear modelo Reaction en Mongoose
   - userId, postId, type (like/helpful/found)
   - Índice único compuesto (userId + postId)
   
2. 🔲 API: POST /api/posts/[postId]/reactions
   - Toggle reacción (add/remove)
   - Validar usuario autenticado
   - Actualizar contador en Post
   
3. 🔲 API: GET /api/posts/[postId]/reactions
   - Obtener todas las reacciones de un post
   - Agrupar por tipo
   
4. 🔲 Crear componente ReactionButton
   - Iconos animados para cada tipo
   - Estado activo/inactivo
   - Optimistic updates
   
5. 🔲 Integrar en PostCard y PostDetail
   - Mostrar contadores
   - Highlight si el usuario reaccionó
   - Animaciones suaves

**Duración estimada:** 2-3 días (6-8 horas)

**Criterios de éxito:**
- ✅ Puedo dar/quitar reacciones
- ✅ Solo una reacción por usuario por post
- ✅ Contadores actualizan en tiempo real
- ✅ UI muestra mi reacción actual
- ✅ Animaciones fluidas
- ✅ Funciona en mobile y desktop

**Pendiente para Sprint 3.2:**
- Sistema de comentarios con replies
- Imágenes en comentarios
- Ubicación en comentarios

---

**💡 Tips:**
- Actualiza este checklist regularmente
- Marca items conforme los completes
- No te saltes items críticos
- Pide ayuda si te atascas más de 1 día

**🎯 ¡Enfoque en completar el MVP primero, optimizaciones después!**
