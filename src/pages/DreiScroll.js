import React, { useEffect,Suspense ,useMemo} from 'react'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree,extend  } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll, useScroll,MapControls,shaderMaterial,useAspect } from '@react-three/drei'
import POS_JSON from '../components/3d/pos.json'

import { useDrag } from 'react-use-gesture';


const images = {
    image1: require('.././asset/gallery/3.png'),
    image2: require('.././asset/gallery/5.png'),
    image3: require('.././asset/gallery/8.png'),
    image4: require('.././asset/gallery/b.png'),
    image5: require('.././asset/gallery/7.jpg'),
    sample1: require('.././asset/sample_1.png'),
    sample2: require('.././asset/sample_2.png'),
    sample3: require('.././asset/sample_3.png')
  };


  const shaderMaterialCustom = shaderMaterial(
    { uOffset : null,
      uTexture: null,
      scale: null,
      imageBounds: null,
      color:null,
      zoom:null,
      grayscale:null,
      opacity:null,
    },
    // vertex shader
    `
    uniform vec2 uOffset;
    varying vec2 vUv;
    
  
    vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
      float M_PI = 3.1415926535897932384626433832795;
      position.x = position.x + (sin(uv.y * M_PI) * offset.x);
   position.y = position.y + (sin(uv.x * M_PI) * offset.y);
      return position;
    }
    void main() {
      vUv = uv;
      vec3 newPosition = position;
      newPosition = deformationCurve(position,uv,uOffset);
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    }
    `,
    // fragment shader
    `
 /*    uniform sampler2D uTexture;
    varying vec2 vUv;
    void main() {
      vec4 textureImage = texture2D(uTexture, vUv);
      gl_FragColor = textureImage;
    }  */
    // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
    varying vec2 vUv;
    uniform vec2 scale;
    uniform vec2 imageBounds;
    uniform vec3 color;
    uniform sampler2D uTexture;
    uniform float zoom;
    uniform float grayscale;
    uniform float opacity;
    const vec3 luma = vec3(.299, 0.587, 0.114);
    vec4 toGrayscale(vec4 color, float intensity) {
      return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
    }
    vec2 aspect(vec2 size) {
      return size / min(size.x, size.y);
    }
    void main() {
      vec2 s = aspect(scale);
      vec2 i = aspect(imageBounds);
      float rs = s.x / s.y;
      float ri = i.x / i.y;
      vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
      vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
      vec2 uv = vUv * s / new + offset;
      vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);
      gl_FragColor = toGrayscale(texture2D(uTexture, zUv) * vec4(color, opacity), grayscale);

    }
    `
  )
  
  // declaratively
  extend({ shaderMaterialCustom })


function Item({ url, key,...props }) {
  console.log('==== render loop time')
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const texture = textureLoader.load(url);
  
  const visible = useRef(false)
  const [hovered, hover] = useState(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)
 
  const materialDef = new shaderMaterialCustom({ 
    uTexture: texture, 
    uOffset : new THREE.Vector2(0.0, 0.0),
    scale: new THREE.Vector2(1.0,1.0),
    imageBounds: [200,300],
    color:new THREE.Vector3(1.0,1.0,1.0),
    zoom:1.0,
    grayscale:0.0,
    opacity:1.0,
  })
  useEffect(() =>{
  
    console.log(texture.source.data)


    ref.current.geometry.parameters.widthSegments = 16
    ref.current.geometry.parameters.heightSegments = 16
    ref.current.material = materialDef

    ref.current.material.wireframe = false
  },[ref])

  useFrame((state, delta) => {
   // localStorage.getItem('valPosFromGroup')
 // console.log(ref.current) // display ALL ITEM per sec
 /*  ref.current.position.z = THREE.MathUtils.damp(
    ref.current.position.z,
    localStorage.getItem('valPosFromGroup')* 2,
    50,
    delta
  ); */
  

 ref.current.material.uniforms.uOffset.value = new THREE.Vector2(localStorage.getItem('xD'),localStorage.getItem('yD'))
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, hovered ? 1 : 1.1, 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 7 : 0, 4, delta)
  })
  return (
    <group {...props}>
      <Image ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} segments={16} key={key} url={url} />
    </group>
  )
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport)
  const {scene} = useThree()
  const scrollPos = useScroll()
  const groupItemRef = useRef(null)
  const posDrag = useRef({x:0,y:0})
  
  // Define the drag gesture
  const bind = useDrag(({ offset: [x, y] }) => {
    // Update the position of the mesh based on the drag offset

    posDrag.current = {x:x/100,y:y/100}
  //  console.log(groupItemRef.current)
   /*  groupItemRef.current.position.x = x;
    groupItemRef.current.position.y = y; */
  });


  useEffect(() => {
    console.log(groupItemRef.current)
   

    for (let index = 0; index <groupItemRef.current.children.length; index++) {
      //console.log(POS_JSON[index].h / 100)
      groupItemRef.current.children[index].position.set(POS_JSON[index].x / 100,POS_JSON[index].y / 100,0)
      groupItemRef.current.children[index].scale.set(.85,(POS_JSON[index].h/100),1)
    }

    positionUpdates.current = [
      { index: 1, factor: 15 },
      { index: 2, factor: 40 },
      { index: 3, factor: 3 },
      { index: 4, factor: 8 },
      { index: 5, factor: 75 },
      { index: 6, factor: 8 },
      { index: 7, factor: 15 },
      { index: 8, factor: 40 },
      { index: 9, factor: 3 },
      { index: 10, factor: 7 },
      { index: 11, factor: 17 },
      { index: 12, factor: 37 },
      { index: 13, factor: 7 },
      { index: 14, factor: 35 },
      { index: 15, factor: 95 },
      { index: 16, factor: 7 },
      { index: 17, factor: 17 },
      { index: 18, factor: 37 },
      { index: 19, factor: 7 },
      { index: 20, factor: 35 },
      { index: 21, factor: 5 }
    ].map(({ index, factor }) => ({
      object: groupItemRef.current.children[index],
      factor: factor,
    }));

  },[groupItemRef])

  const SPEED = 2.86
  const positionUpdates = useRef(null)
  const updatePositionZ = (object, targetPosition, factor, delta) => {
    object.position.z = THREE.MathUtils.damp(
      object.position.z,
      targetPosition,
      factor,
      delta
    );
  };

  const updateValueShader = (object, targetPosition, factor, delta) => {
    object.position.z = THREE.MathUtils.damp(
      object.position.z,
      targetPosition,
      factor,
      delta
    );
  };

  useFrame((state, delta) => {
    //localStorage.setItem('valPosFromGroup',scrollPos.offset)
//console.log(groupItemRef.current.x)
    positionUpdates.current.forEach(({ object, factor }) => {
      updatePositionZ(object, scrollPos.offset*SPEED, factor,delta);
   
    });
    groupItemRef.current.position.x = THREE.MathUtils.damp(
      groupItemRef.current.position.x ,
      posDrag.current.x,
      7,
      delta
    );
    groupItemRef.current.position.y = THREE.MathUtils.damp(
      groupItemRef.current.position.y ,
      -posDrag.current.y,
      7,
      delta
    );
let newposDragv2 = new THREE.Vector2(posDrag.current.x,-posDrag.current.y)
    let offset = groupItemRef.current.position
 .clone()
 .sub(newposDragv2)
 .multiplyScalar(-0.25)
 //console.log(offset)
 localStorage.setItem('xD', offset.x)
 localStorage.setItem('yD', offset.y)

  })
  return (
    <group ref={groupItemRef} {...bind()}>
      <Item url={images.image2} />
      <Item url={images.image3}   />
      <Item url={images.image4}  />
      <Item url={images.image5} />
      <Item url={images.image3}  />
      <Item url={images.image2}  />
      <Item url={images.image1} />
      <Item url={images.image5} />
      <Item url={images.image3}  />
      <Item url={images.image2}  />
      <Item url={images.image1} />
      <Item url={images.image5} />
      <Item url={images.image3}  />
      <Item url={images.image2}  />
      <Item url={images.image1} />
      <Item url={images.image5} />
      <Item url={images.image3}  />
      <Item url={images.image2}  />
      <Item url={images.image1} />
      <Item url={images.image5} />
      <Item url={images.image3}  />
      <Item url={images.image2}  />
      <Item url={images.image1} />
      <Item url={images.image4} />
      <Item url={images.image1}   />
      <Item url={images.image2}  />
      <Item url={images.image3}   />
      <Item url={images.image4}  />
      <Item url={images.image5} />
      <Item url={images.image3}  />
      <Item url={images.image2}  />
      <Item url={images.image1} />
      <Item url={images.image5} />
      <Item url={images.image3}  />
      <Item url={images.image2}  />
      <Item url={images.image1} />
    </group>
  )
}

function ControlCustom() {
  const controls = useRef(null);
  const { camera, gl, scene } = useThree();
  
  useEffect(() => {
    if(controls) {
     // console.log(controls.current)
    }

    //console.log(controls.current)

  },[controls]);
  useFrame((state,delta) => {
    if(controls.current) {
      localStorage.setItem('v2-drag',controls.current.target.x)
    }
  })

  return (null
   /*  <MapControls target={[0,0,0]} ref={controls} enableZoom={false} onChange={(e) => {console.log(e)}}/> */
  )
}

function DreiScroll() {
  return (
    <section id='wrapper-scene' style={{height:'100vh',width:'100vw'}}>
 <Canvas  /* gl={{ alpha: false, antialias: false, stencil: false, depth: false }} *//*  dpr={[1, 1.5]} */
    gl={{ antialias: true }}
    onCreated={({ gl }) => (gl.gammaFactor = 2.2, gl.outputEncoding = THREE.sRGBEncoding)}
    camera={{ position: [0, 0, 3], zoom: 1, up: [0, 0, 0], far: 10000 }}
 >
   
    <axesHelper args={[5, 5, 5]} />
    <Suspense fallback={null}>
    <ScrollControls pages={3} maxSpeed={20}>
      <Items />
      <ControlCustom/>
    </ScrollControls>
    </Suspense>
  </Canvas>
    </section>
   
  )
}

export default  React.memo(DreiScroll)
