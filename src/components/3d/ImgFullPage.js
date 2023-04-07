import React, { useRef, useEffect, useState } from "react";
import { useThree, extend, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from 'three';

import gsap, { Power2 } from "gsap";
import POS_JSON from './pos.json'

const images = {
    image1: require('../.././asset/gallery/3.png'),
    image2: require('../.././asset/gallery/5.png'),
    image3: require('../.././asset/gallery/8.png'),
    image4: require('../.././asset/gallery/b.png'),
    image5: require('../.././asset/gallery/7.jpg')
};



export default function ImgFullPage() {
    // config var
    
    const [targets, setTargets] = useState([]);
    const grmeshRef = useRef();
    const W_GEO = 80
    const PosNew = [
        { x: -500 , y: 400,w:488, h : 368},
        { x: 100 , y: 0,w:472, h : 280},
        { x: 100 , y: -100,w:472, h : 280},
        { x: 100 , y: -100,w:472, h : 280},
        { x: 100 , y: -100,w:472, h : 280},
        { x: 100 , y: -100,w:472, h : 280},
        { x: 100 , y: -100,w:472, h : 280},
    ]



    useEffect(() => {
        //console.log(POS_JSON)

       /*  for (let i = 0; i < POS_JSON.length; i++) {
            let texture = new THREE.TextureLoader().load(images[`image${Math.floor(Math.random() * 5 + 1)}`])
            let aspectOfPlane = W_GEO / POS_JSON[i].h;
            let aspectOfImage = 2 / 3;
            let yScale = 1;
            let xScale = aspectOfPlane / aspectOfImage;
            if (xScale > 1) { // it doesn't cover so based on x instead
                xScale = 1;
                yScale = aspectOfImage / aspectOfPlane;
            }
            texture.repeat.set(xScale, yScale);
            texture.offset.set((1 - xScale) / 2, (1 - yScale) / 2);
            targets.push(
                <mesh key={Math.random() * 50}
                    position={[POS_JSON[i].x, POS_JSON[i].y, 0]} // Pos defuat
                    scale={[1, 1, 1]}
                >
                    <planeGeometry attach="geometry" args={[W_GEO, POS_JSON[i].h]} />
                    <meshBasicMaterial transparent opacity={1} map={texture} />
                </mesh>
            )

        }
 */
        for (let row = 0; row < 10; row++) {
            for(let col = 0; col < 2 ; col ++) {
                let texture = new THREE.TextureLoader().load(images[`image${Math.floor(Math.random() * 5 + 1)}`])
                let aspectOfPlane = W_GEO / POS_JSON[row].h;
                let aspectOfImage = 2 / 3;
                let yScale = 1;
                let xScale = aspectOfPlane / aspectOfImage;
                if (xScale > 1) { // it doesn't cover so based on x instead
                    xScale = 1;
                    yScale = aspectOfImage / aspectOfPlane;
                }
                texture.repeat.set(xScale, yScale);
                texture.offset.set((1 - xScale) / 2, (1 - yScale) / 2);
                targets.push(
                    <mesh key={Math.random() * 50}
                        position={[-(100 * row), -(300 * col), 0]} // Pos defuat
                        scale={[1, 1, 1]}
                    >
                        <planeGeometry attach="geometry" args={[W_GEO, POS_JSON[row].h]} />
                        <meshBasicMaterial transparent opacity={1} map={texture} />
                    </mesh>
                )
            }
        }


    }, [])

    return (
        <>
            <group ref={grmeshRef}>
                {targets}
            </group>
        </>
    )
}
