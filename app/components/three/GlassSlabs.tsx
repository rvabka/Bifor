'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GAMES } from '../../lib/games';

type Progress = { current: number };

const SPAN = 15.5;
const COUNT = GAMES.length;

/* One radial sprite shared by every halo. Bloom used to do this job, but a
   full-screen composer pass cost more than the rest of the scene put together
   and dragged in the whole postprocessing library - a third of the download
   for this section - to blur seven small rectangles. */
function useHaloTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.35, 'rgba(255,255,255,0.42)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function Slab({
  index,
  color,
  halo,
  progress
}: {
  index: number;
  color: string;
  halo: THREE.Texture;
  progress: Progress;
}) {
  const group = useRef<THREE.Group>(null);
  const seed = index * 2.39996;
  const screen = useMemo(() => new THREE.Color(color).multiplyScalar(1.9), [color]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    /* The slabs ride a shallow arc BEHIND the copy rather than a ring around
       the camera - inside a ring the nearest slab always lands on top of the
       headline and eats it. Scroll drifts the arc sideways instead. */
    const lane = (index + 0.5) / COUNT - 0.5;
    const x = ((lane - progress.current * 0.42 + 1.5) % 1.0 - 0.5) * SPAN;
    const depth = -5.2 - Math.cos(lane * Math.PI * 1.6) * 1.9;

    g.position.x = x;
    g.position.z = depth + Math.sin(t * 0.3 + seed) * 0.25;
    g.position.y = Math.sin(t * 0.42 + seed) * 0.3 + (index % 3) * 0.55 - 0.55;
    g.rotation.y = Math.sin(t * 0.18 + seed) * 0.5 + x * 0.06;
    g.rotation.z = Math.sin(t * 0.24 + seed) * 0.12;
    g.rotation.x = Math.cos(t * 0.2 + seed) * 0.08;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[0.9, 1.86, 0.1]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial
          color="#0f1014"
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={3.2}
          transparent
          opacity={0.62}
        />
      </RoundedBox>
      {/* The screen is a thin emissive plate just in front of the glass, so
          the colour reads as light coming through it rather than paint on it. */}
      <mesh position={[0, 0, 0.058]}>
        <planeGeometry args={[0.7, 1.58]} />
        <meshBasicMaterial color={screen} toneMapped={false} />
      </mesh>
      {/* Two additive sprites stand in for the bloom: a tight bleed over the
          bezel and a wide wash into the black around it. */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.5, 2.6]} />
        <meshBasicMaterial
          map={halo}
          color={color}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[3.6, 4.6]} />
        <meshBasicMaterial
          map={halo}
          color={color}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Rig({ progress }: { progress: Progress }) {
  /* The camera comes off the frame state rather than useThree() so the
     per-frame mutation R3F is built around stays inside the callback. */
  useFrame((state) => {
    const cam = state.camera;
    const z = 2.6 - progress.current * 1.5;
    cam.position.x += (state.pointer.x * 0.7 - cam.position.x) * 0.04;
    cam.position.y += (state.pointer.y * 0.35 - cam.position.y) * 0.04;
    cam.position.z += (z - cam.position.z) * 0.06;
    cam.lookAt(0, 0, -5.5);
  });
  return null;
}

/* The cross-fade waits for pixels, not for the module: a mounted canvas that
   has not drawn yet is still a black hole, and shader compilation plus the
   environment pass land a few frames after React is done. */
function FirstFrame({ onReady }: { onReady: () => void }) {
  const drawn = useRef(0);
  useFrame(() => {
    drawn.current += 1;
    if (drawn.current === 3) onReady();
  });
  return null;
}

export default function GlassSlabs({
  progress,
  active,
  ready,
  onReady
}: {
  progress: Progress;
  active: boolean;
  ready: boolean;
  onReady: () => void;
}) {
  const halo = useHaloTexture();
  const [dpr, setDpr] = useState(1.25);

  useEffect(() => () => halo.dispose(), [halo]);

  return (
    <Canvas
      /* Off-screen the loop stops completely. Left running, this scene held
         the whole page at 7 fps - including the carousel two sections down.
         Until the first frames are out it runs regardless, otherwise a canvas
         armed just before the section scrolls in never draws at all. */
      frameloop={active || !ready ? 'always' : 'never'}
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 2.6], fov: 46 }}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      {/* Rather than guess at device capability, the scene watches its own
          frame rate and drops resolution on machines that cannot hold it. */}
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <FirstFrame onReady={onReady} />

      <ambientLight intensity={0.6} />

      <Environment resolution={64}>
        <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[6, 2, 1]} />
        <Lightformer intensity={1.1} position={[-4, 0, 1]} scale={[2, 6, 1]} />
        <Lightformer intensity={1.1} position={[4, 0, 1]} scale={[2, 6, 1]} />
      </Environment>

      {GAMES.map((game, i) => (
        <Slab key={game.slug} index={i} color={game.glow} halo={halo} progress={progress} />
      ))}

      <Rig progress={progress} />
    </Canvas>
  );
}
