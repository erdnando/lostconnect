# 🔐 Guía de Autenticación - LostConnect

## ✅ Archivos Creados

La autenticación con NextAuth.js v5 ha sido implementada con los siguientes archivos:

### Configuración y Lógica
- ✅ `lib/auth/auth.config.ts` - Configuración principal de NextAuth
- ✅ `lib/auth/mongodb-adapter.ts` - Adaptador personalizado para MongoDB
- ✅ `lib/auth/index.ts` - Exportaciones centralizadas
- ✅ `types/next-auth.d.ts` - Tipos de TypeScript personalizados

### API Routes
- ✅ `app/api/auth/[...nextauth]/route.ts` - Manejador de rutas de autenticación

### Páginas
- ✅ `app/auth/signin/page.tsx` - Página de inicio de sesión
- ✅ `app/auth/error/page.tsx` - Página de errores de autenticación

### Componentes
- ✅ `components/auth/AuthButton.tsx` - Botón de login/logout con menú
- ✅ `components/providers/SessionProvider.tsx` - Provider de sesión

### Middleware y Layouts
- ✅ `middleware.ts` - Protección de rutas
- ✅ `app/layout.tsx` - Layout actualizado con SessionProvider

### Modelos Actualizados
- ✅ `lib/models/User.ts` - Modelo actualizado con campo `accounts`

## 🚀 Cómo Probar la Autenticación

### 1. Verificar que el servidor esté corriendo

```powershell
npm run dev
```

El servidor debe estar en `http://localhost:3000`

### 2. Probar el flujo de autenticación

#### Opción A: Desde la página principal
1. Ve a [http://localhost:3000](http://localhost:3000)
2. Haz clic en el botón **"Iniciar Sesión"** (esquina superior derecha)
3. Serás redirigido a `/auth/signin`
4. Haz clic en **"Continuar con Google"**
5. Autoriza la aplicación en Google
6. Serás redirigido de vuelta a la página principal

#### Opción B: Directo a la página de login
1. Ve a [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
2. Haz clic en **"Continuar con Google"**
3. Autoriza la aplicación
4. Serás redirigido a la página principal

### 3. Verificar que estás autenticado

Una vez autenticado, deberías ver:
- ✅ Tu foto de perfil en la esquina superior derecha (en lugar del botón "Iniciar Sesión")
- ✅ Al hacer clic en tu foto, aparece un menú desplegable con:
  - Tu nombre
  - Tu email
  - Opciones: Mi Perfil, Configuración
  - Botón de "Cerrar Sesión"

### 4. Probar el cierre de sesión

1. Haz clic en tu avatar (esquina superior derecha)
2. Haz clic en **"Cerrar Sesión"**
3. Deberías ser redirigido a la página principal
4. El botón "Iniciar Sesión" debería aparecer de nuevo

### 5. Verificar la base de datos

Después de hacer login por primera vez, verifica que el usuario se guardó en MongoDB:

1. Ve a [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navega a tu cluster → Browse Collections
3. Busca la base de datos `lostconnect` (o el nombre en tu URI)
4. Busca la colección `users`
5. Deberías ver un documento con tu información de Google:
   ```json
   {
     "_id": "...",
     "name": "Tu Nombre",
     "email": "tu@email.com",
     "image": "https://...",
     "emailVerified": null,
     "accounts": {
       "google": "tu-google-id"
     },
     "createdAt": "...",
     "updatedAt": "..."
   }
   ```

## 🔍 Rutas de Autenticación

NextAuth.js crea automáticamente estas rutas:

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/api/auth/signin` | GET | Página de login (redirige a `/auth/signin`) |
| `/api/auth/signout` | POST | Cerrar sesión |
| `/api/auth/callback/google` | GET | Callback de Google OAuth |
| `/api/auth/session` | GET | Obtener sesión actual (JSON) |
| `/api/auth/csrf` | GET | Obtener token CSRF |
| `/api/auth/providers` | GET | Lista de proveedores disponibles |

### Probar la API de sesión

Puedes verificar tu sesión actual visitando:
- [http://localhost:3000/api/auth/session](http://localhost:3000/api/auth/session)

Si estás autenticado, verás:
```json
{
  "user": {
    "id": "...",
    "name": "Tu Nombre",
    "email": "tu@email.com",
    "image": "https://..."
  },
  "expires": "..."
}
```

Si NO estás autenticado, verás:
```json
{}
```

## 🛡️ Protección de Rutas

El middleware protege automáticamente todas las rutas excepto:
- `/` - Página principal (pública)
- `/api/health` - Health check (pública)
- `/auth/*` - Páginas de autenticación (públicas)
- `/api/auth/*` - API de NextAuth (públicas)

### Probar protección de rutas

1. Cierra sesión si estás autenticado
2. Intenta acceder a una ruta protegida (por ejemplo, crea `/profile`):
   - Deberías ser redirigido a `/auth/signin?callbackUrl=/profile`
3. Inicia sesión
4. Deberías ser redirigido automáticamente a `/profile`

## 🐛 Solución de Problemas

### Error: "redirect_uri_mismatch"

**Problema:** Google rechaza el redirect URI

**Solución:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Credentials → Edita tu OAuth Client
3. En "Authorized redirect URIs", asegúrate de tener:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
4. Guarda y espera 1-2 minutos para que se propague el cambio

### Error: "Cannot read properties of undefined (reading 'id')"

**Problema:** La sesión no tiene el ID del usuario

**Solución:**
- Cierra sesión completamente
- Limpia las cookies del navegador (F12 → Application → Cookies → localhost:3000)
- Vuelve a iniciar sesión

### Error: "Adapter error: User not found"

**Problema:** El adaptador no puede encontrar o crear el usuario

**Solución:**
- Verifica que MongoDB esté conectado: [http://localhost:3000/api/health](http://localhost:3000/api/health)
- Verifica que `MONGODB_URI` esté correcto en `.env.local`
- Revisa los logs de la consola del servidor

### Error: "NEXTAUTH_SECRET not set"

**Problema:** Falta la variable de entorno

**Solución:**
```powershell
# Genera un nuevo secret
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)

# Copia el resultado y agrégalo a .env.local:
# NEXTAUTH_SECRET=tu-secret-aqui
```

### Error: La sesión no persiste

**Problema:** La sesión se pierde al recargar

**Solución:**
- Verifica que `SessionProvider` esté en `app/layout.tsx`
- Verifica que estés usando `"use client"` en componentes que usen `useSession()`
- Limpia cookies y vuelve a intentar

## 📝 Uso en Componentes

### Server Components (por defecto en App Router)

```tsx
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <h1>Hola, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
```

### Client Components

```tsx
"use client";

import { useSession } from "next-auth/react";

export default function ProfileButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <p>Hola, {session.user.name}</p>
    </div>
  );
}
```

### API Routes

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "No autenticado" },
      { status: 401 }
    );
  }

  // Usuario autenticado
  return NextResponse.json({
    userId: session.user.id,
    email: session.user.email,
  });
}
```

## 🎯 Próximos Pasos

Una vez que la autenticación esté funcionando:

1. ✅ **Crear páginas protegidas:**
   - `/profile` - Perfil del usuario
   - `/settings` - Configuración de la cuenta
   - `/posts/new` - Crear nuevo post

2. ✅ **Agregar funcionalidad de posts:**
   - API routes para CRUD de posts
   - Formulario de creación de posts
   - Feed de posts

3. ✅ **Implementar comentarios y reacciones:**
   - Sistema de comentarios
   - Likes y reacciones
   - Notificaciones

Consulta el `ROADMAP.md` para ver el plan completo.

## 📚 Referencias

- [NextAuth.js v5 Documentation](https://authjs.dev/)
- [NextAuth.js with App Router](https://authjs.dev/getting-started/installation?framework=next.js)
- [Google OAuth Setup](https://console.cloud.google.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**¡La autenticación está lista! 🎉**

Ahora puedes empezar a construir las funcionalidades principales de la aplicación.
