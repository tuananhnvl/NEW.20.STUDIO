import React, { useEffect, Suspense, useMemo,useCallback } from 'react'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll, useScroll,Html, Text3D, shaderMaterial, useAspect, Stats,useProgress } from '@react-three/drei'
import POS_JSON from '../components/3d/pos.json'
import gsap, { Power2 } from 'gsap'
import { useDrag } from 'react-use-gesture';
import myFont from '.././fonts/RussoOne-Regular.json'
import { TrackballControls } from ".././components/3d/TrackballControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { textureLoader, textures } from '.././utils/load-texture.js';
extend({ TrackballControls, OrbitControls })

const imgUnPlash = [
  './img-gallery/1.jpg',
  './img-gallery/2.jpg',
  './img-gallery/3.jpg',
  './img-gallery/4.jpg',
  './img-gallery/16.jpg',
  './img-gallery/16.jpg',
  './img-gallery/7.jpg',
  './img-gallery/8.jpg',
  './img-gallery/9.jpg',
  './img-gallery/10.jpg',
  './img-gallery/11.jpg',
  './img-gallery/12.jpg',
  './img-gallery/13.jpg',
  './img-gallery/14.jpg',
  './img-gallery/15.jpg',
  './img-gallery/16.jpg',
  './img-gallery/17.jpg',
  './img-gallery/18.jpg',
  './img-gallery/19.jpg',
  './img-gallery/20.jpg',
  './img-gallery/1.jpg',
  './img-gallery/2.jpg',
  './img-gallery/3.jpg',
  './img-gallery/4.jpg',
  './img-gallery/15.jpg',
  './img-gallery/16.jpg',
  './img-gallery/7.jpg',
  './img-gallery/8.jpg',
  './img-gallery/9.jpg',
  './img-gallery/10.jpg',
  './img-gallery/11.jpg',
  './img-gallery/12.jpg',
  './img-gallery/13.jpg',
  './img-gallery/14.jpg',
  './img-gallery/15.jpg',
  './img-gallery/16.jpg',
  './img-gallery/17.jpg',
  './img-gallery/18.jpg',
  './img-gallery/19.jpg',
  './img-gallery/20.jpg',
  './img-gallery/1.jpg',
  './img-gallery/2.jpg',
  './img-gallery/3.jpg',
  './img-gallery/4.jpg',
  './img-gallery/15.jpg',
  './img-gallery/16.jpg',
  './img-gallery/7.jpg',
  './img-gallery/8.jpg',
  './img-gallery/9.jpg',
  './img-gallery/10.jpg',
]

const shaderMaterialCustom = shaderMaterial(
  {
    uScroll: null,
    uOffset: null,
    uTexture: null,
    scale: null,
    imageBounds: null,
    color: null,
    zoom: null,
    grayscale: null,
    opacity: null,
    uTime: 0.0,
    uProcess: 0.0,
    uRandom: 0.0,
    checkProcess: 0.0,
    uZoomScale: null,
  },
  // vertex shader
  `
  uniform float checkProcess;
  uniform vec2 uOffset;
  uniform vec2 uZoomScale;
  uniform float uProcess;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 iResolution;
  uniform vec2 imageBounds;
  uniform float uScroll;

  //custom == when drag x y , scroll z , mix z to wave function , set uscroll to controls anime
  
  vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset, float wave,float centerPoint,float uScroll) {
    float M_PI = 3.1415926535897932384626433832795;
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    position.z = position.z + wave * centerPoint * uScroll * 2.5;
    return position;
  }


  void main() {
    vUv = uv;
    vec3 newPosition = position;
    vec3 newPosition1 = position;

    float angle =uScroll * 3.14159265 / 2.;
    //uProcess not use
    // set sin(angle) to cos(angle) = > reveal sin thieu
    float wave = cos(angle); 
    
    float center = cos(length(uv - .5) * 2.101235);

    newPosition = deformationCurve(position,uv,uOffset,wave,center,uScroll);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( mix(newPosition,newPosition1,0.5), 1.0 );
 
  }
  `,
  // fragment shader
  `
  varying float checkObj;
  varying vec2 vUv;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform vec3 color;
  uniform vec2 iResolution;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  uniform float uRandom;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uOffset;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  float seed = 16.0;


  float keytoChangePos = 4.0;
  vec3 rgbShift(sampler2D tex, vec2 uv, vec2 offset,float random) {
    return vec3(texture2D(tex,vUv + offset).rgb);
  }

  
  float sinNoise(vec2 uv,float random)
  {
      return fract(abs(sin(uv.x * random + uv.y * 3077.0) * 53703.27));
  }
  
  
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  
  
  
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  float r(vec2 p){return fract(cos(mod(123456789.,256.*dot(p,vec2(23.140692632779,2.6651441426902)))));}
  
  float valueNoise(vec2 uv, float scale, float randomNumFrom1)
  {
      vec2 luv = fract(uv * scale);
      vec2 luvs = smoothstep(0.0, 1.0, fract(uv * scale));
      vec2 id = floor(uv * scale);
      float tl = sinNoise(id + vec2(0.0, 1.0),randomNumFrom1);
      float tr = sinNoise(id + vec2(1.0, 1.0),randomNumFrom1);
      float t = mix(tl, tr, luvs.x);
      
      float bl = sinNoise(id + vec2(0.0, 0.0),randomNumFrom1);
      float br = sinNoise(id + vec2(1.0, 0.0),randomNumFrom1);
      float b = mix(bl, br, luvs.x);
      
      return mix(b, t, luvs.y) * 2.0 - 1.0;
  }
 
  void main()
  {
    vec4 finalVec = vec4(0.0, 0.0, 0.0, 0.0); 
    vec2 s = aspect(scale);
    vec2 bv = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = bv.x / bv.y;
    vec2 new = rs < ri ? vec2(bv.x * s.y / bv.y, s.y) : vec2(s.x, bv.y * s.x / bv.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uvd = vUv * s / new + offset;
    // set zoom base uscroll
    vec2 zUv = (uvd - vec2(0.5, 0.5)) /(zoom + 0.0)  + vec2(0.5, 0.5);
  
    vec2 stx = vUv.xy/bv.xy;
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = vUv;
  
      //uv.y /= bv.x / bv.y;
      
   //  float sinN = sinNoise(uv);
      
      float scaleNoiseShape =3.0;
   
     float fractValue = 0.0;
      float amp = 1.0;
      for(int i = 0; i < 16; i++)
      {
        fractValue += valueNoise(uv, float(i ) * scaleNoiseShape ,uRandom) * amp;
          amp /= 2.0;
      }
      
      fractValue /= 2.0;
      fractValue += 0.5;
     
      float time = mix(-1.0, 1.0,uTime);
      //time = 1.0;
      float cutoff = smoothstep(time+ 0.0001, time- 0.0001, fractValue);
      
      
      vec4 texture1 = vec4(vec3(1.0,1.0,1.0), 1.0);
      //not use zUv ( zUv for zoom , on base frag Image Drei => not fix) => solution for exacly ratio image is replace by vUv
   
  
     // vec4 textureFinal = mix(vec4(vec3(0.0,0.0,0.0), 0.0), vec4(vec3(3.0,3.0,3.0), 1.0), cutoff);

     vec3 color = rgbShift(uTexture,vUv,uOffset,fractValue);

     vec4 textureFinal = mix(vec4(vec3(0.0,0.0,0.0), 0.0), vec4(color,vUv), cutoff);
      gl_FragColor = textureFinal;

  }

  `
)

extend({ shaderMaterialCustom })


function Item({ url, key, texture, ...props }) {
  console.log(':::::::: 50 ITEM RENDER')

  const visible = useRef(false)
  
  const ref = useIntersect((isVisible) => (visible.current = isVisible))

  const materialDef = new shaderMaterialCustom({
    uScroll: 0.0,
    uTexture: texture,
    uOffset: new THREE.Vector2(0.0, 0.0),
    scale: new THREE.Vector2(1.0, 1.0),
    imageBounds: [0, 0],
    color: new THREE.Vector3(1.0, 1.0, 1.0),
    zoom: 1.0,
    grayscale: 0.0,
    opacity: 0.0,
    uTime: 0.0,
    uProcess: 0.0,
    uRandom: 0.0,
    uZoomScale: new THREE.Vector2(1.0, 1.0),
    checkProcess: 0.0,
    iResolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight)
    },
  })
  useEffect(() => {
   
    ref.current.material = materialDef
    if (texture.source.data) {
      ref.current.material.uniforms.imageBounds.value = new THREE.Vector2(texture.source.data.naturalWidth / 1000 * 1.0, texture.source.data.naturalHeight / 1000 * 1.0)
    }
    ref.current.material.wireframe = false
    ref.current.material.uniforms.uRandom.value = Math.random() * 20 + 3
    localStorage.setItem('load-shader-final', 1)
  }, [ref])

  useFrame((state, delta) => {
    if (localStorage.getItem('load-shader-final') == 1) {
   //   ref.current.material.uniforms.uOffset.value = new THREE.Vector2((localStorage.getItem('dragx--f') / 2), (localStorage.getItem('dragy--f') / 2))
      
    }

  })
  return (
    <group {...props} >
      <Image
        ref={ref}
        segments={8}
    
        url={url}
        texture={texture}
      />
    </group>
  )
}

function Items() {
  console.log(':::::::::: GROUP ITEM CREAT')
  console.log(textures)
  // Get global var
  const { width: w, height: h } = useThree((state) => state.viewport)
  const { scene,camera } = useThree()
  // init Ref
  const text3dRef = useRef(null)
  const groupItemRef = useRef(null)
  const posDrag = useRef({ x: 0, y: 0 })
  const positionUpdates = useRef(null)
  const readyAction = useRef(false)
  const boxSize = useRef(null)
  const listItemCount = useRef([])
  const meshCompoare = useRef(null)


  // var of Drag fc
  let startDragKey = false
  let isPressing = false
  let countTimePressing = 0
  let durationPress = 0
  let unBlockClick = false
  // var of uframe
  let timelineAction = 0.0000001
  let speed = 0
  let positionC = -2.6
  let hasfinishIntro = false
  let countTime = 0
  let pointStartAction = false
  let baseval = 0
  let keyLockMesh = false
  let fixDragX = 0
  let fixDragY = 0
  let fixTam = 1.0
  let offSrollValue = 1
  let afterTimelineAction = 0
  let speedDrag = 1.0
  // var of Grid ( include postion init fc)
  const mapPosGeneral = []
  const mapRatio = []
  const COL_GRID_IMG = 5
  const ROW_GRID_IMG = 10
  let xChange = 0
  let yChange = 0
// init var dymaltic

// init var config
 const activeControl = useRef(null)
  //// FC
  const bindDrag = useDrag(({ offset: [x, y], down }) => {

    posDrag.current = { x: x / 200, y: y / 200 }
    startDragKey = true
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
        if (durationPress < 100) {
          unBlockClick = true
        }
      }
    }
  });





  // listener
  window.addEventListener('wheel', (e) => {
    speed += (e.deltaY) * 0.0002
    console.log(speed)
  })


  
  const calculateLayout = useCallback(() => {
    console.log(':::::::: LOADING TEXTURE')
  
    for (let index = 0; index < textures.length; index++) {
      mapRatio.push({ w: textures[index].source.data.naturalWidth / 1000, h: textures[index].source.data.naturalHeight / 1000 })
    }
    let lastMargin = 0.5
    let countTAMTHOI = 0
    let marginXGrid = 0.77 
    let marginYGrid = 0.095
    let totalmarginW = 0
    if (textures.length > 49) {
      for (let c = 0; c < COL_GRID_IMG; c++) {
        for (let r = 0; r < ROW_GRID_IMG; r++) {
          if (countTAMTHOI > 50) { return }
    
          xChange = r * marginXGrid + mapRatio[countTAMTHOI].w/8
          totalmarginW += r * marginXGrid
         
          if (c == 0) {
            yChange = 0 
          } else if (c == 1) {
            yChange = (mapRatio[countTAMTHOI - 10].h) / 2 
            + mapRatio[countTAMTHOI].h / 2  
            + marginYGrid
          } else if (c == 2) {
            yChange = (mapRatio[countTAMTHOI - 10].h) 
            + mapRatio[countTAMTHOI].h / 2             
            + mapRatio[countTAMTHOI - 20].h / 2 
            + marginYGrid * 2
          }
          else if (c == 3) {
            yChange = (mapRatio[countTAMTHOI - 10].h) 
            + mapRatio[countTAMTHOI].h / 2            
            + mapRatio[countTAMTHOI - 20].h 
            + mapRatio[countTAMTHOI - 30].h / 2  
            + marginYGrid * 3
          }
          else if (c == 4) {
            yChange = (mapRatio[countTAMTHOI - 10].h) 
            + mapRatio[countTAMTHOI].h / 2 
            + mapRatio[countTAMTHOI - 20].h 
            + mapRatio[countTAMTHOI - 30].h 
            + mapRatio[countTAMTHOI - 40].h / 2  
            + marginYGrid * 4
          }
          else {
            yChange = 7
          }
          mapPosGeneral.push({ x: xChange, y: yChange })
          countTAMTHOI += 1
        }
      }
    }
    localStorage.setItem('nonamevar',totalmarginW)
  }, [textures]);
  
  useEffect(() => {
    calculateLayout();
  }, [calculateLayout]);

  let totalWidthMesh = 0
  let totalHeightMesh = 0
  useEffect(() => {
    console.log('::::::: CONFIG GROUP ITEMS')
    for (let index = 0; index < groupItemRef.current.children.length; index++) {
      groupItemRef.current.children[index].position.set(mapPosGeneral[index].x, mapPosGeneral[index].y, 0)
      groupItemRef.current.children[index].scale.set(textures[index].source.data.naturalWidth / 1000 * 1.0, textures[index].source.data.naturalHeight / 1000 * 1.0, 1)
      groupItemRef.current.children[index].name = index
      if(index < 11) {
        totalWidthMesh += groupItemRef.current.children[index].scale.x   // Width (marginXGrid)
      }
     
     console.log(totalWidthMesh)
    }

    const initDatapositionUpdates = () => {
      for (let index = 0; index < groupItemRef.current.children.length; index++) {
        listItemCount.current.push({ index: index, factor: Math.random() * 13 + 2 })
      }
    }
    if (listItemCount.current.length == 0) {
      initDatapositionUpdates()
    }

    positionUpdates.current = /* defualtZitem */  listItemCount.current.map(({ index, factor }) => ({
      object: groupItemRef.current.children[index],
      factor: factor,
    }));


    // CONFIG GROUP ITEM
    //Get SiZe group
    const boxClone = new THREE.Box3().setFromObject(groupItemRef.current);
    const sizeGruopW = boxClone.max.x - boxClone.min.x;
    const sizeGruopH = boxClone.max.y - boxClone.min.y;
    //console.log(scene)
    boxSize.current = new THREE.Vector2(sizeGruopW + 0.30, sizeGruopH)
    localStorage.setItem('height-mesh', sizeGruopH)
    localStorage.setItem('width-mesh', sizeGruopW)
    localStorage.setItem('height-viewport', h)
    localStorage.setItem('width-viewport', w)
    console.log(sizeGruopH)
    groupItemRef.current.position.x = -(sizeGruopW + 0.30 )/2
    groupItemRef.current.position.y = -1.3
    
    console.log(localStorage.setItem('width-mesh', sizeGruopW))

  }, [groupItemRef])
  useEffect(() => {
    console.log('::::::::::: TEXT3D')
    const boxClone1 = new THREE.Box3().setFromObject(text3dRef.current);
    text3dRef.current.position.set(-(boxClone1.max.x - boxClone1.min.x) / 2,-(boxClone1.max.y - boxClone1.min.y) / 2,-4.2)
  //  scene.children[0].position.x = -w * 2
  }, [text3dRef])
  // template function ( use on uframe)
  const updatePositionZ = (object, targetPosition, factor, delta) => {
    object.position.z = THREE.MathUtils.damp(
      object.position.z,
      targetPosition,
      factor,
      delta
    );

  }
  const updateValueShader = (object, targetPosition, targetoffsetScroll) => {

    //object.children[0].material.uniforms.uOffset.value = new THREE.Vector2(targetPosition.x, targetPosition.y)
    object.children[0].material.uniforms.uTime.value = targetPosition
    object.children[0].material.uniforms.uScroll.value = targetoffsetScroll * 5
  };

  
  useFrame((state, delta) => {
    //console.log('uf-run')
    baseval += 0.0005
  
    offSrollValue = 1

    localStorage.setItem('positionC', positionC * 1.2)
    let vec2Clone = new THREE.Vector2(0, groupItemRef.current.position.z)
  
      
    if (scene.children[0].position.x < w * 2) {
      scene.children[0].position.x += baseval
    } else {
      baseval = 0.123456
    }
    // CHECK DISTANCE TO ACTION MOVE
    if (pointStartAction == false && baseval == 0.123456) {
      countTime += delta / 2
      if (countTime > 2.5) { //df 2.5
        pointStartAction = true
        return
      }
    }
   /*  console.log(
      `
      Group posZ : ${groupItemRef.current.position.z} \n
      Camera posZ : ${camera.position.z}
      `
    ) */
    
    //console.log( localStorage.getItem('positionC'))
    if(groupItemRef.current.position.z < 0.5 && timelineAction !== 0) {
      timelineAction += 0.00005
      speed *= 0.02 // slow speed when intro action
    }else{
      if(timelineAction > 0.0146499) {}
     // console.log(`Last timeLine ::::: ${timelineAction}`)
      timelineAction = 0
    }
    if(timelineAction == 0) {
      console.log('--THIS SPACE--')
      speed *= 0.8 // defuat speed after intro end
    //  console.log(groupItemRef.current.position.z)
      if(groupItemRef.current.position.z < 0) {
        console.log('>>out SPACE<<')
        afterTimelineAction += 0.003
      }else if(groupItemRef.current.position.z >1) {
        console.log('>>in SPACE<<')
        afterTimelineAction -= 0.008
      }else{
        afterTimelineAction = 0
      }

    }


    positionC += ((speed + timelineAction + afterTimelineAction) * offSrollValue)
    let offsetscrollY = vec2Clone
    .clone()
    .sub(new THREE.Vector2(0, positionC * 1.2))
    .multiplyScalar(-0.25)


    groupItemRef.current.position.z = THREE.MathUtils.damp(
      groupItemRef.current.position.z,
      positionC * 1.2,
      20,
      delta
    );

    if (positionUpdates.current && positionUpdates.current.length > 49) {
      positionUpdates.current.forEach(({ object, factor }) => {
        updatePositionZ(object, positionC * 1.2, factor, delta);
        updateValueShader(object, countTime / 2, offsetscrollY.y)
      })
    }

    // DRAG AND MAX-MIN DRAG DISTANCE
   /*  if (startDragKey == true && boxSize.current !== null && 3 == 3) {
      console.log(groupItemRef.current.position)
      if (groupItemRef.current.position.x + (boxSize.current.x / 2) > ((boxSize.current.x / 2) - w) + fixTam) {
        // console.log('out-L')
        keyLockMesh = true
        fixDragX -= 0.5
      } else if (-(groupItemRef.current.position.x + (boxSize.current.x / 2)) > (((boxSize.current.x / 2) - w) + fixTam)) {
        // console.log('out-R')
        keyLockMesh = true
        fixDragX += 0.5
      } else {
        // console.log('in')
        keyLockMesh = false

      }
      if (groupItemRef.current.position.y + (boxSize.current.y / 2.4) > ((boxSize.current.y / 2.4) - h) + fixTam) {
        // console.log('outT-L')
        keyLockMesh = true
        fixDragY -= 0.5
      } else if (-(groupItemRef.current.position.y + (boxSize.current.y / 2.4)) > (Math.floor(((boxSize.current.y / 2.4) - h) + fixTam))) {
        // console.log('outT-R')
        keyLockMesh = true
        fixDragY += 0.5
      } else {
        //console.log('in')
        keyLockMesh = false

      }
      groupItemRef.current.position.x = THREE.MathUtils.damp(
        groupItemRef.current.position.x,
        posDrag.current.x - (boxSize.current.x / 2) + fixDragX,
        5,
        delta
      );
      groupItemRef.current.position.y = THREE.MathUtils.damp(
        groupItemRef.current.position.y,
        -posDrag.current.y - (boxSize.current.y / 2.4) + fixDragY,
        5,
        delta
      );

      let offsetdrag = groupItemRef.current.position
        .clone()
        .sub(new THREE.Vector2(posDrag.current.x - (boxSize.current.x / 2) + fixDragX, -posDrag.current.y - (boxSize.current.y / 2.4) + fixDragY))
        .multiplyScalar(-0.25)

      localStorage.setItem('dragx--f', offsetdrag.x)
      localStorage.setItem('dragy--f', offsetdrag.y)

    } */
    speedDrag = localStorage.getItem('positionC')/2 
//console.log(speedDrag)
groupItemRef.current.position.x = THREE.MathUtils.damp(
  groupItemRef.current.position.x,
  (posDrag.current.x) - ((boxSize.current.x ) / 2) + fixDragX,
  5,
  delta
);

groupItemRef.current.position.y = THREE.MathUtils.damp(
  groupItemRef.current.position.y,
  -(posDrag.current.y) - (1.3) + fixDragY,
  5,
  delta
);

  })
  return (
    <group>
      <group >

        <mesh ref={meshCompoare}>
          <planeGeometry args={[w, h]} position={[0, 0, -10]} />
          <meshBasicMaterial color={'white'} transparent={true} opacity={0.0} wireframe={false} />
        </mesh>
        <Text3D letterSpacing={0.01} size={0.86} font={myFont} ref={text3dRef}>
          20 STUDIO
          <meshStandardMaterial color="white" />
        </Text3D>
      </group>

      <group ref={groupItemRef}   {...bindDrag()}>
        {textures.map((texture, index) => (
          <Item key={index} texture={texture} url={imgUnPlash[index]} />
        ))}
      </group>
    </group>

  )
}

function ControlCustom() {

  const { camera, gl, scene } = useThree();
  const controlsRef = useRef();
  useEffect(() => {
    console.log(gl.info)
    console.log(gl.info.memory)
    console.log(gl.info.render)

  }, [])

  useEffect(() => {
   /*  if(activeControl.current == true) {
      const controls = new OrbitControls(camera, gl.domElement);
      controlsRef.current = controls;
      controls.enableZoom = false
      controls.enableRotate = true
      controls.enablePan = false
    } */

    return () => {
   //  controls.dispose();
    };
  }, [camera, gl]);


  useFrame(() => {
    if (controlsRef.current) {

   // controlsRef.current.update();
    }

  });

  return (null
    /*  <MapControls target={[0,0,0]} ref={controls} enableZoom={false} onChange={(e) => {console.log(e)}}/> */
  )
}
const LoadingIndicator = () => {
  const { progress } = useProgress();
  const refd = useRef(null)
  useEffect(() => {
    console.log(refd.current)
  },[refd])
  return <Html ref={refd}>{Math.round(progress * 100)}% loaded</Html>;
};
function DreiScroll() {

  useEffect(() => {
    localStorage.setItem('load-shader-final', 0)
    localStorage.setItem('lockScroll', 0)
    localStorage.setItem('finalMove', 0)
    localStorage.setItem('idIntersec', null)
    localStorage.setItem('statusBool' ,false)
  }, [])

  return (
    <section id='wrapper-scene' style={{ height: '100vh', width: '100vw' }}>
      <Canvas  /* gl={{ alpha: false, antialias: false, stencil: false, depth: false }} *//*  dpr={[1, 1.5]} */
        gl={{ antialias: false }}
        onCreated={({ gl }) => (gl.gammaFactor = 2.2, gl.outputEncoding = THREE.sRGBEncoding)}
        camera={{ position: [0, 0, 2.5], zoom: 1, up: [0, 0, 0], far: 10000 }}
      >
        {/*  <ambientLight intensity={0.5} /> */}
        {/*  <directionalLight position={[1, 1, 1]} /> */}
        <pointLight color="gray" intensity={0.9} position={[0, 0, -3.7]} />
        <axesHelper args={[5, 5, 5]} position={[0, 0, 0]} />
        <Suspense fallback={null}>
          {/*  <ScrollControls pages={3} maxSpeed={20}> */}
          <Items />
          <Stats />
          <ControlCustom />
          {/*    </ScrollControls> */}
        </Suspense>
      </Canvas>
    </section>

  )
}

export default React.memo(DreiScroll)
