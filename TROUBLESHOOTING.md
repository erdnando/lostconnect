# ⚠️ Problemas Comunes y Soluciones

Este documento contiene soluciones a problemas frecuentes que puedes encontrar durante el desarrollo.

---

## 🔧 Instalación y Setup

### Error: "Cannot find module 'next'"

**Síntoma:**
```
Error: Cannot find module 'next'
```

**Solución:**
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

### Error: "EADDRINUSE: address already in use :::3000"

**Síntoma:**
Puerto 3000 ya está en uso.

**Solución (Windows PowerShell):**
```powershell
# Encontrar proceso usando puerto 3000
netstat -ano | findstr :3000

# Matar proceso (reemplaza PID con el número del proceso)
taskkill /PID <PID> /F

# O cambiar puerto
npm run dev -- -p 3001
```

---

## 🗄️ MongoDB

### Error: "MongooseServerSelectionError: connect ECONNREFUSED"

**Síntoma:**
No puede conectar a MongoDB.

**Solución:**
1. Verifica que `MONGODB_URI` esté en `.env.local`
2. Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas
3. Verifica las credenciales del usuario de MongoDB
4. Reinicia el servidor de desarrollo

**Agregar IP en MongoDB Atlas:**
1. Ve a "Network Access"
2. Click "Add IP Address"
3. Agrega tu IP actual o `0.0.0.0/0` (solo para desarrollo)

---

### Error: "MongooseError: Connection 0 to [database] is not open"

**Síntoma:**
Mongoose intenta usar una conexión cerrada.

**Solución:**
- Asegúrate de llamar a `connectDB()` antes de usar modelos
- Verifica que no haya múltiples instancias de Mongoose
- Reinicia el servidor

---

## 🔐 Autenticación

### Error: "NEXTAUTH_URL not set"

**Síntoma:**
```
Error: NEXTAUTH_URL environment variable is not set
```

**Solución:**
En `.env.local`, asegúrate de tener:
```env
NEXTAUTH_URL=http://localhost:3000
```

Reinicia el servidor después de agregar.

---

### Error: "Callback URL mismatch" (Google OAuth)

**Síntoma:**
Google muestra error de redirect URI.

**Solución:**
1. Ve a Google Cloud Console
2. Credentials → OAuth 2.0 Client IDs
3. Agrega estas URIs en "Authorized redirect URIs":
   ```
   http://localhost:3000/api/auth/callback/google
   https://tu-dominio.vercel.app/api/auth/callback/google
   ```
4. Guarda y espera unos minutos para que se propague

---

### Session no persiste después de login

**Síntoma:**
Usuario hace login pero al recargar página, la sesión se pierde.

**Posibles causas y soluciones:**

1. **Cookies bloqueadas:**
   - Verifica configuración de cookies del navegador
   - En desarrollo, asegúrate de usar `http://localhost` (no IP)

2. **NEXTAUTH_SECRET no configurado:**
   ```env
   # Genera uno nuevo
   NEXTAUTH_SECRET=tu-secret-generado
   ```

3. **Modo incógnito:**
   - Testea en ventana normal, no incógnito

---

## 🖼️ Cloudinary

### Error al subir imágenes

**Síntoma:**
```
Error: Invalid API credentials
```

**Solución:**
1. Verifica en `.env.local`:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
   CLOUDINARY_API_KEY=tu-api-key
   CLOUDINARY_API_SECRET=tu-api-secret
   ```
2. Asegúrate de que `NEXT_PUBLIC_` esté en CLOUD_NAME
3. Reinicia el servidor

---

### Imágenes no se muestran

**Síntoma:**
URL de Cloudinary devuelve 404.

**Solución:**
- Verifica que el `publicId` sea correcto
- Asegúrate de que la imagen se subió exitosamente
- Verifica que el cloud name sea correcto en la URL

---

## 🎨 Tailwind CSS

### Estilos no se aplican

**Síntoma:**
Clases de Tailwind no tienen efecto.

**Solución:**

1. **Verifica `tailwind.config.ts`:**
   ```typescript
   content: [
     './pages/**/*.{js,ts,jsx,tsx,mdx}',
     './components/**/*.{js,ts,jsx,tsx,mdx}',
     './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   ```

2. **Reinicia el servidor:**
   ```bash
   npm run dev
   ```

3. **Limpia cache de Next.js:**
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### Autocomplete de Tailwind no funciona (VS Code)

**Solución:**
1. Instala la extensión "Tailwind CSS IntelliSense"
2. En `settings.json` de VS Code:
   ```json
   {
     "tailwindCSS.experimental.classRegex": [
       ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
       ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
     ]
   }
   ```

---

## ⚡ TypeScript

### Error: "Type 'X' is not assignable to type 'Y'"

**Síntoma:**
Errores de tipos en componentes o funciones.

**Soluciones:**

1. **Asegúrate de usar los types correctos:**
   ```typescript
   import type { Post } from '@/types';
   ```

2. **Usa type assertions cuando sea necesario:**
   ```typescript
   const post = data as Post;
   ```

3. **Verifica tipos de Mongoose:**
   ```typescript
   // Usar .toObject() para convertir documentos
   const plainPost = post.toObject();
   ```

---

### Error: "Cannot find module '@/...' or its corresponding type declarations"

**Síntoma:**
Imports con `@/` no se resuelven.

**Solución:**
Verifica `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 🐛 Runtime Errors

### Error: "Hydration failed"

**Síntoma:**
```
Error: Hydration failed because the initial UI does not match...
```

**Causas comunes:**

1. **Contenido dinámico en Server Components:**
   ```typescript
   // ❌ Mal
   <div>{new Date().toString()}</div>
   
   // ✅ Bien (usar Client Component)
   'use client'
   <div suppressHydrationWarning>{new Date().toString()}</div>
   ```

2. **HTML inválido:**
   - No anidar `<p>` dentro de `<p>`
   - No poner `<div>` dentro de `<p>`

3. **Extensiones del navegador:**
   - Desactiva extensiones que modifiquen el DOM

---

### Error: "Failed to fetch"

**Síntoma:**
API calls fallan en el cliente.

**Soluciones:**

1. **Verifica la URL:**
   ```typescript
   // ✅ Correcto
   fetch('/api/posts')
   
   // ❌ Incorrecto
   fetch('http://localhost:3000/api/posts') // Hardcoded
   ```

2. **Verifica que el endpoint exista:**
   ```bash
   # Debería devolver respuesta
   curl http://localhost:3000/api/posts
   ```

3. **Verifica CORS (si aplica):**
   - En desarrollo local, CORS no debería ser problema
   - En producción, verifica headers

---

## 📱 Responsive Design

### Diseño se ve mal en móvil

**Solución:**

1. **Verifica viewport meta tag en `layout.tsx`:**
   ```tsx
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

2. **Usa breakpoints de Tailwind:**
   ```tsx
   <div className="text-sm md:text-base lg:text-lg">
     {/* Responsive text */}
   </div>
   ```

3. **Testea en Chrome DevTools:**
   - F12 → Toggle device toolbar
   - Prueba diferentes dispositivos

---

## 🚀 Vercel Deployment

### Error: "Build failed"

**Síntoma:**
Deployment falla en Vercel.

**Soluciones:**

1. **Errores de TypeScript:**
   - Corre `npx tsc --noEmit` localmente
   - Corrige todos los errores antes de push

2. **Variables de entorno:**
   - Agrega TODAS las variables en Vercel Dashboard
   - Settings → Environment Variables

3. **Dependencias:**
   ```bash
   # Asegúrate de que todas estén en package.json
   npm install
   ```

---

### Error: "Module not found" en producción

**Síntoma:**
Funciona localmente pero no en Vercel.

**Solución:**

1. **Verifica imports case-sensitive:**
   ```typescript
   // ❌ Mal (si el archivo es User.ts)
   import { User } from '@/lib/models/user'
   
   // ✅ Bien
   import { User } from '@/lib/models/User'
   ```

2. **Verifica extensiones de archivo:**
   - Incluye `.ts`, `.tsx` en imports cuando sea necesario

---

## 🔄 Development Workflow

### Cambios no se reflejan en el navegador

**Soluciones:**

1. **Hard refresh:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Limpiar cache de Next.js:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Reiniciar el servidor:**
   - `Ctrl + C` para detener
   - `npm run dev` para iniciar

---

## 📞 Obtener Ayuda

Si ninguna solución funciona:

1. **Revisa los logs completos:**
   - Terminal del servidor
   - Console del navegador (F12)

2. **Busca el error exacto:**
   - Google el mensaje de error
   - Stack Overflow
   - GitHub Issues de la librería

3. **Consulta documentación oficial:**
   - [Next.js Docs](https://nextjs.org/docs)
   - [MongoDB Docs](https://docs.mongodb.com/)
   - [NextAuth Docs](https://next-auth.js.org/)

4. **Crea un issue mínimo reproducible:**
   - Aisla el problema
   - Crea ejemplo mínimo que lo reproduzca

---

**💡 Tip:** Mantén este archivo actualizado con nuevos problemas que encuentres y sus soluciones.
