/**
 * app.js — Global APP namespace
 * Shared state accessible across all modules.
 * Load this FIRST before any other JS files.
 */
window.APP = {
    // Three.js references (set by three-bg.js)
    material: null,
    scene: null,

    // Respect user's motion preference (OS-level "reduce motion")
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    // Cursor trail particle color (set by theme.js)
    currentParticleColor: '255, 255, 255',

    // Active theme & language
    currentTheme: localStorage.getItem('theme') || 'dark',
    currentLang:  localStorage.getItem('lang')  || 'id',
};
