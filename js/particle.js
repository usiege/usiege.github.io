// 3D粒子背景初始化
function initParticleBackground() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    // 创建粒子系统
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(5000 * 3);
    
    for(let i = 0; i < 15000; i +=3) {
        particlePositions[i] = (Math.random() - 0.5) * 10;
        particlePositions[i+1] = (Math.random() - 0.5) * 10;
        particlePositions[i+2] = (Math.random() - 0.5) * 10;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00FFFF,
        size: 0.02,
        transparent: true
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    
    // 窗口大小调整
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // 初始化渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    camera.position.z = 5;
    animate();
}

document.addEventListener('DOMContentLoaded', initParticleBackground);