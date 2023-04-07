import React, { useRef, useEffect,useState } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import gsap from "gsap";
import imgdemo from '../.././asset/gallery/3.png'
const images = {
    image1: require('../.././asset/gallery/3.png'),
    image2: require('../.././asset/gallery/5.png'),
    image3: require('../.././asset/gallery/8.png'),
    image4: require('../.././asset/gallery/b.png'),
    image5: require('../.././asset/gallery/7.jpg')
};


export default function DemoImg() {


    const meshRef = useRef();
   
    const tex = [
        useLoader(THREE.TextureLoader, images.image1),
        useLoader(THREE.TextureLoader, images.image2),
        useLoader(THREE.TextureLoader, images.image3),
        useLoader(THREE.TextureLoader, images.image4),
        useLoader(THREE.TextureLoader, images.image5)
    ];

  
   
    console.log(imgdemo)
    useEffect(() => {
        meshRef.current.position.set(0, 0, 97)
        console.log(meshRef.current.geometry.attributes.uv)
        
    }, [meshRef])

    const texture = useLoader(THREE.TextureLoader, images.image1)
   // texture.repeat.set(0,0);
    let d = 550
    const aspectOfPlane = 60 / d;
    const aspectOfImage = 644 / 965;
    let yScale = 1;
    let xScale = aspectOfPlane / aspectOfImage;
    if (xScale > 1) { // it doesn't cover so based on x instead
      xScale = 1;
      yScale = aspectOfImage / aspectOfPlane;
    }
    texture.repeat.set(xScale, yScale);
    texture.offset.set((1 - xScale) / 2, (1 - yScale) / 2);  


    return (
        <>
         <mesh ref={meshRef}>
            <planeGeometry attach="geometry" args={[60, d]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
        </>
    )
}
