'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor, RoundedBox } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { GAMES } from '../../lib/games';

type Progress = { current: number };

const SPAN = 15.5;
const COUNT = GAMES.length;

function Slab({
  index,
  color,
  progress
}: {
  index: number;
  color: string;
  progress: Progress;
}) {
  const group = useRef<THREE.Group>(null);
  const seed = index * 2.39996;
  const screen = new THREE.Color(color).multiplyScalar(1.9);

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
      <RoundedBox args={[0.9, 1.86, 0.1]} radius={0.1} smoothness={5}>
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
          the colour reads as light coming through it rather than paint on it.
          It is pushed past full brightness on purpose: bloom then has
          something to catch, and on machines where bloom gets dropped the
          slabs still read as lit rather than as dark plastic. */}
      <mesh position={[0, 0, 0.058]}>
        <planeGeometry args={[0.7, 1.58]} />
        <meshBasicMaterial color={screen} toneMapped={false} />
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

export default function GlassSlabs({
  progress,
  active
}: {
  progress: Progress;
  active: boolean;
}) {
  /* Bloom is what makes the glass read as lit, but it is also the single
     most expensive thing here. Rather than guess at device capability, the
     scene watches its own frame rate and drops the effect on machines that
     cannot hold it - nobody gets a stuttering page for a highlight. */
  const [rich, setRich] = useState(true);

  return (
    <Canvas
      /* Off-screen the loop stops completely. Left running, this scene held
         the whole page at 7 fps - including the carousel two sections down. */
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 2.6], fov: 46 }}
      style={{ pointerEvents: 'none' }}
    >
      <PerformanceMonitor onDecline={() => setRich(false)} />
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.6} />

      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[6, 2, 1]} />
        <Lightformer intensity={1.1} position={[-4, 0, 1]} scale={[2, 6, 1]} />
        <Lightformer intensity={1.1} position={[4, 0, 1]} scale={[2, 6, 1]} />
      </Environment>

      {GAMES.map((game, i) => (
        <Slab key={game.slug} index={i} color={game.glow} progress={progress} />
      ))}

      <Rig progress={progress} />

      {/* The composer was the whole cost of this section: 12 fps with it,
          60 without. Multisampling ran 8x MSAA on a full-size target, and the
          vignette duplicated a CSS scrim already sitting over the canvas.
          Bloom stays - it is the reason the glass reads as lit - but at a
          third of the resolution, where nobody can tell. */}
      {rich ? (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            intensity={1.6}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.5}
            mipmapBlur
            resolutionScale={0.35}
          />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}
