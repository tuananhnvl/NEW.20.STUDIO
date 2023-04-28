import React,{useEffect,useState, useRef,useContext} from 'react'
import { useFrame,useThree } from '@react-three/fiber'
import * as THREE from 'three';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import VirtualScroll from 'virtual-scroll'

import { useLocation } from 'react-router-dom';

export default function BoxBasic() {
  console.log('==============BoxBasic render================')
  const groupmesh = useRef(null)
  const { camera, gl, scene } = useThree();
  const location = useLocation() 
  
  let postSave = []

  useFrame((delta) => {
   // console.log(location.pathname)
    if( localStorage.getItem('countAction') == 0){
      //scene.children[1].children[0].position.y = THREE.MathUtils.damp(scene.children[1].children[0].position.y, 0, 10, delta)
    }else if( localStorage.getItem('countAction') == 1) {
     // scene.children[1].children[0].position.y = THREE.MathUtils.damp(scene.children[1].children[0].position.y, -2, 10, delta)
    }
    let posCurLoco = (localStorage.getItem('scrollPosCre'))/100
    localStorage.setItem('countAction' , 3)
   // console.log(posCurLoco/10)
      //scene.children[1].children[0].position.setFromSphericalCoords(3, posCurLoco/6 , posCurLoco/6);
    //  scene.children[1].children[0].position.y = THREE.MathUtils.damp(scene.children[1].children[0].position.y, scene.children[1].children[0].position.y + posCurLoco, 10, delta)
     // scene.children[1].children[1].position.setFromSphericalCoords(4, posCurLoco/6, 1 -3);
    // scene.children[1].children[1].position.x = postSave[0]
    // scene.children[1].children[1].position.y = -posCurLoco/3 
   //   .geometry.multiplyScalar(posCurLoco/10);
     // scene.children[1].children[0].scale.set(posCurLoco/10,posCurLoco/10,posCurLoco/10)
     // scene.children[1].children[1].scale.set(posCurLoco/10,posCurLoco/10,posCurLoco/10)
      scene.children[1].children[0].position.y = -posCurLoco/10 
     // scene.children[1].children[0].rotation.x = posCurLoco

     // scene.children[1].children[1].rotation.y = -posCurLoco
     // scene.children[1].children[1].rotation.x = posCurLoco
    
  })
  
  return (
    <group>
      {/* <mesh >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
      </mesh> */}
      <mesh >
   
        <sphereGeometry attach="geometry" args={[1, 36, 3]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
 
  
  )
}
