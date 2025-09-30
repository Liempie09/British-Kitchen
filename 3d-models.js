// 3D Models for British Kitchen Website
// This file creates interactive 3D food models using Three.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D models for each dish
    initFishAndChips();
    initFullEnglishBreakfast();
    initShepherdsPie();
});

// Fish and Chips 3D Model
function initFishAndChips() {
    const container = document.getElementById('canvas-fish');
    if (!container) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffa500, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // Create Fish (elongated box with texture)
    const fishGeometry = new THREE.BoxGeometry(2, 0.5, 1);
    const fishMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf4a460,
        shininess: 30,
        specular: 0x444444
    });
    const fish = new THREE.Mesh(fishGeometry, fishMaterial);
    fish.position.y = 0.5;
    scene.add(fish);
    
    // Create batter texture (rough surface)
    const batterGeometry = new THREE.BoxGeometry(2.1, 0.6, 1.1);
    const batterMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xdaa520,
        roughness: 0.8,
        shininess: 10
    });
    const batter = new THREE.Mesh(batterGeometry, batterMaterial);
    batter.position.y = 0.5;
    scene.add(batter);
    
    // Create Chips (french fries)
    const chipGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
        const chipGeometry = new THREE.BoxGeometry(0.15, 1.5, 0.15);
        const chipMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffd700,
            shininess: 20
        });
        const chip = new THREE.Mesh(chipGeometry, chipMaterial);
        chip.position.x = (Math.random() - 0.5) * 3;
        chip.position.y = -0.5;
        chip.position.z = (Math.random() - 0.5) * 2;
        chip.rotation.z = (Math.random() - 0.5) * 0.5;
        chipGroup.add(chip);
    }
    scene.add(chipGroup);
    
    // Create plate
    const plateGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.1, 32);
    const plateMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 100
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.y = -1.2;
    scene.add(plate);
    
    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    container.addEventListener('mousedown', () => isDragging = true);
    container.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mouseleave', () => isDragging = false);
    
    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.offsetX - previousMousePosition.x;
            const deltaY = e.offsetY - previousMousePosition.y;
            
            scene.rotation.y += deltaX * 0.01;
            scene.rotation.x += deltaY * 0.01;
        }
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });
    
    // Zoom with mouse wheel
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(2, Math.min(10, camera.position.z));
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Gentle rotation when not dragging
        if (!isDragging) {
            scene.rotation.y += 0.002;
        }
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Full English Breakfast 3D Model
function initFullEnglishBreakfast() {
    const container = document.getElementById('canvas-breakfast');
    if (!container) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 6;
    camera.position.y = 2;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create plate
    const plateGeometry = new THREE.CylinderGeometry(3, 3, 0.1, 32);
    const plateMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 100
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.y = -1;
    scene.add(plate);
    
    // Create eggs (two fried eggs)
    for (let i = 0; i < 2; i++) {
        // Egg white
        const eggWhiteGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 32);
        const eggWhiteMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            shininess: 30
        });
        const eggWhite = new THREE.Mesh(eggWhiteGeometry, eggWhiteMaterial);
        eggWhite.position.x = i === 0 ? -1 : 1;
        eggWhite.position.y = -0.9;
        eggWhite.position.z = 1;
        scene.add(eggWhite);
        
        // Egg yolk
        const eggYolkGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const eggYolkMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffd700,
            shininess: 50
        });
        const eggYolk = new THREE.Mesh(eggYolkGeometry, eggYolkMaterial);
        eggYolk.position.x = i === 0 ? -1 : 1;
        eggYolk.position.y = -0.8;
        eggYolk.position.z = 1;
        scene.add(eggYolk);
    }
    
    // Create bacon strips
    for (let i = 0; i < 3; i++) {
        const baconGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.3);
        const baconMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x8b4513,
            shininess: 20
        });
        const bacon = new THREE.Mesh(baconGeometry, baconMaterial);
        bacon.position.x = -1.5 + i * 0.4;
        bacon.position.y = -0.9;
        bacon.position.z = -0.5;
        bacon.rotation.z = (Math.random() - 0.5) * 0.3;
        scene.add(bacon);
    }
    
    // Create sausages
    for (let i = 0; i < 2; i++) {
        const sausageGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 16);
        const sausageMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x8b4513,
            shininess: 30
        });
        const sausage = new THREE.Mesh(sausageGeometry, sausageMaterial);
        sausage.position.x = 1.5;
        sausage.position.y = -0.9;
        sausage.position.z = -0.8 + i * 0.8;
        sausage.rotation.z = Math.PI / 2;
        scene.add(sausage);
    }
    
    // Create tomato
    const tomatoGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const tomatoMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        shininess: 50
    });
    const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
    tomato.position.x = 0;
    tomato.position.y = -0.8;
    tomato.position.z = -1.5;
    scene.add(tomato);
    
    // Create mushrooms
    for (let i = 0; i < 2; i++) {
        const mushroomCapGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const mushroomCapMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x8b7355,
            shininess: 20
        });
        const mushroomCap = new THREE.Mesh(mushroomCapGeometry, mushroomCapMaterial);
        mushroomCap.position.x = -2 + i * 0.6;
        mushroomCap.position.y = -0.8;
        mushroomCap.position.z = -1.2;
        scene.add(mushroomCap);
    }
    
    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    container.addEventListener('mousedown', () => isDragging = true);
    container.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mouseleave', () => isDragging = false);
    
    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.offsetX - previousMousePosition.x;
            const deltaY = e.offsetY - previousMousePosition.y;
            
            scene.rotation.y += deltaX * 0.01;
            scene.rotation.x += deltaY * 0.01;
        }
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });
    
    // Zoom with mouse wheel
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(3, Math.min(12, camera.position.z));
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (!isDragging) {
            scene.rotation.y += 0.002;
        }
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Shepherd's Pie 3D Model
function initShepherdsPie() {
    const container = document.getElementById('canvas-pie');
    if (!container) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xff6600, 0.8, 100);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);
    
    // Create baking dish
    const dishGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 32);
    const dishMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b4513,
        shininess: 50
    });
    const dish = new THREE.Mesh(dishGeometry, dishMaterial);
    dish.position.y = -1;
    scene.add(dish);
    
    // Create meat filling (bottom layer)
    const meatGeometry = new THREE.CylinderGeometry(1.9, 1.9, 0.8, 32);
    const meatMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b4513,
        shininess: 20
    });
    const meat = new THREE.Mesh(meatGeometry, meatMaterial);
    meat.position.y = -0.5;
    scene.add(meat);
    
    // Create mashed potato topping
    const potatoGeometry = new THREE.CylinderGeometry(2, 1.9, 0.6, 32);
    const potatoMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffd700,
        shininess: 30
    });
    const potato = new THREE.Mesh(potatoGeometry, potatoMaterial);
    potato.position.y = 0.1;
    scene.add(potato);
    
    // Create golden crust on top
    const crustGeometry = new THREE.CylinderGeometry(2, 2, 0.05, 32);
    const crustMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xdaa520,
        shininess: 60,
        emissive: 0x442200
    });
    const crust = new THREE.Mesh(crustGeometry, crustMaterial);
    crust.position.y = 0.4;
    scene.add(crust);
    
    // Add texture to potato topping (fork marks)
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 1.5;
        const markGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
        const markMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xdaa520,
            shininess: 20
        });
        const mark = new THREE.Mesh(markGeometry, markMaterial);
        mark.position.x = Math.cos(angle) * radius;
        mark.position.y = 0.2;
        mark.position.z = Math.sin(angle) * radius;
        mark.rotation.y = angle;
        scene.add(mark);
    }
    
    // Add steam particles
    const steamParticles = [];
    for (let i = 0; i < 20; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.3
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.x = (Math.random() - 0.5) * 2;
        particle.position.y = 0.5 + Math.random() * 2;
        particle.position.z = (Math.random() - 0.5) * 2;
        particle.userData.velocity = Math.random() * 0.02 + 0.01;
        steamParticles.push(particle);
        scene.add(particle);
    }
    
    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    container.addEventListener('mousedown', () => isDragging = true);
    container.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mouseleave', () => isDragging = false);
    
    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.offsetX - previousMousePosition.x;
            const deltaY = e.offsetY - previousMousePosition.y;
            
            scene.rotation.y += deltaX * 0.01;
            scene.rotation.x += deltaY * 0.01;
        }
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });
    
    // Zoom with mouse wheel
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(2, Math.min(10, camera.position.z));
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (!isDragging) {
            scene.rotation.y += 0.002;
        }
        
        // Animate steam particles
        steamParticles.forEach(particle => {
            particle.position.y += particle.userData.velocity;
            particle.material.opacity -= 0.001;
            
            if (particle.position.y > 3 || particle.material.opacity <= 0) {
                particle.position.y = 0.5;
                particle.material.opacity = 0.3;
                particle.position.x = (Math.random() - 0.5) * 2;
                particle.position.z = (Math.random() - 0.5) * 2;
            }
        });
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}