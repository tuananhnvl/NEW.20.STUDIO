import React, { useRef, useState, Fragment, useEffect, Suspense, useCallback } from 'react'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import GlobalProduct3D from '.././components/3d/GlobalProduct3D'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls  } from ".././components/3d/TrackballControls";
import ImgFullPage from '../components/3d/ImgFullPage';
import gsap, { Power2, Power4 } from 'gsap';
import { Scene, Vector2, Vector3 } from 'three';
import DemoImg from '../components/3d/DemoImg';
import debounce from 'lodash/debounce';

import { ScrollTrigger } from "gsap/ScrollTrigger";

extend({ TrackballControls })

function TrackballControlsComponent() {
  const { camera, gl,scene } = useThree();
  const controlsRef = useRef();
  const MAX_VIEW = 86
  const MED_VIEW = 160
  const CAM_VIEW_Z = 400

  useEffect(() => {
    const controls = new TrackballControls(camera, gl.domElement);
    controlsRef.current = controls;
  console.log(controls)
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);


  useEffect(() => {
    console.log(controlsRef.current)
   
    scene.children[1].position.set(-50,-50,0)
    controlsRef.current.object.position.set(0, 0, CAM_VIEW_Z);
    controlsRef.current.noRotate = false
    controlsRef.current.noPan = true
   controlsRef.current.noZoom = false
    controlsRef.current.zoomSpeed = 0.2
    controlsRef.current.maxDistance = CAM_VIEW_Z + 100
   controlsRef.current.minDistance = 95
    controlsRef.current.dynamicDampingFactor = 0.092
  },[controlsRef,scene])

  useFrame(() => {
    if (controlsRef.current) {
      const zoomLevel = controlsRef.current.object.position.z - 150;
      
      controlsRef.current.update();
    }
   
  });


 
  return null;
}
export default function Aboutus() {
  return (
    <>
      <div >
        <section style={{ backgroundColor: "#1E1E1E", width: "100vw", height: "100vh" }}>
        <Canvas
            gl={{ antialias: true }}
            onCreated={({ gl }) => (gl.gammaFactor = 2.2, gl.outputEncoding = THREE.sRGBEncoding)}
          >
             <axesHelper args={[1000, 1000, 500]} /> 
            <ImgFullPage /> 
            
            <TrackballControlsComponent/>
            
          </Canvas>
        </section>
      </div>


    </>
  )
}
