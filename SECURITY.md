# 🔒 Security Guidelines

## ⚠️ IMPORTANTE: Credenciales Expuestas

Si tus credenciales fueron expuestas en GitHub, **DEBES** realizar las siguientes acciones INMEDIATAMENTE:

### 1. 🔴 Rotar Credenciales de MongoDB

1. Ve a [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navega a **Database Access**
3. **Elimina** el usuario comprometido (`erdnando_db_user`)
4. Crea un **nuevo usuario** con contraseña fuerte
5. Actualiza `MONGODB_URI` en `.env.local`
6. Considera agregar restricciones de IP

### 2. 🔴 Regenerar Google OAuth Secrets

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Navega a **APIs & Services > Credentials**
3. Encuentra tu OAuth 2.0 Client ID
4. **Regenera** el Client Secret
5. Actualiza `GOOGLE_CLIENT_SECRET` en `.env.local`

### 3. 🔴 Regenerar Cloudinary API Secret

1. Ve a [Cloudinary Dashboard](https://cloudinary.com/console)
2. Ve a **Settings > Security**
3. **Regenera** tu API Secret
4. Actualiza `CLOUDINARY_API_SECRET` en `.env.local`

### 4. 🔴 Regenerar NextAuth Secret

```bash
# PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# O con OpenSSL (Git Bash)
openssl rand -base64 32
```

Actualiza `NEXTAUTH_SECRET` en `.env.local`

### 5. 🧹 Limpiar Historial de Git (Opcional)

Si las credenciales están en el historial de commits:

```bash
# Usar BFG Repo-Cleaner
git clone https://github.com/erdnando/lostconnect.git --mirror
java -jar bfg.jar --replace-text passwords.txt lostconnect.git
cd lostconnect.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

O usar `git-filter-repo`:

```bash
pip install git-filter-repo
git filter-repo --path .env.example --invert-paths
```

### 6. 📧 Notificar a GitHub

Si GitHub te envió una alerta:
1. Responde el email confirmando que has rotado las credenciales
2. Cierra cualquier Secret Scanning Alert en tu repositorio

---

## 🛡️ Mejores Prácticas de Seguridad

### ✅ DO (Hacer):

- ✅ Usar `.env.local` para desarrollo (nunca commitear)
- ✅ Usar `.env.example` con valores de placeholder
- ✅ Usar variables de entorno en producción (Vercel, Railway, etc.)
- ✅ Rotar secrets periódicamente
- ✅ Usar GitHub Secret Scanning
- ✅ Habilitar autenticación de 2 factores en todos los servicios
- ✅ Usar IP Whitelisting en MongoDB cuando sea posible

### ❌ DON'T (No hacer):

- ❌ NUNCA commitear archivos `.env` o `.env.local`
- ❌ NUNCA poner credenciales reales en `.env.example`
- ❌ NUNCA compartir secrets por email, Slack, etc.
- ❌ NUNCA hardcodear secrets en el código
- ❌ NUNCA usar las mismas credenciales en múltiples proyectos

---

## 📋 Checklist de Seguridad

Después de rotar credenciales:

- [ ] MongoDB usuario y contraseña cambiados
- [ ] Google Client Secret regenerado
- [ ] Cloudinary API Secret regenerado
- [ ] NextAuth Secret regenerado
- [ ] `.env.local` actualizado con nuevos valores
- [ ] `.env.example` limpio (sin credenciales reales)
- [ ] Commit y push del `.env.example` limpio
- [ ] GitHub Secret Scanning alerts cerradas
- [ ] Monitoreo de accesos sospechosos en MongoDB Atlas
- [ ] Logs de Google OAuth revisados

---

## 🚨 En caso de brecha de seguridad:

1. **Inmediatamente** rotar TODAS las credenciales
2. Revisar logs de acceso en MongoDB, Google, Cloudinary
3. Cambiar contraseñas de las cuentas asociadas
4. Habilitar 2FA si no está activo
5. Monitorear por actividad sospechosa

---

## 📞 Contacto de Emergencia

Si detectas actividad sospechosa:
- MongoDB Atlas Support: https://support.mongodb.com/
- Google Cloud Support: https://cloud.google.com/support
- Cloudinary Support: https://support.cloudinary.com/

---

**Última actualización**: 25 de octubre, 2025
