import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber" // Corrected import for useFrame
import { MathUtils } from "three" // For conversion

export default function Scene() {
  const gltf = useGLTF("/gltf/scene.gltf")
  const modelRef = useRef()

  // Set initial position, scale, and rotation
  React.useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(0, -3, 3.1) // Example position values
      modelRef.current.scale.set(0.008, 0.008, 0.008) // Example scale value
      modelRef.current.rotation.set(
        0,
        MathUtils.degToRad(220), // Initial Y rotation in degrees converted to radians
        0
      )
    }
  }, [])

  // Use useFrame for continuous rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0001 // Increment Y rotation slightly on each frame for continuous rotation
    }
  })

  return <primitive ref={modelRef} object={gltf.scene} />
}
