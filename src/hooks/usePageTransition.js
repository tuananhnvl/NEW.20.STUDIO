import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import dataurl from '.././data/dataurl.json';
const usePageTransition = () => {
  console.log('H:: usePageTransition run')
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('H:: usePageTransition check (enter brow)')
    const transitiondom = document.querySelector('#transition-section')
    const styletransitiondom = window.getComputedStyle(transitiondom);
    if (parseFloat(styletransitiondom.getPropertyValue('--opacity')) === null || parseFloat(styletransitiondom.getPropertyValue('--opacity')) === 0) {
      console.log(`- mask hidden (opacity:${styletransitiondom.getPropertyValue('--opacity')})`)

    }

    if (parseFloat(styletransitiondom.getPropertyValue('--opacity')) === 1) {
      console.log(`- mask show (opacity:${styletransitiondom.getPropertyValue('--opacity')})`)
      let tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false)
          console.log(`---- (opacity:${styletransitiondom.getPropertyValue('--opacity')})`)
        }
      });
      tl.set(transitiondom, {
        "--posX": `0%`,
        "--posY": `0%`,
      }, "openClipPatch")
        .add("openClipPatch");
      tl.to(transitiondom, {
        "--size": `0%`,
        ease: "power4.out",
        duration: 1,
      })
      .add("endTransOut");
      tl.to(transitiondom, {
        "--opacity": 0,
        duration: 0,
      },"endTransOut")
    }

  }, [isTransitioning]);

  const redirectPage = (event, path) => {
    if (isTransitioning) return;
    console.log('H:: redirectPage run')
    setIsTransitioning(true);

    const transitiondom = document.querySelector('#transition-section')
    let s = path || event.target.getAttribute("value")
    let rect = (event.target).getBoundingClientRect();

    if (s !== null) {
      console.log(':::: redirect page')

      const matchingPatches = dataurl.urlname.filter(item => item.patch === s);
      matchingPatches.forEach(item => redirectNow(item.name));

      function redirectNow(namepage) {
        transitiondom.childNodes[0].innerHTML = `${namepage}`;
        let tl = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false);
            navigate(`${s}`);
          }
        });
        tl.set(transitiondom, {
          "--opacity": 1,
          "--posX": `${(rect.x / window.innerWidth) * 100}%`,
          "--posY": `${(rect.y / window.innerHeight) * 100}%`,
        }, "openClipPatch")
          .add("openClipPatch");
        tl.to(transitiondom, {
          "--size": `150%`,
          ease: "power4.out",
          duration: 1.5,
        });
      }
    } else {
      console.log('!ER:: redirectPage');
    }
  }

  return { redirectPage };
}

export default usePageTransition;
