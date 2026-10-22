import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PintGlassProps {
  poured: boolean
}

export function PintGlass({ poured }: PintGlassProps) {
  const glassRef = useRef<THREE.Group>(null)
  const liquidRef = useRef<THREE.Mesh>(null)
  const foamRef = useRef<THREE.Mesh>(null)
  const pourStreamRef = useRef<THREE.Mesh>(null)
  const bubblesRef = useRef<THREE.InstancedMesh>(null)
  
  // Animation state
  const animState = useRef({
    pourProgress: 0,
    liquidFill: 0,
    idleTime: 0,
    poured: false,
  })

  // Bubble positions
  const bubbleCount = 40
  const bubbleData = useMemo(() => {
    const positions: number[] = []
    const speeds: number[] = []
    const offsets: number[] = []
    for (let i = 0; i < bubbleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.random() * 0.25
      positions.push(Math.cos(angle) * r, -0.8, Math.sin(angle) * r)
      speeds.push(0.3 + Math.random() * 0.7)
      offsets.push(Math.random() * Math.PI * 2)
    }
    return { positions, speeds, offsets }
  }, [])

  useFrame((state, delta) => {
    const s = animState.current
    const t = state.clock.elapsedTime

    // Idle float
    if (glassRef.current) {
      glassRef.current.position.y = Math.sin(t * 0.8) * 0.08
      glassRef.current.rotation.y = Math.sin(t * 0.3) * 0.05
    }

    // Pour animation
    if (poured && !s.poured) {
      s.pourProgress = Math.min(1, s.pourProgress + delta * 0.7)
      s.liquidFill = Math.min(0.85, s.liquidFill + delta * 0.45)
      if (s.pourProgress >= 1) s.poured = true

      if (pourStreamRef.current) {
        pourStreamRef.current.scale.y = s.pourProgress
        pourStreamRef.current.visible = s.pourProgress < 0.95
      }
      if (liquidRef.current) {
        liquidRef.current.scale.y = s.liquidFill
        liquidRef.current.position.y = -0.85 + s.liquidFill * 0.85
      }
      if (foamRef.current) {
        foamRef.current.scale.x = Math.min(1, s.pourProgress * 1.2)
        foamRef.current.scale.z = Math.min(1, s.pourProgress * 1.2)
        foamRef.current.position.y = -0.85 + s.liquidFill * 1.7 + 0.1
      }
    }

    // Animate bubbles
    if (bubblesRef.current && s.liquidFill > 0.1) {
      const dummy = new THREE.Object3D()
      for (let i = 0; i < bubbleCount; i++) {
        const speed = bubbleData.speeds[i]
        const offset = bubbleData.offsets[i]
        const bx = bubbleData.positions[i * 3]
        const bz = bubbleData.positions[i * 3 + 2]
        const progress = ((t * speed + offset) % 1)
        const y = -0.8 + progress * s.liquidFill * 1.7
        const size = 0.015 + progress * 0.025 * (1 - progress)
        const visible = progress < 0.95 && s.liquidFill > 0.1
        dummy.position.set(bx * 0.9, y, bz * 0.9)
        dummy.scale.setScalar(visible ? size : 0.001)
        dummy.updateMatrix()
        bubblesRef.current.setMatrixAt(i, dummy.matrix)
      }
      bubblesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  // Glass geometry — a pint shape using lathe
  const glassPoints = useMemo(() => {
    const pts = []
    // Bottom (narrow)
    pts.push(new THREE.Vector2(0.25, -1.0))
    // Slight taper in
    pts.push(new THREE.Vector2(0.22, -0.7))
    // Straight sides
    pts.push(new THREE.Vector2(0.26, -0.2))
    // Flare out at top
    pts.push(new THREE.Vector2(0.35, 0.5))
    pts.push(new THREE.Vector2(0.38, 0.85))
    pts.push(new THREE.Vector2(0.37, 1.0))
    return pts
  }, [])

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x88ccff),
    transparent: true,
    opacity: 0.12,
    roughness: 0.05,
    metalness: 0.0,
    transmission: 0.95,
    thickness: 0.3,
    envMapIntensity: 2.0,
    side: THREE.DoubleSide,
  }), [])

  const liquidMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xd4831a),
    transparent: true,
    opacity: 0.88,
    roughness: 0.1,
    metalness: 0.05,
    transmission: 0.3,
  }), [])

  const foamMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xfff5d6),
    roughness: 0.95,
    metalness: 0,
  }), [])

  const pourMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xd4831a),
    transparent: true,
    opacity: 0.7,
    transmission: 0.5,
  }), [])

  return (
    <group ref={glassRef}>
      {/* Glass body */}
      <mesh>
        <latheGeometry args={[glassPoints, 32]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Glass rim highlight */}
      <mesh position={[0, 1.0, 0]}>
        <torusGeometry args={[0.37, 0.015, 8, 32]} />
        <meshStandardMaterial color="#ccddff" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      {/* Liquid */}
      <mesh ref={liquidRef} position={[0, -1.7, 0]} scale={[0.9, 0, 0.9]}>
        <cylinderGeometry args={[0.28, 0.22, 1.7, 32, 1, false]} />
        <primitive object={liquidMaterial} />
      </mesh>

      {/* Foam head */}
      <mesh ref={foamRef} position={[0, 0, 0]} scale={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.29, 0.28, 0.3, 32]} />
        <primitive object={foamMaterial} />
      </mesh>

      {/* Pour stream */}
      <mesh ref={pourStreamRef} position={[0, 1.8, 0]} scale={[1, 0, 1]} visible={false}>
        <cylinderGeometry args={[0.04, 0.08, 1.2, 12]} />
        <primitive object={pourMaterial} />
      </mesh>

      {/* Bubbles */}
      <instancedMesh ref={bubblesRef} args={[undefined, undefined, bubbleCount]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshPhysicalMaterial
          color={new THREE.Color(0xe8a030)}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.1}
        />
      </instancedMesh>
    </group>
  )
}
