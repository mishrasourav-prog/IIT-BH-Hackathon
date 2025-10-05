import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Striking.css';

const Striking = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const objectsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseForceRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const createCross = (colorHex) => {
    const group = new THREE.Group();
    const material = new THREE.MeshPhysicalMaterial({
      color: colorHex,
      metalness: 0.6,
      roughness: 0.13,
      clearcoat: 1,
      clearcoatRoughness: 0.07,
    });
    
    const geom = new THREE.CylinderGeometry(1.2, 1.2, 5, 32);
    for (let i = 0; i < 3; i++) {
      const mesh = new THREE.Mesh(geom, material);
      mesh.rotation.z = i * Math.PI / 2;
      mesh.rotation.x = (i === 2) ? Math.PI / 2 : 0;
      group.add(mesh);
    }
    return group;
  };

  const createObjects = (scene) => {
    const colors = [0x3366ff, 0x1a1a1a, 0xcccccc];
    const count = window.innerWidth < 768 ? 12 : 20;

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const cross = createCross(color);

      cross.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 5
      );

      cross.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const scale = Math.random() * 0.8 + 0.8;
      cross.scale.set(scale, scale, scale);

      cross.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.01
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        radius: scale * 2.5
      };

      scene.add(cross);
      objectsRef.current.push(cross);
    }
  };

  const createRipple = (event) => {
    if (!containerRef.current) return;

    const ripple = document.createElement('div');
    ripple.className = 'ripple';

    let x, y;
    if (event.touches && event.touches.length > 0) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    const size = 100;
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (x - size / 2) + 'px';
    ripple.style.top = (y - size / 2) + 'px';

    containerRef.current.appendChild(ripple);

    setTimeout(() => {
      const ripple2 = ripple.cloneNode(true);
      containerRef.current?.appendChild(ripple2);
      setTimeout(() => ripple2.remove(), 1500);
    }, 100);

    setTimeout(() => {
      const ripple3 = ripple.cloneNode(true);
      containerRef.current?.appendChild(ripple3);
      setTimeout(() => ripple3.remove(), 1500);
    }, 200);

    setTimeout(() => ripple.remove(), 1500);
  };

  const checkCollisions = () => {
    const objects = objectsRef.current;
    for (let i = 0; i < objects.length; i++) {
      for (let j = i + 1; j < objects.length; j++) {
        const obj1 = objects[i];
        const obj2 = objects[j];

        const distance = obj1.position.distanceTo(obj2.position);
        const minDistance = obj1.userData.radius + obj2.userData.radius;

        if (distance < minDistance) {
          const normal = new THREE.Vector3()
            .subVectors(obj2.position, obj1.position)
            .normalize();

          const relativeVelocity = new THREE.Vector3()
            .subVectors(obj1.userData.velocity, obj2.userData.velocity);

          const speed = relativeVelocity.dot(normal);

          if (speed < 0) continue;

          const impulse = normal.multiplyScalar(speed * 0.85);

          obj1.userData.velocity.sub(impulse);
          obj2.userData.velocity.add(impulse);

          const overlap = minDistance - distance;
          const separation = normal.multiplyScalar(overlap * 0.5);
          obj1.position.sub(separation);
          obj2.position.add(separation);

          obj1.userData.rotationSpeed.x += (Math.random() - 0.5) * 0.01;
          obj1.userData.rotationSpeed.y += (Math.random() - 0.5) * 0.01;
          obj2.userData.rotationSpeed.x += (Math.random() - 0.5) * 0.01;
          obj2.userData.rotationSpeed.y += (Math.random() - 0.5) * 0.01;
        }
      }
    }
  };

  const animate = () => {
    animationFrameRef.current = requestAnimationFrame(animate);

    mouseForceRef.current.x *= 0.95;
    mouseForceRef.current.y *= 0.95;

    objectsRef.current.forEach((obj) => {
      obj.userData.velocity.x += mouseForceRef.current.x;
      obj.userData.velocity.y += mouseForceRef.current.y;

      obj.userData.velocity.multiplyScalar(0.99);
      obj.position.add(obj.userData.velocity);

      obj.rotation.x += obj.userData.rotationSpeed.x;
      obj.rotation.y += obj.userData.rotationSpeed.y;
      obj.rotation.z += obj.userData.rotationSpeed.z;

      obj.userData.rotationSpeed.multiplyScalar(0.99);

      const bounds = 15;
      if (Math.abs(obj.position.x) > bounds) {
        obj.userData.velocity.x *= -0.8;
        obj.position.x = Math.sign(obj.position.x) * bounds;
      }
      if (Math.abs(obj.position.y) > bounds) {
        obj.userData.velocity.y *= -0.8;
        obj.position.y = Math.sign(obj.position.y) * bounds;
      }
      if (obj.position.z > 5 || obj.position.z < -15) {
        obj.userData.velocity.z *= -0.8;
        obj.position.z = obj.position.z > 5 ? 5 : -15;
      }
    });

    checkCollisions();

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4169ff, 2.5, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6699ff, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1.5, 40);
    pointLight3.position.set(0, 0, 20);
    scene.add(pointLight3);

    // Create objects
    createObjects(scene);

    // Event handlers
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseForceRef.current.x = event.movementX * 0.002;
      mouseForceRef.current.y = -event.movementY * 0.002;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        mouseRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', createRipple);
    window.addEventListener('touchstart', createRipple, { passive: true });

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', createRipple);
      window.removeEventListener('touchstart', createRipple);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      objectsRef.current.forEach(obj => {
        obj.geometry?.dispose();
        obj.material?.dispose();
      });
      
      objectsRef.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="canvas-container">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="testimonial-content">
        <h2>IIT Bhubaneswar Hackathon</h2>
      </div>
    </div>
  );
};

export default Striking;