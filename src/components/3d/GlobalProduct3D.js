
import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import gsap, { Power2 } from "gsap";

function GlobalProduct3D() {
  const { gl, scene, camera } = useThree();
  const vector = new THREE.Vector3();
  let mesh
  const [targets, setTargets] = useState([]);
  const groupRef = useRef();

  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const originalPositions = {}
  const rotationPositions = {}
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    console.log('general Mesh')
    const radius = 100;
    /*  const sphereGeometry = new THREE.SphereGeometry(50, 10,10);
    const material = new THREE.MeshBasicMaterial({ wireframe: true,opacity:.2});

    const sphereMesh = new THREE.Mesh(sphereGeometry, material);
    sphereMesh.position.set(0, 0, 0); */
 
   

    for (let i = 2; i < 8 ; i++) {
      let phi = i * 0.35 ;
      for (let to = 0; to < 5; to++) {
        let theta = -(to * 0.5) - 8.4;

       const geometry =new THREE.PlaneGeometry( 20, 20 );
       const material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
       mesh = new THREE.Mesh( geometry, material, 50 )
       mesh.position.setFromSphericalCoords(radius, phi, theta);
       vector.copy(mesh.position).multiplyScalar(2);
       mesh.lookAt(vector);

       targets.push(mesh)
/*        if (groupRef.current) {
       groupRef.current.add(mesh);
        //groupRef.current.add(sphereMesh);
       } */

      }
    }
    console.log(targets)
    console.log(groupRef.current)

   setTargets(targets);


    
  }, []);


 
    const handleClickChildMesh = (event) => {
      event.stopPropagation();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        groupRef.current.children,
        true
      );
  
      

      if (intersects.length > 0) {
        console.log(originalPositions,rotationPositions)
        let objIntersects = intersects[0].object
        let uuid = intersects[0].object.uuid
        console.warn('CLICKON')
        console.log(`Click ID: ${uuid}`)
      //  console.log(originalPositions)
        console.log(originalPositions.hasOwnProperty(`${uuid}`))
        if (originalPositions.hasOwnProperty(`${uuid}`) == true && rotationPositions.hasOwnProperty(`${uuid}`) == true) {
          console.log('exsist')
       
           // console.log(originalPositions)
           runOldPos(objIntersects,uuid,originalPositions,rotationPositions)
           delete originalPositions[`${uuid}`];
          delete rotationPositions[`${uuid}`];
         
        }else{
          console.log('NOT exsist')
          console.log(originalPositions,rotationPositions)
   
          originalPositions[`${uuid}`] = {...objIntersects.position}
          rotationPositions[`${uuid}`] = {...objIntersects.rotation}
         runNewPos(objIntersects,uuid,originalPositions,rotationPositions)
        }
      }else{
        console.warn('err')
      }
  };


  useEffect(() => {
  // Add event listener to listen for mouse movement
  groupRef.current.addEventListener('click', handleClickChildMesh);

  // Return cleanup function to remove event listener
  return () => {
    groupRef.current.removeEventListener('click', handleClickChildMesh);

 }

  }, [groupRef])
  
 
  function runOldPos(objIntersects,uuid,originalPositions,rotationPositions) {
   gsap.to(objIntersects.position, {
      x: originalPositions[uuid].x,
      y: originalPositions[uuid].y,
      z: originalPositions[uuid].z,
      ease: Power2.easeInOut,
      duration: 1.5
    }); 
   
    /* gsap.to(objIntersects.rotation, {
      x: rotationPositions[uuid].x,
      y: rotationPositions[uuid].y,
      z: rotationPositions[uuid].z,
      ease: Power2.easeInOut,
      duration: 1.5
    }); */
  }

  function runNewPos(objIntersects) {
    gsap.to(objIntersects.position, {
      x: 0,
      y: 0,
      z: 20,
      ease: Power2.easeInOut,
      duration: 1
    });

    gsap.to(objIntersects.rotation, {
      x: 0,
      y: 0,
      z: 0,
      ease: Power2.easeInOut,
      duration: .7
    });
    
  }
  useFrame(() => {
   
    if(camera.position.z > 50) {
      camera.position.z -=50
    }else{
      return
    }
  },[]);
  

 
  return <group ref={groupRef} onClick={handleClickChildMesh}>
       {targets.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          material={mesh.material}
          position={[mesh.position.x, mesh.position.y, mesh.position.z]}
          rotation={[mesh.rotation.x, mesh.rotation.y, mesh.rotation.z]}
        />
      ))}
  </group>;
}

export default GlobalProduct3D