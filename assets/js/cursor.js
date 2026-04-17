/**
 * cursor.js — Custom Cursor & Particle Trail
 * Requires: APP.currentParticleColor (set by theme.js)
 */
(function () {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursorDot     = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // --- Particle Trail Canvas ---
    const canvas = document.getElementById('cursor-trail-canvas');
    const ctx    = canvas.getContext('2d');
    let   particles = [];

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class TrailParticle {
        constructor(x, y) {
            this.x     = x;
            this.y     = y;
            this.size  = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.life  = 1.0;
            this.decay = Math.random() * 0.03 + 0.01;
        }
        update() {
            this.x    += this.speedX;
            this.y    += this.speedY;
            this.size *= 0.95;
            this.life -= this.decay;
        }
        draw() {
            ctx.fillStyle = `rgba(${APP.currentParticleColor}, ${this.life})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0 || particles[i].size <= 0.3) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    }
    animate();

    // --- Mouse Events ---
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX, posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top  = `${posY}px`;

        if (typeof anime !== 'undefined') {
            anime({ targets: cursorOutline, left: posX, top: posY, duration: 400, easing: 'easeOutExpo' });
        }

        for (let i = 0; i < 2; i++) {
            particles.push(new TrailParticle(posX, posY));
        }
    });

    document.body.addEventListener('mouseover', (e) => {
        const isHoverable = e.target.closest('.hover-trigger') || e.target.closest('a') || e.target.closest('button');
        document.body.classList.toggle('hovering', !!isHoverable);
    });
})();
