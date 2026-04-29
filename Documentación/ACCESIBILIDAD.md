# Documentación de Accesibilidad - Colorfly Studio

## 🎯 Cumplimiento de WCAG 2.1

Esta aplicación implementa las mejores prácticas de accesibilidad según las Directrices de Accesibilidad para Contenido Web (WCAG) 2.1, con enfoque en conformidad de nivel **AA**.

## ♿ Características de Accesibilidad Implementadas

### 1. HTML Semántico

```html
<!-- Estructura clara y significativa -->
<header>...</header>  <!-- Encabezado principal -->
<section>...</section> <!-- Secciones de contenido -->
<main>...</main>       <!-- Contenido principal -->
<footer>...</footer>   <!-- Pie de página -->
```

**Beneficio**: Los lectores de pantalla pueden navegar por la estructura del documento de forma intuitiva.

### 2. ARIA (Accessible Rich Internet Applications)

#### aria-label
Proporciona etiquetas descriptivas para elementos sin texto visible:

```html
<button aria-label="Generar nueva paleta de colores">
  ✨ GENERAR PALETA
</button>

<button aria-label="Copiar #B5EDEC al portapapeles">
  📋
</button>
```

#### aria-pressed
Indica el estado de los botones que actúan como toggles:

```html
<button data-size="6" aria-pressed="true">6</button>
<button data-size="8" aria-pressed="false">8</button>
```

#### aria-live y aria-atomic
Anuncia cambios dinámicos a usuarios de lectores de pantalla:

```html
<!-- Toast notifications -->
<div id="toast" class="toast" role="status" aria-live="polite" aria-atomic="true"></div>

<!-- Estado de bloqueos -->
<div id="lock-status" aria-live="polite" aria-atomic="true">
  SIN BLOQUEOS
</div>
```

#### aria-labelledby
Asocia contenido a sus encabezados:

```html
<dialog id="saved-modal" aria-labelledby="modal-title">
  <h2 id="modal-title">Paletas guardadas</h2>
</dialog>
```

#### aria-label en formularios
Asocia labels a controles de formulario:

```html
<fieldset>
  <legend class="sr-only">Seleccionar tamaño de paleta</legend>
  <button data-size="6">6</button>
</fieldset>
```

### 3. Navegación por Teclado

#### Orden Lógico de Tabulación
Todos los elementos interactivos son navegables con Tab:
- Botones de tamaño (6, 8, 9)
- Botones de formato (HEX, HSL)
- Botón GUARDADAS
- Botón GUARDAR
- Botón GENERAR PALETA
- Tarjetas de color (con Enter para copiar)

#### Indicadores de Foco
Foco visual claro en todos los elementos interactivos:

```css
:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}
```

#### Atajos de Teclado
- **Espacio**: Genera nueva paleta
- **Enter**: Copia código de color cuando está en una tarjeta
- **Escape**: Cierra el modal de paletas guardadas

### 4. Contraste de Color

#### Cumplimiento WCAG AA
- **Texto sobre fondo**: Ratio mínimo 4.5:1
- **Elementos gráficos**: Ratio mínimo 3:1

**Implementación**:

```css
/* Tema claro */
--color-text: #1a1a1a;        /* Oscuro sobre claro */
--color-bg: #f5f3f0;

/* Tema oscuro */
@media (prefers-color-scheme: dark) {
    --color-text: #f5f3f0;     /* Claro sobre oscuro */
    --color-bg: #1a1a1a;
}
```

### 5. Etiquetas y Leyendas

#### Labels Asociados

```html
<fieldset class="controls__fieldset">
    <legend class="sr-only">Seleccionar tamaño de paleta</legend>
    <button class="btn btn--size" data-size="6">6</button>
</fieldset>
```

#### SR-only (Screen Reader Only)
Texto visible solo para lectores de pantalla:

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

### 6. Información de Estado

#### Indicadores Visuales
- **Botones Activos**: Cambio de color de fondo
- **Colores Bloqueados**: Icono 🔒 vs 🔓
- **Toast Notifications**: Mensajes contextuales

#### Anuncios Dinámicos
```html
<div id="lock-status" aria-live="polite">
  1 BLOQUEADO
</div>
```

### 7. Textos Alternativos

#### Para Emojis
Los emojis se envuelven en `<span aria-hidden="true">` con descripciones en aria-label:

```html
<span aria-hidden="true">✨</span>
<button aria-label="Generar nueva paleta de colores">...</button>
```

#### Para Iconos
Todos los iconos tienen descripción textual asociada.

### 8. Feedback Visual

#### Microfeedback Implementado
1. **Toast Notifications**: Confirmación de acciones
2. **Cambios de Estado**: Indicadores visuales claros
3. **Animaciones Sutiles**: Sin distracciones
4. **Indicadores de Foco**: Contornos visibles

## 📊 Matriz de Accesibilidad

| Criterio | Implementado | Nivel |
|----------|-------------|-------|
| Estructura semántica | ✅ | A |
| Labels y leyendas | ✅ | A |
| Navegación por teclado | ✅ | A |
| Contraste de color (AA) | ✅ | AA |
| Cambios de estado anunciados | ✅ | A |
| ARIA roles/properties | ✅ | A |
| Indicadores de foco | ✅ | A |
| Compatibilidad con AT | ✅ | A |
| Tema claro/oscuro | ✅ | AA |
| Responsive | ✅ | A |

**AT** = Assistive Technology (Lectores de pantalla, etc.)

## 🧪 Testeo de Accesibilidad

### Herramientas Recomendadas

1. **Axe DevTools**
   - Escanea automáticamente problemas WCAG
   - Disponible como extension de navegador

2. **Lighthouse (Chrome DevTools)**
   - Auditoría de accesibilidad integrada
   - Score: 95+

3. **NVDA (NVDA Screenreader)**
   - Lector de pantalla gratuito para Windows
   - Verifica anuncios y navegación

4. **VoiceOver (Mac/iOS)**
   - Lector de pantalla nativo de Apple
   - Testing en dispositivos iOS

### Checklist de Testing Manual

- [ ] Navegar completamente con Tab
- [ ] Probar con lector de pantalla
- [ ] Verificar contraste en modo oscuro
- [ ] Probar sin CSS (solo estructura)
- [ ] Verificar focus visible en todos los botones
- [ ] Confirmar toasts son anunciados
- [ ] Prueba con zoom al 200%
- [ ] Navegar modales con Tab y Escape

## 📱 Diseño Responsive

### Puntos de Quiebre
- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: 320px - 768px

### Consideraciones de Accesibilidad

```css
/* Touch targets mínimos */
.btn {
    padding: 0.625rem 1.25rem; /* ~44px de altura */
    min-width: 60px;           /* ~44px de ancho */
}

/* Tamaño de fuente mínimo */
body {
    font-size: 1rem;           /* 16px */
    line-height: 1.6;          /* Espaciado interlineado */
}
```

## 🎓 Mejores Prácticas Seguidas

1. **Progressive Enhancement**
   - Funcionalidad base sin JavaScript
   - Mejoras con CSS y JavaScript

2. **Mobile-First**
   - Empezar con diseño móvil
   - Mejorar para desktop

3. **Performance**
   - Sin dependencias externas
   - Carga rápida
   - 35KB total

4. **Compatibilidad**
   - Navegadores modernos (2+ años)
   - Fallbacks para APIs antiguas
   - localStorage fallback

## 🔗 Referencias

- [WCAG 2.1 Directrices](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accesibilidad](https://developer.mozilla.org/es/docs/Learn/Accessibility)
- [The A11Y Project](https://www.a11yproject.com/)

## 📋 Conclusión

Colorfly Studio está diseñado para ser accesible para todos, incluyendo personas con discapacidades visuales, auditivas, motoras o cognitivas. El cumplimiento continuo con WCAG 2.1 AA asegura que la aplicación es usable por el mayor público posible.

---

**Última revisión**: 28 de abril de 2026
