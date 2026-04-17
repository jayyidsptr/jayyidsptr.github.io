/**
 * three-bg.js — Three.js 3D Background
 * Creates and animates the wireframe geometry scene.
 * Exposes APP.material for theme color updates.
 */
(function () {
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer || typeof THREE === 'undefined') return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    // Coding-themed geometries
    const geometryGroup = new THREE.Group();
    const shapes        = [];
    const shapeCount    = 50;

    const geoZero  = new THREE.TorusGeometry(0.6, 0.2, 16, 32);
    const geoOne   = new THREE.BoxGeometry(0.3, 1.5, 0.3);
    const geoSlash = new THREE.BoxGeometry(0.2, 2, 0.2);
    const geoBlock = new THREE.BoxGeometry(1, 1, 1);
    const geometries = [geoZero, geoOne, geoSlash, geoBlock];

    const material = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });

    // Expose to APP namespace for theme updates
    APP.material = material;
    APP.scene    = scene;

    for (let i = 0; i < shapeCount; i++) {
        const typeIndex = Math.floor(Math.random() * geometries.length);
        const mesh      = new THREE.Mesh(geometries[typeIndex], material);

        mesh.position.set(
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 15 - 5
        );
        const scale = Math.random() * 0.5 + 0.3;
        mesh.scale.set(scale, scale, scale);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

        if (typeIndex === 2) {
            mesh.rotation.z = Math.PI / 4;
            mesh.userData.isSlash = true;
        }
        mesh.userData = {
            ...mesh.userData,
            rotSpeedX: (Math.random() - 0.5) * 0.01,
            rotSpeedY: (Math.random() - 0.5) * 0.01,
            floatSpeed: Math.random() * 0.01 + 0.005,
            initialY: mesh.position.y,
        };
        geometryGroup.add(mesh);
        shapes.push(mesh);
    }

    scene.add(geometryGroup);
    camera.position.z = 5;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });

    const clock = new THREE.Clock();
    function animateShapes() {
        const t = clock.getElapsedTime();
        geometryGroup.rotation.y = mouseX * 0.1;
        geometryGroup.rotation.x = mouseY * 0.1;
        shapes.forEach(mesh => {
            if (!mesh.userData.isSlash) {
                mesh.rotation.x += mesh.userData.rotSpeedX;
                mesh.rotation.y += mesh.userData.rotSpeedY;
            } else {
                mesh.rotation.y += mesh.userData.rotSpeedY * 0.5;
            }
            mesh.position.y = mesh.userData.initialY + Math.sin(t * mesh.userData.floatSpeed) * 1.5;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(animateShapes);
    }
    animateShapes();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();
