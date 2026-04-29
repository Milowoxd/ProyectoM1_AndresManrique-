# 🚀 Instalación y Despliegue - Colorfly Studio

## Requisitos Previos

- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Acceso a GitHub (para desplegar en GitHub Pages)
- Editor de texto (VS Code recomendado)

## 📥 Instalación Local

### Opción 1: Clonar desde GitHub

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/ProyectoM1_AndresManrique-.git

# Navegar a la carpeta
cd ProyectoM1_AndresManrique-

# Abrir en navegador
open index.html
```

### Opción 2: Descargar ZIP

1. Ve a GitHub y descarga el ZIP
2. Extrae los archivos
3. Abre `index.html` en tu navegador

## 🌐 Despliegue en GitHub Pages

### Paso 1: Crear Repositorio en GitHub

```bash
# Si aún no tienes repositorio remoto
git remote add origin https://github.com/tu-usuario/ProyectoM1_AndresManrique-.git
git branch -M main
git push -u origin main
```

### Paso 2: Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: selecciona "main" branch
4. Click "Save"
5. Espera 1-2 minutos a que se construya

### Paso 3: Acceder a tu Sitio

Tu aplicación estará disponible en:
```
https://tu-usuario.github.io/ProyectoM1_AndresManrique-/
```

## 💻 Ejecutar Localmente con Servidor

### Python 3

```bash
cd /path/to/ProyectoM1_AndresManrique-
python -m http.server 8000
```

Luego abre: `http://localhost:8000`

### Node.js (con http-server)

```bash
# Instalar globalmente (si no lo tienes)
npm install -g http-server

# Ejecutar
cd /path/to/ProyectoM1_AndresManrique-
http-server

# Abre http://localhost:8080
```

### VS Code Live Server

1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. "Open with Live Server"
4. Se abrirá automáticamente en `http://localhost:5500`

## 📱 Pruebas en Dispositivos Móviles

### Si usas Live Server

1. Abre el terminal y busca tu IP local:
   ```bash
   ipconfig getifaddr en0  # Mac
   hostname -I             # Linux
   ```

2. Abre en tu móvil:
   ```
   http://TU_IP:5500
   ```

### Si desployas en GitHub Pages

Solo abre la URL de tu sitio GitHub Pages en el móvil.

## ✅ Verificación de Instalación

Comprueba que la aplicación funciona correctamente:

- [ ] Se carga sin errores
- [ ] Los colores se generan al hacer clic en "GENERAR PALETA"
- [ ] Puedo cambiar el tamaño (6, 8, 9)
- [ ] Puedo cambiar formato (HEX, HSL)
- [ ] Puedo copiar colores al portapapeles
- [ ] Puedo bloquear colores
- [ ] Puedo guardar paletas
- [ ] Las notificaciones toast aparecen
- [ ] El tema claro/oscuro funciona

## 🐛 Troubleshooting

### "No puedo abrir el archivo"
- Usa File → Open File en tu navegador
- O ejecuta con un servidor local (ver arriba)

### "Los colores no se actualizan"
- Recarga la página (Ctrl+Shift+R)
- Limpia la caché del navegador
- Verifica que JavaScript está habilitado

### "No puedo copiar al portapapeles"
- El navegador debe estar en HTTPS o localhost
- Los navegadores bloquean el acceso al portapapeles en archivos locales
- Usa un servidor local en su lugar

### "localStorage no funciona"
- Desactiva modo incógnito/privado
- Verifica que los cookies están permitidos
- Algunos navegadores no permiten localStorage en file://

### "El sitio en GitHub Pages no se actualiza"
- GitHub Pages cachea el contenido
- Espera 5-10 minutos
- Limpia el caché de tu navegador (Ctrl+Shift+Del)
- Verifica que el branch está configurado correctamente

## 📝 Estructura de Carpetas

```
ProyectoM1_AndresManrique-/
├── index.html          # Archivo principal
├── styles.css          # Estilos
├── script.js           # Lógica
├── README.md           # Documentación
├── FEATURES.md         # Características
├── ACCESIBILIDAD.md    # Guía de accesibilidad
├── INSTALACION.md      # Este archivo
├── .gitignore          # Archivos ignorados
└── .git/               # Control de versiones
```

## 🔧 Personalización

### Cambiar Colores Tema

En `styles.css`, modifica:

```css
:root {
    --color-bg: #f5f3f0;           /* Color de fondo */
    --color-text: #1a1a1a;         /* Color de texto */
    --color-primary: #1a1a1a;      /* Color primario */
    --color-accent: #ff6b6b;       /* Color de acentos */
}
```

### Cambiar Rango de Tamaños

En `script.js`, modifica la función `changePaletteSize()`:

```javascript
// Añadir nuevo tamaño en HTML
<button class="btn btn--size" data-size="12">12</button>

// La funcionalidad ya funciona automáticamente
```

### Desactivar localStorage

Si no deseas guardar paletas:

1. Abre `script.js`
2. Comenta las funciones: `savePalette()`, `restorePalette()`
3. Abre `index.html` y comenta el modal y botones de guardado

## 🚢 Despliegue en Otros Servicios

### Netlify

```bash
# Instala Netlify CLI
npm install -g netlify-cli

# Despliega
netlify deploy
```

### Vercel

```bash
# Instala Vercel CLI
npm install -g vercel

# Despliega
vercel
```

### Surge

```bash
# Instala Surge
npm install -g surge

# Despliega
surge
```

## 📊 Estadísticas de Proyecto

- **Líneas de Código**: ~1,300
- **Archivos**: 7 (HTML, CSS, JS, MD)
- **Tamaño Total**: 35KB
- **Dependencias Externas**: 0
- **Compatibilidad**: 95%+ navegadores

## 🎓 Comandos Git Útiles

```bash
# Ver estado
git status

# Ver commits
git log --oneline

# Crear nueva rama
git checkout -b feature/nombre

# Ver diferencias
git diff

# Deshacer cambios
git checkout -- archivo.txt

# Añadir todos los cambios
git add .

# Hacer commit
git commit -m "Mensaje descriptivo"

# Enviar a remoto
git push origin main
```

## 📞 Soporte

Si encuentras problemas:

1. Revisa el archivo README.md
2. Consulta FEATURES.md para entender funcionalidades
3. Revisa ACCESIBILIDAD.md para accesibilidad
4. Abre un issue en GitHub

---

**Última actualización**: 28 de abril de 2026
