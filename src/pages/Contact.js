import React,{useEffect,useState,useRef} from 'react'
import usePageTransition from '../hooks/usePageTransition.js'
import gsap from 'gsap';
import '../styles/Contacts.css'
import LocomotiveScroll from 'locomotive-scroll';
const images = {
  image1: require('.././asset/gallery/dg.png'),
  image2: require('.././asset/gallery2.png'),
 
};


export default function Contact() {
  const { redirectPage } = usePageTransition();
  const [offTask,setOffTask] = useState(false)

  return (

        <section data-scroll-section  style={{display:'flex',width:'100%',height:'100vh'}}>
          <div className='content-contacts-page'>
            <span>Liên lạc&nbsp;-&nbsp;Contact&nbsp;-&nbsp;Bộnjour&nbsp;-&nbsp;Contacno&nbsp;-&nbsp;Get in touch&nbsp;-&nbsp;Ni Hao</span>
            <div className='info'> 
            <div className='detail'>
              <p className='tit'>Sẵn sàng làm việc cùng 20Studio ? Hãy để lại lời nhắn cho chúng tôi nhé</p>
              
              <p>20studio.contact@gmail.com</p>
              <p>0354 2022 00</p>
              <p>62/193 Lý Chính Thắng, phường Võ Thị Sáu, quận 3, TP.HCM</p>
            </div>
             
         
              <div className='action'>

                <a>xem trên google map</a>
                <a value='/' onClick={redirectPage}>back to home</a>
              </div>
            </div>
            <div className='fake-div'>
            <a> <img src={images.image1} alt=''/></a>
            <a> <img src={images.image2} alt=''/></a>
            </div>
          </div>
        </section>

 
  )
}
