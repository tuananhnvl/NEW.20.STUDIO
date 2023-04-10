import React,{useEffect,useState, useRef,useContext} from 'react'
import { useFrame,useThree } from '@react-three/fiber'
import * as THREE from 'three';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import VirtualScroll from 'virtual-scroll'
import DataContext from '../.././App';
import { useLocation } from 'react-router-dom';

export default function BoxBasic() {
  console.log('==============BoxBasic render================')
  const groupmesh = useRef(null)
  const { camera, gl, scene } = useThree();
  const location = useLocation()
  const [loadingObj,setLoadingObj] = useState(false)
  const [actionMove,setActionMove]= useState(false)
  useEffect(() => {
    console.log(groupmesh.current.children)
    setLoadingObj(true)

  },[groupmesh])
  useEffect(() => {
    console.log(location)
    console.log(`location on Mesh :::: ${location.pathname}`)
    setActionMove(true)
  },[location])
  useFrame(() => {
    if(loadingObj === true && actionMove === true && location.pathname !== '/gallery') {
      let posCurLoco = (localStorage.getItem('scrollPosCre'))/100
      console.log(posCurLoco/10)
      groupmesh.current.children[0].position.setFromSphericalCoords(3, posCurLoco/6 , posCurLoco/6);
      groupmesh.current.children[1].position.setFromSphericalCoords(4, posCurLoco/6, 1 -3);
      groupmesh.current.children[0].scale.set(posCurLoco/10,posCurLoco/10,posCurLoco/10)
      groupmesh.current.children[1].scale.set(posCurLoco/10,posCurLoco/10,posCurLoco/10)
      groupmesh.current.children[0].rotation.y = -posCurLoco
      groupmesh.current.children[0].rotation.x = posCurLoco

      groupmesh.current.children[1].rotation.y = -posCurLoco
      groupmesh.current.children[1].rotation.x = posCurLoco

    }
    
  })
  
  return (
    <group ref={groupmesh}>
      <mesh >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
      </mesh>
      <mesh >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
 
  
  )
}
