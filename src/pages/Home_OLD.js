import React, { useEffect, useRef, useState } from 'react'
import '.././styles/Home.css'
import img01 from '../asset/img.png'
import { AiOutlineArrowRight } from 'react-icons/ai';
import Partners from '../components/Partners';
import Services from '../components/Services';
import ServicesinPage from '../components/ServicesinPage';
import GalleryinPage from '../components/GalleryinPage';
import Contact from '../components/Contact';
import gsap from 'gsap'; //hiệu ứng
import vid1 from '../asset/videos/websites.mp4'
import useLocoScroll from '.././hooks/useLocoScroll'; //lấy smooth
import usePageTransition from '.././hooks/usePageTransition';
import IntroVid from '../components/IntroVid';
import '.././styles/HomeNew.css'
import SliderPartners from '../components/SliderPartners';

import { ScrollTrigger } from "gsap/ScrollTrigger";

const images = {
  image1: require('.././asset/gallery/3.png'),
  image2: require('.././asset/gallery/5.png'),
  image3: require('.././asset/gallery/8.png'),
  image4: require('.././asset/gallery/b.png'),
  image5: require('.././asset/gallery/7.jpg'),
  sample1: require('.././asset/sample_1.png'),
  sample2: require('.././asset/sample_2.png'),
  sample3: require('.././asset/sample_3.png')
};



gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  useLocoScroll(true)
  const { redirectPage } = usePageTransition();


  //
  const stickerContext = [
    `<span>craftmenship</span>`,
    `<span>passion</span>`,
    `<span>creaticity</span>`
  ]
  const listStickerSpace = document.querySelectorAll('.stickerSpace')
  useEffect(() => {
    console.log(listStickerSpace)
    if (listStickerSpace.length > 2) {
      for (let y = 0; y < 5; y++) {
        console.log(y)
        listStickerSpace[0].innerHTML += `${stickerContext[0]}`
        listStickerSpace[1].innerHTML += `${stickerContext[1]}`
        listStickerSpace[2].innerHTML += `${stickerContext[2]}`
      }
    }


  }, [listStickerSpace])


  // effect section services 
  useEffect(() => {

    let ctx = gsap.context(() => {

      ScrollTrigger.create({

        trigger: ".services-section-inpage",
        scroller: '.container',
        scrub: true,
        pin: true,
        // markers: true,
        start: "top top",
        end: "+=420%",



        animation: gsap.timeline().set(".services-section-inpage .item", {
          x: (window.innerWidth - 256) / 3 + 64
        }, "actionChild")



          .fromTo(".services-section-inpage .item a:nth-child(1)", {
            yPercent: 80,

            scale: 2.2
          }, {
            yPercent: 0,

            scale: 1,
          }, "actionChild")

          .from(".services-section-inpage .item a:nth-child(2)", {
            yPercent: 150,
            x: ((window.innerWidth - 256) / 3) / 2 + 64
          }, "<")
          .from(".services-section-inpage .item a:nth-child(3)", {
            yPercent: 160,
            x: ((window.innerWidth - 256) / 3) / 2 + 64
          }, "<")
          .to(".services-section-inpage .item", {
            x: 0
          })
      });
    })
    return () => ctx.revert();

  }, [])


  return (
    <>
      <section className='container'>
        <div className='warpper-content hero-section' style={{ marginBottom: '10vh' }}>
          <div className='img-hero-sec'>
          </div>
          <div className='content'>
            <div className='title'>
              <span>WHERE DREAMS</span>
              <span>COME TRUE</span>
            </div>
            <div className='name'>
              <h2>20STUDIO</h2>
            </div>
            <div className='more'>
              <p>We believe our industry is blinded by numbers. While buying decisions are based on emotion.</p>
              <a value='/sampledev' onClick={(event) => redirectPage(event)} >About us <AiOutlineArrowRight /></a>
            </div>
          </div>
        </div>






        <div className='services-section-inpage'>
          <div className='title'>
            <a className='heading-clone'>Services</a>
            <a className='sub-heading'><p>Explore our services</p></a>
          </div>
          <span></span>
          <div className='item'>
            <a><img src={images.sample1} alt='' /></a>
            <a><img src={images.sample2} alt='' /></a>
            <a><img src={images.sample3} alt='' /></a>
          </div>
        </div>
        <div className='passion-section'>
            <div className='content'>
              <div className='text'>with craftmentship, creativity and love, we turn our client’s ideas into peice of art</div>
              <div className='img'><img src={images.image4} alt=''/></div>
            </div>
            <div className='sticker-warpper'>
                <div className='stickerSpace'></div>
                <div className='stickerSpace'></div>
                <div className='stickerSpace'></div>
            </div>
        </div>
        <SliderPartners />


        <Contact />
      </section>
    </>
  )
}
