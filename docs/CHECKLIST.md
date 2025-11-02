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

### Sprint 3.1: Sistema de Reacciones (Básico) ✅
- [x] Crear modelo Reaction en Mongoose
- [x] Agregar métodos estáticos: toggleReaction, getReactionCounts, getUserReaction
- [x] Agregar índices: userId+postId (unique), postId+type
- [x] API: POST /api/reactions (toggle con validación Zod)
- [x] API: GET /api/reactions?postId=xxx (counts + user reaction)
- [x] Crear componente ReactionButton con animaciones
- [x] Crear componente ReactionBar (3 botones: like, helpful, found)
- [x] Integrar ReactionBar en PostCard con optimistic updates
- [x] Agregar userReaction en getPosts (postService)
- [x] Actualizar API GET /api/posts para incluir currentUserId
- [x] Iconos: Heart (like), ThumbsUp (helpful), CheckCircle (found)
- [x] Colores institucionales La Salle aplicados
- [x] Testear toggle de reacciones

**Criterios Sprint 3.1:**
- [x] Puedo dar/quitar reacción
- [x] Solo una reacción por usuario
- [x] Contadores actualizan instantáneamente
- [x] UI muestra estado actual del usuario
- [x] Animaciones suaves (scale 110% en click)

### Sprint 3.2: Sistema de Comentarios (Básico) 🚧 EN PROGRESO
- [ ] Crear modelo Comment con:
  - userId, postId, content, images[], location
  - parentCommentId (para replies)
  - repliesCount
- [ ] API: POST /api/posts/[postId]/comments
- [ ] API: GET /api/posts/[postId]/comments
- [ ] API: DELETE /api/comments/[id]
- [ ] Crear CommentList component
- [ ] Crear CommentItem component
- [ ] Crear CommentForm component
- [ ] Crear CommentThread (replies anidados)
- [ ] Implementar sistema de replies con parentCommentId
- [ ] Soporte para imágenes en comentarios (Cloudinary)
- [ ] Soporte para ubicación en comentarios
- [ ] Botón "Responder"
- [ ] Contador de replies
- [ ] Actualizar commentsCount en Post
- [ ] Integrar en página /post/[id]

**Criterios Sprint 3.2:**
- [ ] Puedo comentar en posts
- [ ] Puedo responder a comentarios
- [ ] Replies se muestran anidados (max 2-3 niveles)
- [ ] Puedo agregar imágenes a comentarios
- [ ] Puedo agregar ubicación a comentarios
- [ ] Puedo eliminar mis comentarios
- [ ] Historial se mantiene en BD

### Sprint 3.3: Reacciones Mejoradas (Facebook-style) ⏳ FUTURO
**Objetivo:** Rediseñar sistema de reacciones con más expresividad emocional

**Mejoras:**
- [ ] Rediseñar esquema Reaction:
  - Cambiar enum type a: like, love, sad, wow, angry
  - Mantener índice único userId+postId
  - Script de migración de datos antiguos (helpful → like, found → wow)
- [ ] Implementar popup de reacciones:
  - Container con 5 emojis animados
  - Hover en desktop (mostrar al pasar mouse sobre botón)
  - Long-press en mobile (vibración háptica)
  - Animación de entrada: scale + fade
  - Selección: emoji aumenta de tamaño
- [ ] Nuevos iconos y colores:
  - 👍 Like (azul #1877F2)
  - ❤️ Love (rojo #F33E58)
  - 😢 Sad (amarillo #F7B125) - "Espero lo encuentres"
  - 😮 Wow (verde #53BDEB) - "¡Lo vi!"
  - 😡 Angry (naranja #F05D34) - contexto robo
- [ ] Actualizar ReactionButton:
  - Emoji animado según tipo seleccionado
  - Mostrar emoji en lugar de icono si usuario reaccionó
  - Count diferenciado por tipo (tooltip con breakdown)
- [ ] Actualizar ReactionBar:
  - Contenedor de popup posicionado arriba del botón
  - Animación suave de entrada/salida
  - Cerrar al clickear fuera o seleccionar
- [ ] Migración de datos:
  - Script para convertir "helpful" → "like"
  - Script para convertir "found" → "wow"
  - Backup de BD antes de migrar
- [ ] Actualizar UI de contadores:
  - Mostrar emojis más populares junto al count
  - Ej: "❤️😮 45" (Love y Wow son los más comunes)
- [ ] Testing completo:
  - Testear popup en desktop (hover)
  - Testear long-press en mobile
  - Testear animaciones en diferentes navegadores
  - Verificar migración de datos

**Criterios Sprint 3.3:**
- [ ] Popup muestra 5 reacciones al hover/long-press
- [ ] Puedo seleccionar cualquier reacción
- [ ] Emojis animados son expresivos
- [ ] Datos antiguos migrados correctamente
- [ ] Performance no se degrada
- [ ] Funciona perfecto en mobile y desktop

### Sprint 3.4: Comentarios Especiales "Tengo Información" ⏳ FUTURO
**Objetivo:** Crear tipo especial de comentario para reportes de avistamiento

**Características:**
- [ ] Extender modelo Comment:
  - Agregar campo: isInfoComment (boolean)
  - Agregar campo: verifiedByOwner (boolean, default false)
  - Agregar campo: helpfulness (number, votos de otros usuarios)
  - Mantener compatibilidad con comentarios normales
- [ ] Crear botón separado en PostCard:
  - Texto: "📍 Creo que lo vi" o "💡 Tengo información"
  - Posición: Junto a botón de comentarios
  - Badge si hay comentarios de info: "3 avistamientos"
  - Color: Verde La Salle (#22C55E) o dorado
- [ ] Crear modal/drawer especial InfoCommentForm:
  - Campo: Descripción detallada (obligatorio, min 50 chars)
  - Campo: Ubicación en mapa (obligatorio)
  - Campo: Fecha/hora del avistamiento (opcional)
  - Campo: Imagen (opcional pero recomendada)
  - Validación estricta antes de enviar
  - Preview del comentario antes de publicar
- [ ] Diseño diferenciado en CommentItem:
  - Borde grueso verde/dorado (4px)
  - Fondo ligeramente coloreado (#22C55E10)
  - Badge "💡 Información Importante" o "📍 Avistamiento"
  - Icono especial grande (👁️ o 📍)
  - Mostrar ubicación como mapa pequeño (clickeable)
  - Botón para ampliar imagen
  - Fecha/hora destacada si existe
- [ ] Sistema de verificación:
  - Owner del post puede marcar como "✓ Verificado"
  - Owner puede marcar como "✗ No útil"
  - Badge de estado junto al comentario
  - Notificación al comentarista si fue verificado
- [ ] Mostrar destacados:
  - Estos comentarios aparecen PRIMERO (antes que normales)
  - Orden: Verificados > No verificados > Por fecha
  - Separador visual entre comentarios info y normales
  - Contador separado: "3 avistamientos • 12 comentarios"
- [ ] Notificaciones prioritarias:
  - Push notification inmediata al dueño del post
  - Email si está configurado
  - Badge en navbar con número de info comments nuevos
- [ ] Sistema de votos de utilidad:
  - Otros usuarios pueden votar si fue útil (👍/👎)
  - Score de helpfulness visible
  - Orden también por helpfulness
- [ ] API endpoints:
  - POST /api/posts/[postId]/info-comments
  - PATCH /api/comments/[id]/verify (solo owner del post)
  - PATCH /api/comments/[id]/vote (cualquier usuario)
- [ ] Analytics:
  - Trackear tasa de resolución con info comments
  - Mostrar en stats del usuario: "Has ayudado a encontrar X objetos"

**Criterios Sprint 3.4:**
- [ ] Botón separado visible en PostCard
- [ ] Modal especial para crear info comment
- [ ] Validación estricta (descripción + ubicación)
- [ ] Diseño destacado en lista de comentarios
- [ ] Owner puede verificar/descartar info
- [ ] Notificación prioritaria funciona
- [ ] Sistema de votos operativo
- [ ] Comentarios info aparecen primero
- [ ] Contador separado en UI
- [ ] Analytics básicos funcionando

**Prioridad de Implementación:**
1. 🔥 Sprint 3.2 (Comentarios básicos) - AHORA
2. ⭐ Sprint 3.3 (Reacciones Facebook) - Después
3. 💡 Sprint 3.4 (Info Comments) - Después

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
FASE 3: Interacciones           [███░░░░░░░]  30% 🚧
  └─ Sprint 3.1 (Reacciones)    [██████████] 100% ✅
  └─ Sprint 3.2 (Comentarios)   [░░░░░░░░░░]   0% 🚧 EN PROGRESO
  └─ Sprint 3.3 (React FB)      [░░░░░░░░░░]   0% ⏳
  └─ Sprint 3.4 (Info Comms)    [░░░░░░░░░░]   0% ⏳
FASE 4: Perfil y Polish         [░░░░░░░░░░]   0%
Deployment                      [██████████] 100% ✅

TOTAL MVP                       [██████░░░░]  60%
```

---

## 🎯 PRÓXIMO PASO: Sprint 3.2 - Sistema de Comentarios Básico

### ¿Qué sigue ahora?

Implementar el sistema completo de comentarios con replies anidados, soporte para imágenes y ubicación.

#### Sprint 3.2: Sistema de Comentarios (4-6 horas)
**Objetivo:** Permitir a los usuarios comentar en posts y responder a otros comentarios.

**Tareas prioritarias:**
1. 🔲 Crear modelo Comment en Mongoose
   - userId, postId, content, images[], location
   - parentCommentId (para replies), repliesCount
   - Índices: postId, parentCommentId
   
2. 🔲 API: POST /api/posts/[postId]/comments
   - Validar usuario autenticado
   - Validar content (min 1 char, max 2000)
   - Subir imágenes a Cloudinary si existen
   - Actualizar commentsCount en Post
   - Actualizar repliesCount en parentComment si existe
   
3. 🔲 API: GET /api/posts/[postId]/comments
   - Obtener comentarios raíz (sin parentCommentId)
   - Paginación cursor-based
   - Populate userId
   - Incluir repliesCount
   
4. 🔲 API: DELETE /api/comments/[id]
   - Verificar ownership
   - Actualizar contadores
   
5. 🔲 Crear CommentList component
   - Mostrar lista de comentarios
   - Loading states
   - Empty state
   
6. 🔲 Crear CommentItem component
   - Mostrar contenido, autor, fecha
   - Mostrar imágenes si existen
   - Mostrar ubicación si existe
   - Botón "Responder"
   - Botón "Eliminar" (si es owner)
   - Botón "Ver X respuestas" (si tiene replies)
   
7. 🔲 Crear CommentForm component
   - Textarea para contenido
   - ImageUploader opcional
   - LocationPicker opcional
   - Character counter
   - Submit button
   
8. 🔲 Implementar CommentThread (replies)
   - Cargar replies al expandir
   - Mostrar anidados (max 2-3 niveles)
   - Formulario de reply inline

**Duración estimada:** 4-6 horas

**Criterios de éxito:**
- ✅ Puedo comentar en posts
- ✅ Puedo responder a comentarios
- ✅ Replies se muestran anidados
- ✅ Puedo agregar imágenes
- ✅ Puedo agregar ubicación
- ✅ Puedo eliminar mis comentarios
- ✅ Contadores actualizan correctamente

**Pendiente para Sprints futuros:**
- Sprint 3.3: Reacciones estilo Facebook con más emociones
- Sprint 3.4: Comentarios especiales "Tengo información"

---

**💡 Tips:**
- Actualiza este checklist regularmente
- Marca items conforme los completes
- No te saltes items críticos
- Pide ayuda si te atascas más de 1 día

**🎯 ¡Enfoque en completar el MVP primero, optimizaciones después!**
