/**
 * main.js — Initialization & Intersection Observers
 * Runs on DOMContentLoaded. Ties Anime.js and Lucide together.
 */
window.addEventListener('DOMContentLoaded', () => {
    // 1. Init Icons
    if (window.lucide) lucide.createIcons();

    // 2. Initial Page Entrance Animations
    if (typeof anime !== 'undefined') {
        const tl = anime.timeline({ easing: 'easeOutExpo', duration: 1000 });
        tl.add({ targets: '.stagger-text', translateY: [30, 0], opacity: [0, 1], delay: anime.stagger(100) })
          .add({ targets: '.ide-container', scale: [0.95, 1], opacity: [0, 1], duration: 800 }, '-=600')
          .add({ targets: '.code-line', translateX: [-20, 0], opacity: [0, 1], delay: anime.stagger(50) }, '-=400');
    }

    // 3. Scroll Observers (Anime.js reveal + Skill Bars)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const t = entry.target;

            // Tech Stack grid
            if (t.classList.contains('tech-stack-container') && typeof anime !== 'undefined') {
                anime({ targets: '.tech-item', translateY: [20, 0], opacity: [0.7, 1], delay: anime.stagger(50), easing: 'spring(1, 80, 10, 0)' });
                observer.unobserve(t);
            }
            
            // Projects
            if (t.id === 'projects' || t.classList.contains('project-grid')) {
                if (typeof anime !== 'undefined') anime({ targets: '.project-grid .glass-card', translateY: [50, 0], opacity: [0, 1], delay: anime.stagger(150), easing: 'easeOutCubic' });
                observer.unobserve(t);
            }

            // Experience
            if (t.id === 'experience') {
                if (typeof anime !== 'undefined') anime({ targets: '.experience-timeline > div', translateX: [50, 0], opacity: [0, 1], delay: anime.stagger(200), easing: 'easeOutExpo', duration: 1000 });
                observer.unobserve(t);
            }

            // Mentoring
            if (t.id === 'mentoring') {
                if (typeof anime !== 'undefined') {
                    anime({ targets: '.mentoring-content', translateY: [30, 0], opacity: [0, 1], easing: 'easeOutExpo', duration: 1000 });
                    anime({ targets: '.mentoring-card', translateX: [30, 0], opacity: [0, 1], easing: 'easeOutExpo', duration: 1000, delay: 200 });
                }
                observer.unobserve(t);
            }

            // Contact
            if (t.id === 'contact') {
                if (typeof anime !== 'undefined') anime({ targets: '.contact-card', translateY: [50, 0], opacity: [0, 1], easing: 'easeOutExpo', duration: 1000 });
                observer.unobserve(t);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tech-stack-container, .project-grid, #experience, #mentoring, #contact').forEach(el => observer.observe(el));

    // Skill bars specific observer
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-bars-container').forEach(el => skillObserver.observe(el));

    // 4. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu    = document.getElementById('mobile-menu');
    const menuIconOpen  = document.querySelector('.menu-icon-open');
    const menuIconClose = document.querySelector('.menu-icon-close');
    const mobileLinks   = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                mobileMenu.classList.remove('open');
                if(menuIconOpen) menuIconOpen.classList.remove('hidden');
                if(menuIconClose) menuIconClose.classList.add('hidden');
            } else {
                mobileMenu.classList.add('open');
                if(menuIconOpen) menuIconOpen.classList.add('hidden');
                if(menuIconClose) menuIconClose.classList.remove('hidden');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                if(menuIconOpen) menuIconOpen.classList.remove('hidden');
                if(menuIconClose) menuIconClose.classList.add('hidden');
            });
        });
    }
});
