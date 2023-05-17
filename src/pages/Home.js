import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'; //hiệu ứng
import usePageTransition from '.././hooks/usePageTransition';
import { Link } from 'react-router-dom';
import '.././styles/Home.css'
import {images} from '.././utils/load-image.js'
import SliderPartners from '../components/SliderPartners';
import Contact from '../components/Contact';
import useLocoScrollTrigger from '../hooks/useLocoScrollTrigger'
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

 function Home() {
  console.log('P:: Home render')
  const { redirectPage } = usePageTransition();
  const containerRef = useRef(null)
  const sectionGalleryRef = useRef(null)
  const initScroll = useLocoScrollTrigger(true)
  // Function to calculate the offset between elements
  const calculateOffset = (current, next) => {
    const currentRect = current.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();
    console.log( currentRect.bottom)
    console.log(nextRect.top)
    return currentRect.bottom - nextRect.top;
  };
  useEffect(() => {
  //  console.log(initScroll)
    if (sectionGalleryRef.current) {
      const brand1 = document.getElementById("brand1")
      const brand2 = document.getElementById("brand2")
      let ctx = gsap.context(() => {
        const timeline = gsap.timeline();
        // Animation for #brand1
        timeline.to("#brand1", {
          y: - brand1.getBoundingClientRect().height,
        });
        timeline.to("#brand2", {
          y: - brand2.getBoundingClientRect().height,
          scrollTrigger : {
          
            scroller : '.container',
            start: () => 0,
            end: () => 'max',
            markers: true,
            onUpdate: () => {
            }
          }
        });
        // Animation for #brand2 with offset condition
   /*      timeline.to("#brand2", {
          y: -100,
        }); */
        const scrollTrigger = ScrollTrigger.create({
          trigger: sectionGalleryRef.current,
          scroller: '.container',
          scrub: true,
          pin: true,
          //pinSpacing: false,
          markers: true,
          start: "top top",
          end: "+=420%",
          onUpdate: (self) => {
          },
          animation: timeline
        });
        return () => {
          scrollTrigger.kill(); // Destroy the ScrollTrigger instance when the component unmounts
        };
      })
      return () => ctx.revert();
    }
    
  }, [sectionGalleryRef])

  return (
    <>
      <section  data-scroll-container className='container' ref={containerRef}>
        <div className='section-hero '>
          <div className=' wrapper-grid10hook'>
            <div className='des'>
              <p>20Stuido chuyên thiết kế, gia công và sản xuất các sản phẩm mang tính sáng tạo cao, giúp khách hàng thiết kế sản phẩm và xây dựng thương hiệu của họ</p>
            </div>
            <div className='tit'>
              <h2>Creative Production Studio</h2>
            </div>
            
            <div className='more'>
              <a className='logo-img'>
                <img src={images.logowhite} alt='' />
              </a>
              <ul>
                <li>Gallery</li>
                <li>Services</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='section-services'>
          <div className=' wrapper-grid10hook'>
              <div className='tit'>
                <h2>Services</h2>
              </div>
              <div className='des'>
                <p>We believe an excellent product is made with expertise, craftsmanship and passion, what you will get from 20Studio</p>
              </div>
              <div className='list'>
                <ul>
                  <li>Prototype develop</li>
                  <li>manufacturing</li>
                  <li>Branding</li>
                </ul>
              </div>
          </div>
        </div>
        <div className='section-gallery'  ref={sectionGalleryRef}>
            <div className='name-section wrapper-grid10hook'>
              <div className='tit'><h2>Gallery</h2></div>
            {/*   <div className='des' ><p>Our honor to be parts of your successsuccess</p></div> */}
            </div>
            <div className='wrapper-grid10hook list-img'>
         
              <div className='box-img brand1' id="brand1">
                <a><img src={images.image1} alt='' /></a>
                <h3>lungtung</h3>
                <span>Fall-Winter 2022</span>
                <p>Sample Develop</p>
              </div>
              <div className='box-img brand2' id="brand2">
                <a><img src={images.image1} alt='' /></a>
                <h3>lungtung</h3>
                <span>Fall-Winter 2022</span>
                <p>Sample Develop</p>
              </div>
             {/*  <div className='box-img brand3' id="brand3">
                <a><img src={images.image1} alt='' /></a>
                <h3>lungtung</h3>
                <span>Fall-Winter 2022</span>
                <p>Sample Develop</p>
              </div>
              <div className='box-img brand4' id="brand4">
                <a><img src={images.image1} alt='' /></a>
                <h3>lungtung</h3>
                <span>Fall-Winter 2022</span>
                <p>Sample Develop</p>
              </div> */}
       
            </div>
            
 
        </div>
 
        <Contact />
        <Contact />
      </section>
    </>
  )
}


export default  Home