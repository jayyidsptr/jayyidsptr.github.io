/**
 * projects.js — Render project cards from projects/projects.json
 * Data-driven: tambah/edit proyek cukup di projects.json, tidak perlu sentuh HTML.
 */
(function () {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;

    // Map "accent" -> kelas Tailwind (statis agar terbaca JIT CDN).
    const ACCENTS = {
        indigo: { tag: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', title: 'group-hover:text-indigo-400' },
        violet: { tag: 'bg-violet-500/10 text-violet-400 border-violet-500/20', title: 'group-hover:text-violet-400' },
        cyan:   { tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',       title: 'group-hover:text-cyan-400' },
        blue:   { tag: 'bg-blue-500/10 text-blue-400 border-blue-500/20',       title: 'group-hover:text-blue-400' },
        emerald:{ tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', title: 'group-hover:text-emerald-400' },
        rose:   { tag: 'bg-rose-500/10 text-rose-400 border-rose-500/20',       title: 'group-hover:text-rose-400' },
        amber:  { tag: 'bg-amber-500/10 text-amber-400 border-amber-500/20',    title: 'group-hover:text-amber-400' },
    };

    let projects = [];

    const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const descFor = (p) => (p.desc && (p.desc[APP.currentLang] || p.desc.id || p.desc.en)) || '';

    function cardHTML(p) {
        const accent = ACCENTS[p.accent] || ACCENTS.indigo;
        const baseTag = 'text-[10px] uppercase px-2 py-1 rounded-full border font-semibold tracking-wide';
        const tags = (p.tags || []).map((t, i) =>
            i === 0
                ? `<span class="${baseTag} ${accent.tag}">${esc(t)}</span>`
                : `<span class="${baseTag} bg-zinc-800 text-zinc-400 border-zinc-700">${esc(t)}</span>`
        ).join('');

        const demo = p.link
            ? `<div class="proj-overlay">
                   <a href="${esc(p.link)}" target="_blank" rel="noopener noreferrer"
                      class="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center gap-1">Live
                      Demo <i data-lucide="external-link" class="w-3 h-3"></i></a>
               </div>`
            : '';

        return `<div class="tilt-wrap">
            <div class="glass-card tilt-card rounded-2xl overflow-hidden group flex flex-col hover-trigger">
                <div class="proj-img-wrap h-44 md:h-52 bg-zinc-900 relative">
                    <img src="${esc(p.image)}" alt="${esc(p.title)}"
                        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    ${demo}
                </div>
                <div class="p-5 md:p-6 flex flex-col flex-grow">
                    <div class="flex gap-2 mb-3">${tags}</div>
                    <h3 class="text-lg md:text-xl font-semibold text-main mb-2 ${accent.title} transition-colors">${esc(p.title)}</h3>
                    <p class="proj-desc text-muted text-sm leading-relaxed flex-grow">${esc(descFor(p))}</p>
                </div>
            </div>
        </div>`;
    }

    function render() {
        grid.innerHTML = projects.map(cardHTML).join('');
        if (window.lucide) lucide.createIcons();
        if (window.initTilt) window.initTilt(grid);

        // Reveal animation, kecuali user minta reduced motion.
        if (!APP.reducedMotion && typeof anime !== 'undefined') {
            anime({ targets: '.project-grid .glass-card', translateY: [50, 0], opacity: [0, 1], delay: anime.stagger(150), easing: 'easeOutCubic' });
        } else {
            grid.querySelectorAll('.glass-card').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
        }
    }

    // Update hanya teks deskripsi saat bahasa berubah (tanpa re-render penuh).
    function updateDescriptions() {
        const nodes = grid.querySelectorAll('.proj-desc');
        nodes.forEach((node, i) => { if (projects[i]) node.textContent = descFor(projects[i]); });
    }

    fetch('projects/projects.json')
        .then(res => {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then(data => {
            projects = Array.isArray(data) ? data : [];
            render();
        })
        .catch(err => {
            console.error('Gagal memuat projects.json:', err);
            grid.innerHTML = '<p class="text-muted text-sm col-span-full">Gagal memuat daftar proyek.</p>';
        });

    document.addEventListener('langchange', updateDescriptions);
})();
