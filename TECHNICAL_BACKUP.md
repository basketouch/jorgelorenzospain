# 🔧 Respaldo Técnico Completo - jorge-lorenzo-coach

**Fecha**: 25 de mayo de 2026  
**Propósito**: Documentación técnica y recuperación del sistema  
**Estado**: ✅ Producción activa

---

## 📊 INFORMACIÓN DEL REPOSITORIO

```
Repositorio: https://github.com/basketouch/jorge-lorenzo-coach (DEPRECATED)
Repositorio Nuevo: https://github.com/basketouch/jorgelorenzospain (USA market)

Rama activa: USA (en jorge-lorenzo-coach original)
Stack principal: Next.js + React + TypeScript
Hosting: Vercel
Base de datos: Supabase (autenticación y contenido)
```

---

## 🏗 ESTRUCTURA DE DIRECTORIOS

```
/tmp/jorge-lorenzo-coach/
├── app/                          # Aplicación Next.js principal
│   ├── src/
│   │   ├── app/                 # App Router
│   │   │   ├── page.tsx         # HOME - Página principal
│   │   │   ├── layout.tsx       # Layout raíz
│   │   │   ├── globals.css      # Estilos globales
│   │   │   ├── bio/
│   │   │   │   └── page.tsx     # Página de biografía
│   │   │   ├── stages/          # Pre-Season Tours
│   │   │   │   ├── page.tsx
│   │   │   │   ├── ContactoForm.tsx
│   │   │   │   └── StagesClient.tsx
│   │   │   ├── pages/
│   │   │   │   └── aceptacion-de-terminos-y-condiciones/
│   │   │   │       └── page.tsx
│   │   │   ├── cursos/
│   │   │   │   ├── laboratorio-2526/
│   │   │   │   └── [slug]/ (dinámico)
│   │   │   ├── ver/
│   │   │   │   ├── [slug]/
│   │   │   │   └── [slug]/[leccionId]/
│   │   │   └── preview/
│   │   │       └── [slug]/[leccionId]/
│   │   ├── components/          # React components
│   │   │   ├── Footer.tsx
│   │   │   ├── PreviewGate.tsx
│   │   │   ├── PlayerLayout.tsx
│   │   │   └── ... más componentes
│   │   └── lib/
│   │       ├── supabase-server.ts
│   │       └── ... utilidades
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── ... config files
├── index.html                   # Landing page estática (USA)
├── CONTENT_BACKUP.md           # Este respaldo - Contenido
├── TECHNICAL_BACKUP.md         # Este archivo - Técnica
└── fotos/                       # Assets de imágenes
    ├── Mundial Oro 19.png
    ├── Eurobasket Oro 22.jpg
    ├── Eurobasket jugs 2025.JPG
    ├── Eurobasket banquillo 2025.JPG
    ├── Con Ricky Rubio.png
    ├── Con Pau Gasol.png
    ├── Con Scariolo.png
    └── Con Santi Aldama.png
```

---

## 📦 DEPENDENCIAS PRINCIPALES

### package.json (app/)
```json
{
  "name": "app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "@supabase/supabase-js": "^2.x",
    "tailwindcss": "^3.x"
  }
}
```

### Versiones Críticas
- **Next.js**: 16.2.6 (con Turbopack)
- **React**: 19.2.4
- **Node**: LTS recomendado
- **TypeScript**: Versión compatible con Next.js 16

---

## 🔐 VARIABLES DE ENTORNO

### .env.local (Producción)
```
NEXT_PUBLIC_SUPABASE_URL=https://otsbpiukzftacmvmkajy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<clave_pública_supabase>
SUPABASE_SERVICE_ROLE_KEY=<clave_secreta_supabase>
```

**Nota**: Las variables específicas de Supabase se encuentran en Vercel secrets.

---

## 🚀 DESPLIEGUE Y HOSTING

### Vercel
- **Proyecto**: jorge-lorenzo-coach
- **URL principal**: https://www.jorgelorenzo.coach/
- **Plan**: Pro o superior (requiere serverless)
- **Build command**: `npm run build`
- **Output directory**: `.next`

### Configuración Vercel
```
Framework: Next.js
Build output: Optimized
Node.js version: 20.x (recomendado)
Environment: Production
Deployments automáticos: Enabled (rama main)
```

---

## 🗄 BASE DE DATOS - SUPABASE

### URL Base
```
https://otsbpiukzftacmvmkajy.supabase.co
```

### Tablas Principales (Estimadas)
- `usuarios` - Usuarios registrados
- `suscripciones` - Datos de planes (Skool)
- `cursos` - Catálogo de cursos/laboratorio
- `lecciones` - Contenido de lecciones
- `progreso` - Progreso del usuario

### Almacenamiento (Bucket Storage)
```
portadas/ - Imágenes destacadas, portadas de laboratorio
videos/ - Vídeos incrustados (si están hospedados)
assets/ - Otros activos
```

---

## 🔄 COMPONENTES PRINCIPALES

### Server Components (SSR)
- `/page.tsx` (HOME) - Requiere `createClient()` para auth
- `/bio/page.tsx` - Client component (useEffect)
- `/stages/page.tsx` - Server component (nuevo, sin Supabase)
- `/cursos/laboratorio-2526/page.tsx`
- `/ver/[slug]/page.tsx` - Dinámico (protegido)
- `/ver/[slug]/[leccionId]/page.tsx` - Dinámico (protegido)

### Client Components
- `ContactoForm.tsx` - Formulario en /stages
- `StagesClient.tsx` - Interactividad /stages
- `PreviewGate.tsx` - Gate de acceso
- `PlayerLayout.tsx` - Reproductor de videos
- `SidebarModulos.tsx` - Navegación de cursos
- `MarcarCompletada.tsx` - Progreso del usuario

---

## 🎨 DISEÑO Y ESTILOS

### Sistema de Diseño
```css
Color Scheme: Dark mode (--negro: #0a0a0a)
Primary: Oro (#c9a84c)
Secondary: Gris (#8a8f9a)
Cards: #16191f
Borders: #242830
Fonts: Helvetica Neue, sans-serif
```

### Responsive Design
- **Móvil**: < 720px (single column, stacked)
- **Tablet**: 720px - 1024px (2 columns)
- **Desktop**: > 1024px (multi-column, full layout)

### Utilidades CSS Clave
```css
.container { max-width: 900px; }
.btn-primary { background: var(--oro); }
.btn-secondary { color: var(--oro); border: 1px solid var(--oro); }
.tag { color: var(--oro); }
nav { position: fixed; backdrop-filter: blur(8px); }
```

---

## 📁 ARCHIVOS CRÍTICOS PARA PRESERVAR

### CÓDIGO FUENTE
| Archivo | Contenido | Prioridad |
|---------|-----------|-----------|
| `app/src/app/page.tsx` | HOME principal | 🔴 CRÍTICA |
| `app/src/app/layout.tsx` | Meta tags, estructura | 🔴 CRÍTICA |
| `app/src/app/globals.css` | Estilos globales | 🔴 CRÍTICA |
| `app/src/app/bio/page.tsx` | Página bio | 🟠 ALTA |
| `app/src/app/stages/page.tsx` | USA landing | 🟠 ALTA |
| `app/src/components/Footer.tsx` | Footer | 🟠 ALTA |
| `app/src/lib/supabase-server.ts` | Autenticación | 🔴 CRÍTICA |
| `app/src/middleware.ts` | Route protection | 🟡 MEDIA |

### IMÁGENES
| Archivo | Descripción | Prioridad |
|---------|-------------|-----------|
| `/fotos/Mundial Oro 19.png` | Campeón del Mundo | 🔴 CRÍTICA |
| `/fotos/Eurobasket Oro 22.jpg` | Campeón de Europa | 🔴 CRÍTICA |
| `/fotos/Con Scariolo.png` | Colaborador | 🟠 ALTA |
| `/fotos/Con Pau Gasol.png` | Colaborador | 🟠 ALTA |
| `/fotos/Con Ricky Rubio.png` | Colaborador | 🟠 ALTA |
| `/fotos/Con Santi Aldama.png` | Colaborador | 🟠 ALTA |
| `/fotos/Eurobasket banquillo 2025.JPG` | Hero image | 🟠 ALTA |
| `/fotos/Eurobasket jugs 2025.JPG` | Hero image | 🟠 ALTA |

### CONFIG
| Archivo | Contenido | Prioridad |
|---------|-----------|-----------|
| `package.json` | Dependencias | 🔴 CRÍTICA |
| `tsconfig.json` | Config TS | 🟡 MEDIA |
| `next.config.ts` | Config Next.js | 🟡 MEDIA |
| `.env.example` | Variables plantilla | 🟡 MEDIA |

---

## 🔑 DATOS SENSIBLES A PROTEGER

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` ✅ Público (en code)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅ Público (en code)
- `SUPABASE_SERVICE_ROLE_KEY` 🔒 **SECRETO** (solo en Vercel)

### Vercel
- Todos los env vars en "Settings > Environment Variables"
- Build secrets nunca en repositorio

### Contacto
- **Email**: info@basketouch.com (público)
- **WhatsApp**: +34 666 136 257 (público)

---

## 🔄 PROCESOS DE ACTUALIZACIÓN

### Agregar Contenido (Cursos, Lecciones)
1. Crear entrada en Supabase tabla `cursos` o `lecciones`
2. Subir vídeos a Supabase Storage o Vimeo
3. Crear página dinámico `/cursos/[slug]/page.tsx`
4. Deploy automático en Vercel

### Cambiar Precios (Tiers)
1. Actualizar array en `/page.tsx` (líneas 144-194)
2. Verificar en Skool que los planes coincidan
3. Commit + push → Deploy automático

### Actualizar Imágenes
1. Colocar en `/fotos/` para estáticas locales
2. O subir a Supabase Storage para CDN
3. Actualizar rutas en componentes
4. Verificar alt text para accesibilidad

### Newsletter
- Manejado externamente en https://newsletter.jorgelorenzo.coach/
- No requiere cambios en este repo

---

## 🛠 COMANDOS ÚTILES

### Desarrollo Local
```bash
cd app
npm install
npm run dev
# Acceder a http://localhost:3000
```

### Build Producción
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

### Verificar Build sin Deploy
```bash
vercel build --prod --no-push
```

### Deploy Manual a Vercel
```bash
vercel --prod
```

---

## ⚠️ RIESGOS Y RECUPERACIÓN

### Problema: Build falls en Vercel
**Causa probable**: Missing env vars o dependencias  
**Solución**:
1. Verificar `.env` en Vercel Settings
2. Revisar `package.json` versiones
3. Ejecutar `npm install` localmente
4. Commit + push nuevamente

### Problema: Imágenes no cargan
**Causa probable**: Rutas incorrectas o CDN caído  
**Solución**:
1. Verificar rutas en código (case-sensitive en Linux)
2. Verificar Supabase Storage si aplica
3. Usar URLs absolutas si es necesario

### Problema: Supabase desconectado
**Causa probable**: Keys expiradas o caídas  
**Solución**:
1. Verificar estado en https://status.supabase.com
2. Regenerar keys en Supabase dashboard
3. Actualizar vars en Vercel
4. Redeploy

### Recuperación Completa
1. Git clone del repositorio
2. `npm install` en `/app`
3. Copiar `.env.local` con vars reales
4. `npm run dev` para verificar
5. `npm run build` para validar
6. Push a rama main → auto-deploy en Vercel

---

## 📊 MONITOREO Y LOGS

### Vercel Logs
```
Dashboard: https://vercel.com/basketouch/jorge-lorenzo-coach
Build logs: Project > Deployments > [latest]
Runtime logs: Project > Functions > [route]
```

### Supabase Logs
```
Dashboard: https://supabase.com
Auth logs: Project > Auth > Logs
Database: Project > SQL Editor (queries)
Storage: Project > Storage
```

---

## 🔐 LISTA DE VERIFICACIÓN DE SEGURIDAD

- [ ] Variables sensibles NO en repositorio
- [ ] SSH keys configuradas en Vercel
- [ ] Supabase RLS policies activas
- [ ] Middleware protegiendo rutas privadas
- [ ] CORS configurado correctamente
- [ ] Headers de seguridad en Vercel
- [ ] Backups automáticos habilitados
- [ ] 2FA en Vercel y Supabase

---

## 📋 CHECKLIST DE BACKUP Y RECUPERACIÓN

### Diariamente
- [ ] Código en GitHub respaldado
- [ ] Imágenes en `/fotos/` presentes

### Semanalmente
- [ ] Exportar datos de Supabase
- [ ] Verificar logs de despliegue

### Mensualmente
- [ ] Prueba de recuperación completa
- [ ] Actualizar este documento
- [ ] Revisar dependencies por updates

---

## 🎯 REFERENCIAS RÁPIDAS

### URLs Importantes
| Recurso | URL |
|---------|-----|
| Sitio Principal | https://www.jorgelorenzo.coach/ |
| Admin Vercel | https://vercel.com/basketouch/jorge-lorenzo-coach |
| Admin Supabase | https://supabase.com/dashboard |
| Repositorio | https://github.com/basketouch/jorge-lorenzo-coach |
| Skool Comunidad | https://www.skool.com/jorge-lorenzo-coach/ |

### Contactos Técnicos
- **Email**: info@basketouch.com
- **WhatsApp**: +34 666 136 257
- **Vercel Support**: Contactar vía dashboard

---

## 📝 HISTORIAL DE CAMBIOS TÉCNICOS

### 25/05/2026 - IMPORTANTE
- ✅ **Middleware eliminado** - Causaba errores de Supabase en build
- ✅ **Rutas innecesarias eliminadas** - Limpieza de código legacy
- ✅ **Build ahora limpio** - Sin errores de dependencias faltantes
- ✅ **Deployments exitosos** - Vercel building sin issues

### Antes de 25/05/2026
- Stack inicial con Supabase autenticación
- Middleware para route protection
- Múltiples rutas ahora removidas

---

*Documento generado automáticamente. Última actualización: 25/05/2026*
