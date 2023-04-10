import React, { useRef,useContext, useState, Fragment, useEffect, Suspense, useCallback,useLayoutEffect  } from 'react'
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
import DataContext from '.././hooks/DataContext';

extend({ TextGeometry })

function ControlEnv() {
    const location = useLocation()
    const { camera, gl, scene } = useThree();
    const controlsRef = useRef();
  
   



    return null;    
}

function Text() {
    const location = useLocation()
    const font = new FontLoader().parse(myFont);
    const meshText = useRef(null)
    const SPEED_TEXT = 50
    const centerText = new THREE.Vector3();
    const [actionMove,setActionMove]= useState(false)
    useEffect(() => {
        console.log(meshText.current)
     
        //calc mesh.geo size , not apply to gr ( total each or ... )
        meshText.current.geometry.computeBoundingBox()
        let posUnFormat = meshText.current.geometry.boundingBox;
        // get size from posUnFormat 
        let w = posUnFormat.max.x - posUnFormat .min.x;
        let h = posUnFormat.max.y - posUnFormat.min.y;
        let d = posUnFormat.max.z - posUnFormat.min.z;
       // meshText.current.position.set(-w/2,-h/2,-d/2) // center
        meshText.current.geometry.boundingBox.getCenter(centerText);
        meshText.current.geometry.center(); // set center transfrom
        
      

        
    },[meshText])
    useFrame(() => {
        if(location.pathname !== '/gallery') {
            let posCurLoco = (localStorage.getItem('scrollPosCre'))/1000
            //  meshText.current.position.x = -(posCurLoco/2 +2.85)
            //  meshText.current.position.z = (posCurLoco/2  +0.5)
            let forMeshText = posCurLoco/100
          console.log(meshText.current.position)
          meshText.current.position.x = -posCurLoco
          meshText.current.position.z = posCurLoco
            meshText.current.rotation.y = (forMeshText * SPEED_TEXT)
        }
 
    })
    return (
        <mesh ref={meshText}>
            <textGeometry args={['20 STUDIO', { font , size: 1, height: 0.25}]} />
            <meshBasicMaterial attach='material' color={'blue'} />
        </mesh>
    )
}
function CanvasThree() {
    console.log('==============CanvasThree render================')
    return (

        <div id='bade-modal'  style={{ backgroundColor: "transparent", width: "100vw", height: '100vh',position:'fixed',pointerEvents:'none' }}>
          
            <Canvas
                gl={{ antialias: true }}
                onCreated={({ gl }) => (gl.gammaFactor = 2.2, gl.outputEncoding = THREE.sRGBEncoding)}
            >
                <axesHelper args={[500, 500, 500]} />
                <BoxBasic/>
                <Text />
               
                <ControlEnv />

            </Canvas>
        </div>

    )
}
export default React.memo(CanvasThree);


/* 
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

*/