import React, { useEffect, useRef } from "react"

const Lights = ({ guitarActive }) => {
  const sl = useRef()
  const box = useRef()
  useEffect(() => {
    sl.current.target = box.current
  })
  return (
    <>
      <spotLight
        penumbra={1}
        castShadow
        ref={sl}
        position={[-0.29, 1.82, 0.36]}
        angle={0.25}
      />

      <directionalLight
        position={[-2, 5.29, -3.59]}
        intensity={0.22}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.3} />
      {/*----------  Helper Box  ----------*/}
      <mesh position={[-0.37, 0.7, -0.07]} ref={box} visible={false}>
        <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  )
}

export default Lights
