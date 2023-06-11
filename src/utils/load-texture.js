import * as THREE from 'three';
const imgUnPlash = [
  './img-gallery/1.jpg',
  './img-gallery/2.jpg',
  './img-gallery/3.jpg',
  './img-gallery/4.jpg',
  './img-gallery/5.jpg',
  './img-gallery/6.jpg',
  './img-gallery/7.jpg',
  './img-gallery/8.jpg',
  './img-gallery/9.jpg',
  './img-gallery/10.jpg',
  './img-gallery/11.jpg',
  './img-gallery/12.jpg',
  './img-gallery/13.jpg',
  './img-gallery/1.jpg',
  './img-gallery/2.jpg',
  './img-gallery/3.jpg',
  './img-gallery/17.jpg',
  './img-gallery/18.jpg',
  './img-gallery/19.jpg',
  './img-gallery/20.jpg',
  './img-gallery/1.jpg',
  './img-gallery/2.jpg',
  './img-gallery/3.jpg',
  './img-gallery/4.jpg',
  './img-gallery/5.jpg',
  './img-gallery/6.jpg',
  './img-gallery/1.jpg',
  './img-gallery/2.jpg',
  './img-gallery/3.jpg',
  './img-gallery/1.jpg',
  './img-gallery/19.jpg',
  './img-gallery/20.jpg',
  './img-gallery/1.jpg',
  './img-gallery/2.jpg',
  './img-gallery/3.jpg',

]
export const textureLoader = new THREE.TextureLoader();

export const textures = imgUnPlash.map((url,index) =>
  textureLoader.load(`./img-gallery/${index % 15 + 1}.jpg`)
);
// to change number img
// COUNT_ITEMS , 
/* if (textures.length > EXACLY_COUNT-1) {
        for (let c = 0; c < 5; c++) {
          for (let r = 0; r < 6; r++) {
            if (countLoop > EXACLY_COUNT-1) { */