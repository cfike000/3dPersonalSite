import React, { useRef, useEffect, useState, Suspense } from "react"
import {
  Clone,
  Html,
  PresentationControls,
  useGLTF,
  PositionalAudio,
} from "@react-three/drei"
import Guitar from "./Guitar"
import { useFrame } from "@react-three/fiber"
import { useThree } from "@react-three/fiber"
import gsap from "gsap"
import Lights from "./Lights"

const Models = () => {
  //CONTROLS
  //   const { p } = useControls({
  //     p: {
  //       value: {
  //         x: 0,
  //         y: 0,
  //         z: 0,
  //       },
  //       step: 0.001,
  //     },
  //   })
  //   const { x, y, z } = p

  /*----------  REFERENCES----------*/
  const musicBox = useRef()
  const notesRef = useRef()
  const pointerBox = useRef()
  const camBox = useRef()
  const pointerRef = useRef()
  const { camera } = useThree()
  const cameraPosition = camera.position
  const notesPosition = notesRef.current?.position
  const pointerPosition = pointerRef.current?.position

  /*----------  STATE ----------*/
  const [zoomComputer, setZoomComputer] = useState(false)
  const [musicZoom, setMusicZoom] = useState(false)
  /*----------  EFFECTS ----------*/

  useEffect(() => {
    if (musicZoom) {
      gsap.to(musicBox.current.position, {
        duration: 5,
        x: 2,
        y: 2,
        z: 0.32,
        ease: "power4.out",
      })
      gsap.to(notesRef.current.position, {
        duration: 5,
        x: 2,
        y: 2,
        z: 0.32,
        ease: "power4.out",
      })
    } else {
      gsap.to(musicBox.current.position, {
        duration: 5,
        x: -0.22,
        y: 0.9,
        z: 0.14,
        ease: "power4.out",
      })
      gsap.to(notesRef.current.position, {
        duration: 5,
        x: -0.22,
        y: 0.9,
        z: 0.14,
        ease: "power4.out",
      })
    }

    setTimeout(() => {
      setMusicZoom(false)
    }, 45000)
    console.log("musicZoom", musicZoom)
  }, [musicZoom])

  useEffect(() => {
    if (zoomComputer) {
      gsap.to(camBox.current.position, {
        duration: 2,
        x: -0.76,
        y: 0.5,
        z: 0.32,
        ease: "power4.out",
      })
      gsap.to(cameraPosition, {
        duration: 2,
        x: -1.3,
        y: 0.7,
        z: 0.9,
        ease: "power4.out",
      })
    } else {
      gsap.to(camBox.current.position, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: "power4.out",
      })
      gsap.to(cameraPosition, {
        duration: 2,
        x: -1.97,
        y: 1,
        z: 1.92,
        ease: "power4.out",
      })
    }
  }, [zoomComputer])

  /*----------  ANIMATION----------*/
  useFrame((state, delta) => {
    pointerRef.current.lookAt(
      -cameraPosition.x,
      cameraPosition.y + 8,
      -cameraPosition.z
    )
    notesRef.current.lookAt(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    )

    pointerBox.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.02 + 0.76
    camera.lookAt(camBox.current.position)

    notesRef.current.position.y =
      Math.sin(state.clock.elapsedTime + 2) * 0.02 + 1

    pointerRef.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.02 + 0.72
    camera.lookAt(camBox.current.position)

    musicBox.current.position.y =
      Math.sin(state.clock.elapsedTime + 2) * 0.02 + 1.01
    camera.lookAt(camBox.current.position)

    pointerRef.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.02 + 0.72
    camera.lookAt(camBox.current.position)
  })
  /*----------  IMPORT MODELS  ----------*/

  const wall = useGLTF("gltf/wall.glb")
  const floor = useGLTF("gltf/floorFull.glb")
  const desk = useGLTF("gltf/desk.glb")
  const windowSlide = useGLTF("gltf/wallWindowSlide.glb")
  const wallCornerRounded = useGLTF("gltf/wallCornerRond.glb")
  const computerScreen = useGLTF("gltf/computerScreen.glb")
  const lamp = useGLTF("gltf/lampRoundTable.glb")
  const rug = useGLTF("gltf/rugRound.glb")
  const chair = useGLTF("gltf/chairDesk.glb")
  const keyboard = useGLTF("gltf/computerKeyboard.glb")
  const mouse = useGLTF("gltf/computerMouse.glb")
  const pointer = useGLTF("gltf/pointer.glb")
  const books = useGLTF("gltf/books.glb")

  const bookcase = useGLTF("gltf/bookcaseOpen.glb")
  const plant1 = useGLTF("gltf/plantSmall1.glb")
  const plant2 = useGLTF("gltf/plantSmall2.glb")
  const plant3 = useGLTF("gltf/plantSmall3.glb")
  const plant4 = useGLTF("gltf/pottedPlant.glb")
  const notes = useGLTF("gltf/notes.glb")
  const speaker = useGLTF("gltf/speaker.glb")
  /*----------  CONSOLE LOGS / TESTING ----------*/

  /*----------  SHADOW IMPLEMENTATION ----------*/

  //cast shadow
  const itemsToCastShadow = [
    lamp,
    computerScreen,
    mouse,
    keyboard,
    chair,
    desk,
    bookcase,
    speaker,
    plant1,
    plant2,
    plant3,
    plant4,
    books,
  ]
  itemsToCastShadow.forEach((item) => {
    item.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
      }
    })
  })
  //receive shadow
  const itemsToReceiveShadow = [
    speaker,
    wall,
    floor,
    desk,
    windowSlide,
    wallCornerRounded,
    rug,
    chair,
    bookcase,
  ]
  itemsToReceiveShadow.forEach((item) => {
    item.scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true
      }
    })
  })
  return (
    <PresentationControls
      polar={zoomComputer ? [-2, 2] : [-0.15, 0.15]}
      azimuth={zoomComputer ? [-2, 2] : [-0.15, 0.15]}
    >
      <Lights guitarActive={musicZoom} />
      {/*=============================================                      = Walls/Windows =
      =============================================*/}
      <primitive
        object={wall.scene}
        scale={[0.4, 2, 1]}
        position={[-1.6, 0, 0]}
        rotation-y={Math.PI}
      ></primitive>
      <Clone
        object={wall.scene}
        scale={[2, 2, 1]}
        rotation-y={Math.PI}
        position={[-1.96, 0, 0]}
      ></Clone>
      <Clone
        object={wall.scene}
        scale={[5, 1.1, 1]}
        rotation-y={Math.PI}
        position={[0.6, 1.16, 0]}
      />
      <Clone
        object={wall.scene}
        scale={[5, 2, 1]}
        rotation-y={Math.PI * 0.5}
        position={[0.05, 0, 5.22]}
      />
      <primitive
        object={windowSlide.scene}
        scale={[1.5, 1, 1]}
        position={[-0.25, -0, 0]}
        rotation-y={Math.PI}
      />
      <primitive
        object={wallCornerRounded.scene}
        scale={[1, 2, 1]}
        position={[0.05, 0, 0.55]}
        rotation-y={Math.PI * 0.5}
      />
      {/*=============================================                      = Floors =
      =============================================*/}
      <primitive
        object={floor.scene}
        scale={[4, 1, 4]}
        position={[-3.86, -0.04, 3.88]}
      ></primitive>
      <primitive object={rug.scene} position={[-1.44, 0.01, 1.08]} />
      {/*=============================================                      = Desk =
      =============================================*/}
      <primitive object={desk.scene} position={[-1.36, 0, 0.48]} />
      <primitive
        object={chair.scene}
        position={[-0.78, 0.01, 0.62]}
        rotation-y={Math.PI * -0.4}
      />
      {/*=============================================                      = Computer =
      =============================================*/}
      <primitive
        object={computerScreen.scene}
        position={[-0.95, 0.38, 0.25]}
        rotation-y={Math.PI * 1.8}
      >
        <Html
          distanceFactor={0.12}
          transform
          wrapperClass="htmlScreen"
          position={[0.196, 0.17, -0.05]}
          rotation-x={Math.PI * -0.04}
        >
          <iframe src="https://golden-lollipop-ca1ff8.netlify.app" />
        </Html>
      </primitive>
      <primitive
        object={lamp.scene}
        position={[-1.36, 0.38, 0.23]}
        rotation-y={Math.PI * 1.8}
      />
      <primitive
        object={keyboard.scene}
        position={[-1.26, 0.39, 0.46]}
        rotation-y={Math.PI * 2}
      />
      <primitive
        object={mouse.scene}
        position={[-0.88, 0.38, 0.35]}
        rotation-y={Math.PI}
      />
      {/*=============================================                      = Guitar =
      =============================================*/}
      <Guitar
        scale={0.13}
        position={[-0.24, 0.86, 0.08]}
        rotation-z={Math.PI * 0.5}
        rotation-y={[Math.PI * 2]}
      />
      <Suspense>
        <primitive
          ref={notesRef}
          object={notes.scene}
          position={[-0.22, 0.9, 0.14]}
          rotation-z={Math.PI * 2}
          rotation-y={[Math.PI * 2]}
          scale={0.08}
        />
      </Suspense>
      <Suspense>
        <mesh position={[-0.17, 0.64, 1.06]} visible={false}>
          <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="red" />
          {musicZoom && (
            <PositionalAudio
              autoplay
              loop={false}
              url="/discoSite.mp3"
              distance={3}
              getRolloffFactor={() => 0.5}
              getDistanceModel={() => "exponential"}
              getRefDistance={() => 0.5}
            />
          )}
        </mesh>
      </Suspense>
      {/*=============================================                      =Pointer =
      =============================================*/}
      <primitive
        ref={pointerRef}
        object={pointer.scene}
        scale={0.5}
        position={[-0.93, 0.73, 0.23]}
      />{" "}
      {/*=============================================                      =REF BOOKS AND BOOKCASE =
      =============================================*/}
      <primitive
        object={bookcase.scene}
        position={[0, 0.01, 1.25]}
        rotation-y={Math.PI * 0.5}
      />
      <primitive
        object={books.scene}
        position={[-0.21, 0.623, 0.96]}
        rotation-y={Math.PI * 1.5}
        scale={1.35}
      />
      <primitive
        object={plant1.scene}
        position={[-0.14, 0.13, 0.97]}
        rotation-y={Math.PI * 1.5}
        scale={1.35}
      />
      <primitive
        object={plant2.scene}
        position={[-0.14, 0.38, 0.96]}
        rotation-y={Math.PI * 1.5}
        scale={1.35}
      />
      <primitive
        object={plant3.scene}
        position={[-0.14, 0.38, 1.15]}
        rotation-y={Math.PI * 1.5}
        scale={1.35}
      />
      <primitive
        object={plant4.scene}
        position={[-0.16, 0.12, 1.14]}
        rotation-y={Math.PI * 1.5}
        scale={0.3}
      />
      {/*=============================================                      =SPEAKERS
      =============================================*/}
      <primitive
        object={speaker.scene}
        position={[-0.16, 0, 0.56]}
        rotation-y={Math.PI * 1.5}
        scale={1.35}
      />
      <Clone
        object={speaker.scene}
        position={[-0.16, 0, 1.3]}
        rotation-y={Math.PI * 1.5}
        scale={1.35}
      />
      {/*=============================================                      =REF BOXES =
      =============================================*/}
      <mesh position={[0, 0, 0]} visible={false} ref={camBox}>
        <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh
        visible={false}
        ref={pointerBox}
        onClick={() => {
          setZoomComputer(!zoomComputer)
        }}
        position={pointerPosition}
      >
        <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <Suspense>
        <mesh
          position={notesPosition}
          visible={false}
          ref={musicBox}
          onClick={() => {
            setMusicZoom(!musicZoom)
          }}
        >
          <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </Suspense>
    </PresentationControls>
  )
}

export default Models
