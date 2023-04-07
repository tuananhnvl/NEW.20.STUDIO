import React, { useRef, useState, Fragment, useEffect, Suspense } from 'react'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import GlobalProduct3D from '.././components/3d/GlobalProduct3D'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls  } from "three/examples/jsm/controls/TrackballControls";
import PlaneGeo from '../components/3d/PlaneGeo';
import gsap, { Power2, Power4 } from 'gsap';
import { Vector2, Vector3 } from 'three';
import DemoImg from '../components/3d/DemoImg';
import debounce from 'lodash/debounce';

import { ScrollTrigger } from "gsap/ScrollTrigger";

extend({ TrackballControls })


function Controls() {
 const controls = useRef()
  const { camera, gl, scene } = useThree()

  gl.gammaFactor = 2.2
  gl.outputEncoding = THREE.sRGBEncoding

  const MAX_VIEW = 86
  const MED_VIEW = 160
  const MIN_VIEW = 300



  useEffect(() => {
    camera.position.set(0, 0, MIN_VIEW);
  });
/* 
  const debouncedHandleScroll = debounce(handleScroll, 16.66666);
  const wrapperCanvas = document.querySelector('#container-canvas');
useEffect(() => {
  console.log(wrapperCanvas)
  window.addEventListener("scroll", debouncedHandleScroll);

  return () => {
    window.removeEventListener("scroll", debouncedHandleScroll);
  };
}, [debouncedHandleScroll]);


let prevPosSCroll = 0
let timer
function handleScroll() {
  let s = Math.floor(window.scrollY / 100)
  if(s < 10 && s > 0) {
    clearTimeout(timer);


      console.log(`Distance: ${Math.abs(s - prevPosSCroll)}`);
      if(s > prevPosSCroll && s < 10) {
        console.log('down')
      
        gsap.to(camera.position, {
          z: camera.position.z + (10),
          duration: 1,
          overwrite: "auto",
          ease: Power2.easeInOut
        })
        prevPosSCroll = s
        console.log(s,prevPosSCroll)
      }else if(s < prevPosSCroll && s < 10){
        console.log('up')
        
        gsap.to(camera.position, {
          z: camera.position.z - (10),
          duration: 1,
          overwrite: "auto",
          ease: Power2.easeInOut
        })
        prevPosSCroll = s
        console.log(s,prevPosSCroll)
      }

  }
 
  
}
 */

 /* 
  useEffect(() => {

    const objGroup = scene.children[1]
    const objListItem = scene.children[1].children
    
    let targets = gsap.utils.toArray(objListItem);
    console.log(objGroup)

    let prevScrollY = 0;

        const context = gsap.context(() => {
          ScrollTrigger.create({
            trigger: "#container-canvas",
            scrub: true,
            markers: true,
            start: 'top top',
            end: `+=200%`,
            onUpdate: function() {
              console.log('run')
              let scrollY = window.scrollY;
              let distance = (scrollY - prevScrollY);
              let speed = 2
              console.log(distance)
              if (objGroup.position.z < 120) {
                if (scrollY > prevScrollY) {
                  gsap.timeline().to(objGroup.position, {
                    z: `+=${10 * speed}`,
                    duration: 1,
                    overwrite:"auto",
                    ease:Power4.easeOut
                  })
           
  
              
                } else if (scrollY < prevScrollY) {
                  gsap.timeline().to(objGroup.position, {
                    z: `-=${10 * speed}`,
                    duration: 1,
                    overwrite:"auto",
                    ease: Power4.easeOut
                  })
                 
             
                }
              }
              prevScrollY = scrollY;
            }
          });
        });
        return () => context.revert();

  }, [scene.children[1]]);
 */
  return <TrackballControls ref={controls} />
}

export default function Gallery() {
  
  return (
    <>
      <div id='container-canvas'>
        <section id="canvas3d" style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
          <Canvas>

            <axesHelper args={[500, 500, 500]} />
            {/*  <DemoImg/> */}
            <PlaneGeo />
            {/*   <Suspense fallback={null}>
         
        </Suspense> */}
            <Controls />
           
          </Canvas>
        </section>
      </div>


    </>
  )
}
