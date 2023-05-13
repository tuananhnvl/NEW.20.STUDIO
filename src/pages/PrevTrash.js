import React, { useEffect, Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll, useScroll, Text3D, shaderMaterial, useAspect, Stats } from '@react-three/drei'
import POS_JSON from '../components/3d/pos.json'
import gsap, { Power2 } from 'gsap'
import { useDrag } from 'react-use-gesture';
import VirtualScroll from 'virtual-scroll'
import { easeCircleIn } from 'd3-ease';
import myFont from '.././fonts/RussoOne-Regular.json'
import { TrackballControls } from ".././components/3d/TrackballControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ TrackballControls, OrbitControls })


const images = {
  image1: require('.././asset/gallery/8.png'),
  image2: require('.././asset/gallery/8.png'),
  image3: require('.././asset/gallery/8.png'),
  image4: require('.././asset/gallery/b.png'),
  image5: require('.././asset/gallery/7.jpg'),
  sample1: require('.././asset/sample_1.png'),
  sample2: require('.././asset/sample_2.png'),
  sample3: require('.././asset/sample_3.png')
};

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

const defualtZitem = [
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
    position.z = position.z + wave * centerPoint * uScroll * 2.0;
    return position;
  }
  

  /* 
  float c = sin(length(uv - .5) * 15. + uProcess * 12.) * .5 + .5;
  newPosition1.x *= mix(1., uZoomScale.x + wave * c,uProcess);
  newPosition1.y *= mix(1., uZoomScale.y + wave * c,uProcess);
  */


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
/*    uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    vec4 textureImage = texture2D(uTexture, vUv);
    gl_FragColor = textureImage;
  } 
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform vec3 color;
  uniform sampler2D uTexture;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  uniform float uTime;
 
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  float r(vec2 p){return fract(cos(mod(123456789.,256.*dot(p,vec2(23.140692632779,2.6651441426902)))));}

  void main() {

    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    gl_FragColor = toGrayscale(texture2D(uTexture, zUv) * vec4(color, opacity) * veccustom, grayscale);
   
  }
  */
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
  const vec3 luma = vec3(.299, 0.587, 0.114);
  float seed = 16.0;


  float keytoChangePos = 4.0;

  float randomvec2 (vec2 st) {
    return fract(sin(dot(st.xy,
                        vec2(12.9898,78.233)))*
        43758.5453123);
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
      
     // float sinN = sinNoise(uv);
      
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
     vec4 textureFinal = mix(vec4(vec3(0.0,0.0,0.0), 0.0), texture2D(uTexture, vUv), cutoff);
  
     // vec4 textureFinal = mix(vec4(vec3(0.0,0.0,0.0), 0.0), vec4(vec3(3.0,3.0,3.0), 1.0), cutoff);
      gl_FragColor = textureFinal;
    // gl_FragColor = texture2D(uTexture, zUv);
  }

  `
)
// 
// declaratively
extend({ shaderMaterialCustom })


function Item({ url, key, texture, ...props }) {
  console.log('==== render loop time')

  const [isCloseActive, setCloseActive] = useState(false)
  const visible = useRef(false)
  const meshBackgroundReady = useRef(false)
  const [hovered, hover] = useState(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))

  const clickItem = (e) => {
    /* if(localStorage.getItem('finalMove') == 1) {

    }else{
      localStorage.setItem('idIntersec' , e.eventObject.name)
    } */
  }

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
    if (texture.source) {
      ref.current.material.uniforms.imageBounds.value = new THREE.Vector2(texture.source.data.naturalWidth / 1000 * 1.0, texture.source.data.naturalHeight / 1000 * 1.0)
    }

    ref.current.material.wireframe = false
    ref.current.material.uniforms.uRandom.value = Math.random() * 20 + 3
    localStorage.setItem('load-shader-final', 1)
  }, [ref])

  useFrame((state, delta) => {
    if (localStorage.getItem('load-shader-final') == 1) {
      ref.current.material.uniforms.uOffset.value = new THREE.Vector2((localStorage.getItem('dragx--f') / 1), (localStorage.getItem('dragy--f') / 1))
      ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, hovered ? 1 : 1.1, 4, delta)
      //     ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 7 : 0, 4, delta)
    }

  })
  return (
    <group {...props} onClick={clickItem}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        segments={8}
        key={key}
        url={url}
        texture={texture}
      />
    </group>
  )
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport)
  const { camera, scene } = useThree()
  const groupBaseRef = useRef(null)
  const groupItemRef = useRef(null)
  const posDrag = useRef({ x: 0, y: 0 })
  const positionUpdates = useRef(null)
  const readyAction = useRef(false)
  const boxSize = useRef(null)
  const listItemCount = useRef([])
  const meshCompoare = useRef(null)
  // Define the drag gesture
  let startDragKey = false

  let isPressing = false
  let countTimePressing = 0
  let durationPress = 0
  let unBlockClick = false
  const bind = useDrag(({ offset: [x, y], down }) => {

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

  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  console.log(imgUnPlash.length)
  const textures = imgUnPlash.map((url) => textureLoader.load(`./img-gallery/${Math.floor(Math.random() * 15 + 1)}.jpg`));
  // const textures = textureLoader.load('./img-gallery/1.jpg',

  let timelineAction = 0
  let speed = 0
  let positionC = -2.6
  let mouseEnter = false

  window.addEventListener('wheel', (e) => {
    speed += (e.deltaY) * 0.0002
  })
  const mapPosGeneral = []
  const mapRatio = []
  const COL_GRID_IMG = 5
  const ROW_GRID_IMG = 10
  let xChange = 0
  let yChange = 0
  let totalHeightPerCol = 0
  let marginY = 0.5
  useEffect(() => {
    let storeRatio = []
    for (let index = 0; index < textures.length; index++) {
      console.log(textures[index].source.data.naturalWidth / 1000, textures[index].source.data.naturalHeight / 1000)
      mapRatio.push({ w: textures[index].source.data.naturalWidth / 1000, h: textures[index].source.data.naturalHeight / 1000 })
    }
    console.log(mapRatio)
    let countTAMTHOI = 0
    if (textures.length > 49) {
      for (let c = 0; c < COL_GRID_IMG; c++) {
        for (let r = 0; r < ROW_GRID_IMG; r++) {

          if (countTAMTHOI > 50) { return }
          xChange = r * 0.7 + mapRatio[countTAMTHOI].w
          if (c == 0) {
            yChange = 0
          } else if (c == 1) {
            console.log(mapRatio[countTAMTHOI - 10].h)
            yChange = (mapRatio[countTAMTHOI - 10].h) / 2 + mapRatio[countTAMTHOI].h / 2 + 0.05
          } else if (c == 2) {
            yChange = (mapRatio[countTAMTHOI - 10].h) + mapRatio[countTAMTHOI].h / 2 + mapRatio[countTAMTHOI - 20].h / 2 + 0.10
          }
          else if (c == 3) {
            yChange = (mapRatio[countTAMTHOI - 10].h) + mapRatio[countTAMTHOI].h / 2 + mapRatio[countTAMTHOI - 20].h + mapRatio[countTAMTHOI - 30].h / 2 + 0.15
          }
          else if (c == 4) {
            yChange = (mapRatio[countTAMTHOI - 10].h) + mapRatio[countTAMTHOI].h / 2 + mapRatio[countTAMTHOI - 20].h + mapRatio[countTAMTHOI - 30].h + mapRatio[countTAMTHOI - 40].h / 2 + 0.2
          }
          else {
            yChange = 7
          }

          mapPosGeneral.push({ x: xChange, y: yChange })
          countTAMTHOI += 1
          console.log(countTAMTHOI)
        }
      }
    }

    console.log(mapPosGeneral)
  }, [textures])
  useEffect(() => {
    //GET POS FROM JSON

    /*  for (let index = 0; index < groupItemRef.current.children.length; index++) {
         groupItemRef.current.children[index].position.set(POS_JSON[index].x / 100, POS_JSON[index].y / 100, 0)
         groupItemRef.current.children[index].scale.set(textures[index].source.data.naturalWidth / 1000 * 1.1,textures[index].source.data.naturalHeight / 1000 * 1.1, 1)
         groupItemRef.current.children[index].name = index
     
       } */

    for (let index = 0; index < groupItemRef.current.children.length; index++) {
      groupItemRef.current.children[index].position.set(mapPosGeneral[index].x, mapPosGeneral[index].y, 0)
      groupItemRef.current.children[index].scale.set(textures[index].source.data.naturalWidth / 1000 * 1.0, textures[index].source.data.naturalHeight / 1000 * 1.0, 1)
      groupItemRef.current.children[index].name = index


    }

    const initDatapositionUpdates = () => {
      for (let index = 0; index < groupItemRef.current.children.length; index++) {
        listItemCount.current.push({ index: index, factor: Math.random() * 13 + 2 })
      }
      //  console.log(listItemCount.current)
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
    boxSize.current = new THREE.Vector2(sizeGruopW, sizeGruopH)
    localStorage.setItem('height-mesh', sizeGruopH)
    localStorage.setItem('width-mesh', sizeGruopW)
    localStorage.setItem('height-viewport', h)
    localStorage.setItem('width-viewport', w)
    groupItemRef.current.position.x = /* -sizeGruopW / 2 */ -sizeGruopW / 2.2
    groupItemRef.current.position.y = /* -sizeGruopH / 2.4 */ -sizeGruopH / 2.999



  }, [groupItemRef])
  useEffect(() => {
    console.log(groupBaseRef.current)
    const boxClone1 = new THREE.Box3().setFromObject(groupBaseRef.current);
    const sizeGruopW1 = boxClone1.max.x - boxClone1.min.x;
    const sizeGruopH1 = boxClone1.max.y - boxClone1.min.y;

    groupBaseRef.current.position.x = -sizeGruopW1 / 2
    groupBaseRef.current.position.y = -sizeGruopH1 / 2
    groupBaseRef.current.position.z = -4.2
    console.log(scene.children[0])
    scene.children[0].position.x = -w * 2
  }, [groupBaseRef])
  const updatePositionZ = (object, targetPosition, factor, delta) => {
    object.position.z = THREE.MathUtils.damp(
      object.position.z,
      targetPosition,
      factor,
      delta
    );

  }
  let infoOldItemClick = {
    id: null,
    x: null,
    y: null,
    z: null,
    sx: null,
    sy: null,
  }
  const handleClick = (e) => {

    console.log(localStorage.getItem('idIntersec'))
    console.log(groupItemRef.current.children[localStorage.getItem('idIntersec')])
    let meshtoAction = groupItemRef.current.children[localStorage.getItem('idIntersec')]
    //OPEN
    if (unBlockClick == true && localStorage.getItem('lockScroll') == 0) {
      infoOldItemClick = { id: meshtoAction.name, x: meshtoAction.position.x, y: meshtoAction.position.y, z: meshtoAction.position.z, sx: meshtoAction.scale.x, sy: meshtoAction.scale.y }
      // if move group (meshtoAction) // because goup parttent move half to get center viewport
      //x:localStorage.getItem('width-mesh')/2,
      //y: localStorage.getItem('height-mesh')/2.4,
      //z : (-localStorage.getItem('baseZToMove')),

      //if move exactly mesh (meshtoAction.children[0] )
      // it differnt
      localStorage.setItem('lockScroll', 1)

      gsap.timeline({})
        .to(meshtoAction.position, {
          x: localStorage.getItem('width-mesh') / 2 - posDrag.current.x,
          y: localStorage.getItem('height-mesh') / 2.4 + posDrag.current.y,
          z: (-localStorage.getItem('baseZToMove')),
          duration: 0.8,

        })


        .to(meshtoAction.scale, { // fit to scene
          x: 1.2,
          y: 1.2,
          duration: 1,
          ease: Power2.easeOut,
        }, "<")
        .to(meshtoAction.children[0].material.uniforms.uProcess, {
          value: 1,
          duration: 1,
          ease: Power2.easeOut,
          onComplete: () => {

            localStorage.setItem('finalMove', 1)
          }
        }, "0.5")

    } else {
      console.log('transer pos to partent')
    }



    //CLOSE
    if (localStorage.getItem('finalMove') == 1) {

      gsap.timeline({}).to(meshtoAction.position, {

        x: infoOldItemClick.x,
        y: infoOldItemClick.y,
        z: infoOldItemClick.z,
        duration: 1
      }).to(meshtoAction.children[0].material.uniforms.uProcess, {
        value: 0,
        duration: 1,
      }, "<").to(meshtoAction.scale, {
        x: infoOldItemClick.sx,
        y: infoOldItemClick.sy,
        duration: 1,
        onComplete: () => {

          localStorage.setItem('lockScroll', 0)
          infoOldItemClick = { x: null, y: null, z: null, sx: null, sy: null }
          localStorage.setItem('idIntersec', null)
          localStorage.setItem('finalMove', 0)
        }
      }, "0.5")

    }


  }
  const updateValueShader = (object, targetPosition, targetoffsetScroll) => {

    //object.children[0].material.uniforms.uOffset.value = new THREE.Vector2(targetPosition.x, targetPosition.y)
    object.children[0].material.uniforms.uTime.value = targetPosition
    object.children[0].material.uniforms.uScroll.value = targetoffsetScroll * 5
  };

  let hasfinishIntro = false
  let lockFc = false
  let countTime = 0
  let finalCount = 0
  let pointStartAction = false
  let baseval = 0
  const countRef = useRef(0);
  const SPEED_DRAG = 0.5
  let keyLockMesh = false

  let fixDragX = 0
  let fixDragY = 0
  let fixTam = 1.0
  let offSrollValue = 1
  useFrame((state, delta) => {

    baseval += 0.0005

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

    if (groupItemRef.current.position.z < -1.1 && pointStartAction == true) {
      timelineAction += 0.0005
      if (hasfinishIntro == true) {
        timelineAction += 0.0005
      }
    } else if (groupItemRef.current.position.z > 1) {
      if (hasfinishIntro == true) {
        //console.log('euneun')
        timelineAction -= 0.005
      }
    }
    else {
      timelineAction = 0
      hasfinishIntro = true

    }
    speed *= 0.8

    if (localStorage.getItem('lockScroll') == 1) {
      offSrollValue = 0
      localStorage.setItem('positionC', positionC * 1.2)

      //Check
      if (groupItemRef.current.children[22].position.z < 0) {
        //   groupItemRef.current.children[22].position.z += 0.005// WORK - BUT ON PERFECT WHY USE UFRAME TO LOOP SPEED => SOLUTION IS EXPORT VAL TO PUSH AND PASS TO OBJ BY URAME
      }
    } else {

      offSrollValue = 1
      positionC += ((speed + timelineAction) * offSrollValue)
      localStorage.setItem('positionC', positionC * 1.2)
      localStorage.setItem('baseZToMove', groupItemRef.current.position.z)
      groupItemRef.current.position.z = THREE.MathUtils.damp(
        groupItemRef.current.position.z,
        positionC * 1.2,
        20,
        delta
      );

      let vecc = new THREE.Vector2(0, groupItemRef.current.position.z)
      let offsetscrollY = vecc
        .clone()
        .sub(new THREE.Vector2(0, positionC * 1.2))
        .multiplyScalar(-0.25)

      // console.log(groupItemRef.current)

      if (positionUpdates.current && positionUpdates.current.length > 49) {
        positionUpdates.current.forEach(({ object, factor }) => {
          updatePositionZ(object, positionC * 1.2, factor, delta);
          updateValueShader(object, countTime / 2, offsetscrollY.y)
        })
      }

    }

    // console.log(`"========" ${offSrollValue}`)




    // DRAG AND MAX-MIN DRAG DISTANCE
    if (startDragKey == true && boxSize.current !== null && 3 == 3) {
      //  console.log(groupItemRef.current.position.x + (boxSize.current.x / 2))
      // console.log('RUN')
      if (groupItemRef.current.position.x + (boxSize.current.x / 2) > ((boxSize.current.x / 2) - w) + fixTam) {
        // console.log('out-L')
        keyLockMesh = true
        fixDragX -= 0.3
      } else if (-(groupItemRef.current.position.x + (boxSize.current.x / 2)) > (((boxSize.current.x / 2) - w) + fixTam)) {
        // console.log('out-R')
        keyLockMesh = true
        fixDragX += 0.3
      } else {
        // console.log('in')
        keyLockMesh = false

      }
      if (groupItemRef.current.position.y + (boxSize.current.y / 2.4) > ((boxSize.current.y / 2.4) - h) + fixTam) {
        // console.log('outT-L')
        keyLockMesh = true
        fixDragY -= 0.3
      } else if (-(groupItemRef.current.position.y + (boxSize.current.y / 2.4)) > (Math.floor(((boxSize.current.y / 2.4) - h) + fixTam))) {
        // console.log('outT-R')
        keyLockMesh = true
        fixDragY += 0.3
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

    }



  })
  return (
    <group>
      <group >

        <mesh ref={meshCompoare}>
          <planeGeometry args={[w, h]} position={[0, 0, -10]} />
          <meshBasicMaterial color={'white'} transparent={true} opacity={0.0} wireframe={false} />
        </mesh>
        <Text3D letterSpacing={0.01} size={0.86} font={myFont} ref={groupBaseRef}>
          20 STUDIO
          <meshStandardMaterial color="white" />
        </Text3D>
      </group>

      <group ref={groupItemRef}   {...bind()} onClick={handleClick}>
        {textures.map((texture, index) => (
          <Item texture={texture} url={imgUnPlash[index]} />
        ))}
        {/* 
                <Item texture={textures}  url={imgUnPlash[1]} />
                <Item texture={textures}  url={imgUnPlash[2]} />
                <Item texture={textures}  url={imgUnPlash[3]} />
                <Item texture={textures}  url={imgUnPlash[4]} />
                <Item texture={textures}  url={imgUnPlash[5]} />
                <Item texture={textures}  url={imgUnPlash[6]} />
                <Item texture={textures}  url={imgUnPlash[7]} />
                <Item texture={textures}  url={imgUnPlash[8]} />
                <Item texture={textures}  url={imgUnPlash[9]} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={images.image2} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={images.image2} />
                <Item texture={textures}  url={images.image1} />
                <Item texture={textures}  url={images.image5} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={images.image2} />
                <Item texture={textures}  url={images.image1} />
                <Item texture={textures}  url={images.image5} />
                <Item texture={textures}  url={images.image2} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={imgUnPlash[0]} />
                <Item texture={textures}  url={imgUnPlash[0]} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={images.image2} />
                <Item texture={textures}  url={images.image1} />
                <Item texture={textures}  url={images.image5} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={imgUnPlash[0]} />
                <Item texture={textures}  url={imgUnPlash[0]} />
                <Item texture={textures}  url={images.image5} />
                <Item texture={textures}  url={imgUnPlash[0]} />
                <Item texture={textures}  url={imgUnPlash[0]} />
                <Item texture={textures}  url={images.image1} />
                <Item texture={textures}  url={images.image5} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={images.image2} />
                <Item texture={textures}  url={images.image1} />
                <Item texture={textures}  url={images.image5} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={images.image2} />
                <Item texture={textures}  url={images.image1} />
                <Item texture={textures}  url={images.image5} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={images.image2} />
                <Item texture={textures}  url={images.image1} />
                <Item texture={textures}  url={images.image5} />
                <Item texture={textures}  url={images.image3} />
                <Item texture={textures}  url={images.image2} />
        */}
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
    const controls = new OrbitControls(camera, gl.domElement);
    controlsRef.current = controls;
    controls.enableZoom = false
    controls.enableRotate = false
    controls.enablePan = false
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);


  useFrame(() => {
    if (controlsRef.current) {

      controlsRef.current.update();
    }

  });

  return (null
    /*  <MapControls target={[0,0,0]} ref={controls} enableZoom={false} onChange={(e) => {console.log(e)}}/> */
  )
}

function DreiScroll() {

  useEffect(() => {
    localStorage.setItem('load-shader-final', 0)
    localStorage.setItem('lockScroll', 0)
    localStorage.setItem('finalMove', 0)
    localStorage.setItem('idIntersec', null)
  }, [])

  return (
    <section id='wrapper-scene' style={{ height: '100vh', width: '100vw' }}>
      <Canvas  /* gl={{ alpha: false, antialias: false, stencil: false, depth: false }} *//*  dpr={[1, 1.5]} */
        gl={{ antialias: false }}
        onCreated={({ gl }) => (gl.gammaFactor = 2.2, gl.outputEncoding = THREE.sRGBEncoding)}
        camera={{ position: [0, 0, 1], zoom: 1, up: [0, 0, 0], far: 10000 }}
      >
        {/*  <ambientLight intensity={0.5} /> */}
        {/*  <directionalLight position={[1, 1, 1]} /> */}
        <pointLight color="gray" intensity={0.9} position={[0, 0, -3.7]} />
        <axesHelper args={[5, 5, 5]} position={[0, 0, 0]} />
        <Suspense fallback={null}>
          {/*  <ScrollControls pages={3} maxSpeed={20}> */}
          <Items />
          <Stats />
       {/*    <ControlCustom /> */}
          {/*    </ScrollControls> */}
        </Suspense>
      </Canvas>
    </section>

  )
}

export default React.memo(DreiScroll)
