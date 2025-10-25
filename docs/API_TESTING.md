# 🧪 Testing de API - Sprint 2.1

Este documento contiene todos los tests que debes realizar para verificar que el backend de Posts funciona correctamente.

## 📋 Pre-requisitos

- Servidor corriendo: `npm run dev`
- Usuario autenticado (necesitas el session token)
- Herramienta de testing: Thunder Client, Postman, o curl

## 🔑 Obtener Session Token

**Importante:** NextAuth usa cookies httpOnly, así que necesitas copiar la cookie de tu navegador.

### Método 1: Desde el navegador

1. Abre el navegador y haz login en `http://localhost:3000`
2. Abre DevTools (F12) → Application → Cookies → localhost:3000
3. Copia el valor de la cookie que empieza con `__Secure-authjs.session-token` o `authjs.session-token`
4. Usa esta cookie en tus requests

### Método 2: Desde el navegador (más fácil)

Usa el navegador directamente para hacer las pruebas:
- Ve a `http://localhost:3000/api/posts` para ver el feed
- Usa extensiones como "ModHeader" para agregar headers personalizados

---

## 🧪 Tests de Endpoints

### 1. GET /api/health (Verificación previa)

**Propósito:** Verificar que MongoDB está conectado

```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET

# O abre en el navegador:
# http://localhost:3000/api/health
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-25T...",
  "database": {
    "connected": true,
    "name": "test"
  },
  "environment": {
    "mongodb": true,
    "nextauth": true,
    "cloudinary": true
  }
}
```

---

### 2. GET /api/posts (Feed de Posts)

**Propósito:** Obtener la lista de posts

#### Test 2.1: Feed básico (sin autenticación necesaria)

```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/posts" -Method GET
```

**Respuesta esperada:**
```json
{
  "success": true,
  "posts": [],
  "pagination": {
    "hasMore": false,
    "nextCursor": null
  }
}
```

#### Test 2.2: Feed con paginación

```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/posts?limit=5" -Method GET
```

#### Test 2.3: Feed filtrado por tipo

```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/posts?type=lost" -Method GET
```

---

### 3. POST /api/upload (Subir Imagen)

**Propósito:** Subir una imagen a Cloudinary

⚠️ **Requiere autenticación**

#### Test 3.1: Upload básico

Primero, necesitas convertir una imagen a base64. Aquí hay un script de PowerShell:

```powershell
# Convertir imagen a base64
$imagePath = "C:\ruta\a\tu\imagen.jpg"
$imageBytes = [System.IO.File]::ReadAllBytes($imagePath)
$imageBase64 = [System.Convert]::ToBase64String($imageBytes)
$mimeType = "image/jpeg"  # O "image/png", etc.
$base64String = "data:$mimeType;base64,$imageBase64"

# Guardar en un archivo para usar después
$base64String | Out-File -FilePath "image-base64.txt"
```

Luego usa el base64 en el request:

```json
POST http://localhost:3000/api/upload
Cookie: authjs.session-token=TU_TOKEN_AQUI

Body:
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "lostconnect/posts/...",
    "width": 1200,
    "height": 800
  }
}
```

---

### 4. POST /api/posts (Crear Post)

**Propósito:** Crear un nuevo post

⚠️ **Requiere autenticación**

#### Test 4.1: Crear post completo

```json
POST http://localhost:3000/api/posts
Cookie: authjs.session-token=TU_TOKEN_AQUI
Content-Type: application/json

Body:
{
  "type": "lost",
  "title": "Perdí mi mochila azul en el parque",
  "description": "Es una mochila azul marca Nike, con un llavero de Pokemon. La perdí el 24 de octubre en el Parque Central alrededor de las 3pm. Tiene mi laptop y documentos importantes dentro. Recompensa ofrecida.",
  "category": "accessories",
  "images": [
    {
      "url": "https://res.cloudinary.com/...",
      "publicId": "lostconnect/posts/...",
      "width": 1200,
      "height": 800
    }
  ],
  "location": {
    "coordinates": [-99.1332, 19.4326],
    "address": "Parque Central",
    "city": "Ciudad de México",
    "country": "México"
  },
  "tags": ["mochila", "nike", "laptop"]
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "post": {
    "_id": "...",
    "userId": {
      "_id": "...",
      "name": "Tu Nombre",
      "email": "tu@email.com",
      "image": "..."
    },
    "type": "lost",
    "title": "Perdí mi mochila azul en el parque",
    "description": "...",
    "category": "accessories",
    "images": [...],
    "location": {...},
    "tags": ["mochila", "nike", "laptop"],
    "status": "active",
    "commentsCount": 0,
    "reactionsCount": {
      "like": 0,
      "helpful": 0,
      "found": 0
    },
    "createdAt": "2025-10-25T...",
    "updatedAt": "2025-10-25T..."
  }
}
```

#### Test 4.2: Validación - título muy corto

```json
POST http://localhost:3000/api/posts
Body:
{
  "type": "lost",
  "title": "ABC",  // ❌ Muy corto (mínimo 5)
  "description": "Descripción de al menos 20 caracteres aquí...",
  "category": "other",
  "images": [...]
}
```

**Respuesta esperada:**
```json
{
  "success": false,
  "error": "Validación fallida",
  "details": [
    {
      "field": "title",
      "message": "El título debe tener al menos 5 caracteres"
    }
  ]
}
```

#### Test 4.3: Validación - descripción muy corta

```json
POST http://localhost:3000/api/posts
Body:
{
  "type": "lost",
  "title": "Objeto perdido",
  "description": "Muy corta",  // ❌ Muy corta (mínimo 20)
  "category": "other",
  "images": [...]
}
```

#### Test 4.4: Validación - sin imágenes

```json
POST http://localhost:3000/api/posts
Body:
{
  "type": "lost",
  "title": "Objeto perdido",
  "description": "Descripción de al menos 20 caracteres aquí...",
  "category": "other",
  "images": []  // ❌ Mínimo 1 imagen
}
```

---

### 5. GET /api/posts/[id] (Detalle de Post)

**Propósito:** Obtener un post específico

#### Test 5.1: Obtener post existente

```bash
# PowerShell (reemplaza POST_ID con un ID real)
$postId = "67123abc456def789..."
Invoke-WebRequest -Uri "http://localhost:3000/api/posts/$postId" -Method GET
```

**Respuesta esperada:**
```json
{
  "success": true,
  "post": {
    "_id": "...",
    "userId": {...},
    "type": "lost",
    "title": "...",
    ...
  }
}
```

#### Test 5.2: Post inexistente

```bash
$postId = "000000000000000000000000"
Invoke-WebRequest -Uri "http://localhost:3000/api/posts/$postId" -Method GET
```

**Respuesta esperada:**
```json
{
  "success": false,
  "error": "Post no encontrado"
}
```

#### Test 5.3: ID inválido

```bash
$postId = "abc123"
Invoke-WebRequest -Uri "http://localhost:3000/api/posts/$postId" -Method GET
```

**Respuesta esperada:**
```json
{
  "success": false,
  "error": "ID de post inválido"
}
```

---

### 6. PATCH /api/posts/[id] (Actualizar Post)

**Propósito:** Actualizar un post existente

⚠️ **Requiere autenticación**
⚠️ **Solo el dueño puede actualizar**

#### Test 6.1: Actualizar título y descripción

```json
PATCH http://localhost:3000/api/posts/POST_ID_AQUI
Cookie: authjs.session-token=TU_TOKEN_AQUI
Content-Type: application/json

Body:
{
  "title": "Nuevo título actualizado aquí",
  "description": "Nueva descripción actualizada con al menos 20 caracteres"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "post": {
    "_id": "...",
    "title": "Nuevo título actualizado aquí",
    "description": "Nueva descripción actualizada con al menos 20 caracteres",
    ...
  }
}
```

#### Test 6.2: Cambiar estado a resolved

```json
PATCH http://localhost:3000/api/posts/POST_ID_AQUI
Body:
{
  "status": "resolved"
}
```

#### Test 6.3: Intentar actualizar post de otro usuario

**Respuesta esperada:**
```json
{
  "success": false,
  "error": "No tienes permiso para editar este post"
}
```

---

### 7. DELETE /api/posts/[id] (Eliminar Post)

**Propósito:** Eliminar un post y sus imágenes

⚠️ **Requiere autenticación**
⚠️ **Solo el dueño puede eliminar**

#### Test 7.1: Eliminar post propio

```bash
# PowerShell
$postId = "POST_ID_AQUI"
Invoke-WebRequest -Uri "http://localhost:3000/api/posts/$postId" -Method DELETE -Headers @{
  "Cookie" = "authjs.session-token=TU_TOKEN_AQUI"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Post eliminado correctamente"
}
```

#### Test 7.2: Intentar eliminar post de otro usuario

**Respuesta esperada:**
```json
{
  "success": false,
  "error": "No tienes permiso para eliminar este post"
}
```

#### Test 7.3: Verificar que las imágenes se eliminaron de Cloudinary

1. Copia el `publicId` de una imagen antes de eliminar
2. Intenta acceder a la URL después de eliminar
3. Debería devolver error 404

---

## 📊 Checklist de Testing

### Tests Básicos
- [ ] GET /api/health retorna status OK
- [ ] GET /api/posts retorna array vacío inicialmente
- [ ] GET /api/posts con limit funciona
- [ ] GET /api/posts con type=lost filtra correctamente
- [ ] GET /api/posts con type=found filtra correctamente

### Upload de Imágenes
- [ ] POST /api/upload requiere autenticación
- [ ] POST /api/upload con imagen válida funciona
- [ ] POST /api/upload retorna URL de Cloudinary
- [ ] Imagen subida es accesible en la URL retornada

### Crear Posts
- [ ] POST /api/posts requiere autenticación
- [ ] POST /api/posts con datos válidos crea post
- [ ] POST /api/posts valida título mínimo 5 caracteres
- [ ] POST /api/posts valida descripción mínima 20 caracteres
- [ ] POST /api/posts valida al menos 1 imagen
- [ ] POST /api/posts valida máximo 5 imágenes
- [ ] POST /api/posts acepta ubicación opcional
- [ ] POST /api/posts acepta tags opcionales
- [ ] Post creado aparece en GET /api/posts

### Obtener Posts
- [ ] GET /api/posts/[id] retorna post existente
- [ ] GET /api/posts/[id] retorna 404 para post inexistente
- [ ] GET /api/posts/[id] valida formato de ID

### Actualizar Posts
- [ ] PATCH /api/posts/[id] requiere autenticación
- [ ] PATCH /api/posts/[id] actualiza post propio
- [ ] PATCH /api/posts/[id] rechaza actualizar post ajeno (403)
- [ ] PATCH /api/posts/[id] valida datos de entrada
- [ ] PATCH /api/posts/[id] puede cambiar status

### Eliminar Posts
- [ ] DELETE /api/posts/[id] requiere autenticación
- [ ] DELETE /api/posts/[id] elimina post propio
- [ ] DELETE /api/posts/[id] rechaza eliminar post ajeno (403)
- [ ] DELETE /api/posts/[id] elimina imágenes de Cloudinary
- [ ] Post eliminado no aparece en GET /api/posts

### Paginación
- [ ] GET /api/posts con cursor retorna posts siguientes
- [ ] GET /api/posts retorna hasMore correctamente
- [ ] GET /api/posts retorna nextCursor cuando hay más

---

## 🐛 Errores Comunes y Soluciones

### Error: "No autenticado"
**Solución:** Asegúrate de incluir la cookie de sesión en todos los requests que lo requieren.

### Error: "Failed to upload image to Cloudinary"
**Solución:** 
- Verifica que las variables de entorno de Cloudinary estén configuradas
- Verifica que el base64 sea válido
- Verifica que el formato de imagen sea soportado

### Error: "ValidationError: images: Cast to Array failed"
**Solución:** El schema de validación espera objetos con `{url, publicId}`, no strings.

### Error: "MongoServerError: E11000 duplicate key error"
**Solución:** Ya existe un post con el mismo _id (muy raro, reportar si ocurre).

---

## 📝 Notas Importantes

1. **Autenticación:** Todos los endpoints que modifican datos (POST, PATCH, DELETE) requieren autenticación.

2. **IDs de MongoDB:** Son strings hexadecimales de 24 caracteres. Ejemplo: `507f1f77bcf86cd799439011`

3. **Imágenes:** Deben estar en base64 con el formato `data:image/jpeg;base64,...`

4. **Paginación:** Usa cursor-based pagination para mejor performance. El cursor es el `_id` del último post cargado.

5. **Cloudinary:** Las imágenes se suben a la carpeta `lostconnect/posts/` automáticamente.

---

## ✅ Criterios de Éxito del Sprint 2.1

Para considerar el Sprint 2.1 completo, debes poder:

- [x] Crear servicios de Cloudinary y Post
- [x] Crear todos los endpoints de API
- [ ] Subir imágenes a Cloudinary exitosamente
- [ ] Crear posts con imágenes
- [ ] Obtener lista de posts
- [ ] Obtener detalle de un post
- [ ] Actualizar posts propios
- [ ] Eliminar posts propios
- [ ] Validaciones funcionando correctamente
- [ ] Permisos (solo dueño puede editar/eliminar) funcionando
- [ ] Paginación funcionando

---

**🎯 Próximo paso:** Una vez que todos los tests pasen, continuamos con **Sprint 2.2: UI de Posts**
