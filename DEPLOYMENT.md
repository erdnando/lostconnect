# 🚀 Guía de Deployment - LostConnect

Esta guía te ayudará a desplegar tu aplicación en producción.

---

## 🎯 Opción 1: Vercel (RECOMENDADO)

**Ventajas:**
- ✅ Gratis para proyectos personales
- ✅ Integración automática con GitHub
- ✅ Deploy automático en cada push
- ✅ Dominio HTTPS gratuito
- ✅ Edge Functions y CDN global
- ✅ Variables de entorno seguras
- ✅ Cero configuración para Next.js

### 📋 Pasos para Deploy en Vercel

#### 1. Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. Selecciona "Continue with GitHub"
4. Autoriza Vercel para acceder a tu cuenta

#### 2. Importar el proyecto
1. En el dashboard de Vercel, haz clic en "Add New Project"
2. Busca el repositorio `erdnando/lostconnect`
3. Haz clic en "Import"

#### 3. Configurar el proyecto
Vercel detectará automáticamente que es un proyecto Next.js.

**Framework Preset:** `Next.js`
**Root Directory:** `./` (raíz)
**Build Command:** `npm run build` (auto-detectado)
**Output Directory:** `.next` (auto-detectado)

#### 4. Configurar Variables de Entorno

⚠️ **IMPORTANTE**: Agrega TODAS estas variables en Vercel:

```env
# Database
MONGODB_URI=mongodb+srv://TU_NUEVO_USER:TU_NUEVA_PASSWORD@cluster0.xxxxx.mongodb.net/lostconnect?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=TU_NUEVO_SECRET_GENERADO

# Google OAuth
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=TU_NUEVO_CLIENT_SECRET

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=TU_NUEVO_API_SECRET

# Environment
NODE_ENV=production
```

**Cómo agregar variables:**
1. En la página de configuración del proyecto
2. Ve a "Environment Variables"
3. Agrega cada variable una por una
4. Selecciona "Production", "Preview", y "Development"

#### 5. Actualizar Google OAuth

**Importante:** Agrega las URLs de Vercel a Google Cloud Console:

1. Ve a https://console.cloud.google.com/
2. Selecciona tu proyecto
3. Ve a "APIs & Services" → "Credentials"
4. Edita tu OAuth 2.0 Client ID
5. En "Authorized redirect URIs", agrega:
   ```
   https://tu-proyecto.vercel.app/api/auth/callback/google
   ```
6. En "Authorized JavaScript origins", agrega:
   ```
   https://tu-proyecto.vercel.app
   ```

#### 6. Actualizar MongoDB Atlas

**Whitelist de IPs para Vercel:**

MongoDB Atlas requiere whitelist de IPs. Para Vercel:

1. Ve a MongoDB Atlas → Network Access
2. Haz clic en "Add IP Address"
3. Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ Esto es necesario porque Vercel usa IPs dinámicas
   - Asegúrate de tener contraseñas fuertes

O mejor aún, usa MongoDB Atlas Data API o conexión VPN.

#### 7. Deploy!

1. Haz clic en "Deploy"
2. Espera 2-5 minutos
3. ¡Tu app estará live! 🎉

**URL:** `https://tu-proyecto.vercel.app`

---

## 🎯 Opción 2: Railway

**Ventajas:**
- ✅ Gratis hasta $5/mes de uso
- ✅ Deploy de Node.js, PostgreSQL, MongoDB
- ✅ Variables de entorno
- ✅ Logs en tiempo real

### Pasos para Railway

1. Ve a https://railway.app
2. Sign up con GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona `erdnando/lostconnect`
5. Agrega las mismas variables de entorno
6. Deploy automático

---

## 🎯 Opción 3: Netlify

**Ventajas:**
- ✅ Gratis con límites generosos
- ✅ Deploy automático desde GitHub
- ✅ Forms y Functions

### Pasos para Netlify

1. Ve a https://netlify.com
2. Sign up con GitHub
3. "Add new site" → "Import from Git"
4. Selecciona el repo
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Agrega variables de entorno

---

## 🎯 Opción 4: DigitalOcean App Platform

**Ventajas:**
- ✅ $5/mes (no gratis)
- ✅ Más control
- ✅ Bases de datos managed

### Pasos básicos

1. Ve a https://cloud.digitalocean.com
2. Create → Apps
3. Conecta GitHub repo
4. Configura build settings
5. Agrega variables de entorno

---

## 📋 Checklist Pre-Deployment

Antes de hacer deploy, asegúrate de:

- [ ] Todas las credenciales están rotadas y son seguras
- [ ] `.env.local` NO está en el repositorio
- [ ] `.gitignore` incluye todos los archivos sensibles
- [ ] MongoDB acepta conexiones desde la IP de tu hosting
- [ ] Google OAuth tiene las URLs correctas configuradas
- [ ] Has probado el build localmente: `npm run build && npm start`
- [ ] No hay errores de TypeScript: `npm run build`
- [ ] Cloudinary está configurado correctamente

---

## 🧪 Probar el Build Localmente

Antes de desplegar, prueba que todo funciona:

```bash
# Crear build de producción
npm run build

# Iniciar en modo producción
npm start

# Abrir http://localhost:3000 y probar todas las funcionalidades
```

---

## 🔧 Solución de Problemas Comunes

### Error: "MONGODB_URI is not defined"
- Asegúrate de agregar todas las variables de entorno en Vercel
- Verifica que están en "Production" environment

### Error: "NextAuth secret required"
- Genera nuevo secret: `openssl rand -base64 32`
- Agrégalo como `NEXTAUTH_SECRET` en Vercel

### Error: "CORS policy" o Google OAuth no funciona
- Actualiza las Authorized redirect URIs en Google Cloud Console
- Debe ser: `https://tu-dominio.vercel.app/api/auth/callback/google`

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB Atlas permite conexiones desde cualquier IP
- O agrega los IP ranges de Vercel (cambian frecuentemente)

### Error de Build: "Module not found"
- Asegúrate que todas las dependencias están en `package.json`
- Borra `node_modules` y reinstala: `npm ci`

---

## 📊 Monitoreo Post-Deployment

Después del deploy:

1. **Vercel Dashboard**: Ver logs, métricas, errores
2. **MongoDB Atlas**: Monitorear conexiones y uso
3. **Google Cloud Console**: Revisar uso de OAuth API
4. **Cloudinary**: Verificar uso de almacenamiento

---

## 🚀 Deploy Automático (CI/CD)

Con Vercel/Railway/Netlify, cada push a `main` desplegará automáticamente:

```
git push origin main
  ↓
GitHub webhook
  ↓
Vercel detecta cambios
  ↓
Build automático
  ↓
Deploy a producción
  ↓
✅ Live en 2-3 minutos
```

---

## 🔐 Seguridad en Producción

- ✅ Usa HTTPS siempre (Vercel lo hace automático)
- ✅ Variables de entorno nunca en el código
- ✅ MongoDB con usuario/contraseña fuerte
- ✅ Rate limiting en APIs (considera Upstash)
- ✅ Monitoring y alertas (Vercel Analytics)
- ✅ Backups de MongoDB regulares

---

## 💰 Costos Estimados

### Vercel (Hobby Plan - Gratis)
- 🆓 100 GB bandwidth/mes
- 🆓 Unlimited deployments
- 🆓 HTTPS automático
- 🆓 Variables de entorno ilimitadas

### MongoDB Atlas (Free Tier)
- 🆓 512 MB storage
- 🆓 Shared cluster
- 🆓 Ilimitado para desarrollo

### Cloudinary (Free Tier)
- 🆓 25 GB storage
- 🆓 25 GB bandwidth/mes
- 🆓 Hasta 25,000 transformaciones/mes

**Total: $0/mes** para proyectos pequeños 🎉

---

## 📚 Recursos Adicionales

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

---

**🎉 ¡Listo para production!**

Creado: 25 de octubre, 2025
