/**
 * theme.js — 4-Theme System
 * Handles theme toggle, icon updates, 3D material colors,
 * and particle color updates via APP namespace.
 */
(function () {
    const themes = ['dark', 'light', 'forest', 'cyber'];
    const themeColors = { dark: '#030303', light: '#ffffff', forest: '#051a10', cyber: '#0f0726' };

    const body           = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const overlay        = document.querySelector('.theme-transition-overlay');

    // Apply saved theme on load
    const validTheme = themes.includes(APP.currentTheme) ? APP.currentTheme : 'dark';
    APP.currentTheme = validTheme;
    body.setAttribute('data-theme', validTheme);
    updateThemeIcon(validTheme);
    update3DColors(validTheme);
    updateParticleColor(validTheme);

    // Theme cycle on click
    themeToggleBtn.addEventListener('click', () => {
        const next = themes[(themes.indexOf(APP.currentTheme) + 1) % themes.length];

        const rect    = themeToggleBtn.getBoundingClientRect();
        const cx      = rect.left + rect.width / 2;
        const cy      = rect.top  + rect.height / 2;
        const maxDist = Math.max(
            Math.hypot(cx, cy),
            Math.hypot(window.innerWidth - cx, cy),
            Math.hypot(cx, window.innerHeight - cy),
            Math.hypot(window.innerWidth - cx, window.innerHeight - cy)
        );

        overlay.style.width           = `${maxDist * 2}px`;
        overlay.style.height          = `${maxDist * 2}px`;
        overlay.style.left            = `${cx - maxDist}px`;
        overlay.style.top             = `${cy - maxDist}px`;
        overlay.style.backgroundColor = themeColors[next];

        const iconWrapper = themeToggleBtn.querySelector('.theme-icon-wrapper');
        if (typeof anime !== 'undefined') {
            anime({ targets: iconWrapper, rotate: '+=360deg', duration: 500, easing: 'easeInOutQuad' });
            anime({
                targets: overlay, scale: [0, 1], easing: 'easeInQuad', duration: 400,
                complete: () => {
                    APP.currentTheme = next;
                    body.setAttribute('data-theme', next);
                    localStorage.setItem('theme', next);
                    updateThemeIcon(next);
                    update3DColors(next);
                    updateParticleColor(next);
                    overlay.style.opacity   = 0;
                    overlay.style.transform = 'scale(0)';
                    setTimeout(() => { overlay.style.opacity = 1; }, 50);
                }
            });
        }
    });

    function updateThemeIcon(theme) {
        document.querySelectorAll('[data-icon]').forEach(el => el.classList.add('scale-0', 'opacity-0'));
        const active = document.querySelector(`[data-icon="${theme}"]`);
        if (active) active.classList.remove('scale-0', 'opacity-0');
    }

    function update3DColors(theme) {
        if (!APP.material) return;
        const map = { dark: [0x6366f1, 0.12], light: [0x4f46e5, 0.18], forest: [0x10b981, 0.15], cyber: [0xc026d3, 0.2] };
        const [hex, opacity] = map[theme] || map.dark;
        APP.material.color.setHex(hex);
        APP.material.opacity = opacity;
    }

    function updateParticleColor(theme) {
        const map = { dark: '255,255,255', light: '0,0,0', forest: '250,204,21', cyber: '244,114,182' };
        APP.currentParticleColor = map[theme] || map.dark;
    }
})();
