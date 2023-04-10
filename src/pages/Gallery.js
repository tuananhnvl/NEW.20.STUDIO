import React, { useRef, useState, Fragment, useEffect, Suspense, useCallback } from 'react'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import GlobalProduct3D from '.././components/3d/GlobalProduct3D'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls  } from ".././components/3d/TrackballControls";
import PlaneGeo from '../components/3d/PlaneGeo';
import gsap, { Power2, Power4 } from 'gsap';
import { Scene, Vector2, Vector3 } from 'three';
import DemoImg from '../components/3d/DemoImg';
import debounce from 'lodash/debounce';

import VirtualScroll from 'virtual-scroll';

extend({ TrackballControls })


/* function Controls() {
  const trackballRef = useRef();
  const { camera, gl, scene } = useThree()



  const MAX_VIEW = 86
  const MED_VIEW = 160
  const MIN_VIEW = 300

  useEffect(() => {
    camera.position.set(0, 0, MIN_VIEW);
  });


  useFrame(() => {
    trackballRef.current.update();
  });

  return <TrackballControls args={[camera, gl.domElement]} ref={trackballRef} />
} */
function TrackballControlsComponent() {
  const { camera, gl,scene } = useThree();
  const controlsRef = useRef();
  const MAX_VIEW = 86
  const MED_VIEW = 160
  const CAM_VIEW_Z = 150

  const [actionAnime,setActionAnime] = useState(false)
  useEffect(() => {
    const controls = new TrackballControls(camera, gl.domElement);
    controlsRef.current = controls;
   
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  let t = 0
  useEffect(() => {
    console.log(controlsRef.current)
    console.log(scene.children[1].position)

    controlsRef.current.object.position.set(0, 0, CAM_VIEW_Z);
    controlsRef.current.noRotate = true
    controlsRef.current.noPan = true
  // controlsRef.current.noZoom = true
    controlsRef.current.zoomSpeed = 0.5
    controlsRef.current.maxDistance = CAM_VIEW_Z + 100
   controlsRef.current.minDistance = 95
    controlsRef.current.dynamicDampingFactor = 0.092
 //   setActionAnime(true)
  },[controlsRef,scene])

  

  useEffect(() => {
  console.log(scene.children[1])
  console.log(scene.children[1].children)
  },[controlsRef,scene])

  let oldPos
  useFrame(() => {
    if (controlsRef.current) {
     
 //     console.log(localStorage.getItem('scrollPP'))
      let sp = localStorage.getItem('scrollPP')
   //   console.log(sp)
     // scene.children[1].position.z = (controlsRef.current.object.position.z) - 200
       //console.log(gr.position.z)
     scene.children[1].children[27].position.z +=sp/100
      controlsRef.current.update();
    }
   
  });

  function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }
 
  return null;
}
export default function Gallery() {
  return (
    
        <div style={{ backgroundColor: "#1E1E1E", width: "100vw", height: "100vh" }}>
        <Canvas
            gl={{ antialias: true }}
            onCreated={({ gl }) => (gl.gammaFactor = 2.2, gl.outputEncoding = THREE.sRGBEncoding)}
          >
            <axesHelper args={[500, 500, 500]} />
            <PlaneGeo />
  
            <TrackballControlsComponent/>
            
          </Canvas>
        </div>
      
       
    
  )
}
