import React, { useRef, useState, Fragment, useEffect, Suspense, useCallback } from 'react'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {  ScrollControls, useScroll, useAnimations,MapControls  } from "@react-three/drei"
import GlobalProduct3D from '.././components/3d/GlobalProduct3D'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { TrackballControls } from ".././components/3d/TrackballControls";
import PlaneGeo from '../components/3d/PlaneGeo';
import gsap, { Power2, Power4 } from 'gsap';


import debounce from 'lodash/debounce';




function ControlCustom() {
 
  const controls = useRef();

  const { camera, gl, scene } = useThree();


  useEffect(() => {
   // camera.position.set(0, 0, MED_VIEW);
  
    console.log(controls.current)
  },[controls]);

  return (
    <MapControls ref={controls} enableZoom={false}/>
  )
}
export default function Gallery() {
  return ( 

    <div style={{ backgroundColor: "#1E1E1E", width: "100vw", height: "100vh" }}>
      <Canvas
        gl={{ antialias: true }}
        onCreated={({ gl }) => (gl.gammaFactor = 2.2, gl.outputEncoding = THREE.sRGBEncoding)}
        camera={{ position: [0, 0, 250], zoom: 1, up: [0, 0, 1], far: 10000 }}
      >
        <axesHelper args={[500, 500, 500]} />
        <Suspense fallback={null}>
          <ScrollControls pages={1} maxSpeed={20}>
            <PlaneGeo />
           <ControlCustom/>
          </ScrollControls>
        </Suspense>
     
       
      </Canvas>
    </div>



  )
}
