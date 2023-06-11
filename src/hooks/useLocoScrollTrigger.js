import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLocation } from "react-router-dom";
const useLocoScrollTrigger = (start) => {
  gsap.registerPlugin(ScrollTrigger);
  const location = useLocation()
  useEffect(() => {
    if (!start) return;
    console.log('location')
    const scrollEl = document.querySelector('.container');
    console.log(`:::: ScrollTrigger&Locomotive run!`)
    
    let locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 0.42,
    });
   
    locoScroll.on('scroll', () => ScrollTrigger.update());

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        }
        return null;
      },
      scrollLeft(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.x;
        }
        return null;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      }
    });

    const lsUpdate = () => {
      if (locoScroll) {
        locoScroll.update()
      }
    };

    ScrollTrigger.addEventListener('refresh', lsUpdate);
    ScrollTrigger.refresh(true);

    console.log(`:::: ScrollTrigger&Locomotive complete!`)

    return () => {
      ScrollTrigger.removeEventListener('refresh', lsUpdate);
      locoScroll.destroy();
    };

    
  }, [start,location]);
};

export default useLocoScrollTrigger;