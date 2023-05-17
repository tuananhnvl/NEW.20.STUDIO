import React,{useEffect,useRef, useState} from 'react'
import gsap from 'gsap'
import './01.css'
import {ScrollTrigger} from 'gsap/ScrollTrigger';
//import useLocoScrollTriggle from '../../hooks/useLocoScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const images = {
    image1: require('../.././asset/sampledev/1.png'),
    image3: require('../.././asset/sampledev/2.png'),
    image2: require('../.././asset/sampledev/3.png'),
    image4: require('../.././asset/sampledev/4.png'),
    image5: require('../.././asset/sampledev/5.png'),
    image6: require('../.././asset/sampledev/6.png'),
    image7: require('../.././asset/sampledev/7.png'),
   
};

export default function DemoTriggleEffect() {
 // useLocoScrollTriggle(true)
    const boxWr = useRef(null)
    let arrItem = []
  useEffect(()=>{
    const timeline = gsap.timeline({overwrite:'auto'});
    const listItem = boxWr.current.children[1].children
  
    timeline.to(listItem[0], {
      yPercent:-100,
      duration:1
    })
    ScrollTrigger.create({

      trigger: boxWr.current,
      scroller: '.container',
      scrub: true,
      pin: true,
       markers: true,
      start: "top top",
      end: "+=200%",
      onUpdate: (self) => {
        console.log(self.progress)
      },
      animation: timeline
    })
  },[boxWr])
  return (
    <>
      <div className='container'>
      <div className="box-demo-full">
        Section 2
    </div>
      <section className='partent' ref={boxWr}>
            <span className='title'>Tittle</span>
            <div className='child' id="listItem">
                <a><img src={images.image1} /></a>
                <a><img src={images.image2} /></a>
                <a><img src={images.image3} /></a>
                <a><img src={images.image4} /></a>
            </div>
        </section>
      
    <div className="box-demo-full"> 
        Section 3
    </div>
    <div className="box-demo-full">
        Section 4
    </div>
      </div>
     
     
    </>
    
  )
}
