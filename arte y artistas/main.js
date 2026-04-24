import * as THREE from 'three';

function createScene(containerId, color, type = "knot") {
    const container = document.getElementById(containerId);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050816);

    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 🔆 Luces
    const light1 = new THREE.PointLight(0xffffff, 2);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(color, 3);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // 🎯 Objeto principal
    let mesh;

    if (type === "sphere") {
        mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.7,
                roughness: 0.2
            })
        );
    } else if (type === "box") {
        mesh = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshStandardMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.3
            })
        );
    } else {
        mesh = new THREE.Mesh(
            new THREE.TorusKnotGeometry(0.7, 0.25, 120, 16),
            new THREE.MeshStandardMaterial({
                color: color,
                metalness: 1,
                roughness: 0.1
            })
        );
    }

    scene.add(mesh);


    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: color
    });

    const particlesMesh = new THREE.Points(
        particlesGeometry,
        particlesMaterial
    );

    scene.add(particlesMesh);


    function animate() {
        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        particlesMesh.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();
}

createScene("hero-canvas", 0x00d4ff, "knot");  
createScene("scene2", 0xff3c3c, "box");        
createScene("scene3", 0x00ff99, "sphere");     