import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeGlobe - 3D Interactive Cyber Wireframe Globe & Orbiting Tech Rings
 * Ringan (~200 particles, low-poly geometry), estetik ala sci-fi tech / GitHub globe / reactbits.
 * Auto-pause dengan IntersectionObserver saat off-screen agar ZERO LAG dan hemat baterai/GPU.
 */
export default function ThreeGlobe({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 18;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Main Wireframe Globe (Icosahedron)
    const globeGeometry = new THREE.IcosahedronGeometry(6.2, 2);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Cyan neon
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globeMesh);

    // Inner Glowing Core (Octahedron)
    const innerGeometry = new THREE.OctahedronGeometry(3.6, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8, // Indigo
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    globeGroup.add(innerMesh);

    // Orbit Ring 1
    const ring1Geo = new THREE.TorusGeometry(8.2, 0.05, 8, 48);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    globeGroup.add(ring1);

    // Orbit Ring 2
    const ring2Geo = new THREE.TorusGeometry(7.2, 0.04, 8, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 4;
    globeGroup.add(ring2);

    // Orbiting Satellite Node
    const satGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    globeGroup.add(satMesh);

    // Subtle Particle Dots on Globe surface (120 points only)
    const dotCount = 120;
    const dotGeo = new THREE.BufferGeometry();
    const dotPos = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 6.25;

      dotPos[i] = r * Math.sin(phi) * Math.cos(theta);
      dotPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotPos[i + 2] = r * Math.cos(phi);
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 0.25,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotPoints);

    // 4. Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });

    // 5. IntersectionObserver optimization (Stop loop when off-screen)
    let isVisible = true;
    let animId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animate();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation
      globeGroup.rotation.y = elapsed * 0.25 + mouseX * 0.4;
      globeGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.15 - mouseY * 0.3;

      // Ring rotations
      ring1.rotation.z = elapsed * 0.3;
      ring2.rotation.z = -elapsed * 0.25;

      // Orbit satellite motion
      const angle = elapsed * 1.2;
      satMesh.position.x = Math.cos(angle) * 8.2;
      satMesh.position.y = Math.sin(angle) * 8.2 * Math.sin(Math.PI / 3);
      satMesh.position.z = Math.sin(angle) * 8.2 * Math.cos(Math.PI / 3);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      observer.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      if (animId) cancelAnimationFrame(animId);

      globeGeometry.dispose();
      globeMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-auto ${className}`}
    />
  );
}
