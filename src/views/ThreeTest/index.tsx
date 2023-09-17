import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame,  } from '@react-three/fiber'
import * as THREE from 'three'
import Window from '../../components/Window'
import { Line, MeshReflectorMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { ChromaticAberration, EffectComposer, Pixelation, Scanline } from '@react-three/postprocessing'


const ThreeTest = () => {

  
  return (
    <Window title={`Three test `} zIndex={600} width={700} >
      <Suspense fallback={null}>

 
        <div style={{ height: '400px', padding: '2px', boxShadow: 'inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a'}}>
        <Canvas>
          <color args={[255, 255, 255]} attach="background" />
          <ambientLight intensity={0.5} />
          <Light brightness={50} color={'white'} />
          <OrbitControls
            target={[0, 0, 0]} // xyz
            maxPolarAngle={1.45}
          />
          <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
          {/* <Box position={[-1.2, 0, 0]} /> */}
          <Line points={[[0,0,0], [0,2,0]]} lineWidth={2} color={'#f00'}></Line>
          <Line points={[[0,0,0], [2,0,0]]} lineWidth={2} color={'#0f0'}></Line>
          <Line points={[[0,0,0], [0,0,2]]} lineWidth={2} color={'#00f'}></Line>
          <mesh scale={1} position={[-1, 0.5, 0]} castShadow>
              <sphereGeometry args={[0.5, 32]} />
              <meshStandardMaterial color={'hotpink'} />
          </mesh>
          <Box position={[1.2, 0.6, 0]} castShadow/>
          <Ground></Ground>
          <EffectComposer>
            <Pixelation granularity={3} ></Pixelation>
            {/* <ChromaticAberration
              offset={[0.004, 0.004]} // color offset
            /> */}
          </EffectComposer>
        </Canvas>
      </div>
      </Suspense>
    </Window>
  )
}

export default ThreeTest
function Light({ brightness=10, color='white' }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[5, 5, 3]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}


function Box(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Ground() {


  return (
    <mesh rotation-x={-Math.PI * 0.5} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial color={'lightBlue'} />
      {/* <MeshReflectorMaterial
        dithering={true}
        color={[0.115, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      /> */}
    </mesh>
  );
}