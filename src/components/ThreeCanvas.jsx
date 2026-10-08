import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeCanvas - Ultra-optimized, lightweight 3D Cyber Mesh & Particle Field
 * Features:
 * - High performance 60FPS with BufferGeometry & PointsMaterial
 * - Responsive mouse tracking with smooth lerp inertia
 * - Auto-pauses render loop when out of viewport (Zero Lag / 0% CPU waste)
 * - pointer-events: none ensures full interactivity with UI buttons & text
 */
export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    // 2. Optimized WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. 3D Object A: Rotating Cyber Icosahedron Wireframe
    const sphereGeometry = new THREE.IcosahedronGeometry(7.5, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Cyan neon
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const cyberSphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    scene.add(cyberSphere);

    // Inner Glowing Core Polyhedron
    const coreGeometry = new THREE.OctahedronGeometry(3.5, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Electric Indigo
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreSphere);

    // 4. 3D Object B: Particle Constellation Starfield
    const particleCount = 750; // Balanced for high visual density and 0 lag
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const indigoColor = new THREE.Color(0x818cf8);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Distribute particles in a 3D sphere volume
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      // Alternating cyan and indigo colors
      const mixColor = Math.random() > 0.4 ? cyanColor : indigoColor;
      colors[i] = mixColor.r;
      colors[i + 1] = mixColor.g;
      colors[i + 2] = mixColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create round glowing particle texture using HTML Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(56,189,248,0.8)');
    grad.addColorStop(1, 'rgba(56,189,248,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Mouse tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      // Normalized coordinates (-1 to 1)
      const { innerWidth, innerHeight } = window;
      targetX = (event.clientX / innerWidth - 0.5) * 2;
      targetY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Responsive resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 7. Optimization: Pause render loop when scrolled off-screen
    let isVisible = true;
    let animationFrameId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 8. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate cyber sphere
      cyberSphere.rotation.y = elapsedTime * 0.15 + mouseX * 0.4;
      cyberSphere.rotation.x = elapsedTime * 0.08 - mouseY * 0.3;

      // Counter-rotate inner core
      coreSphere.rotation.y = -elapsedTime * 0.25 - mouseX * 0.5;
      coreSphere.rotation.z = elapsedTime * 0.15;

      // Floating drift on particles
      particles.rotation.y = elapsedTime * 0.04 + mouseX * 0.15;
      particles.rotation.x = -mouseY * 0.15;

      renderer.render(scene, camera);
    };

    // Start loop
    animate();

    // 9. Clean memory cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      sphereGeometry.dispose();
      wireframeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
