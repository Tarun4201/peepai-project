import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { PintGlass } from './PintGlass'

interface HeroSceneProps {
  shape: 'pint' | 'bowl' | 'knot' | 'donut'
  mouseX: number
  mouseY: number
}

function Particles() {
  const count = 80
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color(0xD9B34A)}
        size={0.035}
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  )
}

function SceneContent({ shape, mouseX, mouseY }: HeroSceneProps) {
  const [poured, setPoured] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    // Trigger the pour animation after load (skip animation delay if reduced motion)
    const delay = prefersReducedMotion ? 0 : 800
    const timer = setTimeout(() => setPoured(true), delay)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  // Mouse parallax applied directly to group rotation (no OrbitControls)
  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = mouseX * 0.3
    groupRef.current.rotation.x = -mouseY * 0.15
  }, [mouseX, mouseY])

  return (
    <>
      <ambientLight intensity={0.5} color={new THREE.Color(0xF7F3E8)} />
      <directionalLight
        position={[3, 5, 3]}
        intensity={2.8}
        color={new THREE.Color(0xF0D77A)}
        castShadow
      />
      <pointLight position={[-2, 2, 2]} intensity={1.8} color={new THREE.Color(0xD9B34A)} />
      <pointLight position={[0, -3, 2]} intensity={0.9} color={new THREE.Color(0x03445A)} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={3.5}
        color={new THREE.Color(0xF0D77A)}
        castShadow
      />

      <Stars radius={60} depth={30} count={500} factor={3} fade speed={0.5} />
      <Particles />

      <group ref={groupRef}>
        {shape === 'pint' && <PintGlass poured={poured} />}
      </group>

      <Environment preset="city" />
    </>
  )
}

export function HeroScene({ shape, mouseX, mouseY }: HeroSceneProps) {
  const [webglAvailable, setWebglAvailable] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Detect WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebglAvailable(false)
    } catch {
      setWebglAvailable(false)
    }
  }, [])

  // Pause rendering when hero is scrolled off-screen
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!webglAvailable) return null

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        shadows
        // Pause the render loop when not visible (saves GPU when scrolled away)
        frameloop={isVisible ? 'always' : 'never'}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent shape={shape} mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
    </div>
  )
}
