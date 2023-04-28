import React, { useRef, useEffect, useState } from "react";
import { useThree, extend, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {useIntersect, shaderMaterial,useScroll,useTexture } from "@react-three/drei";
import gsap, { Power2 } from "gsap";
import POS_JSON from './pos.json'
import glsl from "babel-plugin-glsl/macro";
const images = {
    image1: require('../.././asset/gallery/3.png'),
    image2: require('../.././asset/gallery/5.png'),
    image3: require('../.././asset/gallery/8.png'),
    image4: require('../.././asset/gallery/b.png'),
    image5: require('../.././asset/gallery/7.jpg')
};
const imagesarr = [
  '../.././asset/gallery/3.png',
  '../.././asset/gallery/5.png',
  '../.././asset/gallery/8.png',
  '../.././asset/gallery/b.png',
  '../.././asset/gallery/7.png',
];
//extend({ WaveShaderMaterial });


export default function PlaneGeo() {
    // config var
   
    const [targets, setTargets] = useState([]);
    const listMesh = useRef(null)
    const { viewport, scene, mouse } = useThree();
    const meshRef = useRef();
    const ref = useRef();
    const [active, setActive] = useState(false)
    //config obj
    const SIZE_GROUP = { w: 900, h: 500, z: 0 }
    const W_GEO = 80
    const [hovered, hover] = useState(false)

    
    useEffect(() => {
      if(keyStart == true) {return}
        console.log(POS_JSON)
    
        for (let i = 0; i < POS_JSON.length; i++) {
         
            let texture = new THREE.TextureLoader().load(images[`image${Math.floor(Math.random() * 5 + 1)}`])
            // ratio
            let aspectOfPlane = W_GEO / POS_JSON[i].h;
            let aspectOfImage = 644 / 965;
            let yScale = 1;
            let xScale = aspectOfPlane / aspectOfImage;
            if (xScale > 1) { 
                xScale = 1;
                yScale = aspectOfImage / aspectOfPlane;
            }
            texture.repeat.set(xScale, yScale);
            texture.offset.set((1 - xScale) / 2, (1 - yScale) / 2);
            targets.push(
                <mesh  key={Math.random() * 50}
                    position={[POS_JSON[i].x, POS_JSON[i].y, 0]} // Pos defuat
                    scale={[1, 1, 1]}
                    ref={ref}
                     onPointerOver={(e) => handleHoverOn(e)} onPointerOut={(e) => handleHoverOut(e)}
                >
                    <planeGeometry attach="geometry" args={[W_GEO, POS_JSON[i].h]} />
                    {/*  <waveShaderMaterial attach="material"  uTexture={texture}   /> */}
                    <meshBasicMaterial transparent opacity={0} map={texture} />
                </mesh>
            )

        }

    }, [])

    const handleHoverOn = (e) => {
      console.log(e.object.scale)
      gsap.to(e.object.scale, {
        overwrite:'auto',
        x:1.4,
        y:1.4,
        z:0,
        duration:1
      })
    }
    const handleHoverOut = (e) => {
      console.log(e.object.scale)
      gsap.to(e.object.scale, {
        overwrite:'auto',
        x:1,
        y:1,
        z:0,
        duration:1
      })
    }
    const scroller = useScroll()
    let keyStart = false 
    const MAX_DISTANCE = 160;
    const positionUpdates = useRef(null)


    useEffect(() => {
      if(keyStart == true) {return}
      //  console.log(meshRef.current.children)
        let list = meshRef.current.children
        meshRef.current.position.set(-(SIZE_GROUP.w / 2 + 50), -(SIZE_GROUP.h / 1.6), SIZE_GROUP.z)
        listMesh.current = (meshRef.current.children).slice(15,30)
      //  console.log(listMesh.current)


        list.forEach((item, i) => {
            //console.log(item)
            gsap.timeline({ overwrite: "auto" })
                .to(item.material, {
                    opacity: 1,
                    duration: 1.5,
                    ease: Power2.easeOut,
                    delay: Math.random() * 2 + .5,
                })
                /* .fromTo(item.position, {
                    z: -220
                }, {
                    z: 0,
                    duration: 1,
                    ease: Power2.easeOut,
                    delay: .7,
                }, "<") */
        })
        keyStart = true

        positionUpdates.current = [
          { index: 16, factor: 15 },
          { index: 17, factor: 40 },
          { index: 18, factor: 3 },
          { index: 21, factor: 8 },
          { index: 22, factor: 75 },
          { index: 23, factor: 8 },
          { index: 26, factor: 15 },
          { index: 27, factor: 40 },
          { index: 28, factor: 3 },
          { index: 30, factor: 7 },
          { index: 31, factor: 17 },
          { index: 32, factor: 37 },
          { index: 34, factor: 7 },
          { index: 35, factor: 35 },
          { index: 36, factor: 95 },
          { index: 37, factor: 5 },
        ].map(({ index, factor }) => ({
          object: meshRef.current.children[index],
          factor: factor,
        }));

    }, [meshRef.current]);

    let distance_store 


    const updatePosition = (object, targetPosition, factor, delta) => {
      object.position.z = THREE.MathUtils.damp(
        object.position.z,
        targetPosition,
        factor,
        delta
      );
    };

    const visible = useRef(false)
 
   // const ref = useIntersect((isVisible) => (visible.current = isVisible))
    const { height } = useThree((state) => state.viewport)


    useFrame((state, delta) => {
   // console.log(ref.current)
    //  console.log(scroller.offset)
       
        if (keyStart = true && scroller.offset <= MAX_DISTANCE) {
          distance_store = scroller.offset
        
          let DISTANCE = Math.min(distance_store * 170, MAX_DISTANCE);
          positionUpdates.current.forEach(({ object, factor }) => {
            updatePosition(object, DISTANCE, factor,delta);
          });
        }else{
          distance_store = MAX_DISTANCE
        }
      });
    return (
        <>
            <group ref={meshRef} >
                {targets}
            </group>
        </>
    )
}
