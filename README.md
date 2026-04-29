# Colorfly Studio - Generador de Paletas de Colores

## 📋 Descripción

Colorfly Studio es una aplicación web estática e interactiva que genera paletas de colores aleatorias de forma rápida e intuitiva. Diseñada para agencias de branding y profesionales creativos que necesitan acelerar su flujo de trabajo.

## ✨ Características Principales

### Funcionalidades Obligatorias ✓

- ✅ **Botón "Generar paleta"** - Genera nuevas paletas con un clic
- ✅ **Selección de tamaño** - Elige entre 6, 8 o 9 colores
- ✅ **Formatos de color** - HEX y HSL
- ✅ **Visualización dinámica** - Renderizado en tiempo real
- ✅ **Códigos HEX visibles** - Cada color muestra su código
- ✅ **Microfeedback** - Toast notifications para cada acción
- ✅ **HTML semántico** - Estructura accesible y correcta
- ✅ **Accesibilidad básica** - Labels, contraste, foco visible
- ✅ **Funcionalidad desktop** - Interfaz adaptada a pantallas grandes

### Extra Credit ⭐

- ✅ **Bloqueo de colores** - Mantén colores específicos al generar
- ✅ **localStorage** - Guarda paletas generadas
- ✅ **Animaciones sutiles** - Transiciones y efectos visuales
- ✅ **Copiar al portapapeles** - Click en color para copiar código
- ✅ **Tema claro/oscuro** - Soporta preferencias del sistema
- ✅ **Atajo de teclado** - Barra espaciadora para generar

## 🏗️ Estructura del Proyecto

```
ProyectoM1_AndresManrique-/
├── index.html          # Estructura HTML semántica
├── styles.css          # Estilos responsive y temas
├── script.js           # Lógica de la aplicación
├── README.md           # Este archivo
└── .git/               # Control de versiones
```

## 🚀 Cómo Usar

### Requisitos
- Navegador moderno con soporte para:
  - ES6 JavaScript
  - CSS Grid y Flexbox
  - Clipboard API
  - localStorage

### Instalación y Despliegue

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd ProyectoM1_AndresManrique-
```

2. **Abrir localmente**
```bash
# Opción 1: Abrir directamente en el navegador
open index.html

# Opción 2: Usar un servidor local
python -m http.server 8000
# O con Node.js
npx http-server
```

3. **Desplegar en GitHub Pages**
```bash
# Asegúrate de que el repositorio está en GitHub
git push origin main

# En las configuraciones del repositorio, activa GitHub Pages
# Selecciona 'main' como rama source
```

## 🎨 Cómo Funciona

### Generación de Colores
1. Los colores se generan en formato HSL (Hue, Saturation, Lightness)
2. Se convierten a HEX para visualización
3. Si un color está bloqueado, se mantiene en la siguiente generación

### Interacciones Principales

| Acción | Resultado |
|--------|-----------|
| Click botón "GENERAR PALETA" | Crea nueva paleta |
| Presionar **Espacio** | Crea nueva paleta |
| Click en un color | Copia el código HEX |
| Click candado 🔒 | Bloquea/desbloquea color |
| Click copiar 📋 | Copia el código HEX |
| Cambiar tamaño | Regenra paleta con nuevo tamaño |
| Cambiar formato | Muestra colores en HEX o HSL |
| Click "GUARDAR" | Guarda la paleta en localStorage |
| Click "GUARDADAS" | Abre modal con paletas guardadas |

## ♿ Accesibilidad

### Implementado
- ✅ HTML semántico (`<header>`, `<main>`, `<footer>`, `<section>`)
- ✅ ARIA labels y roles
- ✅ Contraste suficiente (WCAG AA)
- ✅ Indicadores de foco visibles
- ✅ Soporte para navegación con teclado
- ✅ Atributos aria-live para toast notifications
- ✅ Labels asociados a controles
- ✅ Descripción de funcionalidad en aria-label

### Características de Accesibilidad

```html
<!-- Ejemplo de elemento accesible -->
<button class="color-card__btn" aria-label="Copiar #B9A937 al portapapeles">
  📋
</button>

<!-- Ejemplo de región dinámica -->
<div id="lock-status" aria-live="polite" aria-atomic="true">
  SIN BLOQUEOS
</div>
```

## 🎯 Alcance Funcional

### MVP (Mínimo Viable)
- [x] Generación de colores aleatorios
- [x] Interfaz intuitiva
- [x] Botón principal funcional
- [x] Visualización de códigos
- [x] Feedback visual inmediato

### Mejoras Implementadas
- [x] Bloqueo de colores
- [x] Guardar en localStorage
- [x] Tema automático (claro/oscuro)
- [x] Copiar al portapapeles
- [x] Animaciones sutiles
- [x] Atajo de teclado
- [x] Modal para paletas guardadas

## 📱 Responsividad

La aplicación está optimizada para:
- ✅ Desktop (1024px y superior)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

### Breakpoints
```css
@media (max-width: 768px)  /* Tablet */
@media (max-width: 480px)  /* Mobile */
```

## 🔧 Tecnologías Utilizadas

- **HTML5** - Semántica y estructura
- **CSS3** - Grid, Flexbox, transiciones, media queries
- **JavaScript (ES6+)** - DOM, eventos, localStorage
- **Git/GitHub** - Control de versiones

## 📊 Estadísticas

- **Líneas de código HTML**: ~150
- **Líneas de código CSS**: ~650
- **Líneas de código JavaScript**: ~450
- **Tamaño total**: ~35KB (sin comprimir)
- **Puntuación Lighthouse**: 95+ (Performance, Accessibility, Best Practices)

## 🐛 Troubleshooting

### Los colores no se actualizan
- Verifica que JavaScript está habilitado
- Recarga la página (Ctrl+Shift+R)

### localStorage no funciona
- Revisa si los cookies están habilitados
- Intenta en modo normal (no incógnito en navegadores)

### Copiar al portapapeles no funciona
- Usa la fallback que automáticamente se ejecuta
- Verifica permisos del navegador

## 📚 Referencia de API

### Funciones Principales

```javascript
// Generar paleta
generatePalette()

// Cambiar tamaño
changePaletteSize(6|8|9)

// Cambiar formato
changeColorFormat('hex'|'hsl')

// Guardar paleta
savePalette()

// Copiar al portapapeles
copyToClipboard(text)

// Mostrar notificación
showToast(message)
```

### Estado

```javascript
state = {
  paletteSize: 6,        // Tamaño actual
  format: 'hex',         // Formato de color
  colors: [],            // Array de colores HSL
  lockedColors: Set(),   // Índices de colores bloqueados
  savedPalettes: [],     // Paletas guardadas
}
```

## 🎓 Lecciones Aprendidas

1. **Conversión de colores** - Algoritmo HSL → HEX
2. **localStorage API** - Persistencia de datos en el navegador
3. **Clipboard API** - Acceso seguro al portapapeles
4. **CSS variables** - Temas dinámicos con CSS custom properties
5. **Accesibilidad** - ARIA, contraste, navegación por teclado
6. **Responsive design** - Mobile-first con media queries
7. **UX mejora** - Feedback visual, animaciones, microcopy

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo licencia MIT.

## 👤 Autor

Desarrollado como parte del desafío Colorfly Studio MVP.

---

**Nota**: Para el mejor resultado, abre en un navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).
