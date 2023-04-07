import React, { useRef, useEffect, useState } from "react";
import { useThree, extend, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { shaderMaterial } from "@react-three/drei";
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
const WaveShaderMaterial = shaderMaterial(
    // Uniform
    {
        uTime: 0,
        //uColor: new THREE.Color(0.0, 0.0, 0.0),
        uTexture: new THREE.Texture()
    },
    // Vertex Shader
    glsl`
      precision mediump float;
   
      varying vec2 vUv;
      varying float vWave;
  
      uniform float uTime;
  
      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);
  
      void main() {
        vUv = uv;
  
        vec3 pos = position;
        float noiseFreq = 2.0;
        float noiseAmp = 0.9;
        vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
        pos.z += snoise3(noisePos) * noiseAmp;
        vWave = pos.z;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
      }


      
    `,
    // Fragment Shader
    glsl`
    /*   precision mediump float;
  
      uniform vec3 uColor;
      uniform float uTime;
      uniform sampler2D uTexture;
  
      varying vec2 vUv;
      varying float vWave;
  
      void main() {
        float wave = vWave * 0.2;
        vec3 texture = texture2D(uTexture, vUv + wave).rgb;
        gl_FragColor = vec4(texture, 1.0); 
      }
 */
      varying vec2 vUv;
uniform sampler2D uTexture;
varying float vWave;
void main() {
    float wave = vWave * 0.05;
  vec3 texture = texture2D(uTexture, vUv ).rgb;
  gl_FragColor = vec4(texture, 1.);
}
    `
);

extend({ WaveShaderMaterial });


export default function PlaneGeo() {
    // config var
    const ref = useRef();
    const [targets, setTargets] = useState([]);

    const { viewport, scene, mouse } = useThree();
    const meshRef = useRef();
    const [active, setActive] = useState(false)
    //config obj
    const SIZE_GROUP = { w: 900, h: 500, z: 0 }
    const W_GEO = 80

    /*  useFrame(({ clock }) => (
     
         meshRef.current.children[22].material.uTime = clock.getElapsedTime()
     )); */

    useEffect(() => {
        console.log(POS_JSON)

        for (let i = 0; i < POS_JSON.length; i++) {
            let texture = new THREE.TextureLoader().load(images[`image${Math.floor(Math.random() * 5 + 1)}`])
            let aspectOfPlane = W_GEO / POS_JSON[i].h;
            let aspectOfImage = 644 / 965;
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
                    {/*  <waveShaderMaterial attach="material"  uTexture={texture}   /> */}
                    <meshBasicMaterial transparent opacity={0} map={texture} />
                </mesh>
            )

        }

    }, [])

    useFrame(({ clock }) => {
        /*  meshRef.current.children.forEach(child => {
             if (child.material.type === "ShaderMaterial") {
                 child.material.uniforms.uTime.value = clock.getElapsedTime();
             }
         }); */


    });


    useEffect(() => {
        console.log(meshRef.current.children)
        let list = meshRef.current.children
        meshRef.current.position.set(-(SIZE_GROUP.w / 2 + 50), -(SIZE_GROUP.h / 1.6), SIZE_GROUP.z)
        // const timeline = gsap.timeline({})  

        let dl = Math.random() * 4 + .5
        list.forEach((item, i) => {
            //console.log(item)
            gsap.timeline({ overwrite: "auto" })
                .to(item.material, {
                    opacity: 1,
                    duration: 3,
                    ease: Power2.easeOut,
                    delay: Math.random() * 2 + .5,
                })
                .fromTo(item.position, {
                    z: -220
                }, {
                    z: -100,
                    duration: 3,
                    ease: Power2.easeOut,
                    delay: .7,
                }, "<")
        })
    }, [meshRef.current]);


    return (
        <>
            <group ref={meshRef}>
                {targets}
            </group>
        </>
    )
}
