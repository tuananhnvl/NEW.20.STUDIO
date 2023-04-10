import React, { useLayoutEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const useLocoScroll = (start) => {
  

  useLayoutEffect(() => {
    if (!start) return;

    const scrollEl = document.querySelector('.container');
    console.log('========== found scrollEl')
    console.log(scrollEl.getBoundingClientRect().height)
    console.log(`useLocoScroll start!`)
    
    let locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.2,
    });

   
   // ScrollTrigger.addEventListener('refresh', lsUpdate);
   // ScrollTrigger.refresh();
    console.log(`useLocoScroll complete!`)

    return () => {
      if (locoScroll) {
        console.log('locoScroll exist')
       //ScrollTrigger.removeEventListener('refresh', lsUpdate);
       
        locoScroll.destroy();
        locoScroll = null;
        console.log('locoScroll =>>>> null')
      }
    };
    
   
  }, [start]);
  
}; 



export default useLocoScroll;