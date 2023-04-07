import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";

const images = {
  image1: require('../.././asset/gallery/3.png'),
  image2: require('../.././asset/gallery/5.png'),
  image3: require('../.././asset/gallery/8.png'),
  image4: require('../.././asset/gallery/b.png'),
  image5: require('../.././asset/gallery/7.jpg')
};

export default function BoxGeo() {
  const atlas = useLoader(THREE.TextureLoader, images.image1);
  const numCols = 4;
  const numRows = 4;
  const numImages = numCols * numRows;
  const imageWidth = 500 / numCols;
  const imageHeight = 300 / numRows;

  const positions = [];
  const uvs = [];

  for (let i = 0; i < numImages; i++) {
    const col = i % numCols;
    const row = Math.floor(i / numCols);
    const x = col / numCols;
    const y = 1 - (row + 1 / numRows);
    positions.push(x, y, 0);
    positions.push(x + 1 / numCols, y, 0);
    positions.push(x, y + 1 / numRows, 0);
    positions.push(x + 1 / numCols, y + 1 / numRows, 0);
    uvs.push(col * imageWidth, row * imageHeight);
    uvs.push((col + 1) * imageWidth, row * imageHeight);
    uvs.push(col * imageWidth, (row + 1) * imageHeight);
    uvs.push((col + 1) * imageWidth, (row + 1) * imageHeight);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex([0, 1, 2, 2, 1, 3]);

  const material = new THREE.MeshBasicMaterial({ map: atlas });
  const mesh = useRef();

  useEffect(() => {
    console.log(mesh.current)
    mesh.current.scale.set(100, 100, 0)
  },[mesh])
  return (
    <group>
      <mesh ref={mesh} geometry={geometry} material={material} />
    </group>
  );
}
