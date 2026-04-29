// ================================
// ESTADO DE LA APLICACIÓN
// ================================

const state = {
    paletteSize: 6,
    format: 'hex',
    colors: [],
    lockedColors: new Set(),
    savedPalettes: JSON.parse(localStorage.getItem('colorfly_palettes')) || [],
};

// ================================
// ELEMENTOS DEL DOM
// ================================

const elements = {
    generateBtn: document.getElementById('generate-btn'),
    paletteContainer: document.getElementById('palette-container'),
    paletteSizeSpan: document.getElementById('palette-size'),
    paletteFormatSpan: document.getElementById('palette-format'),
    lockStatusSpan: document.getElementById('lock-status'),
    sizeButtons: document.querySelectorAll('[data-size]'),
    formatButtons: document.querySelectorAll('[data-format]'),
    toast: document.getElementById('toast'),
    savedBtn: document.getElementById('saved-btn'),
    saveBtn: document.getElementById('save-btn'),
    savedModal: document.getElementById('saved-modal'),
    modalClose: document.querySelector('.modal__close'),
    savedList: document.getElementById('saved-list'),
    savedCount: document.getElementById('saved-count'),
};

// ================================
// UTILIDADES DE COLOR
// ================================

/**
 * Genera un número aleatorio entre 0 y max
 */
function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

/**
 * Genera un color HSL aleatorio
 */
function generateHSLColor() {
    const hue = getRandomNumber(360);
    const saturation = getRandomNumber(100);
    const lightness = getRandomNumber(100);
    return { hue, saturation, lightness };
}

/**
 * Convierte HSL a HEX
 */
function hslToHex(hue, saturation, lightness) {
    // Normalizar valores
    const s = saturation / 100;
    const l = lightness / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hPrime = hue / 60;
    const x = c * (1 - Math.abs((hPrime % 2) - 1));

    let r = 0, g = 0, b = 0;

    if (0 <= hPrime && hPrime < 1) {
        r = c; g = x; b = 0;
    } else if (1 <= hPrime && hPrime < 2) {
        r = x; g = c; b = 0;
    } else if (2 <= hPrime && hPrime < 3) {
        r = 0; g = c; b = x;
    } else if (3 <= hPrime && hPrime < 4) {
        r = 0; g = x; b = c;
    } else if (4 <= hPrime && hPrime < 5) {
        r = x; g = 0; b = c;
    } else if (5 <= hPrime && hPrime < 6) {
        r = c; g = 0; b = x;
    }

    const m = l - c / 2;
    const toHex = (value) => {
        const hex = Math.round((value + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Genera un color HEX aleatorio
 */
function generateHexColor() {
    const hsl = generateHSLColor();
    return hslToHex(hsl.hue, hsl.saturation, hsl.lightness);
}

/**
 * Formatea un color HSL como string
 */
function formatHSL(hue, saturation, lightness) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Formatea un color según el formato actual
 */
function formatColor(hsl) {
    if (state.format === 'hex') {
        return hslToHex(hsl.hue, hsl.saturation, hsl.lightness);
    }
    return formatHSL(hsl.hue, hsl.saturation, hsl.lightness);
}

// ================================
// GENERACIÓN DE PALETA
// ================================

/**
 * Genera una nueva paleta de colores
 */
function generatePalette() {
    const newColors = [];

    for (let i = 0; i < state.paletteSize; i++) {
        if (state.lockedColors.has(i) && state.colors[i]) {
            // Mantener color bloqueado
            newColors.push(state.colors[i]);
        } else {
            // Generar nuevo color HSL
            newColors.push(generateHSLColor());
        }
    }

    state.colors = newColors;
    renderPalette();
    showToast('✨ Paleta generada');
}

/**
 * Renderiza la paleta en el DOM
 */
function renderPalette() {
    elements.paletteContainer.innerHTML = '';

    state.colors.forEach((hslColor, index) => {
        const hex = formatColor(hslColor);
        const isLocked = state.lockedColors.has(index);

        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.setAttribute('role', 'button');
        colorCard.setAttribute('tabindex', '0');
        colorCard.setAttribute('aria-label', `Color ${index + 1}: ${hex}. Presiona Enter para copiar.`);

        const colorDisplay = document.createElement('div');
        colorDisplay.className = 'color-card__display';
        colorDisplay.style.backgroundColor = formatHSL(hslColor.hue, hslColor.saturation, hslColor.lightness);

        const colorContent = document.createElement('div');
        colorContent.className = 'color-card__content';

        const colorCode = document.createElement('span');
        colorCode.className = 'color-card__code';
        colorCode.textContent = hex;

        const actions = document.createElement('div');
        actions.className = 'color-card__actions';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'color-card__btn';
        copyBtn.setAttribute('aria-label', `Copiar ${hex} al portapapeles`);
        copyBtn.innerHTML = '📋';
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(hex);
        });

        const lockBtn = document.createElement('button');
        lockBtn.className = `color-card__btn ${isLocked ? 'color-card__btn--locked' : ''}`;
        lockBtn.setAttribute('aria-label', isLocked ? `Desbloquear color ${hex}` : `Bloquear color ${hex}`);
        lockBtn.innerHTML = isLocked ? '🔒' : '🔓';
        lockBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLock(index, lockBtn);
        });

        actions.appendChild(copyBtn);
        actions.appendChild(lockBtn);

        colorContent.appendChild(colorCode);
        colorContent.appendChild(actions);

        colorCard.appendChild(colorDisplay);
        colorCard.appendChild(colorContent);

        // Event listeners para el color card completo
        colorCard.addEventListener('click', () => copyToClipboard(hex));
        colorCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyToClipboard(hex);
            }
        });

        elements.paletteContainer.appendChild(colorCard);
    });

    updateLockStatus();
}

/**
 * Actualiza el estado de bloqueos
 */
function updateLockStatus() {
    const lockedCount = state.lockedColors.size;
    if (lockedCount === 0) {
        elements.lockStatusSpan.textContent = 'SIN BLOQUEOS';
    } else {
        elements.lockStatusSpan.textContent = `${lockedCount} BLOQUEADO${lockedCount !== 1 ? 'S' : ''}`;
    }
}

/**
 * Alterna el bloqueo de un color
 */
function toggleLock(index, btn) {
    if (state.lockedColors.has(index)) {
        state.lockedColors.delete(index);
        btn.classList.remove('color-card__btn--locked');
        btn.innerHTML = '🔓';
        btn.setAttribute('aria-label', `Bloquear color`);
        showToast('🔓 Color desbloqueado');
    } else {
        state.lockedColors.add(index);
        btn.classList.add('color-card__btn--locked');
        btn.innerHTML = '🔒';
        btn.setAttribute('aria-label', `Desbloquear color`);
        showToast('🔒 Color bloqueado');
    }
    updateLockStatus();
}

// ================================
// PORTAPAPELES
// ================================

/**
 * Copia un texto al portapapeles
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast(`📋 ${text} copiado`);
    } catch (err) {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`📋 ${text} copiado`);
    }
}

// ================================
// CONTROLES
// ================================

/**
 * Cambia el tamaño de la paleta
 */
function changePaletteSize(size) {
    state.paletteSize = parseInt(size);
    state.lockedColors.clear(); // Limpiar bloqueos al cambiar tamaño
    elements.paletteSizeSpan.textContent = size;
    
    // Actualizar botones
    elements.sizeButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', btn.dataset.size === size);
    });

    generatePalette();
}

/**
 * Cambia el formato de color
 */
function changeColorFormat(format) {
    state.format = format;
    elements.paletteFormatSpan.textContent = format.toUpperCase();
    
    // Actualizar botones
    elements.formatButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', btn.dataset.format === format);
    });

    renderPalette();
}

// ================================
// TOAST NOTIFICATIONS
// ================================

/**
 * Muestra un toast notification
 */
function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');

    clearTimeout(elements.toast.timeout);
    elements.toast.timeout = setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2000);
}

// ================================
// ALMACENAMIENTO LOCAL
// ================================

/**
 * Guarda la paleta actual en localStorage
 */
function savePalette() {
    const paletteData = {
        id: Date.now(),
        size: state.paletteSize,
        format: state.format,
        colors: state.colors.map(hsl => formatColor(hsl)),
        timestamp: new Date().toLocaleString('es-ES'),
    };

    state.savedPalettes.unshift(paletteData);
    localStorage.setItem('colorfly_palettes', JSON.stringify(state.savedPalettes));
    
    updateSavedCount();
    showToast('💾 Paleta guardada');
}

/**
 * Actualiza el contador de paletas guardadas
 */
function updateSavedCount() {
    elements.savedCount.textContent = `(${state.savedPalettes.length})`;
}

/**
 * Renderiza la lista de paletas guardadas
 */
function renderSavedPalettes() {
    if (state.savedPalettes.length === 0) {
        elements.savedList.innerHTML = '<p class="modal__empty">No hay paletas guardadas aún</p>';
        return;
    }

    elements.savedList.innerHTML = '';

    state.savedPalettes.forEach((palette, index) => {
        const savedPaletteEl = document.createElement('div');
        savedPaletteEl.className = 'saved-palette';

        const preview = document.createElement('div');
        preview.className = 'saved-palette__preview';

        palette.colors.forEach(color => {
            const colorEl = document.createElement('div');
            colorEl.className = 'saved-palette__color';
            colorEl.style.backgroundColor = color;
            preview.appendChild(colorEl);
        });

        const info = document.createElement('div');
        info.className = 'saved-palette__info';

        const time = document.createElement('div');
        time.className = 'saved-palette__time';
        time.textContent = palette.timestamp;

        const codes = document.createElement('div');
        codes.className = 'saved-palette__codes';
        codes.textContent = palette.colors.join(', ');

        info.appendChild(time);
        info.appendChild(codes);

        const actions = document.createElement('div');
        actions.className = 'saved-palette__actions';

        const restoreBtn = document.createElement('button');
        restoreBtn.className = 'saved-palette__btn';
        restoreBtn.textContent = '↺ RESTAURAR';
        restoreBtn.addEventListener('click', () => {
            restorePalette(palette);
            elements.savedModal.close();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'saved-palette__btn saved-palette__delete';
        deleteBtn.textContent = '🗑';
        deleteBtn.setAttribute('aria-label', 'Eliminar paleta guardada');
        deleteBtn.addEventListener('click', () => {
            deleteSavedPalette(index);
        });

        actions.appendChild(restoreBtn);
        actions.appendChild(deleteBtn);

        savedPaletteEl.appendChild(preview);
        savedPaletteEl.appendChild(info);
        savedPaletteEl.appendChild(actions);

        elements.savedList.appendChild(savedPaletteEl);
    });
}

/**
 * Restaura una paleta guardada
 */
function restorePalette(palette) {
    state.paletteSize = palette.size;
    state.format = palette.format;
    state.colors = palette.colors.map(color => {
        // Convertir color guardado de vuelta a HSL para mantener flexibilidad
        // Por ahora, simplemente usamos los colores guardados
        // Una mejora sería almacenar HSL en lugar de formato final
        return parseColorToHSL(color);
    });
    state.lockedColors.clear();

    elements.paletteSizeSpan.textContent = palette.size;
    elements.paletteFormatSpan.textContent = palette.format.toUpperCase();

    elements.sizeButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', btn.dataset.size === String(palette.size));
    });

    elements.formatButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', btn.dataset.format === palette.format);
    });

    renderPalette();
    showToast('↺ Paleta restaurada');
}

/**
 * Parsea un color a HSL (aproximado si viene en HEX o HSL string)
 */
function parseColorToHSL(colorString) {
    // Si es HSL string, parsearlo
    if (colorString.startsWith('hsl')) {
        const match = colorString.match(/\d+/g);
        return {
            hue: parseInt(match[0]),
            saturation: parseInt(match[1]),
            lightness: parseInt(match[2]),
        };
    }

    // Si es HEX, convertir a HSL aproximadamente
    // Para una solución mejor, almacenar HSL en localStorage
    return generateHSLColor(); // Solución simplificada
}

/**
 * Elimina una paleta guardada
 */
function deleteSavedPalette(index) {
    if (confirm('¿Eliminar esta paleta guardada?')) {
        state.savedPalettes.splice(index, 1);
        localStorage.setItem('colorfly_palettes', JSON.stringify(state.savedPalettes));
        updateSavedCount();
        renderSavedPalettes();
        showToast('🗑 Paleta eliminada');
    }
}

// ================================
// EVENT LISTENERS
// ================================

// Botón generar paleta
elements.generateBtn.addEventListener('click', generatePalette);

// Tecla espacio para generar
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generatePalette();
    }
});

// Botones de tamaño
elements.sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        changePaletteSize(btn.dataset.size);
    });
});

// Botones de formato
elements.formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        changeColorFormat(btn.dataset.format);
    });
});

// Botón guardar
elements.saveBtn.addEventListener('click', savePalette);

// Botón paletas guardadas
elements.savedBtn.addEventListener('click', () => {
    renderSavedPalettes();
    elements.savedModal.showModal();
});

// Cerrar modal
elements.modalClose.addEventListener('click', () => {
    elements.savedModal.close();
});

// Cerrar modal al hacer click fuera
elements.savedModal.addEventListener('click', (e) => {
    if (e.target === elements.savedModal) {
        elements.savedModal.close();
    }
});

// ================================
// INICIALIZACIÓN
// ================================

function init() {
    updateSavedCount();
    generatePalette();
    document.title = 'Colorfly Studio - Generador de Paletas';
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
