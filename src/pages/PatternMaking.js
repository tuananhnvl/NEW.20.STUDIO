import React, { useEffect, useRef } from 'react'
import Contact from '../components/Contact';
import useLocoScroll from '.././hooks/useLocoScroll';
import '.././styles/pattern-services-item.css'
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import usePageTransition from '../hooks/usePageTransition.js'
import ScrollToPlugin from "gsap/ScrollToPlugin";
const images = {
    image1: require('.././asset/patternmaking/1.png'),
    image2: require('.././asset/patternmaking/2.png'),
    image3: require('.././asset/patternmaking/3.png'),
    image4: require('.././asset/patternmaking/4.png'),
    image5: require('.././asset/patternmaking/5.png'),
    image6: require('.././asset/patternmaking/bg-trans-3d.png')
};
gsap.registerPlugin(ScrollToPlugin);
export default function PatternMaking() {
    //useLocoScroll(true)
    const navigate = useNavigate();
    const seeourworkRef = useRef()
    const { redirectPage } = usePageTransition();
    useEffect(() => {
        function handleScroll() {
            // console.log(window.scrollY);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    function handleClick() {
        const seeourworkDom = seeourworkRef.current;
        let posDom = seeourworkDom.getBoundingClientRect();

        let ctx = gsap.context(() => {
            let tl = gsap.timeline({ onComplete: redirectto3d });

            tl.to(window, {
                duration: .5,
                scrollTo: { y: (window.scrollY + posDom.y) - window.innerHeight / 2 + posDom.height / 2 }
            })
            .add("runAnime")
            .to(".section-trans-gallery .screen-trans", {
                duration: 1,
                "--posXTrans3d": "0",
                "--posYTrans3d": "0",
            }, "runAnime")
            .to(".section-trans-gallery .screen-trans img", {
                scale: 9,
                duration: 2,
                delay: .5
            }, "<")

            function redirectto3d() {
                navigate('/gallery')
            }
        });
        return () => ctx.revert(); // <-- CLEANUP!
    }



    return (

        <section data-scroll-section>
            <div className='paranoid-section'>

                <div className='hero-pm'>
                    <div className='content'>
                        <a value='/' onClick={redirectPage} >GO TO HOME PAGE</a>
                        <a value='/sampledev' onClick={redirectPage} >SAMPLE DEV</a>
                        <h2>FROM SKETCH TO PATTERN</h2>
                        <p>One of the most important part that create an outstanding garment</p>
                    </div>
                    <div className='img'><img src={images.image1} alt="" /></div>
                </div>


                <div className='item-services key-pm-move01'>
                    <div className='content'>
                        <h2>Brainstorm</h2>
                        <p>All begins with the idea. Break down the design, find out possible ways to craft it with wanted fabrics</p>
                    </div>
                    <div className='img'><img src={images.image4} alt="" /></div>
                </div>


                <div className='item-services key-pm-move02'>
                    <div className='content'>
                        <h2>Transfer design into fabric patterns</h2>
                        <p>All begins with the idea. Break down the design, find out possible ways to craft it with wanted fabrics</p>
                    </div>
                    <div className='img'><img src={images.image5} alt="" /></div>
                </div>


                <div className='item-services key-pm-move03'>
                    <div className='content'>
                        <h2>Build It, Fix it, Make it Perfect</h2>
                        <p>Like any other great product, it take efforts to create the best version that ready to ship. At 20Studio, we do our best to ensure the highest quality</p>
                    </div>
                    <div className='img'><img src={images.image2} alt="" /></div>
                </div>


                <div className='section-trans-gallery' id="see-our-work" ref={seeourworkRef} onClick={handleClick}>
                    <div className='content'><h2>SEE OUR WORK</h2></div>
                    {/*     <div className='img' >
            </div> */}
                    <div className='screen-trans'>
                        <img src={images.image6} alt='' />
                    </div>
                </div>
            </div>


            <Contact />


        </section>

    )
}
