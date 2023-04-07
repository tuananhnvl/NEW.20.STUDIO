import React, { useRef, useState, Fragment, useEffect, Suspense, useCallback } from 'react'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import GlobalProduct3D from '.././components/3d/GlobalProduct3D'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from ".././components/3d/TrackballControls";
import PlaneGeo from '../components/3d/PlaneGeo';
import gsap, { Power2, Power4 } from 'gsap';
import { Scene, Vector2, Vector3 } from 'three';
import BoxBasic from '../components/3d/BoxBasic';
import debounce from 'lodash/debounce';
import { useHistory, useLocation } from 'react-router-dom';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import myFont from '.././fonts/PoiretOne.json'
import { useLocomotiveScroll } from 'react-locomotive-scroll'
import VirtualScroll from 'virtual-scroll'
extend({ TextGeometry })
function ControlEnv() {
    const location = useLocation()

  
  
    const { camera, gl, scene } = useThree();
    const controlsRef = useRef();
  
    useEffect(() => {
    
        if (location.pathname == '/') {

            gsap.timeline({ overwrite: "auto" })
                .to(scene.children[1].position, {
                    x: 0,
                    y: 0,
                    ease: Power2.easeOut,
                    duration: 3
                }).to(scene.children[2].position, {
                    x: -4,
                    y: -3,
                    ease: Power2.easeOut,
                    duration: 3
                }, "<")
        } else if (location.pathname == '/sampledev') {

            gsap.timeline({ overwrite: "auto" })
                .to(scene.children[1].position, {
                    x: -3,
                    y: -3,
                    ease: Power2.easeOut,
                    duration: 3
                }).to(scene.children[2].position, {
                    x: 3,
                    y: 3,
                    ease: Power2.easeOut,
                    duration: 3
                }, "<")
        } else if (location.pathname == '/products') {

            gsap.timeline({ overwrite: "auto" })
                .to(scene.children[1].position, {
                    x: 3,
                    y: -3,
                    ease: Power2.easeOut,
                    duration: 3
                }).to(scene.children[2].position, {
                    x: 0,
                    y: -4,
                    ease: Power2.easeOut,
                    duration: 3
                }, "<")
        }
    }, [location, scene, camera])


    return null;
}

function Text() {
    const font = new FontLoader().parse(myFont);

    return (
        <mesh scale={[.2, .2, .2]}>
            <textGeometry args={['20 STUDIO', { font, size: 3, height: 1 }]} />
            <meshBasicMaterial attach='material' color={'blue'} />
        </mesh>
    )
}
export default function CanvasThree(posSend) {
  

    return (

        <div data-scroll-container  style={{ backgroundColor: "transparent", width: "100vw", height: "100vh", position: "fixed",zIndex:'0' }}>

            <Canvas
                gl={{ antialias: true }}
                onCreated={({ gl }) => (gl.gammaFactor = 2.2, gl.outputEncoding = THREE.sRGBEncoding)}
            >
                <axesHelper args={[500, 500, 500]} />
                <BoxBasic pos={posSend}/>
                <Text />
               
                <ControlEnv />

            </Canvas>
        </div>

    )
}
