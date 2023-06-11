import {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar,Mousewheel} from "swiper";
import 'swiper/css';
import '.././styles/compo-slider-partners.css';
SwiperCore.use([Scrollbar,Mousewheel]);
const images = {
  image1: require('.././asset/gallery/3.png'),
  image2: require('.././asset/gallery/5.png'),
  image3: require('.././asset/gallery/8.png'),
  image4: require('.././asset/gallery/b.png'),
  image5: require('.././asset/gallery/7.jpg')
};

export default function SliderPartners() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper) => {
      setActiveIndex(swiper.activeIndex);
      console.log(swiper.activeIndex)
    };
    
    

   
  return (
    <section className='wrapper-slider-partners wrapper-grid10hook'>

        <div className='heading'>
        Khách hàng
        </div>
        <div className='wrapper-swiper'>
        <Swiper
        slidesPerView={3}
      
        dir="rtl"
        //mousewheel = {{enabled: true,sensitivity: 5.5}}
        //scrollbar={{ draggable: true, dragSize: 24 }}
        onSlideChange={handleSlideChange}

      >
         {Object.keys(images).map((key, index) => (
          <SwiperSlide
            key={key}
            
          >
            <div className={`item`}>
              <img src={images[key]} alt='' />
              <div className='text'>{key}</div>
            </div>
          </SwiperSlide>
        ))}
    
        <SwiperSlide>
          <div className='item sd'>

          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item sd'>
              
          </div>
        </SwiperSlide>

      </Swiper>
        </div>
     
    </section>
  );
}
