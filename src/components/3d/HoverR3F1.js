import { useMemo, useRef,useEffect,useCallback,useState } from "react";
import { OrbitControls,OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame ,useThree} from "@react-three/fiber";
import * as THREE from 'three';
import { Color, Vector2,Vector3 } from "three";
import gsap from 'gsap'
import vertexShader from '../../data/vertexHoverR3F1.js';
import fragmentShader from '../../data/fragmentHoverr3f1.js';
import vertexMutilImgShader from '../../data/vertexMutilImg.js';
import fragmentMutilImgShader from '../../data/fragmentMutilImg.js';
import { levaStore, useControls } from 'leva'
import DemoTriggleEffect from '.././demolib/DemoTriggleEffect.js'
const images = {
  image1: require('../.././asset/gallery/bn.png'),
  image3: require('../.././asset/sampledev/2.png'),
  image2: require('../.././asset/sampledev/3.png'),
  image4: require('../.././asset/sampledev/4.png'),
};

const MovingPlane = ({ texture }) => {
  const mesh = useRef();
//  const {mouse} = useThree()
  
 
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const texture1 = textureLoader.load(images.image1);
  const texture2 = textureLoader.load(images.image2);
  const texture3 = textureLoader.load(images.image3);
  texture1.name = '0'
  texture2.name = '1'
  texture3.name = '2'

  const mousePosition = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e) => {
    if(mousePosition.current.y > 0.75 || mousePosition.current.y < -0.75) {
    //  mesh.current.scale.set(.2,.2,.2)
    }
    mousePosition.current = { 
      x: ((e.pageX / window.innerWidth) * 2 - 1),
      y: -((e.pageY / window.innerHeight) * 2 - 1),
    };
   // console.log(mousePosition.current.x,mousePosition.current.y)
    
  }, []);

 /*  const updateTexture = useCallback(() => {
    console.log('runing update Clallback')
    if(texture == 0) {
      //  if(mesh.current.material.uniforms.uTexture.value.name == texture) {return}
          console.log('111')
        mesh.current.material.uniforms.uTexture.value = texture1;
        //console.log(mesh.current.material.uniforms.uTexture.value)
      } else if(texture == 1) {
        
        mesh.current.material.uniforms.uTexture.value = texture2;
      }else if(texture == 2) {
        mesh.current.material.uniforms.uTexture.value = texture3;
      }else if(texture == null) {
        mesh.current.material.uniforms.uTexture.value = texture3;
      }
  
  }, [texture]);
  useEffect(() => {
    updateTexture();
  }, [updateTexture]);
   */
  const uniforms = useMemo(
    () => ({
      
      uTexture: { value: texture2 },
      uOffset: {
        value: new THREE.Vector2(0.0, 0.0)
      },
      u_colorA: { value: new Color("#FFE486") },
      u_colorB: { value: new Color("#FEB3D9") },
      uResolution :  {
        value: new THREE.Vector2(0.0, 0.0)
      },
      uAlpha : {
        value : 1.0
      },
      iResolution : {
        value: new THREE.Vector2(300, 500)
      },
      iTime : {
        value : 0.0
      }
    })
  );


 

  const FIX_W_VAR = 0 // MOUSE 0 TO 1 => SET SPACE MAX -1 -> 1 ( SET Y) => X INCRESS WHEN WIDTH LONG
  useFrame((state,delta) => {
    const { clock } = state;
    mesh.current.material.uniforms.iTime.value = (clock.getElapsedTime()) * 6.6
   // console.log(mousePosition.current)
    mesh.current.position.x = THREE.MathUtils.damp( mesh.current.position.x,mousePosition.current.x , 10, delta)
    mesh.current.position.y = THREE.MathUtils.damp( mesh.current.position.y,mousePosition.current.y, 5, delta)

    let offset = mesh.current.position
    .clone()
    .sub(mousePosition.current)
    .multiplyScalar(-0.25)
    console.log(offset)
      mesh.current.material.uniforms.uOffset.value = new THREE.Vector2(offset.x, offset.y)
  });

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[0.66,1, 50, 50]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

const TransitionImg = (leva) => {
  const {viewport} = useThree()
  const meshTransRef = useRef(null)
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const texture1 = textureLoader.load(images.image1);
  const texture2 = textureLoader.load(images.image2);
  const uniformsTrans= useMemo(
    () => ({
      uScroll: {type :"v2" , value: new THREE.Vector2(0.0,0.0)},
      uMouse: {type :"v2" , value: new THREE.Vector2(364.0,364.0)},
      uTime: {type:"f" , value:0.0},
      uAngel : { type:'float',value: 0.90},
      uProcess : { type: "f", value : 0.0},
       uTexture1: { type: "t",value: texture1 },
       uTexture2: { type: "t",value: texture2 },
       uPixel: {type: 'v2', value: new THREE.Vector2(window.innerWidth,window.innerHeight)}
    })
  )
  const mousePosition = useRef({ x: 0.0, y: 0.0 });
  
  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { 
      x: ((e.pageX / window.innerWidth) * 2 - 1),
      y: -((e.pageY / window.innerHeight) * 2 - 1),
    };
 //  console.log(mousePosition.current.x,mousePosition.current.y)
    
  }, []);

  const wheelPosition = useRef({ x: 0.0, y: 0.0 });
  const updateWheelPosition = useCallback((e) => {
    wheelPosition.current = { 
      x: e.pageX,
      y: e.deltaY,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);
    window.addEventListener("mousewheel", updateWheelPosition, false);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
      window.removeEventListener("mousewheel", updateWheelPosition, false);
    };
  }, [updateMousePosition,updateWheelPosition]);

  
  useEffect(()=>{
  
/*     meshTransRef.current.geometry.parameters.width = viewport.width
    meshTransRef.current.geometry.parameters.height = viewport.height
    meshTransRef.current.geometry.parameters.heightSegments = 16
    meshTransRef.current.geometry.parameters.widthSegments = 16 */
   // console.log(meshTransRef.current.material.uniforms)
   localStorage.setItem('scrollPosCre',0)
    meshTransRef.current.material.side = THREE.DoubleSide;
 
  },[meshTransRef])
  
  setTimeout(() => {
    gsap.timeline().to(meshTransRef.current.material.uniforms.uProcess ,{
      value: 1.0,
      duration:5
    }).to(meshTransRef.current.material.uniforms.uTime ,{
      value: 10.0,
      duration:10
    },"<") 
  }, 1500);

  useFrame((state,delta) => {
  // console.log(delta)
   //console.log(-(localStorage.getItem('scrollPosCre')/3000 ))
   // meshTransRef.current.position.y = -localStorage.getItem('scrollPosCre')/600
   // meshTransRef.current.position.y  = THREE.MathUtils.damp( meshTransRef.current.scale.x,localStorage.getItem('scrollPosCre')/10, 5, delta)
 let posVec2Ver = new THREE.Vector2(0.0, meshTransRef.current.material.uniforms.uScroll.value.y)
 let newposVec2 = new THREE.Vector2(0.0, localStorage.getItem('scrollPosCre')/3000)
 // meshTransRef.current.material.uniforms.uScroll.value = new THREE.Vector2(0.0, -localStorage.getItem('scrollPosCre')/3000)
 //meshTransRef.current.material.uniforms.uScroll.value = 
 let offset = meshTransRef.current.material.uniforms.uScroll.value
 .clone()
 .sub(newposVec2)
 .multiplyScalar(-0.25)
// console.log(offset)
meshTransRef.current.material.uniforms.uScroll.value = new THREE.Vector2(offset.x, offset.y)

 //  console.log(localStorage.getItem('scrollPosCre')/3000)
  })
  return (
    <mesh ref={meshTransRef} scale={[1,1,1]} rotation={[0, 0, 0]}>
        <planeGeometry args={[3.8,2,72,72]}/>
        <shaderMaterial
          fragmentShader={fragmentMutilImgShader}
          vertexShader={vertexMutilImgShader}
          uniforms={uniformsTrans}
          wireframe={true}
        />
    </mesh>
  )
}


const HoverR3F11 = () => {
  console.log('REENDER')
  /* const optionsLeva = useMemo(() => {
    return {
      uProcess: { value: 0.0, min: 0.0, max: 1.0, step: 0.01 },
      posX : {value: 0.0, min: 0.0, max: 1.0, step: 0.01},
      posY : {value: 0.0, min: 0.0, max: 1.0, step: 0.01},
      scaleX : {value: 1.0, min: 0.0, max: 3.0, step: 0.01},
      scaleY : {value: 1.0, min: 0.0, max: 3.0, step: 0.01},
    }
  }, [])

  const levaOptions = useControls('PlaneGeometry Transition', optionsLeva) */
  
  return (
    <>
    
  
   
    <div className="box-demo-full">
        Section 2
    </div>
      
    <div className="box-demo-full" style={{height:'200vh !important'}}>
      <Canvas camera={{ position: [0.0, 0.0, 2.0] }} >
        <TransitionImg leva={null}/>
        <axesHelper />
   
      </Canvas>
      
    </div>
    <div className="box-demo-full">
        Section 3
    </div>
    <div className="box-demo-full">
        Section 4
    </div>
    <div style={{position:'relative',width:'100vw',height:'100vh'}}>
      <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
        <MovingPlane />
        <axesHelper />
        <OrbitControls/>
      </Canvas>
        <div  style={{background:'transparent',zIndex:'2',position:'absolute',width:'100vw',height:'100vh',top:0,left:0,display:'flex',alignItems:'center'}}>
          <div style={{width:'100%',display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
            <div data='0'    style={{border:'1px solid green',margin: '0 auto',overflow:'hidden',width:'100%',color:'white',textTransform:'uppercase',fontSize: '70px',display:'flex', height:'20vh',alignItems:'center',display:'flex',alignItems:'center'}}><p>Tab1</p></div>
            <div data='1'    style={{border:'1px solid green',margin: '0 auto',overflow:'hidden',width:'100%',color:'white',textTransform:'uppercase',fontSize: '70px',display:'flex', height:'20vh',alignItems:'center',display:'flex',alignItems:'center'}}><p>Tab2</p></div>
            <div data='2'     style={{border:'1px solid green',margin: '0 auto',overflow:'hidden',width:'100%',color:'white',textTransform:'uppercase',fontSize: '70px',display:'flex', height:'20vh',alignItems:'center',display:'flex',alignItems:'center'}}><p>Tab3</p></div>
          </div>
      </div>
    </div>
  
    </>
   
  );
};
function HoverR3F1() {
  return (
    <div>
      hello
    </div>
  )
}
export default HoverR3F1;
