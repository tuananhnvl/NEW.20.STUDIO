import React,{useEffect} from 'react'
import '../styles/cursorHover.css'
import Cursor from '../hooks/useCursor'
import vid1 from '../asset/videos/websites.mp4'
import vid2 from '../asset/videos/apps.mp4'
import vid3 from '../asset/videos/branding.mp4'
import { lerp, getMousePos, getSiblings } from ".././utils/utils-cursor.js";
import gsap from 'gsap'


export default function Services() {
    useEffect(() => {
        //const cursor = new Cursor(document.querySelector(".cursor"));
        hoverShow()
      },[])
      
    function hoverShow() {
      const listels = document.querySelectorAll(".item-services-active a");
      listels.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    }
    function handleMouseEnter(event) {
      const el = event.currentTarget;
      let siblings = getSiblings(el);
      let idvid = el.parentNode.getAttribute("data-video-src")
      console.log(siblings)
      console.log(document.getElementById(`${idvid}`))
      siblings.forEach((i) => {
        i.classList.add('hidden-for-all')
      })
      el.parentNode.classList.add('active-bg-v')
  
      gsap.set(el.parentNode.childNodes[1], { zIndex: 10, opacity: 1});
      gsap.set(document.getElementById(`${idvid}`), { zIndex: 5, opacity: 1});
    }
  
    function handleMouseLeave(event) {
      const el = event.currentTarget;
      let siblings = getSiblings(el);
      let idvid = el.parentNode.getAttribute("data-video-src")
      siblings.forEach((i) => {
        i.classList.remove('hidden-for-all')
      })
      el.parentNode.classList.remove('active-bg-v')
      gsap.set(el.parentNode.childNodes[1], { zIndex: 1, opacity: .5});
     gsap.set(document.getElementById(`${idvid}`), { zIndex: 0, opacity: 0});
    }

  return (
    <>
        <div className='services-section'>
            <div className='title'>
                <h2>Our Services</h2>
            </div>
            <div className='detail' id='view-services'>
                <div className='store-vid'>
                  <div id='sampledevelop'>
                    <video controls preload="auto" autoPlay muted loop>
                        <source src={vid1} type="video/mp4" />
                    </video>
                  </div>
                  <div id='commingsoon'>
                    <video controls preload="auto" autoPlay muted loop>
                        <source src={vid2} type="video/mp4" />
                    </video>
                  </div>
                  <div id='draping'>
                    <video controls preload="auto" autoPlay muted loop>
                        <source src={vid3} type="video/mp4" />
                    </video>
                  </div>
                  <div id='production'>
                    <video controls preload="auto" autoPlay muted loop>
                        <source src={vid1} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className='item-services-active' data-video-src="sampledevelop">
                    <span></span>
                    <a>Sample Develop</a>
                   {/*  <div className='view'>
                      <video controls preload="auto" autoPlay muted loop>
                          <source src={vid1} type="video/mp4" />
                      </video>
                    </div> */}
                </div>
                <div className="item-services-active" data-video-src="commingsoon">
                  <span></span>
                  <a >Comming Soon</a>
                 {/*  <div className='view'>
                    <video controls preload="auto" autoPlay muted loop>
                        <source src={vid2} type="video/mp4" />
                    </video>
                  </div> */}
                </div>
                <div className='item-services-active' data-video-src="draping">
                  <span></span>
                  <a>Draping</a>
                 {/*  <div className='view'>
                    <video controls preload="auto" autoPlay muted loop>
                        <source src={vid3} type="video/mp4" />
                    </video>
                  </div> */}
                </div>
                <div className='item-services-active' data-video-src="production">
                  <span></span>
                  <a>Production</a>
                  {/* <div className='view'>
                    <video controls preload="auto" autoPlay muted loop>
                        <source src={vid1} type="video/mp4" />
                    </video>
                  </div> */}
                </div>
               {/*  <div className='item-services-active' data-video-src="apps">
                  <span></span>
                  <a>Tư Vấn</a>
                  <div className='view'>
                    <video controls preload="auto" autoPlay muted loop>
                        <source src={vid3} type="video/mp4" />
                    </video>
                  </div>
                </div> */}
            </div>
       
        </div>  


       

      
    </>
  )
}
