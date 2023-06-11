import React, { useEffect, useState,useLayoutEffect, useRef } from 'react'
import '.././styles/page-products.css'
import Contact from '../components/Contact'
import usePageTransition from '.././hooks/usePageTransition';
import GalleryInside from '.././components/GalleryInside';
import gsap, { Power2 } from 'gsap'
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import useLocoScrollTrigger from '.././hooks/useLocoScrollTrigger'
import SplitType from 'split-type'
import '.././styles/svg-style.css'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { images } from '.././utils/load-images.js';

gsap.registerPlugin(ScrollTrigger);
export default function Products() {
    console.log('==============Products render================')
    const initScroll = useLocoScrollTrigger(true)
    const { redirectPage } = usePageTransition();
    const [offTask,setOffTask] = useState(false)
    const containerRef = useRef(null)
    useEffect(() => {
        if(!offTask) {return}
        let targets = gsap.utils.toArray('.box-trans');
        //  let y = document.querySelector('#line')
        let u = document.querySelector('#path')
        console.log(targets)
        // console.log(y.getTotalLength())
        let l = targets[3].getTotalLength()

        let localPos = { x: 0, y: 0 }
        let po = MotionPathPlugin.convertCoordinates(u, targets[3], localPos)
        let rawPath = MotionPathPlugin.getRawPath("#path");
        console.log(rawPath)
        gsap.timeline({})
            .set('#hippo', {
                scale: .5,
                strokeDasharray: 400,
                duration: 0
            })
            .set('.cls-3', {
                //  scale: .25,
                strokeDasharray: [1, 1000],
                duration: 0
            })
            .set('.cls-2', {
                //  scale: .25,
                strokeDasharray: [1, 1000],
                duration: 0
            })
            .to('.cls-3', {
                //  scale: .25,

                strokeDasharray: [1000, 1],
                stagger: 0.05,
                ease: Power2.easeIn,
                duration: 1
            })
            .to('.cls-22', {
                strokeDasharray: [1000, 1],
                stagger: 0.05,
                ease: Power2.easeIn,
                duration: 1
            })
            //  .fromTo('.cls-3', {strokeDashoffset:400}, {strokeDashoffset:0,strokeDasharray:5000,duration:7},"<")
            /*    .to('#path',{
                   scale: .5,
                   x: 200,
                   y: 50,
                  
                   duration:1
               }) */

            .set(targets, { strokeDasharray: [40, 20, 4], duration: 2 })


            .to(targets, {
                attr: { rx: "40" },
                transformOrigin: "50% 50%",
                scale: .1,
                stagger: 0.15,
                delay: .5,
                duration: 2,
                ease: Power2.easeIn
            })
            .fromTo(targets, { strokeDashoffset: 400 }, { strokeDashoffset: 0, strokeDasharray: [400], duration: 3 }, "<")

            //path d="m100,100c56 => x=100,y=100 , targets item now is rect , go get pos XY of rect
            // => arr [ ]

            .to(targets, {
                motionPath: {
                    path: "#hippo",
                    align: "#hippo",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true
                },
                fill: 'rbg(225,225,225,0)',
                transformOrigin: "50% 50%",
                duration: 2,
                stagger: 0.35,
                repeat: -1,
                ease: "power1.inOut"
            })
            .to(targets, {

                attr: { rx: Math.random() * 40 + 20 },
                duration: 4
            }, "<")


    }, [offTask])
    const animData = {
        "longTextSplit": {
            typeSplit : 'words',
            propsFire : {opacity: 1,y:0, duration: 0.5, stagger:0.1},
            propsPrev : {opacity: 0,y:-100}
        },
        "headingSplit": {
            typeSplit : 'chars',
            propsFire : {opacity: 1,y:0, duration: 0.5, stagger:0.1},
            propsPrev : {opacity: 0,y:-100}
        }
    };
    useEffect(() => {
      
        let ctx = gsap.context(() => {
            for (let target in animData) {
              let { typeSplit, propsPrev ,propsFire } = animData[target];
              let arrobj = new SplitType(`#${target}`, { types: typeSplit });
          
              gsap.fromTo(arrobj[typeSplit],{
                ...propsPrev,
              }, {
                scrollTrigger: {
                  trigger: `#${target}`,
                  scroller: containerRef.current,
                  //markers: true,
                  start: 'top 69%',
                  end: 'bottom bottom',
                  toggleActions: 'play none none none',
                },
                ...propsFire,
              });
            }
          });
          //return () => ctx.revert();
      }, [containerRef]);
    return (
     
             
        <section  data-scroll-container className='container' ref={containerRef}>
             {/*   <div className='pin-menu'>
                    <button value='/' onClick={redirectPage}>Home</button>
                        <button value='/sampledev' onClick={redirectPage}>Sample Dev</button>
                        <button value='/products' onClick={redirectPage}>Products</button>
                        <button value='/contact' onClick={redirectPage}>Contact</button>
                    </div> */}
                 
                <div className='products_banner' >
                    <div className='img'><img src={images.bannerproduct} alt='' /></div>
                    <span>
                        <h2 id='headingSplit'>SẢN XUẤT</h2>
                    </span>
                  
                   
                </div>
          
                <div className='products_banner-sub' >
                    <div className='sub' ><p id='longTextSplit'>Từ nguyên liệu đến thành phẩm. Chúng tôi có thể cung cấp dịch vụ sản xuất thời trang.</p></div>
                    <div className='sub-next'>
                        <h3>Quy trình làm việc</h3>
                        <svg data-name="arrow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 143.25 244.55">

                            <g id="arrow-svg" data-name="Layer-Main">
                                <ellipse className="cls-2" cx="71.62" cy="67.12" rx="71.5" ry="67" />
                                <rect className="cls-1" x="70.28" y="94.21" width=".5" height="150" />
                                <rect className="cls-1" x="59.75" y="218.43" width=".5" height="30" transform="translate(-147.49 110.79) rotate(-45)" />
                                <rect className="cls-1" x="80.81" y="218.76" width=".5" height="30" transform="translate(189.04 11.15) rotate(45)" />
                            </g>
                        </svg>
                    </div>
                </div>
                {/* list step ( 5 step ) */}
                <div className='wrapper-step-product'>
                    <div className='step-config step1-products wrapper-grid10hook'>
                        <div className='img'>
                            <img src={images.product1} alt="" />
                        </div>
                        <div className='text'>
                            <div className="title">
                                Phát triên nguyên mẫu 
                            </div>
                            <div className="des">
                            Với nhiều năm kinh nghiệm làm việc trong ngành, 20Studio có thể biến những ý tưởng và tầm nhìn của khách hàng thành hiện thực.
                            </div>
                        </div>
                    </div>

                    <div className=' step-config step2-products wrapper-grid10hook'>
                        <div className='img'>
                            <img src={images.product2} alt="" />
                        </div>
                        <div className='text'>
                            <div className="title">
                                Điều&nbsp;Chỉnh và nhảy&nbsp;Rập
                            </div>
                            <div className="des">
                                Đảm bảo trang phục hoàn toàn vừa vặn với cơ thể và có thể mặc được đối với những đối tượng mục tiêu. Thiết kế sẽ được định cỡ với sự trợ giúp của nhân viên xếp nếp có kinh nghiệm và phần mềm thời trang tiên tiến
                            </div>
                        </div>
                        <div className='img-behind'>
                                <img src={images.product3} alt="" />
                        </div>
                    </div>

                    <div className='step-config step3-products wrapper-grid10hook'>
                        <div className='img'>
                            <img src={images.product3} alt="" />
                        </div>
                        <div className='text'>
                            <div className="title">
                                Lập Kế&nbsp;Hoạch Sản&nbsp;Xuất
                            </div>
                            <div className="des">
                                Lên lịch trước và cập nhật kế hoạch sản xuất theo thời gian thực. Khách hàng của chúng tôi luôn được chúng tôi thông báo
                            </div>
                        </div>
                    </div>
       
                    <div className='step-config step4-products wrapper-grid10hook'>
                        <div className='img'>
                            <img src={images.product4} alt="" />
                        </div>
                        <div className='text'>
                            <div className="title">
                                Kiểm Soát Chất Lượng

                            </div>
                            <div className="des">
                            Sản phẩm đạt chất lượng tốt nhất khi nó được làm từ vật liệu tốt nhất với tâm huyết cao nhất. Chúng tôi luôn đảm bảo mọi nguyên liệu và chất lượng thi công đạt tiêu chuẩn tốt nhất đề ra.
                            </div>
                        </div>
                       
                    </div>


                </div>

                <GalleryInside/>
                <Contact />
            </section>
   

    )
}


