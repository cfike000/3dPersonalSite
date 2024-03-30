import React, { useRef, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import {
  Clone,
  Html,
  PresentationControls,
  useGLTF,
  Text3D,
} from "@react-three/drei"
import gsap from "gsap"

// Local imports
import Guitar from "./Guitar"
import Lights from "./Lights"
import Scene from "./Scene"
import Bird from "./Bird"

const Models = () => {
  /*----------  REFERENCES----------*/
  const pointerBox = useRef()
  const camBox = useRef()
  const pointerRef = useRef()
  const { camera } = useThree()
  const cameraPosition = camera.position
  const pointerPosition = pointerRef.current?.position

  /*----------  STATE ----------*/
  const [zoomComputer, setZoomComputer] = useState(false)
  const [musicZoom, setMusicZoom] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  /*----------  LOADING ----------*/
  // Example for one model, replicate for others as needed

  /*----------  EFFECTS ----------*/

  useEffect(() => {
    if (zoomComputer) {
      gsap.to(camBox.current.position, {
        duration: 1.5,
        x: -0.76,
        y: 0.5,
        z: 0.32,
        ease: "ease.inOut",
      })
      gsap.to(cameraPosition, {
        duration: 1.5,
        x: -1.3,
        y: 0.7,
        z: 0.9,
        ease: "ease.inOut",
      })
    } else {
      gsap.to(camBox.current.position, {
        duration: 1.5,
        x: 0,
        y: 0,
        z: 0,
        ease: "ease.inOut",
      })
      gsap.to(cameraPosition, {
        duration: 1.5,
        x: -1.8,
        y: 0.85,
        z: 1.7,
        ease: "ease.inOut",
      })
    }
    console.log("yes")
  }, [zoomComputer])

  /*----------  ANIMATION----------*/
  useFrame((state, delta) => {
    pointerRef.current.lookAt(
      -cameraPosition.x,
      cameraPosition.y + 8,
      -cameraPosition.z
    )

    pointerBox.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.02 + 0.76
    camera.lookAt(camBox.current.position)

    pointerRef.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.02 + 0.72
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
  const speaker = useGLTF("gltf/speaker.glb")

  /*----------  SHADOW IMPLEMENTATION ----------*/

  //cast shadow
  const itemsToCastShadow = [
    lamp,
    computerScreen,
    mouse,
    keyboard,
    chair,
    desk,
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
      polar={zoomComputer ? [-0.1, 0.1] : [-0.15, 0.15]}
      azimuth={zoomComputer ? [-0.1, 0.1] : [-0.15, 0.15]}
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
      {/*=============================================                      = LOADING =
      =============================================*/}
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
        onPointerOver={(event) => {
          console.log("Hovering over chair", event)
        }}
      />
      {/*=============================================                      = 3D TEXT =
      =============================================*/}
      {/* JavaScript */}
      {/* <Text3D
        font="../fonts/Roboto Black_Regular.js"
        position={[-0.193, 0.6410000000000002, 0.9840000000000005]} // Updated position values
        rotation={[
          (3.199999999999999 * Math.PI) / 180, // Convert new rotation from degrees to radians
          (-90 * Math.PI) / 180, // Convert new rotation from degrees to radians
          (78.40000000000009 * Math.PI) / 180, // Convert new rotation from degrees to radians
        ]}
        scale={0.015800000000000033} // Updated scale for uniform scaling across all axes
      >
        JavaScript
        <meshBasicMaterial color={"#E0E0E0"} />
      </Text3D> */}
      {/* Python */}
      {/* <Text3D
        font="../../public/fonts/Roboto Black_Regular.js"
        position={[-0.2, 0.652, 1.0519999999999958]} // Updated position values
        rotation={[
          (parseFloat(0) * Math.PI) / 180, // Convert rotation from degrees to radians
          (parseFloat(-90) * Math.PI) / 180, // Convert rotation from degrees to radians
          (parseFloat(90.0000000000001) * Math.PI) / 180, // Convert rotation from degrees to radians
        ]}
        scale={0.01879999999999996} // Use the first scale value for uniform scaling across all axes
      >
        Python
        <meshBasicMaterial color={"#707070"} />
      </Text3D> */}
      {/* Node JS */}
      {/* <Text3D
        font="../../public/fonts/Roboto Black_Regular.js"
        position={[-0.187, 0.648, 1.0869999999999935]} // Updated position
        rotation={[
          (parseFloat(0) * Math.PI) / 180, // Convert first rotation value from degrees to radians, though it's 0 in this case
          (parseFloat(-90) * Math.PI) / 180, // Convert second rotation value from degrees to radians
          (parseFloat(90.60000000000011) * Math.PI) / 180, // Convert third rotation value from degrees to radians
        ]}
        scale={0.016999999999999953} // Using the first scale value for uniform scaling
      >
        Node.js
        <meshBasicMaterial color={"#707070"} />
      </Text3D> */}
      {/* React */}
      {/* <Text3D
        font="../../public/fonts/Roboto Black_Regular.js"
        position={[-0.199, 0.656, 1.119999999999992]} // Updated position
        rotation={[
          (parseFloat(0) * Math.PI) / 180, // Convert first rotation value from degrees to radians, though it's 0 in this case
          (parseFloat(-90) * Math.PI) / 180, // Convert second rotation value from degrees to radians
          (parseFloat(90.60000000000011) * Math.PI) / 180, // Convert third rotation value from degrees to radians
        ]}
        scale={0.01929999999999994} // Using the first scale value for uniform scaling
      >
        React
        <meshBasicMaterial color={"#006400"} />
      </Text3D> */}
      {/* /SQL */}
      {/* <Text3D
        font="../"
        position={[-0.20700000000000002, 0.669, 1.1539999999999897]} // Updated position
        rotation={[
          (parseFloat(0) * Math.PI) / 180, // Rotation values converted from degrees to radians; 0 remains 0
          (parseFloat(-90) * Math.PI) / 180, // -90 degrees to radians
          (parseFloat(90.60000000000011) * Math.PI) / 180, // 90.6 degrees to radians
        ]}
        scale={0.01929999999999994} // Using the first scale value for uniform scaling
      >
        SQL
        <meshBasicMaterial color={"#E0E0E0"} />
      </Text3D> */}
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
          position={[0.196, 0.172, -0.05]}
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
      <Scene />
      <Bird />
    </PresentationControls>
  )
}

export default Models
