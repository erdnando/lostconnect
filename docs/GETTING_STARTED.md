# 🚀 Guía Rápida de Inicio

Esta guía te llevará paso a paso para tener el proyecto corriendo en tu máquina local.

## ⚡ Quick Start (5 minutos)

### 1. Clonar e Instalar

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/lostconnect.git
cd lostconnect

# Instalar dependencias
npm install --legacy-peer-deps
```

### 2. Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Crea una cuenta gratuita (Free Tier - M0)
3. Crea un nuevo cluster
4. En "Database Access", crea un usuario con password
5. En "Network Access", agrega tu IP (o 0.0.0.0/0 para desarrollo)
6. Haz clic en "Connect" → "Connect your application"
7. Copia la URI de conexión

### 3. Configurar Vercel (Opcional para Deployment)

**Nota:** Puedes configurar Vercel ahora o después, pero es útil tenerlo listo desde el inicio para deploys rápidos.

#### 3.1. Crear cuenta y proyecto

1. Ve a [Vercel](https://vercel.com/signup)
2. Crea una cuenta (puedes usar tu cuenta de GitHub)
3. Una vez dentro, haz clic en "Add New..." → "Project"
4. Importa tu repositorio de GitHub (o crea uno nuevo)

#### 3.2. Configurar desde CLI (Alternativa)

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login a Vercel
vercel login
# Sigue las instrucciones en el navegador

# Inicializar proyecto (desde la raíz del proyecto)
vercel

# Responde las preguntas del wizard:
# - Set up and deploy? Yes
# - Which scope? [tu-cuenta]
# - Link to existing project? No
# - What's your project's name? lostconnect
# - In which directory is your code located? ./
# - Want to override the settings? No
```

#### 3.3. Configurar Variables de Entorno en Vercel

**Opción A: Desde el Dashboard**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables de tu `.env.local`:
   - `MONGODB_URI`
   - `NEXTAUTH_URL` (usa `https://tu-proyecto.vercel.app`)
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NODE_ENV` (set to `production`)

**Opción B: Desde CLI**
```bash
# Agregar variables una por una
vercel env add MONGODB_URI
# Ingresa el valor cuando te lo pida
# Selecciona: Production, Preview, Development

# O agregar desde archivo
vercel env pull .env.production.local
```

#### 3.4. Deploy

```bash
# Deploy a preview (para testing)
vercel

# Deploy a producción
vercel --prod
```

**URLs generadas:**
- Preview: `https://lostconnect-git-main-tu-usuario.vercel.app`
- Production: `https://lostconnect.vercel.app` (o tu dominio custom)

#### 3.5. Configurar Dominio Custom (Opcional)

1. En Vercel Dashboard → Settings → Domains
2. Agrega tu dominio
3. Sigue las instrucciones para configurar DNS

#### 3.6. Auto-Deploy desde Git

Una vez conectado el repo:
- Cada `git push` a `main` → Deploy automático a producción
- Cada `git push` a otras ramas → Preview deployment

**💡 Tip:** Copia la URL de producción de Vercel antes de configurar Google OAuth, la necesitarás para los redirect URIs.

### 4. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita "Google+ API"
4. Ve a "Credentials" → "Create Credentials" → "OAuth client ID"
5. Tipo de aplicación: "Web application"
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://tu-dominio.vercel.app/api/auth/callback/google` (producción)
7. Copia Client ID y Client Secret

**⚠️ Importante:** Si ya configuraste Vercel, asegúrate de agregar también:
   - `https://tu-proyecto.vercel.app/api/auth/callback/google`

### 5. Configurar Cloudinary

1. Ve a [Cloudinary](https://cloudinary.com/users/register/free)
2. Crea una cuenta gratuita
3. En el Dashboard, encontrarás:
   - Cloud Name
   - API Key
   - API Secret

### 6. Crear archivo .env.local

```bash
# Copiar el ejemplo
cp .env.example .env.local
```

Edita `.env.local` con tus valores:

```env
# Database
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/lostconnect?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-un-secret-con-openssl-rand-base64-32

# Google OAuth
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# Environment
NODE_ENV=development
```

### 7. Generar NEXTAUTH_SECRET

En PowerShell:
```powershell
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

O en Git Bash/Linux:
```bash
openssl rand -base64 32
```

### 8. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎯 Primeros Pasos

### Verificar Conexión a MongoDB

El servidor te mostrará en consola:
```
✅ MongoDB conectado exitosamente
```

### Hacer Login

1. Haz clic en "Iniciar Sesión"
2. Selecciona tu cuenta de Google
3. Autoriza la aplicación
4. Serás redirigido al feed

### Crear tu Primer Post

1. Haz clic en el botón "+"
2. Llena el formulario:
   - Tipo: Perdido/Encontrado
   - Título
   - Descripción
   - Categoría
   - Sube una foto
   - (Opcional) Agrega ubicación
3. Haz clic en "Publicar"

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"

**Solución:**
- Verifica que tu IP esté en la whitelist de MongoDB Atlas
- Comprueba que la URI en `.env.local` sea correcta
- Asegúrate de que el usuario de MongoDB tenga permisos

### Error: "NEXTAUTH_URL not set"

**Solución:**
- Verifica que `.env.local` exista en la raíz del proyecto
- Asegúrate de que `NEXTAUTH_URL=http://localhost:3000` esté presente
- Reinicia el servidor (`npm run dev`)

### Error: "Google OAuth redirect_uri_mismatch"

**Solución:**
- Ve a Google Cloud Console
- En las credenciales OAuth, agrega:
  - `http://localhost:3000/api/auth/callback/google`
- Espera unos segundos y recarga la página

### Error al subir imágenes

**Solución:**
- Verifica las credenciales de Cloudinary en `.env.local`
- Asegúrate de que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` tenga el prefijo `NEXT_PUBLIC_`

## 📚 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar build
npm start

# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Verificar variables de entorno
npm run check-env
```

## 🔍 Estructura de Archivos Importante

```
.
├── app/                 # Páginas y API routes
├── components/          # Componentes React
├── lib/
│   ├── db/             # Conexión MongoDB
│   ├── models/         # Modelos Mongoose
│   ├── validations/    # Schemas Zod
│   └── utils/          # Utilidades
├── types/              # TypeScript types
├── .env.local          # Variables de entorno (NO commitear)
├── .env.example        # Ejemplo de variables
└── PLAN_MAESTRO.md     # Documentación completa
```

## 🎨 Próximos Pasos

1. **Personaliza el diseño**: Edita `app/globals.css` y componentes en `components/ui/`
2. **Agrega features**: Consulta el `PLAN_MAESTRO.md` para ver el roadmap
3. **Deploy a Vercel**: Sigue la sección "Deployment" en `README.md`

## 📖 Documentación Adicional

- [PLAN_MAESTRO.md](./PLAN_MAESTRO.md) - Plan completo del proyecto
- [ESTRUCTURA.md](./ESTRUCTURA.md) - Estructura de carpetas detallada
- [README.md](./README.md) - Información general

## 💬 ¿Necesitas Ayuda?

- Revisa el `PLAN_MAESTRO.md` para entender la arquitectura
- Consulta la documentación oficial de [Next.js](https://nextjs.org/docs)
- Revisa los ejemplos en [NextAuth.js](https://next-auth.js.org/getting-started/example)

---

**🎉 ¡Listo! Ya puedes empezar a desarrollar tu red social de objetos perdidos.**
