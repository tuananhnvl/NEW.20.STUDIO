import React, { useEffect, Suspense,useCallback,useRef,useMemo } from 'react'
import * as THREE from 'three'

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { useIntersect, shaderMaterial} from '@react-three/drei'
import { useDrag } from 'react-use-gesture';

/* import { TrackballControls } from ".././components/3d/TrackballControls";*/
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; 

import { textures } from '.././utils/load-texture.js';
import { Perf } from 'r3f-perf'
extend({  OrbitControls })


const vertexShader = `

uniform vec2 uOffset;
varying vec2 vUv;
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

  float angle = uScroll * 3.14159265 / 2.;
 
  // set sin(angle) to cos(angle) = > reveal sin thieu
  float wave = cos(angle); 
  
  float center = cos(length(uv - .5) * 2.101235);

  newPosition = deformationCurve(position,uv,uOffset,wave,center,uScroll);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( mix(newPosition,newPosition1,0.5), 1.0 );

}
`

const fragmentShader = `
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
  vec2 zUv = (uvd + vec2(0.5, 0.5)) /(zoom + 0.0)  + vec2(0.5, 0.5);

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


function Item({texture, ...props }) {
  console.log(':::::::: 50 ITEM RENDER')

  const visible = useRef(false)
  
  const ref = useIntersect((isVisible) => (visible.current = isVisible))

  const uniforms = useMemo(
    () => ({
      uOffset: {
         value: new THREE.Vector2(0.0, 0.0)
      },
      uTexture: {
        value: texture,
      },
      uScroll:{
        value: 0.0
      },
      uTime :{
        value: 0.0
      },
      imageBounds : {
        value: new THREE.Vector2(texture.source.data.naturalWidth / 1000 * 1.0, texture.source.data.naturalHeight / 1000 * 1.0)
      },
      uRandom : {
        value:  Math.random() * 20 + 3
      },
      scale : {
        value: new THREE.Vector2(1.0, 1.0)
      },
      iResolution : {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      },

    }),
    [texture]
  );

  useEffect(() => {
    ref.current.material.userData = {factor:  Math.random() * 20 + 2 }
  },[ref])

  useFrame((state, delta) => {

    if (ref.current) {
 
      ref.current.position.z = THREE.MathUtils.damp(
        ref.current.position.z,
        localStorage.getItem('posZTarget'),
        ref.current.material.userData.factor,
        delta
      );
      ref.current.material.uniforms.uScroll.value = localStorage.getItem('offsetscrollY') * 5
     ref.current.material.uniforms.uOffset.value = new THREE.Vector2(localStorage.getItem('drag-x'), localStorage.getItem('drag-y'))
    }

  })
  return (
    <group {...props} >
     
    <mesh ref={ref}>
        <planeGeometry args={[1, 1, 6,10]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
    </group>
  )
}

function Items() {
  console.log(':::::::::: GROUP ITEM CREAT')
 // console.log(textures)
  // Get global var
  const { width: w, height: h } = useThree((state) => state.viewport)
  const COUNT_ITEMS =  34
  // init Ref
  const groupItemRef = useRef(null)
  const posDrag = useRef({ x: 0, y: 0 })
  const positionUpdates = useRef(null)

  const boxSize = useRef(null)
  const listItemCount = useRef([])



  // var of Drag fc
  let startDragKey = false
  let isPressing = false
  let countTimePressing = 0
  let durationPress = 0
  let unBlockClick = false
  // var of uframe
  let timelineAction = 0.0000001
  let speed = 0
  let posZTarget = -2
  let offsetscrollY = 0
  let countTime = 0
 /*  let pointStartAction = false
  let baseval = 0
  let keyLockMesh = false
  let fixDragX = 0
  let fixDragY = 0
  let fixTam = 1.0 */
  let offSrollValue = 1
  let afterTimelineAction = 0
  //let speedDrag = 1.0
 // let speedTest = 0
  let resetSpeed = 1.0
/*   let outFont = false
  let outBack = false
  let clonePosGruopZ = 0
  let offsetdrag = new THREE.Vector2({x:0.0,y:0.0}) */
  // var of Grid ( include postion init fc)
 
 /*  const COL_GRID_IMG = 5
  const ROW_GRID_IMG = 10 */

const xChange = useRef(0)
const yChange = useRef(0)
// init var dymaltic
  const EXACLY_COUNT = 35
// init var config
 //const activeControl = useRef(null)
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
    speed += (e.deltaY) * 0.0003
   // speedTest += e.deltaY /10000
 // console.log(speedTest)
  })
//const mapPosGeneralSave = [{"x":0.08,"y":0},{"x":0.85,"y":0},{"x":1.62,"y":0},{"x":2.39,"y":0},{"x":3.16,"y":0},{"x":3.93,"y":0},{"x":4.7,"y":0},{"x":5.470000000000001,"y":0},{"x":6.24,"y":0},{"x":7.01,"y":0},{"x":0.08,"y":0.522},{"x":0.85,"y":0.7885},{"x":1.62,"y":0.7085},{"x":2.39,"y":0.522},{"x":3.16,"y":0.98},{"x":3.93,"y":0.6565},{"x":4.7,"y":0.522},{"x":5.470000000000001,"y":0.8414999999999999},{"x":6.24,"y":1.0015},{"x":7.01,"y":0.7885},{"x":0.08,"y":1.044},{"x":0.85,"y":1.7634999999999998},{"x":1.62,"y":1.2305},{"x":2.39,"y":1.257},{"x":3.16,"y":1.7469999999999999},{"x":3.93,"y":1.313},{"x":4.7,"y":1.257},{"x":5.470000000000001,"y":1.6829999999999998},{"x":6.24,"y":2.0564999999999998},{"x":7.01,"y":1.3104999999999998},{"x":0.08,"y":1.8325},{"x":0.85,"y":2.472},{"x":1.62,"y":1.7525},{"x":2.39,"y":2.237},{"x":3.16,"y":2.4035},{"x":3.93,"y":1.835},{"x":4.7,"y":2.0985},{"x":5.470000000000001,"y":2.6845},{"x":6.24,"y":2.8449999999999998},{"x":7.01,"y":1.8325},{"x":0.08,"y":2.8074999999999997},{"x":0.85,"y":2.9939999999999998},{"x":1.62,"y":2.4875},{"x":2.39,"y":3.0039999999999996},{"x":3.16,"y":3.0599999999999996},{"x":3.93,"y":2.57},{"x":4.7,"y":2.9399999999999995},{"x":5.470000000000001,"y":3.7395},{"x":6.24,"y":3.3669999999999995},{"x":7.01,"y":2.621}]

  //let lastMargin = 0.5

  const countLoop = useRef(-1)
  //let marginXGrid = 0.77 
  //let marginYGrid = 0.095
  let totalmarginW = 0
  const mapRatio = []
  const mapPosGeneral = []
  const calculateLayout = useCallback(() => {
   // console.log(groupItemRef.current)
    console.log(':::::::: LOADING TEXTURE');
 
  
    const loadTextures = () => {
      console.log('------------PROCESS PROMISE------------- loadTextures')
      const textureLoader = new THREE.TextureLoader(); 
      return Promise.all(textures.map((texture) => {
        return new Promise((resolve) => {
          textureLoader.load(texture.image.src, (loadedTexture) => {
            const width = loadedTexture.image.naturalWidth;
            const height = loadedTexture.image.naturalHeight;
            const ratio = { w: width / 1000, h: height / 1000 };
            mapRatio.push(ratio);
            resolve(ratio);
          });
        });
      }));
    };
  
    const calculateMapPosGeneral = (ratios) => {
      console.log('------------PROCESS PROMISE------------- calculateMapPosGeneral')

      console.log(ratios)
      let marginX =0.79
      let marginY = 0.20
      if (textures.length > EXACLY_COUNT-1) {
        for (let c = 0; c < 5; c++) {
          for (let r = 0; r < 7; r++) {
            if (countLoop.current > EXACLY_COUNT-1) {
              return mapPosGeneral;
            }
            countLoop.current += 1;
            xChange.current = r * marginX + 0.32;
            if(c === 0) {
            
              yChange.current =ratios[countLoop.current].h/2
            
            }else if(c === 1) {
              yChange.current =  ratios[countLoop.current-7].h + ratios[countLoop.current].h/2 + (marginY/3*2) 
            }else if(c === 2) {
              yChange.current =  ratios[countLoop.current-14].h + ratios[countLoop.current-7].h + ratios[countLoop.current].h/2 + (marginY/3*2)*2 
            }else if(c === 3) {
              yChange.current =  ratios[countLoop.current-21].h +  ratios[countLoop.current-14].h + ratios[countLoop.current-7].h + ratios[countLoop.current].h/2 + (marginY/3*2)*3
            }else if(c === 4) {
              yChange.current =  ratios[countLoop.current-28].h + ratios[countLoop.current-21].h +  ratios[countLoop.current-14].h + ratios[countLoop.current-7].h + ratios[countLoop.current].h/2 + (marginY/3*2)*4
            }else if(c === 5) {
              yChange.current =  ratios[countLoop.current-30].h + ratios[countLoop.current-28].h + ratios[countLoop.current-21].h +  ratios[countLoop.current-14].h + ratios[countLoop.current-7].h + ratios[countLoop.current].h/2 + (marginY/3*2)*5
            }
            else if(c === 6) {
              yChange.current =  ratios[countLoop.current-42].h + ratios[countLoop.current-30].h + ratios[countLoop.current-28].h + ratios[countLoop.current-21].h +  ratios[countLoop.current-14].h + ratios[countLoop.current-7].h + ratios[countLoop.current].h/2 + (marginY/3*2)*6
            }
            
            mapPosGeneral.push({ x: xChange.current, y: yChange.current });
          }
        }
      }
      return mapPosGeneral;
    };
  
    return loadTextures().then((ratios) => {
      const calculatedMapPosGeneral = calculateMapPosGeneral(ratios);
      console.log('mapPosGeneral:', calculatedMapPosGeneral);
      localStorage.setItem('load-text-complete',1)
      return calculatedMapPosGeneral;
    });
  }, [groupItemRef]);

  useEffect(() => {
    console.log('run calculateLayout  ')
    calculateLayout()
      .then((mapPosGeneral) => {
        console.log('Final mapPosGeneral:', mapPosGeneral);
        calcLayoutGroup(mapPosGeneral)
        localStorage.setItem('nonamevar', totalmarginW);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }, [calculateLayout,mapPosGeneral,totalmarginW]);
  
  

  let totalWidthMesh = 0
  //let totalHeightMesh = 0


const calcLayoutGroup = (mapPosGeneral) => {
  console.log('::::::: CONFIG GROUP ITEMS')

  for (let index = 0; index < groupItemRef.current.children.length; index++) {
    console.log(groupItemRef.current.children.length)
    groupItemRef.current.children[index].position.set(mapPosGeneral[index].x, mapPosGeneral[index].y, 0)
    groupItemRef.current.children[index].scale.set(textures[index].source.data.naturalWidth / 1000 * 1.0, textures[index].source.data.naturalHeight / 1000 * 1.0, 1)
    groupItemRef.current.children[index].name = index
    if(index < 11) {
      totalWidthMesh += groupItemRef.current.children[index].scale.x   // Width (marginXGrid)
    }
   
 //  console.log(totalWidthMesh)
  }

  const initDatapositionUpdates = () => {
    for (let index = 0; index < groupItemRef.current.children.length; index++) {
      listItemCount.current.push({ index: index, factor: Math.random() * 13 + 2 })
    }
  }
  if (listItemCount.current.length === 0) {
    initDatapositionUpdates()
  }

  positionUpdates.current = listItemCount.current.map(({ index, factor }) => ({
    object: groupItemRef.current.children[index],
    factor: factor,
  }));


  // CONFIG GROUP ITEM
  //Get SiZe group
  const boxClone = new THREE.Box3().setFromObject(groupItemRef.current);
  console.log(boxClone)
  const sizeGruopW = boxClone.max.x - boxClone.min.x;
  const sizeGruopH = boxClone.max.y - boxClone.min.y;
  
  //console.log(scene)
  boxSize.current = new THREE.Vector2(sizeGruopW, sizeGruopH)
  localStorage.setItem('height-mesh', sizeGruopH)
  localStorage.setItem('width-mesh', sizeGruopW)
  localStorage.setItem('height-viewport', h)
  localStorage.setItem('width-viewport', w)
  console.log(boxSize)
  groupItemRef.current.position.x = -sizeGruopW/2
  groupItemRef.current.position.y = -sizeGruopH/2
  
}


  
  const updateValueShader = (object, timelineIntro) => {
    object.children[0].material.uniforms.uTime.value = timelineIntro
  };
 
  useFrame((state, delta) => {
    

    countTime += delta / 2
    if (positionUpdates.current && positionUpdates.current.length > COUNT_ITEMS) {
      positionUpdates.current.forEach(({ object, factor }) => {
       updateValueShader(object, countTime / 2)
      })
    }
  
    let groupItems = groupItemRef.current
   
    if(groupItems.position.z < 0.5 && timelineAction !== 0) {
    //  console.log(':::: intro loading')
      timelineAction += 0.00022
      speed *= 0.62
    }else{
     // console.log('::::end intro , active global var')
      if(timelineAction > 0.0146499) {}
      timelineAction = 0
   
    
    }
    if(timelineAction === 0) {
      speed *= 0.8
    }
    //speedTest *= 0.05

    // offset space (z)
    if(timelineAction === 0) {
    // console.log('rundpees')
   
  //   console.log(`>>THIS SPACE<<\n${groupItems.position.z}`)
  
      resetSpeed = 1.0
      if(groupItems.position.z < -0.5) {
    // console.log(`>>out SPACE<<\n${groupItems.position.z}`)
 
        resetSpeed = 1.0
        afterTimelineAction += 0.003
      }else if(groupItems.position.z >1) {
        
        resetSpeed =  0.2
   //  console.log(`>>in SPACE<<\n${groupItems.position.z}`)
        afterTimelineAction -= 0.006
      }else{
        afterTimelineAction = 0
      
      
      }

    }
   // console.log(afterTimelineAction)
  //console.log(groupItems.position.z )
    posZTarget += (((speed * resetSpeed) + timelineAction + afterTimelineAction) * offSrollValue)

    groupItems.position.z = THREE.MathUtils.damp(
      groupItems.position.z,
      posZTarget * 1.2,
      20,
      delta
    );
    localStorage.setItem('posZTarget',posZTarget)
   
    let vec2Clone = new THREE.Vector2(0, groupItems.position.z)
    offsetscrollY = vec2Clone
    .clone()
    .sub(new THREE.Vector2(0, posZTarget * 1.2))
    .multiplyScalar(-0.10)
  
    localStorage.setItem('offsetscrollY',offsetscrollY.y)

   
  })
  return (
    <group>
      <group ref={groupItemRef}   {...bindDrag()}>
        {textures.map((texture, index) => (
          <Item key={index} texture={texture} />
        ))}
      </group>
    </group>

  )
}



function DreiScroll() {

  useEffect(() => {
    localStorage.setItem('load-shader-final', 0)
    localStorage.setItem('lockScroll', 0)
    localStorage.setItem('finalMove', 0)
    localStorage.setItem('idIntersec', null)
    localStorage.setItem('statusBool' ,false)
    localStorage.setItem('loadTex-complete' , false)
   // localStorage.setItem('posZTarget',0)
  }, [])
 
  

  return (
    <section id='wrapper-scene' style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        gl={{ antialias: false }}
        onCreated={({ gl }) => (gl.gammaFactor = 2.2)}
        camera={{ position: [0, 0, 2.5], zoom: 1, up: [0, 0, 0], far: 10000 }}
      >

        <axesHelper args={[5, 5, 5]} position={[0, 0, 0]} />
        <Suspense fallback={null}>
          <Items />
        </Suspense>
        <Perf/>
   
      </Canvas>

    </section>

  )
}

export default React.memo(DreiScroll)
