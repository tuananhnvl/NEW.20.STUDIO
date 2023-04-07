import React,{useEffect, useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
export default function BoxBasic(posSend) {
  const mesh = useRef(null)

  let posSendFinal = posSend.pos.pos/1000
  //console.log(posSendFinal)
  useEffect(() => {
    gsap.to( mesh.current.position , {
      y : -posSendFinal,
      x : posSendFinal,
      duration:1,
      overwrite:'auto'
    })
  
  },[mesh,posSend])
  useFrame(() => {
    mesh.current.rotation.x += 0.005
    mesh.current.rotation.y += 0.005
   
  })
  
  return (
   
    <mesh ref={mesh} >
    <boxGeometry attach="geometry" args={[1, 1, 1]} />
    <meshNormalMaterial attach="material" />
  </mesh>
  
  
  )
}
