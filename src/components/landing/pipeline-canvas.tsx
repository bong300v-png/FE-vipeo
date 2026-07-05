"use client";

import { Float, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

type ProgressRef = MutableRefObject<{ value: number }>;

const GOLD = "#e8b34b";
const GOLD_DIM = "#8a6a2f";

/* ---------------------------------- */
/* Particle tunnel — thousands of dots forming a cinematic corridor */
/* ---------------------------------- */
function ParticleTunnel() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 2400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Radius between 5 and 14 — leaves a clear corridor in the middle
      const radius = 5 + Math.random() * 9;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.6;
      positions[i * 3 + 2] = -Math.random() * 120;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;
    const t = clock.getElapsedTime();
    // GPU-cheap ambient motion: slow roll instead of per-vertex updates
    points.rotation.z = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={GOLD}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------------------------- */
/* Wireframe rings marking each pipeline stage */
/* ---------------------------------- */
function StageRing({ z, label }: { z: number; label: string }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group position={[0, 0, z]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[4.4, 0.015, 8, 96]} />
        <meshBasicMaterial color={GOLD_DIM} transparent opacity={0.7} />
      </mesh>
      <Text
        fontSize={0.22}
        color={GOLD}
        anchorX="center"
        anchorY="middle"
        position={[0, 4.9, 0]}
        letterSpacing={0.35}
      >
        {label}
      </Text>
    </group>
  );
}

/* ---------------------------------- */
/* Floating holographic panels per stage */
/* ---------------------------------- */
function HoloPanel({
  position,
  rotation,
  lines,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  lines: string[];
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group position={position} rotation={rotation}>
        {/* Glass slab */}
        <mesh>
          <planeGeometry args={[3.4, 2]} />
          <meshPhysicalMaterial
            color="#101014"
            transparent
            opacity={0.72}
            roughness={0.25}
            metalness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Gold frame */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.4, 2)]} />
          <lineBasicMaterial color={GOLD} transparent opacity={0.9} />
        </lineSegments>
        {/* Panel text */}
        {lines.map((line, i) => (
          <Text
            key={line}
            fontSize={i === 0 ? 0.3 : 0.14}
            color={i === 0 ? "#f5f5f5" : GOLD}
            anchorX="left"
            anchorY="middle"
            position={[-1.45, 0.55 - i * 0.42, 0.02]}
            maxWidth={2.9}
            letterSpacing={i === 0 ? 0 : 0.12}
          >
            {line}
          </Text>
        ))}
      </group>
    </Float>
  );
}

/* ---------------------------------- */
/* Giant VIPEO title floating at tunnel entrance */
/* ---------------------------------- */
function HeroTitle() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, -6]}>
      <Text
        fontSize={2.2}
        color="#f5f5f5"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        VIPEO
      </Text>
      <Text
        fontSize={0.18}
        color={GOLD}
        anchorX="center"
        anchorY="middle"
        position={[0, -1.6, 0]}
        letterSpacing={0.5}
      >
        THE AI VIDEO PIPELINE
      </Text>
    </group>
  );
}

/* ---------------------------------- */
/* Camera rig — dollies through the tunnel following scroll */
/* ---------------------------------- */
const STAGE_DEPTH = 26;

function CameraRig({ progressRef }: { progressRef: ProgressRef }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const progress = progressRef.current.value;
    // Travel from z=4 to the last stage
    const targetZ = 4 - progress * (STAGE_DEPTH * 3 + 14);

    // Smooth pointer parallax
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      state.pointer.x,
      0.05,
    );
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      state.pointer.y,
      0.05,
    );

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.current.x * 1.1,
      0.06,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.current.y * 0.7,
      0.06,
    );
    camera.lookAt(0, 0, camera.position.z - 10);
  });

  return null;
}

/* ---------------------------------- */
/* Scene composition */
/* ---------------------------------- */
const STAGES = [
  {
    label: "STAGE 01 / IDEA",
    panel: {
      position: [-2.6, 0.4, -14] as [number, number, number],
      rotation: [0, 0.35, 0] as [number, number, number],
      lines: ["Idea", "> one-line brief", "> hooks + angles", "> narrative arc"],
    },
  },
  {
    label: "STAGE 02 / SCRIPT",
    panel: {
      position: [2.6, -0.2, -40] as [number, number, number],
      rotation: [0, -0.35, 0] as [number, number, number],
      lines: ["Script", "> timed beats", "> dialogue + b-roll", "> captions"],
    },
  },
  {
    label: "STAGE 03 / DIRECT",
    panel: {
      position: [-2.6, 0.2, -66] as [number, number, number],
      rotation: [0, 0.35, 0] as [number, number, number],
      lines: ["Direct", "> camera moves", "> pacing + cuts", "> transitions"],
    },
  },
  {
    label: "STAGE 04 / RENDER",
    panel: {
      position: [2.6, 0.4, -92] as [number, number, number],
      rotation: [0, -0.35, 0] as [number, number, number],
      lines: ["Render", "> multi-ratio", "> every platform", "> credit metered"],
    },
  },
];

function Scene({ progressRef }: { progressRef: ProgressRef }) {
  return (
    <>
      <color attach="background" args={["#0a0a0c"]} />
      <fog attach="fog" args={["#0a0a0c", 8, 42]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[0, 6, 0]} intensity={30} color={GOLD} />
      <pointLight position={[0, -4, -50]} intensity={40} color="#4b6ee8" />

      <HeroTitle />
      <ParticleTunnel />

      {STAGES.map((stage, i) => (
        <group key={stage.label}>
          <StageRing z={-14 - i * STAGE_DEPTH} label={stage.label} />
          <HoloPanel {...stage.panel} />
        </group>
      ))}

      <CameraRig progressRef={progressRef} />
    </>
  );
}

export function PipelineCanvas({ progressRef }: { progressRef: ProgressRef }) {
  // Remount the canvas if the WebGL context is lost (e.g. software rendering)
  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <Canvas
      key={canvasKey}
      camera={{ position: [0, 0, 4], fov: 62 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "default" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e) => {
            e.preventDefault();
            setTimeout(() => setCanvasKey((k) => k + 1), 500);
          },
          { once: true },
        );
      }}
    >
      <Scene progressRef={progressRef} />
    </Canvas>
  );
}
