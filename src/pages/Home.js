import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import usePageTransition from '.././hooks/usePageTransition';
import '.././styles/Home.css'
import {images} from '../utils/load-images.js'
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

    const array = [2,5,9,8,0,1,3]
    array.sort((a, b) => a - b);

    console.log(array);
    if (sectionGalleryRef.current && 1 == 0) {
      const brand1 = document.getElementById("brand1")
      const brand2 = document.getElementById("brand2")
      let ctx = gsap.context(() => {
        const timeline = gsap.timeline();
        // Animation for #brand1
        timeline.to("#brand1", {
          y: - brand1.getBoundingClientRect().height,
        });

        const scrollTrigger = ScrollTrigger.create({
          trigger: sectionGalleryRef.current,
          scroller: '.container',
          scrub: 2,
          pin: true,
          //pinSpacing: false,
          markers: true,
     
          onUpdate: (self) => {
          },
          animation: timeline
        });

        gsap.to("#brand2", {
          y: -200,
          scrollTrigger : {
            trigger: '#brand1',
            scroller : '.container',
            start: 'top top',
            end: 'bottom bottom',
           // markers: true,
            onUpdate: () => {
            }
          }
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
              <div className='logo-img'>
                <img src={images.logowhite} alt='' />
              </div>
           
            </div>
          </div>
        </div>
        <SliderPartners />
        <div className='section-services'>
          <div className=' wrapper-grid10hook'>
              <div className='tit'>
                <h2>Dịch vụ</h2>
              </div>
              <div className='des'>
                <p>Chúng tôi tin một sản phẩm tuyệt vời cần được tạo ra với kỹ năng, tâm huyết và sự chu đáo - những thứ bạn sẽ thấy được tại 20Studio.</p>
              </div>
         
                <div className='services-part1 kip'>
                  <h2>Phát triển mẫu</h2>
                  <p>Bắt đầu từ ý tưởng khách hàng, bằng kỹ năng và kinh nghiệm, chúng tôi giúp khách hàng đưa ý tưởng sản phẩm của họ đến với hiện thực</p>
                  <ul>
                    <li>THIẾT KẾ THỜI TRANG</li>
                    <li>DỰNG RẬP</li>
                    <li>XÂY DỰNG NGUYÊN MẪU (MAY MẪU)</li>
                  </ul>
                </div>
                <div className='services-part2 kip'>
                  <h2>Sản xuất</h2>
                  <p>Việc sản xuất luôn tồn tại nhiều rủi ro. Chúng tôi xây dựng quy trình sản xuất nhằm đảm bảo mọi sản phẩm đều đạt tiêu chuẩn chất lượng, đồng thời tối thiểu rủi ro và tối ưu chi phí cho khách hàng.</p>
                  <ul>
                    <li>May mẫu và tinh chỉnh</li>
                    <li>Sourcing nguyên phụ liệu</li>
                    <li>Lập và thực thi kế hoạch sản xuất</li>
                  </ul>
                </div>
                <div className='services-part3 kip'>
                  <h2>Branding</h2>
                  <p>Để một sản phẩm tốt đến được với người tiêu dùng chưa bao giờ là một chuyện dễ dàng. Chúng tôi cam kết đồng hành và hỗ trợ khách hàng trong hành trình đưa sản phẩm của họ đến với người dùng, cùng khách hàng phát triển thương hiệu của họ.</p>
                  <ul>
                    <li>Thiết kế nhận diện thương hiệu</li>
                    <li>Sáng tạo nội dung</li>
                    <li>Quản lí và Quảng cáo đa nền tảng</li>
                  </ul>
                </div>
         
          </div>
        </div>
        <div className='section-gallery'  ref={sectionGalleryRef}>
            <div className='name-section wrapper-grid10hook'>
              <div className='tit'><h2>Gallery</h2></div>
              <div className='des'>
                <p>20Studio vinh dự được góp sức trong hành trình cùng khách hàng tạo ra các sản phẩm của họ</p>
              </div>
            </div>
        {/*     <div className='wrapper-grid10hook pul'>
         
              <div className='box-img brand1' >
                <div className='img'><img src={images.homegalerry1} alt='' /></div>
                <h3>lungtung</h3>
                <span>Fall-Winter 2022</span>
                <p>Sample Develop</p>
              </div>
              <div className='box-img brand2' >
                <div  className='img'><img src={images.homegalerry2} alt='' /></div>
                <h3>lungtung</h3>
                <span>Fall-Winter 2022</span>
                <p>Sample Develop</p>
              </div>
              <div className='box-img brand3'>
                <div  className='img'><img src={images.homegalerry3} alt='' /></div>
                <h3>lungtung</h3>
                <span>Fall-Winter 2022</span>
                <p>Sample Develop</p>
              </div>
              <div className='box-img brand4'>
                <div  className='img'><img src={images.homegalerry4} alt='' /></div>
                <h3>lungtung</h3>
                <span>Fall-Winter 2022</span>
                <p>Sample Develop</p>
              </div>
            </div> */}
        </div>
 
   
        <Contact />
      </section>
    </>
  )
}


export default  Home