import React, { useEffect, useState } from 'react'
import '.././styles/page-products.css'
import Contact from '../components/Contact'
import usePageTransition from '.././hooks/usePageTransition';
import GalleryInside from '.././components/GalleryInside';
import gsap, { Power2 } from 'gsap'
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";


import '.././styles/svg-style.css'
const images = {
    image1: require('.././asset/products/1.png'),
    image3: require('.././asset/products/2.png'),
    image2: require('.././asset/products/3.png'),
    image4: require('.././asset/products/4.png'),
    image5: require('.././asset/products/5.png'),
    image6: require('.././asset/products/6.png'),
    image31: require('.././asset/products/31.png'),
    image32: require('.././asset/products/32.jpg'),

};

gsap.registerPlugin(CSSRulePlugin, MotionPathPlugin);
export default function Products() {
    console.log('==============Products render================')

    const { redirectPage } = usePageTransition();
    const [offTask,setOffTask] = useState(false)
    
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


    return (
     
             
            <section >
               <div className='pin-menu'>
                    <a value='/' onClick={redirectPage}>Home</a>
                        <a value='/sampledev' onClick={redirectPage}>Sample Dev</a>
                        <a value='/products' onClick={redirectPage}>Products</a>
                        <a value='/contact' onClick={redirectPage}>Contact</a>
                    </div>
                <div className='products_banner' >
                    <a><img src={images.image1} alt='' /></a>
                    <h2>SẢN XUẤT</h2>
                </div>

                <div className='products_banner-sub' >
                    <a className='sub'>Từ nguyên liệu đến thành phẩm. Chúng tôi có thể cung cấp dịch vụ sản xuất thời trang.</a>
                    <a className='sub-next'>
                        <a>Quy trình làm việc</a>
                        <svg data-name="arrow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 143.25 244.55">

                            <g id="arrow-svg" data-name="Layer-Main">
                                <ellipse className="cls-2" cx="71.62" cy="67.12" rx="71.5" ry="67" />
                                <rect className="cls-1" x="70.28" y="94.21" width=".5" height="150" />
                                <rect className="cls-1" x="59.75" y="218.43" width=".5" height="30" transform="translate(-147.49 110.79) rotate(-45)" />
                                <rect className="cls-1" x="80.81" y="218.76" width=".5" height="30" transform="translate(189.04 11.15) rotate(45)" />
                            </g>
                        </svg>
                    </a>
                </div>
                {/* list step ( 5 step ) */}
                <div className='wrapper-step-product'>
                    <div className='step1-products consuctor--gridsys'>
                        <div className='img'>
                            <img src={images.image3} alt="" />
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

                    <div className='step2-products consuctor--gridsys'>
                        <div className='img'>
                            <img src={images.image2} alt="" />
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
                                <img src={images.image1} alt="" />
                        </div>
                    </div>

                    <div className='step3-products consuctor--gridsys'>
                        <div className='img'>
                            <img src={images.image4} alt="" />
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

                    <div className='step4-products consuctor--gridsys'>
                        <div className='img'>
                            <img src={images.image5} alt="" />
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


