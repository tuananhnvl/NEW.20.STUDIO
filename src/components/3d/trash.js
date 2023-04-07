
import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree, Html } from "@react-three/fiber";
import * as THREE from 'three';
import { MeshBufferGeometry } from '@react-three/fiber';

import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
const images = [
  require('../.././asset/gallery/1.jpg'),
  require('../.././asset/gallery/2.jpg'),
  require('../.././asset/gallery/4.jpg'),
  require('../.././asset/gallery/7.jpg'),
  require('../.././asset/gallery/9.jpg'),
  require('../.././asset/gallery/3.png'),
  require('../.././asset/gallery/5.png'),
  require('../.././asset/gallery/8.png'),
  require('../.././asset/gallery/53.png'),
  require('../.././asset/gallery/b.png'),
  require('../.././asset/gallery/bn.png'),
  require('../.././asset/gallery/d.png'),
  require('../.././asset/gallery/dg.png'),
  require('../.././asset/gallery/e.png'),
  require('../.././asset/gallery/fg.png'),
  require('../.././asset/gallery/fw.png'),
  require('../.././asset/gallery/h.png'),
  require('../.././asset/gallery/j.png'),
  require('../.././asset/gallery/js.png'),
  require('../.././asset/gallery/n.png'),
  require('../.././asset/gallery/nd.png'),
  require('../.././asset/gallery/q.png'),
  require('../.././asset/gallery/r.png'),
  require('../.././asset/gallery/rt.png'),
];
function GlobalProduct3D() {
  const { gl, scene, camera } = useThree();
  const vector = new THREE.Vector3();

  const targets = [];
  const groupRef = useRef();
  const COUNT_DOM = 10;

  const renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.pointerEvents = 'none';
  renderer.domElement.style.top = 0;
  renderer.camera = camera;
  document.getElementById("container").appendChild(renderer.domElement);

  useFrame(() => {
    renderer.render(groupRef.current, camera);
  });

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
let mesh
  useEffect(() => {
    console.log('general Mesh')
    const radius = 100;
     const sphereGeometry = new THREE.SphereGeometry(50, 10,10);
    const material = new THREE.MeshBasicMaterial({ wireframe: true,opacity:.2});

    const sphereMesh = new THREE.Mesh(sphereGeometry, material);
    sphereMesh.position.set(0, 0, 0);
 
   

    for (let i = 2; i < 8 ; i++) {
      let phi = i * 0.35;
      for (let to = 0; to < 5; to++) {
        let theta = to * 0.5;

       /*   const element = document.createElement("div");
        element.className = "element";
        element.style.width = "100px";
        element.style.height = "auto";
    
        element.style.overflow = "hidden";

        const elImg = document.createElement('img')
        elImg.className= 'img--item'
        elImg.src= images[randomInt(0,20)]
        elImg.style.maxWidth = "50px"
        elImg.style.height ="auto"
        element.appendChild(elImg)

       const objectCSS = new CSS3DObject(element);
        objectCSS.position.setFromSphericalCoords(radius, phi, theta);
        vector.copy(objectCSS.position).multiplyScalar(2);
        objectCSS.lookAt(vector);

        const object3D = new THREE.Object3D();
      object3D.position.setFromSphericalCoords(radius, phi, theta);
        object3D.add(objectCSS); */
      
       // sphereMesh.add(object3D);

       const geometry =new THREE.PlaneGeometry( 20, 20 );
       const material = new THREE.MeshNormalMaterial({color: 0xffff00, side: THREE.DoubleSide});
       mesh = new THREE.InstancedMesh( geometry, material, 50 )
       mesh.position.setFromSphericalCoords(radius, phi, theta);
       vector.copy(mesh.position).multiplyScalar(2);
       mesh.lookAt(vector);


       if (groupRef.current) {
        groupRef.current.add(mesh);
        groupRef.current.add(sphereMesh);
       }

      }
    }
  }, []);

  return <group ref={groupRef} ></group>;
}

export default GlobalProduct3D



.set([...meshRef.current.children].map((child) => child.position), {
  z: r + Math.round(e.distance) ,
  overwrite: "auto",
})
.to(meshRef.current.position, {
  z: r,
  duration: 0.7,
  overwrite:"auto",
  ease:Power2.easeOut
},"<")
.to([...meshRef.current.children].map((child) => child.position), {
  z: 0,
  duration: 0.5,
  overwrite: "auto"
})