import React, { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

export default function Bird() {
  const { scene, animations } = useGLTF("/gltf/bird.gltf")
  const modelRef = useRef()
  const { actions } = useAnimations(animations, modelRef)

  // State for random scale, y-position, and z-position
  const randomScale = 0.03
  const randomYPosition = 0.45
  const randomZPosition = -0.5

  // This will move the bird from -10 to 20 along the x-axis over a period of 25 seconds
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    const duration = 12 // Time taken to move from -10 to 20 along the x-axis
    const speed = 10 / duration // Speed calculated as total distance divided by time
    const xPosition = -10 + (elapsedTime % duration) * speed // Calculate current x position

    // Check if the bird has reached the end
    if (modelRef.current.position.x >= 30) {
      console.log("Bird reached the end")
      setTimeout(() => {
        modelRef.current.position.x = -10 // Reset position to start after 5 seconds
      }, 5000)
    } else {
      modelRef.current.position.x = xPosition // Update position normally
    }
  })

  // Apply random scale, y-position, and z-position when they change
  useEffect(() => {
    modelRef.current.scale.set(randomScale, randomScale, randomScale)
    modelRef.current.position.y = randomYPosition
    modelRef.current.position.z = randomZPosition
  }, [])

  // Initial setup for rotation and hardcoded animation offset
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.set(0, THREE.MathUtils.degToRad(96), 0)
    }

    if (actions["Take 001"]) {
      actions["Take 001"].setDuration(0.5) // Set the duration of the animation (in seconds)
      actions["Take 001"].play().setLoop(THREE.LoopRepeat)
    }

    return () => actions["Take 001"]?.stop()
  }, [actions])

  return <primitive ref={modelRef} object={scene} />
}
