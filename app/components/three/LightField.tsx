'use client';

import { useEffect, useRef, useState } from 'react';
import { GAMES } from '../../lib/games';
import { useReducedMotion } from '../useReducedMotion';

/* Seven soft lights - one per game - drifting through a domain-warped field.
   Everything happens in one fragment shader, so the whole background costs a
   single full-screen quad rather than dozens of blended sprites. */
const FRAGMENT = `
precision highp float;

uniform float uTime;
uniform vec2  uRes;
uniform vec2  uPointer;
uniform float uEnergy;
uniform vec3  uColor[7];

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

  float t = uTime * 0.06;

  /* Warping the sample point with its own noise is what turns separate
     blobs into one liquid that folds through itself. */
  vec2 warp = vec2(
    fbm(p * 1.6 + vec2(t, -t * 0.7)),
    fbm(p * 1.6 + vec2(-t * 0.8, t * 1.1))
  );
  p += (warp - 0.5) * (0.55 + uEnergy * 0.35);
  p += uPointer * 0.09;

  vec3 col = vec3(0.0);
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float ang = t * (1.0 + fi * 0.13) + fi * 2.39996;
    vec2 c = vec2(
      cos(ang) * (0.34 + 0.1 * sin(fi * 1.7 + t * 2.0)) * aspect,
      sin(ang * 0.82 + fi) * 0.3
    );
    float d = length(p - c);
    float falloff = exp(-d * d * (7.5 - uEnergy * 1.6));
    col += uColor[i] * falloff;
  }

  /* Keep the field as a wash under the content, never a subject. */
  col *= 0.4 + uEnergy * 0.18;
  col = col / (1.0 + col);

  float vig = smoothstep(1.1, 0.25, length(vec2(p.x / max(aspect, 0.001), p.y)));
  col *= vig;

  float grain = (hash(uv * uRes + fract(uTime)) - 0.5) * 0.02;
  gl_FragColor = vec4(col + grain, 1.0);
}
`;

const VERTEX = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export default function LightField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import('three').then((THREE) => {
      if (disposed) return;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' });
      } catch {
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      host.appendChild(renderer.domElement);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';

      const scene = new THREE.Scene();
      const camera = new THREE.Camera();

      const colors = GAMES.slice(0, 7).map((g) => new THREE.Color(g.glow));
      while (colors.length < 7) colors.push(new THREE.Color('#FFB200'));

      const uniforms = {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uEnergy: { value: 0 },
        uColor: { value: colors }
      };

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          vertexShader: VERTEX,
          fragmentShader: FRAGMENT,
          uniforms,
          depthTest: false,
          depthWrite: false
        })
      );
      mesh.frustumCulled = false;
      scene.add(mesh);

      let width = 0;
      let height = 0;
      const resize = () => {
        const rect = host.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        if (width === 0 || height === 0) return;
        renderer.setSize(width, height, false);
        uniforms.uRes.value.set(width, height);
      };
      resize();

      let targetPointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        targetPointer = {
          x: e.clientX / window.innerWidth - 0.5,
          y: 0.5 - e.clientY / window.innerHeight
        };
      };

      let lastScroll = window.scrollY;
      let energy = 0;
      const onScroll = () => {
        const delta = Math.abs(window.scrollY - lastScroll);
        lastScroll = window.scrollY;
        energy = Math.min(1, energy + delta * 0.004);
      };

      let raf = 0;
      let visible = true;
      const clock = new THREE.Clock();
      let painted = false;

      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || width === 0) return;
        uniforms.uTime.value = clock.getElapsedTime();
        energy *= 0.94;
        uniforms.uEnergy.value += (energy - uniforms.uEnergy.value) * 0.08;
        uniforms.uPointer.value.x += (targetPointer.x - uniforms.uPointer.value.x) * 0.04;
        uniforms.uPointer.value.y += (targetPointer.y - uniforms.uPointer.value.y) * 0.04;
        renderer.render(scene, camera);
        if (!painted) {
          painted = true;
          setReady(true);
        }
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(host);
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      raf = requestAnimationFrame(frame);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('scroll', onScroll);
        mesh.geometry.dispose();
        (mesh.material as import('three').ShaderMaterial).dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [reduced]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000"
      style={{ opacity: ready ? 0.9 : 0 }}
    />
  );
}
