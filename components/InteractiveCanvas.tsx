/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Particle Field Component
const FloatingParticles = ({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;
  
  // Create stable positions and random velocities
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12; // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8; // Z
    }
    return arr;
  });

  const [initialY] = useState(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = positions[i * 3 + 1];
    }
    return arr;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Wave animation + mouse responsive tracking
    for (let i = 0; i < count; i++) {
      const x = positionsArray[i * 3];
      // Gently sway y using a sine wave based on time and x coordinate
      positionsArray[i * 3 + 1] = initialY[i] + Math.sin(time * 0.5 + x * 0.3) * 0.4;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Gentle camera rotation based on mouse
    if (mouse.current) {
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.current.x * 0.2, 0.05);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.current.y * 0.2, 0.05);
    }
    
    // Gentle constant rotation
    pointsRef.current.rotation.z += 0.0004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#0f172a"
        size={0.065}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.35}
      />
    </points>
  );
};

// Connections/Lines Component
const InteractiveLines = ({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const count = 40;

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 6); // 2 points per line segment
    for (let i = 0; i < count; i++) {
      // Start point
      const x1 = (Math.random() - 0.5) * 10;
      const y1 = (Math.random() - 0.5) * 10;
      const z1 = (Math.random() - 0.5) * 6;
      
      // End point close to start
      const x2 = x1 + (Math.random() - 0.5) * 2;
      const y2 = y1 + (Math.random() - 0.5) * 2;
      const z2 = z1 + (Math.random() - 0.5) * 1.5;

      arr[i * 6] = x1; arr[i * 6 + 1] = y1; arr[i * 6 + 2] = z1;
      arr[i * 6 + 3] = x2; arr[i * 6 + 4] = y2; arr[i * 6 + 5] = z2;
    }
    return arr;
  });

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth breathing rotation
    lineRef.current.rotation.y = Math.sin(time * 0.08) * 0.15 + (mouse.current?.x || 0) * 0.1;
    lineRef.current.rotation.x = Math.cos(time * 0.05) * 0.1 + (mouse.current?.y || 0) * 0.1;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#151514"
        transparent={true}
        opacity={0.12}
        linewidth={1}
      />
    </lineSegments>
  );
};

export const InteractiveCanvas: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (hasError) {
    return <GridFallback />;
  }

  return (
    <div className={`relative w-full h-full min-h-[350px] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#E8E8E6_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          onError={() => setHasError(true)}
        >
          <ambientLight intensity={0.5} />
          <FloatingParticles mouse={mouse} />
          <InteractiveLines mouse={mouse} />
        </Canvas>
      </div>
    </div>
  );
};

// Premium SVG Grid Fallback if WebGL/Three is not loaded or errors
const GridFallback: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px] overflow-hidden bg-neutral-50 flex items-center justify-center border-b border-neutral-200/50">
      {/* SVG Grid with interactive hover radial gradient masking */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          backgroundImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(213, 213, 209, 0.25), transparent 80%), radial-gradient(#E8E8E6 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 24px 24px',
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
        <div className="flex justify-between items-start text-[10px] font-mono text-neutral-400">
          <span>COORDINATE SYSTEM [0,0]</span>
          <span>STABILITY RATING: HIGH</span>
        </div>
        <div className="flex justify-between items-end text-[10px] font-mono text-neutral-400">
          <span>AURA_SPACE_GRID_FALLBACK</span>
          <span>SECURE PROTOCOL ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCanvas;
