import React, { useEffect, Suspense, useCallback, useRef, useMemo } from 'react'
import * as THREE from 'three'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIntersect, Html, OrbitControls, Loader,useProgress ,Text} from '@react-three/drei'
import { useDrag } from 'react-use-gesture';
import gsap from 'gsap'
import { textures } from '.././utils/load-texture.js';
import { Perf } from 'r3f-perf'
import shaderGallery from '../data/shaderGalleryItem.js'
import { v4 as uuidv4 } from 'uuid';

const ratioImg = [{ "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.8 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.853 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.853 }, { "w": 0.64, "h": 0.853 }, { "w": 0.64, "h": 0.96 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.96 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.917 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.8 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.853 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.853 }, { "w": 0.64, "h": 0.853 }, { "w": 0.64, "h": 0.96 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.96 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.917 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.8 }, { "w": 0.64, "h": 0.427 }, { "w": 0.64, "h": 0.853 }]
const postImg = [{ "x": 0.32, "y": 0.2135 }, { "x": 1.11, "y": 0.2135 }, { "x": 1.9000000000000001, "y": 0.4 }, { "x": 2.69, "y": 0.2135 }, { "x": 3.48, "y": 0.4265 }, { "x": 4.2700000000000005, "y": 0.2135 }, { "x": 5.0600000000000005, "y": 0.2135 }, { "x": 0.32, "y": 0.9868333333333332 }, { "x": 1.11, "y": 0.9868333333333332 }, { "x": 1.9000000000000001, "y": 1.4133333333333333 }, { "x": 2.69, "y": 0.7738333333333333 }, { "x": 3.48, "y": 1.4663333333333333 }, { "x": 4.2700000000000005, "y": 0.7738333333333333 }, { "x": 5.0600000000000005, "y": 0.7738333333333333 }, { "x": 0.32, "y": 2.0051666666666668 }, { "x": 1.11, "y": 1.7601666666666667 }, { "x": 1.9000000000000001, "y": 2.2401666666666666 }, { "x": 2.69, "y": 1.5206666666666666 }, { "x": 3.48, "y": 2.2931666666666666 }, { "x": 4.2700000000000005, "y": 1.5471666666666666 }, { "x": 5.0600000000000005, "y": 1.3341666666666665 }, { "x": 0.32, "y": 2.8104999999999998 }, { "x": 1.11, "y": 2.5335 }, { "x": 1.9000000000000001, "y": 3.0134999999999996 }, { "x": 2.69, "y": 2.534 }, { "x": 3.48, "y": 2.8534999999999995 }, { "x": 4.2700000000000005, "y": 2.5869999999999997 }, { "x": 5.0600000000000005, "y": 1.8944999999999999 }, { "x": 0.32, "y": 3.370833333333333 }, { "x": 1.11, "y": 3.551833333333333 }, { "x": 1.9000000000000001, "y": 3.786833333333333 }, { "x": 2.69, "y": 3.360833333333333 }, { "x": 3.48, "y": 3.600333333333333 }, { "x": 4.2700000000000005, "y": 3.413833333333333 }, { "x": 5.0600000000000005, "y": 2.6678333333333333 }]



function Item({ data, texture, ...props }) {
  console.log(':::::::: 50 ITEM RENDER')

  const visible = useRef(false)

  const grRef = useRef(null)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))

  const uniforms = useMemo(
    () => ({
      uTarget: {
        value: 0.0
      },
      uProcess: {
        value: 0.0
      },
      uOffset: {
        value: new THREE.Vector2(0.0, 0.0)
      },
      uTexture: {
        value: texture,
      },
      uScroll: {
        value: 0.0
      },
      uTime: {
        value: 0.0
      },
      imageBounds: {
        value: new THREE.Vector2(ratioImg[data].w, ratioImg[data].h)
      },
      uRandom: {
        value: Math.random() * 20 + 3
      },
      scale: {
        value: new THREE.Vector2(1.0, 1.0)
      },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      },

    }),
    [texture]
  );

  useEffect(() => {
    ref.current.material.userData = { factor: Math.random() * 20 + 2, deltaL: Math.random() * 40 + 2 }

  }, [ref])


  useFrame((state, delta) => {



    if (ref.current) {
      if (localStorage.getItem('loadTex-complete') == '1') {

        ref.current.material.uniforms.uTime.value = THREE.MathUtils.damp(ref.current.material.uniforms.uTime.value, localStorage.getItem('uTime'), ref.current.material.userData.factor, delta);

      }

      ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, localStorage.getItem('posZTarget'), ref.current.material.userData.factor, delta);
      ref.current.material.uniforms.uScroll.value = localStorage.getItem('offsetscrollY')
      ref.current.material.uniforms.uOffset.value = new THREE.Vector2(localStorage.getItem('drag-x'), localStorage.getItem('drag-y'))
    }

  })
  return (
    <group ref={grRef} {...props} >

      <mesh ref={ref}>
        <planeGeometry args={[1, 1, 6, Math.floor((6 * ratioImg[data].h) / ratioImg[data].w)]} />
        <shaderMaterial
          fragmentShader={shaderGallery['frag']}
          vertexShader={shaderGallery['vert']}
          uniforms={uniforms}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}


function Items() {
  console.log(':::::::::: GROUP ITEM CREAT')
  // console.log(textures)
  // Get global var
  const { viewport } = useThree()
  const COUNT_ITEMS = 34
  // init Ref
  const groupItemRef = useRef(null)
  const posDrag = useRef({ x: 0, y: 0 })
  const positionUpdates = useRef(null)
  const planeRefClone = useRef(null)
  const boxSize = useRef(null)

  // var of Drag fc

  let isPressing = false
  let countTimePressing = 0
  let durationPress = 0

  // var of uframe
  let timelineAction = 0.0000001
  let speed = 0
  let posZTarget = -2.420
  let offsetscrollY = 0
  let countTime = 0
  let totalWidthMesh = 0
  let offSrollValue = 1
  let afterTimelineAction = 0
  let resetSpeed = 1.0

  //// FC
  const bindDrag = useDrag(({ velocities, offset: [x, y], down }) => {

    posDrag.current = { x: x / 360, y: y / 360 }

    if (down) {
      if (!isPressing) {
        isPressing = true
        countTimePressing = Date.now()
      }
    } else {
      if (isPressing) {
        isPressing = false
        durationPress = Date.now() - countTimePressing;
        console.log('Press duration:', durationPress);
      }
    }
  });
  // listener
  window.addEventListener('wheel', (e) => {
    speed += (e.deltaY) * 0.0003
  })



  const calcLayoutGroup = (/* mapPosGeneral */) => {
    console.log('::::::: CONFIG GROUP ITEMS')
    groupItemRef.current.position.z = posZTarget
    for (let index = 0; index < groupItemRef.current.children.length; index++) {

      groupItemRef.current.children[index].position.set(postImg[index].x, postImg[index].y, 0)
      groupItemRef.current.children[index].scale.set(ratioImg[index].w, ratioImg[index].h, 1)
      groupItemRef.current.children[index].name = index

      if (index < 11) {
        totalWidthMesh += groupItemRef.current.children[index].scale.x   // Width (marginXGrid)
      }
      if (index > 33) {
        localStorage.setItem('loadTex-complete', 1)
      }
    }


    //Get SiZe group
    const boxClone = new THREE.Box3().setFromObject(groupItemRef.current);
    const sizeGruopW = boxClone.max.x - boxClone.min.x;
    const sizeGruopH = boxClone.max.y - boxClone.min.y;
    boxSize.current = new THREE.Vector2(sizeGruopW, sizeGruopH)
    groupItemRef.current.position.x = -boxSize.current.x / 2
    groupItemRef.current.position.y = -boxSize.current.y / 2
    document.getElementById('groupXYPlane').innerHTML = `PosXY Group :: ${groupItemRef.current.position.x} ||||||| ${groupItemRef.current.position.y}`
    localStorage.setItem('unBlock-Uframe', 1)

  }
  useEffect(() => {
    calcLayoutGroup()
  }, [groupItemRef])

  function handleClick(target) {
    let key = target.eventObject.name
    console.log(groupItemRef.current.children[key])
    localStorage.setItem('lockUframe', 0)
    let targetPos = new THREE.Vector3(boxSize.current.x / 2 - posDrag.current.x ,boxSize.current.y / 2 + posDrag.current.y,3.5- (groupItemRef.current.position.z*2))
    groupItemRef.current.children[key].position.set(targetPos.x,targetPos.y,targetPos.z)
  }
  useFrame((state, delta) => {

  
    let groupItems = groupItemRef.current

    if (localStorage.getItem('unBlock-Uframe') == 1 && localStorage.getItem('lockUframe') == 0) {
      /* PANEL VALUE */
      document.getElementById('groupZPlane').innerHTML = `PosZ Group ::${groupItems.position.z}`
      document.getElementById('status').innerHTML = `Load Tex ::${localStorage.getItem('loadTex-complete')} \n\n
      then... ${localStorage.getItem('unBlock-Uframe')}
      `
      countTime += (delta / 4.20)
      localStorage.setItem('uTime', countTime)
      if (groupItems.position.z < 0.5 && timelineAction !== 0) {
        //  console.log(':::: intro loading')
        timelineAction += 0.00022
        speed *= 0.62
      } else {
        // console.log('::::end intro , active global var')
        if (timelineAction > 0.0146499) { }
        timelineAction = 0
      }
      if (timelineAction === 0) {
        speed *= 0.8
      }

      if (timelineAction === 0) {
        // console.log('rundpees')
        //   console.log(`>>THIS SPACE<<\n${groupItems.position.z}`)
        resetSpeed = 1.0
        if (groupItems.position.z < -0.5) {
          // console.log(`>>out SPACE<<\n${groupItems.position.z}`)
          resetSpeed = 1.0
          afterTimelineAction += 0.003
        } else if (groupItems.position.z > 1) {

          resetSpeed = 0.2
          //  console.log(`>>in SPACE<<\n${groupItems.position.z}`)
          afterTimelineAction -= 0.006
        } else {
          afterTimelineAction = 0
        }
      }

      posZTarget += (((speed * resetSpeed) + timelineAction + afterTimelineAction) * offSrollValue)


      groupItems.position.z = THREE.MathUtils.damp(
        groupItems.position.z,
        posZTarget,
        20,
        delta
      );
      localStorage.setItem('posZTarget', posZTarget)

      let vec2Clone = new THREE.Vector2(0, groupItems.position.z)
      offsetscrollY = vec2Clone
        .clone()
        .sub(new THREE.Vector2(0, posZTarget))
        .multiplyScalar(-0.24)
      localStorage.setItem('offsetscrollY', offsetscrollY.y)
    }
    planeRefClone.current.position.z =  groupItems.position.z
    
    groupItems.position.x = THREE.MathUtils.damp(
      groupItems.position.x,
      posDrag.current.x - (boxSize.current.x / 2),
      5,
      delta
    );
    groupItems.position.y = THREE.MathUtils.damp(
      groupItems.position.y,
      -posDrag.current.y - (boxSize.current.y / 2),
      5,
      delta
    );

    let offsetdrag = groupItems.position
      .clone()
      .sub(new THREE.Vector2(posDrag.current.x - (boxSize.current.x / 2), -posDrag.current.y - (boxSize.current.y / 2)))
      .multiplyScalar(-0.25)

    localStorage.setItem('drag-x', offsetdrag.x)
    localStorage.setItem('drag-y', offsetdrag.y)


  })
  return (
    <group >
       <mesh ref={planeRefClone} position={[0.0,0.0,0.0]}>
        <planeGeometry args={[viewport.width-5.5,viewport.height-5.5,3,1]}/>
        <meshBasicMaterial color={'green'} side={THREE.DoubleSide} wireframe={true}/>
      </mesh>

      <group ref={groupItemRef}   {...bindDrag()}>
        {textures.map((texture, index) => {
         // const uuid = uuidv4();
          return (
            <Item data={index} key={index} texture={texture} onClick={(target) => handleClick(target)}/>
          )
          })}
      </group>
    </group>



  )
}

function ControlCustom() {

  const axesHelperRef = useRef(null)
  const camHelperRef = useRef(null)
  const camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,15)
  useEffect(() => {
    console.log(axesHelperRef.current)
    axesHelperRef.current.setColors('gray')
  
  }, [axesHelperRef])

  return (
    <>
    <group  position={[0, 0, 4.5]}>
    <cameraHelper ref={camHelperRef} args={[camera]} />
    </group>

       <OrbitControls enableZoom={false} enableRotate={true} />
      <axesHelper ref={axesHelperRef} args={[5, 5, 5]} position={[0, 0, 0]} />
    </>
  )
}


function DreiScroll() {

  useEffect(() => {

    localStorage.setItem('load-shader-final', 0)
    localStorage.setItem('lockScroll', 0)
    localStorage.setItem('lockUframe', 0)
    localStorage.setItem('finalMove', 0)
    localStorage.setItem('idIntersec', null)
    localStorage.setItem('statusBool', false)
    localStorage.setItem('loadTex-complete', 0)
    localStorage.setItem('unBlock-Uframe', 0);
    // localStorage.setItem('posZTarget',0)
  }, [])



  return (
    <section id='wrapper-scene' style={{ height: '100vh', width: '100vw' }}>
      <div style={{position:'absolute',display:'flex',flexDirection:'column'}}>
        <span id="status"></span>
        <span id="groupZPlane"></span>
        <span id="groupXYPlane"></span>
      </div>
      <Canvas
        gl={{ antialias: false }}
        onCreated={({ gl }) => (gl.gammaFactor = 2.2)}
        camera={{ position: [0, 0, 4.5], zoom: 1, far: 15 ,fov:70 }}
      >


        <Suspense fallback={null}>
          <Items />
          
        </Suspense>
        <ControlCustom />
        <Perf />
          <group>
            <Text  position={[0,0,-3]} scale={0.2}>-3</Text >
            <Text  position={[0,0,-2]} scale={0.2}>-2</Text >
            <Text  position={[0,0,-1]} scale={0.2}>-1</Text >
            <Text  position={[0,0,0]} scale={0.2}>0</Text >
            <Text  position={[0,0,1]} scale={0.2}>1</Text >
            <Text  position={[0,0,2]} scale={0.2}>2</Text >
            <Text  position={[0,0,3]} scale={0.2}>3</Text >
            <Text  position={[0,0,3.5]} scale={0.2}>3.5</Text >
            <Text  position={[0,0,4]} scale={0.2}>4</Text >
            <Text position={[0,0,4.345678]} scale={0.01}>4 CAM POS</Text >
           
          </group>
      </Canvas>
      <Loader   initialState={(active) => active} />
    </section>

  )
}

export default React.memo(DreiScroll)
