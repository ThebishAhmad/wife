import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Hand, Loader2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/* ===================== SHADERS ===================== */

const vertexShader = `
uniform float uTime;
uniform vec3 uHandPosition;
uniform float uPinch;
uniform float uShape;
uniform vec3 uColor;

attribute vec3 aRandom;
attribute vec4 aSaturn;

varying vec3 vColor;

void main() {
  float t = aRandom.x + uTime * aRandom.y;
  float z = aRandom.z;

  vec3 pos = vec3(0.0);
  float expansion = mix(0.6, 3.8, uPinch);

  // HEARTS
  if (uShape < 0.5) {
    float s = sin(t);
    float c = cos(t);
    pos = vec3(
      16.0 * s * s * s,
      13.0 * c - 5.0*cos(2.0*t) - 2.0*cos(3.0*t) - cos(4.0*t),
      z * sin(uTime * 0.4)
    ) * 0.25 * expansion;
  }
  // SATURN
  else {
    if (aSaturn.w < 0.5) {
      float r = 1.5 * expansion;
      float theta = t * 0.12;
      float phi = acos(2.0 * fract(t) - 1.0);
      pos = vec3(
        r * sin(phi) * cos(theta),
        r * sin(phi) * sin(theta),
        r * cos(phi)
      );
    } else {
      float rad = aSaturn.x * expansion;
      float ang = t * aSaturn.y;
      pos = vec3(
        cos(ang) * rad,
        aSaturn.z * expansion,
        sin(ang) * rad
      );
    }
  }

  // Repel
  vec2 d = pos.xy - uHandPosition.xy;
  float dist = length(d);
  if (uHandPosition.z > 0.01 && dist < 6.0) {
    pos.xy += normalize(d) * (1.0 - dist / 6.0) * uHandPosition.z * 14.0;
  }

  pos.xy += uHandPosition.xy;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  gl_PointSize = clamp(45.0 / -mv.z, 2.0, 12.0);
  vColor = uColor;
}
`;

const fragmentShader = `
varying vec3 vColor;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  float d = dot(p, p);
  if (d > 0.25) discard;
  gl_FragColor = vec4(vColor, 1.0 - d * 4.0);
}
`;

/* ===================== TYPES ===================== */

type ShapeType = 'hearts' | 'saturn';

/* ===================== PARTICLES ===================== */

const Particles = ({ count, shape, color, handRef }: any) => {
  const mesh = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uHandPosition: { value: new THREE.Vector3() },
      uPinch: { value: 1 },
      uShape: { value: 0 },
      uColor: { value: new THREE.Color(color) }
    }
  }), []);

  useEffect(() => {
    material.uniforms.uColor.value.set(color);
  }, [color]);

  useEffect(() => {
    material.uniforms.uShape.value = shape === 'hearts' ? 0 : 1;
  }, [shape]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const aRandom = new Float32Array(count * 3);
    const aSaturn = new Float32Array(count * 4);

    for (let i = 0; i < count; i++) {
      aRandom.set(
        [Math.random() * 60, 0.01 + Math.random() * 0.02, (Math.random() - 0.5) * 6],
        i * 3
      );

      if (i % 10 < 3) {
        aSaturn.set([0, 0, 0, 0], i * 4);
      } else {
        aSaturn.set([
          2.2 + Math.random() * 2,
          0.2 + Math.random(),
          (Math.random() - 0.5) * 0.15,
          1
        ], i * 4);
      }
    }

    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aRandom', new THREE.BufferAttribute(aRandom, 3));
    g.setAttribute('aSaturn', new THREE.BufferAttribute(aSaturn, 4));
    return g;
  }, []);

  useFrame((state) => {
    const h = handRef.current;
    const s = 0.1;

    h.currentX += (h.targetX - h.currentX) * s;
    h.currentY += (h.targetY - h.currentY) * s;
    h.currentPinch += (h.targetPinch - h.currentPinch) * s;
    h.currentRepel += (h.targetRepel - h.currentRepel) * 0.12;

    h.currentZoom += ((h.isTwoHands ? h.targetZoom : 50) - h.currentZoom) * 0.05;
    camera.position.z = h.currentZoom;

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uHandPosition.value.set(
      h.currentX * 12,
      -h.currentY * 12,
      h.currentRepel
    );
    material.uniforms.uPinch.value = h.currentPinch;
  });

  return <points ref={mesh} geometry={geometry} material={material} />;
};

/* ===================== MAIN ===================== */

export default function InteractiveParticles() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const handRef = useRef({
    isPresent: false,
    isTwoHands: false,
    isFist: false,
    targetPinch: 1,
    targetX: 0,
    targetY: 0,
    targetZoom: 50,
    targetRepel: 0,
    currentPinch: 1,
    currentX: 0,
    currentY: 0,
    currentZoom: 50,
    currentRepel: 0
  });

  const [shape, setShape] = useState<ShapeType>('hearts');
  const [color, setColor] = useState('#ff69b4');
  const [ready, setReady] = useState(false);

  /* ======== MEDIAPIPE LOOP (NO RAF) ======== */
  useEffect(() => {
    let landmarker: HandLandmarker;
    let stopped = false;

    async function init() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 }
      });

      videoRef.current!.srcObject = stream;
      await videoRef.current!.play();

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "CPU"
        },
        runningMode: "VIDEO",
        numHands: 2
      });

      toast.success("AI Ready");
      setReady(true);
      runDetection();
    }

    function runDetection() {
      if (stopped || !videoRef.current) return;

      const now = performance.now();
      const r = landmarker.detectForVideo(videoRef.current, now);

      if (r.landmarks?.length) {
        const h1 = r.landmarks[0];
        const wrist = h1[0];
        const thumb = h1[4];
        const index = h1[8];

        const d = Math.hypot(
          thumb.x - index.x,
          thumb.y - index.y,
          thumb.z - index.z
        );

        handRef.current.targetPinch = THREE.MathUtils.clamp(
          (d - 0.02) / 0.15,
          0,
          1
        );

        handRef.current.targetX = -(wrist.x - 0.5) * 2;
        handRef.current.targetY = (wrist.y - 0.5) * 2;

        let open = 0;
        [8, 12, 16, 20].forEach(i => {
          const tip = h1[i];
          if (Math.hypot(tip.x - wrist.x, tip.y - wrist.y) > 0.15) open++;
        });

        handRef.current.isFist = open === 0;
        handRef.current.targetRepel = handRef.current.isFist ? 1 : 0;

        if (r.landmarks.length > 1) {
          const w2 = r.landmarks[1][0];
          const dist = Math.hypot(wrist.x - w2.x, wrist.y - w2.y);
          handRef.current.targetZoom = THREE.MathUtils.lerp(
            60,
            10,
            THREE.MathUtils.clamp((dist - 0.1) / 0.5, 0, 1)
          );
          handRef.current.isTwoHands = true;
        } else {
          handRef.current.isTwoHands = false;
        }
      }

      setTimeout(runDetection, 80); // ~12 FPS, NO RAF VIOLATIONS
    }

    init();
    return () => {
      stopped = true;
      landmarker?.close();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <video ref={videoRef} className="hidden" />

      {!ready && <Loader2 className="absolute inset-0 m-auto text-white animate-spin" />}

      <Button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-50">
        <ArrowLeft />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        <Button
          className={shape === 'hearts' ? 'bg-pink-500' : ''}
          onClick={() => setShape('hearts')}
        >
          <Heart className="w-4 h-4 mr-2" /> Hearts
        </Button>

        <Button
          className={shape === 'saturn' ? 'bg-blue-500' : ''}
          onClick={() => setShape('saturn')}
        >
          🪐 Saturn
        </Button>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded-full"
        />
      </div>

      <Canvas
        camera={{ position: [0, 0, 50], fov: 60 }}
        dpr={Math.min(1.5, window.devicePixelRatio)}
      >
        <ambientLight intensity={0.5} />
        <Particles count={16000} shape={shape} color={color} handRef={handRef} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Stars radius={80} depth={40} count={2000} factor={3} fade />
      </Canvas>
    </div>
  );
}
