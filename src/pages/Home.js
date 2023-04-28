import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'; //hiệu ứng
import usePageTransition from '.././hooks/usePageTransition';
import { Link } from 'react-router-dom';
import '.././styles/Home.css'


import SliderPartners from '../components/SliderPartners';
import Contact from '../components/Contact';

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


 function Home() {
  console.log('==============Home render================')
  
  const { redirectPage } = usePageTransition();
  const [offTask, setOffTask] = useState(false)
  const listStickerSpace = document.querySelectorAll('.stickerSpace')
  const contentHeroSection = useRef(null)

  const stickerContext = [
    `<span>craftmenship</span>`,
    `<span>passion</span>`,
    `<span>creaticity</span>`
  ]

  useEffect(() => {
    if (listStickerSpace.length > 2) {
      for (let y = 0; y < 5; y++) {
        // console.log(y)
        listStickerSpace[0].innerHTML += `${stickerContext[0]}`
        listStickerSpace[1].innerHTML += `${stickerContext[1]}`
        listStickerSpace[2].innerHTML += `${stickerContext[2]}`
      }
    }

  }, [listStickerSpace])
 

  useEffect(()=>{
  
    gsap.fromTo(contentHeroSection.current,{
    
      opacity:0,
      y: -100,
    },{
      delay:1,
      opacity:1,
      y: 0,
      stagger:0.15,
      duration:1
    })
  },[contentHeroSection])

  return (
    <>
      <section  data-scroll-section className='container'>
        <div className='hero-section' > 
          <div className='text' ref={contentHeroSection} >
            <h2>20 Studio</h2>
            <p>Chúng tôi chuyên cung cấp dịch vụ gia công các mẫu thiết kế</p>
          </div>
        </div>
   
        <div className='clipwelcome-section' >
          <div className='text'>
            <span >REEL</span>
          </div>
          <div className='clip'>
            <img src={images.image3} alt='' />
          </div>
        </div>
        <div className='servcies_home-section' >
          <div className='title'>
            <h2>Servcies</h2>
          </div>
          <div className='pin-menu'>
              <Link to='/' >Home</Link>
                <Link to='/sampledev' >Sample Dev</Link>
                <Link to='/products' >Products</Link>
                <Link to='/contact' >Contact</Link>
            </div>
          <div className='list'>
            <a><span id='brading_servcies'>Branding</span></a>
            <a><span id='sampledev_servcies'>Sample Develop</span></a>
            <a><span id='products_servcies'>Production</span></a>
          </div>
        </div>
        <div className='passion-section'>
          <div className='content'>
            <div className='text'>with craftmentship, creativity and love, we turn our client’s ideas into peice of art</div>
            <div className='img'><img src={images.image4} alt='' /></div>
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


export default  Home