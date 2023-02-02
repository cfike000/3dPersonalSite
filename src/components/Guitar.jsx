import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Guitar(props) {
  const { nodes, materials } = useGLTF("/gltf/guitar.glb")
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[-8.04, 84.79, 103.82]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.Guitar_Guitar_0.geometry}
              material={materials.Guitar}
            />
          </group>
          <group
            position={[1.46, 95.87, -41.01]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.Strings_Strings_0.geometry}
              material={materials.Strings}
            />
          </group>
          <group
            position={[-8.04, 84.79, 103.82]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.Tuning_Keys_Tuning_Keys_0.geometry}
              material={materials.Tuning_Keys}
            />
          </group>
          <group
            position={[0, 52.74, 160.1]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.Controls_Buttons_0.geometry}
              material={materials.Buttons}
            />
          </group>
          <group
            position={[55.7, 1.69, 164.76]}
            rotation={[-Math.PI / 2, 0, -2.16]}
            scale={100}
          ></group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/gltf/guitar.glb")
