/**
 * interactions.js — Specific UI logic
 * Handles Typewriter, 3D Tilt, Form Submission, and Scroll Progress Bar
 */
(function () {
    // --- TYPEWRITER EFFECT ---
    const twEl = document.querySelector('.stagger-text.tw-cursor');
    if (twEl) {
        const words = ['Full Stack Dev', 'React Developer', 'Laravel Expert', 'Code Mentor'];
        let wi = 0, ci = 0, deleting = false;
        function typeWriter() {
            const word = words[wi];
            twEl.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
            if (!deleting && ci > word.length) { 
                deleting = true; setTimeout(typeWriter, 1800); return; 
            }
            if (deleting && ci < 0) { 
                deleting = false; wi = (wi + 1) % words.length; 
            }
            setTimeout(typeWriter, deleting ? 60 : 120);
        }
        setTimeout(typeWriter, 1500);
    }

    // --- 3D TILT EFFECT ---
    document.querySelectorAll('.tilt-wrap').forEach(wrap => {
        const card = wrap.querySelector('.tilt-card') || wrap;
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const cx = rect.width / 2, cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -8;
            const rotY = ((x - cx) / cx) * 8;
            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        });
        wrap.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- CONTACT FORM HANDLER ---
    window.handleFormSubmit = function(e) {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> <span>Mengirim...</span>';
        btn.disabled = true;
        if(window.lucide) lucide.createIcons();
        
        setTimeout(() => {
            document.getElementById('form-success').classList.remove('hidden');
            e.target.reset();
            btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> <span>Kirim Pesan</span>';
            btn.disabled = false;
            if(window.lucide) lucide.createIcons();
        }, 1500);
    };

    // --- SCROLL PROGRESS & BACK-TO-TOP ---
    const progressBar = document.getElementById('scroll-progress-bar');
    const btt = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar) progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        if (btt) {
            if (scrollTop > 400) btt.classList.add('visible');
            else btt.classList.remove('visible');
        }
    }, { passive: true });
})();
