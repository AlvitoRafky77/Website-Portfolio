import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeCanvas - Interactive 3D Cyber Mesh & Particle Field
 * Features:
 * - 60FPS BufferGeometry & wireframe rendering
 * - Interactive mouse tracking with lerp inertia
 * - Auto-pauses when out of viewport (Zero lag)
 * - Pure Three.js without external heavy wrappers
 */
export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    // 2. Optimized WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. 3D Object A: Rotating Cyber Torus Knot / Icosahedron Wireframe
    const sphereGeometry = new THREE.IcosahedronGeometry(7.5, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // Electric Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const cyberSphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    scene.add(cyberSphere);

    // Inner Glowing Core Polyhedron
    const coreGeometry = new THREE.OctahedronGeometry(3.8, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Sky Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreSphere);

    // 4. 3D Object B: Particle Constellation Field
    const particleCount = 650;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const blueColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 14 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const mixColor = Math.random() > 0.4 ? cyanColor : blueColor;
      colors[i] = mixColor.r;
      colors[i + 1] = mixColor.g;
      colors[i + 2] = mixColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Glow dot texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,240,255,0.85)');
    grad.addColorStop(1, 'rgba(0,240,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.55,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 5. Interactive Mouse Tracking with smooth Lerp inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Viewport Visibility Observer (pause when out of view)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 7. Animation Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Zero CPU waste when scrolled away

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate objects
      cyberSphere.rotation.x = elapsedTime * 0.15 + mouseY * 0.4;
      cyberSphere.rotation.y = elapsedTime * 0.22 + mouseX * 0.5;

      coreSphere.rotation.x = -elapsedTime * 0.25 - mouseY * 0.3;
      coreSphere.rotation.y = -elapsedTime * 0.35 - mouseX * 0.4;

      particleSystem.rotation.y = elapsedTime * 0.04 + mouseX * 0.1;
      particleSystem.rotation.x = elapsedTime * 0.02 + mouseY * 0.1;

      // Parallax camera
      camera.position.x = mouseX * 2.5;
      camera.position.y = mouseY * 2.0;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      sphereGeometry.dispose();
      wireframeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
