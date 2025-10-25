# 🎮 Comandos Rápidos - LostConnect

Cheat sheet con los comandos más útiles para el desarrollo diario.

---

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000

# Detener servidor
# Ctrl + C
```

---

## 📦 Gestión de Dependencias

```bash
# Instalar todas las dependencias
npm install

# Instalar con legacy peer deps (si hay conflictos)
npm install --legacy-peer-deps

# Instalar nueva dependencia
npm install nombre-paquete

# Instalar dependencia de desarrollo
npm install -D nombre-paquete

# Actualizar dependencias
npm update

# Ver dependencias instaladas
npm list --depth=0

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🏗️ Build y Producción

```bash
# Build de producción
npm run build

# Ejecutar build localmente
npm start

# Limpiar cache de Next.js
rm -rf .next

# Build + Start
npm run build && npm start
```

---

## 🔍 Linting y Type Checking

```bash
# Ejecutar ESLint
npm run lint

# Auto-fix problemas de linting
npm run lint -- --fix

# Type checking (sin compilar)
npx tsc --noEmit

# Ver errores de TypeScript con detalles
npx tsc --noEmit --pretty
```

---

## 🗄️ MongoDB

```bash
# Conectar a MongoDB (desde mongo shell)
mongosh "tu-connection-string"

# Ver bases de datos
show dbs

# Usar base de datos
use lostconnect

# Ver colecciones
show collections

# Ver documentos de una colección
db.posts.find().pretty()

# Contar documentos
db.posts.countDocuments()

# Eliminar todos los documentos (¡cuidado!)
db.posts.deleteMany({})

# Crear índices manualmente (si es necesario)
db.posts.createIndex({ createdAt: -1 })
db.posts.createIndex({ userId: 1 })
```

---

## 🔐 Variables de Entorno

```bash
# Copiar ejemplo de env
cp .env.example .env.local

# Editar variables (Windows)
notepad .env.local

# Ver variables cargadas (en Node.js)
node -e "console.log(process.env.MONGODB_URI)"

# Generar NEXTAUTH_SECRET (PowerShell)
$bytes = New-Object Byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes); [Convert]::ToBase64String($bytes)

# Generar NEXTAUTH_SECRET (Git Bash/Linux)
openssl rand -base64 32
```

---

## 🔧 Git

```bash
# Inicializar repo (ya hecho por create-next-app)
git init

# Ver estado
git status

# Agregar todos los cambios
git add .

# Commit con mensaje
git commit -m "feat: descripción del cambio"

# Push a GitHub
git push origin main

# Ver historial
git log --oneline

# Crear nueva rama
git checkout -b feature/nueva-feature

# Volver a main
git checkout main

# Ver diferencias
git diff

# Deshacer cambios no commiteados
git checkout -- .

# Ver ramas
git branch
```

---

## 🚀 Vercel Deployment

```bash
# Instalar Vercel CLI (global)
npm install -g vercel

# Login a Vercel
vercel login

# Deploy (primera vez - sigue wizard)
vercel

# Deploy a producción
vercel --prod

# Ver logs de producción
vercel logs

# Ver variables de entorno
vercel env ls

# Agregar variable de entorno
vercel env add VARIABLE_NAME

# Pull latest deployment
vercel pull
```

---

## 📸 Cloudinary

```bash
# No hay CLI específico, pero puedes usar curl para testing

# Upload de imagen (testing)
curl -X POST https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload \
  -F "file=@/path/to/image.jpg" \
  -F "upload_preset=YOUR_PRESET"

# Eliminar imagen
curl -X DELETE https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/destroy \
  -F "public_id=YOUR_PUBLIC_ID" \
  -F "api_key=YOUR_API_KEY" \
  -F "api_secret=YOUR_API_SECRET"
```

---

## 🐛 Debugging

```bash
# Ver logs del servidor
# Están en la terminal donde corriste npm run dev

# Limpiar puerto 3000 (Windows PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Limpiar puerto 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Correr en puerto diferente
npm run dev -- -p 3001

# Ver variables de entorno cargadas
npm run dev -- --debug

# Modo verbose
npm run dev -- --verbose
```

---

## 🧪 Testing (Cuando se implemente)

```bash
# Ejecutar tests
npm test

# Tests en watch mode
npm test -- --watch

# Tests con coverage
npm test -- --coverage

# Tests específicos
npm test -- nombre-del-archivo
```

---

## 📱 Testing Responsive

```bash
# No hay comandos CLI, pero puedes usar:

# 1. Chrome DevTools
# F12 -> Toggle device toolbar (Ctrl+Shift+M)

# 2. ngrok (para testear en dispositivos reales)
npm install -g ngrok
ngrok http 3000
# Copia la URL y ábrela en tu móvil

# 3. Local Network
# Encuentra tu IP local
ipconfig  # Windows
ifconfig  # Mac/Linux
# Abre http://TU_IP:3000 en dispositivos en la misma red
```

---

## 📊 Performance

```bash
# Analizar bundle size
npm run build
# Revisa el output, muestra tamaño de cada página

# Lighthouse (Chrome DevTools)
# F12 -> Lighthouse tab -> Generate report

# Analizar con Next.js Bundle Analyzer
npm install @next/bundle-analyzer
# Agregar a next.config.ts y ejecutar
ANALYZE=true npm run build
```

---

## 🔄 Utilidades de Desarrollo

```bash
# Formatear código con Prettier (si lo instalas)
npm install -D prettier
npx prettier --write .

# Limpiar proyecto completo
rm -rf .next node_modules package-lock.json
npm install

# Ver tamaño de node_modules
du -sh node_modules  # Mac/Linux
Get-ChildItem -Recurse node_modules | Measure-Object -Property Length -Sum  # PowerShell

# Encontrar archivos grandes
find . -type f -size +1M  # Mac/Linux
Get-ChildItem -Recurse | Where-Object {$_.Length -gt 1MB}  # PowerShell
```

---

## 📝 Comandos Útiles de Node

```bash
# Ver versión de Node
node --version

# Ver versión de npm
npm --version

# Actualizar npm
npm install -g npm@latest

# Limpiar cache de npm
npm cache clean --force

# Ver paquetes desactualizados
npm outdated

# Ejecutar script del package.json
npm run nombre-del-script
```

---

## 🎨 Comandos de Tailwind

```bash
# Generar archivo CSS completo (no necesario normalmente)
npx tailwindcss -o output.css

# Ver configuración de Tailwind
npx tailwindcss config

# Purge CSS no usado (automático en build)
npm run build
```

---

## 📚 Comandos de Documentación

```bash
# Buscar en todos los archivos .md
grep -r "texto a buscar" *.md  # Mac/Linux
Select-String -Path *.md -Pattern "texto a buscar"  # PowerShell

# Contar líneas de documentación
find . -name "*.md" -exec wc -l {} +  # Mac/Linux
Get-ChildItem -Recurse -Filter "*.md" | Get-Content | Measure-Object -Line  # PowerShell

# Generar TOC (Table of Contents) para markdown
npm install -g markdown-toc
markdown-toc -i PLAN_MAESTRO.md
```

---

## 🔑 Shortcuts de VS Code

```
# No son comandos de terminal, pero son súper útiles:

Ctrl + P          # Buscar archivo
Ctrl + Shift + P  # Command palette
Ctrl + `          # Toggle terminal
Ctrl + B          # Toggle sidebar
Ctrl + /          # Toggle comment
Alt + Up/Down     # Mover línea
Ctrl + D          # Seleccionar siguiente ocurrencia
Ctrl + Shift + L  # Seleccionar todas las ocurrencias
F12               # Go to definition
Alt + F12         # Peek definition
Ctrl + Space      # Trigger autocomplete
```

---

## 🚨 Comandos de Emergencia

```bash
# Si nada funciona:

# 1. Limpiar TODO
rm -rf .next node_modules package-lock.json
npm install
npm run dev

# 2. Verificar puerto
netstat -ano | findstr :3000  # Windows
lsof -ti:3000  # Mac/Linux

# 3. Reiniciar computadora (último recurso 😅)
shutdown /r /t 0  # Windows
sudo reboot  # Linux
sudo shutdown -r now  # Mac

# 4. Restaurar a commit anterior
git log --oneline
git reset --hard COMMIT_HASH
```

---

## 💡 Tips

### Aliases útiles (PowerShell Profile)

Edita tu perfil:
```powershell
notepad $PROFILE
```

Agrega:
```powershell
function dev { npm run dev }
function build { npm run build }
function start { npm start }
function lint { npm run lint }
function clean { rm -rf .next, node_modules; npm install }
```

Recarga:
```powershell
. $PROFILE
```

Ahora puedes usar:
```bash
dev    # en lugar de npm run dev
build  # en lugar de npm run build
```

---

## 📖 Referencias Rápidas

- **Next.js CLI:** https://nextjs.org/docs/api-reference/cli
- **npm CLI:** https://docs.npmjs.com/cli/
- **Vercel CLI:** https://vercel.com/docs/cli
- **Git Cheatsheet:** https://education.github.com/git-cheat-sheet-education.pdf

---

**💾 Guarda este archivo en favoritos para acceso rápido!**
