import React, { useEffect, useState, useRef, useCallback } from 'react'

import '.././styles/page-sampledev.css'
import gsap, { Power2 } from 'gsap';
import Contact from '../components/Contact'
import usePageTransition from '../hooks/usePageTransition.js'
import GalleryInside from '../components/GalleryInside';

const images = {
    image1: require('.././asset/sampledev/1.png'),
    image3: require('.././asset/sampledev/2.png'),
    image2: require('.././asset/sampledev/3.png'),
    image4: require('.././asset/sampledev/4.png'),
    image5: require('.././asset/sampledev/5.png'),
    image6: require('.././asset/sampledev/6.png'),
    image7: require('.././asset/sampledev/7.png'),
    image11: require('.././asset/sampledev/11.png'),
    image12: require('.././asset/sampledev/12.png'),
    image21: require('.././asset/sampledev/21.png'),
    image22: require('.././asset/sampledev/22.png'),
    image23: require('.././asset/sampledev/23.png'),
    image24: require('.././asset/sampledev/24.png'),
    image25: require('.././asset/sampledev/25.png'),
    image26: require('.././asset/sampledev/26.png'),
};

export default function SampleDev() {
    console.log('==============Sample Dev render================')

    const { redirectPage } = usePageTransition();
    const [offTask, setOffTask] = useState(false);

    return (
        <>

            <section data-scroll-section className='containerScroll' >
                <div className='dev_product--banner' >
                    <div className='pin-menu'>
                        <a value='/' onClick={redirectPage}>Home</a>
                        <a value='/sampledev' onClick={redirectPage}>Sample Dev</a>
                        <a value='/products' onClick={redirectPage}>Products</a>
                        <a value='/contact' onClick={redirectPage}>Contact</a>
                    </div>


                    <div className='text hero-text'>
                        <span>Xây dựng</span>
                        <span>Thiết kế</span>
                    </div>
                    <div className='dev_product--bannersub' >
                        <a className='sub'>Chúng tôi giúp khách hàng biến ý tưởng của họ thành sản phẩm hoàn thiện.</a>
                        <a className='sub-next'>
                            <a>Cách chúng tôi thực hiện</a>
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
                </div>

                <div className="wapper-step-dev_product" >
                    <section className='step1-dev_products consuctor--gridsys steps-dev_products' >
                        <div className='img' >
                            <img data-scroll data-scroll-speed="-1" src={images.image1} alt="" />
                        </div>
                        <div className='text' >
                            <div className="title--sampledev" >
                                Nghiên&nbsp;cứu và phát&nbsp;triển
                            </div>
                            <div className="des--sampledev">
                                Đội ngũ của 20Studio nghiên cứu về vải và phụ kiện, phát triển các quy trình, thêu, in ấn, hoàn thiện và phương pháp giặt độc đáo bằng cả tay nghề và máy móc hiện đại, để tạo ra sản phẩm độc đáo và chất lượng.
                            </div>
                        </div>
                        <div className='img-behind'  >
                            <img src={images.image3} alt='' />
                        </div>
                    </section>

                    <div className='step2-dev_products consuctor--gridsys steps-dev_products--fit' >
                        <div className='img'>
                            <img src={images.image4} alt="" />
                        </div>
                        <div className='text' >
                            <div className="title--sampledev"  >
                                Kỹ&nbsp;thuật tinh&nbsp;xảo 
                            </div>
                            <div className="des--sampledev"  >
                                Chúng tôi tại 20studio sẵn sàng tạo ra các quy trình độc đáo giúp khách hàng thúc đẩy sự sáng tạo và khám phá những điều mới lạ.
                            </div>
                            <div className='detail' >
                                <ul>
                                    <li><a>Double-face</a></li>
                                    <li><a>Digital print</a></li>
                                    <li><a>Washing and dyeing</a></li>
                                    <li><a>Transfer print</a></li>
                                    <li><a>Laser cuts</a></li>
                                    <li><a>Machine embroidery</a></li>
                                    <li><a>Thermo-adhesive applications</a></li>
                                    <li><a>Embossing / Debossing</a></li>
                                    <li><a>Heat sealing</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='img-behind s2-img1' data-scroll data-scroll-speed="-.2">
                            <img src={images.image11} alt='' />
                        </div>
                        <div className='img-behind s2-img2' data-scroll data-scroll-speed="1">
                            <img src={images.image12} alt='' />
                        </div>
                    </div>

                    <div className='step3-dev_products consuctor--gridsys steps-dev_products' >
                        <div className='img'>
                            <img src={images.image5} alt="" />
                        </div>
                        <div className='text'>
                            <div className="title--sampledev">
                               Dựng rập
                            </div>
                            <div className="des--sampledev">
                                Chuyên viên thiết kế mẫu của chúng tôi sẽ tạo ra các mẫu đẹp cho các loại sản phẩm chính như: áo khoác, váy, áo sơ mi, váy chân váy, quần.
                            </div>
                        </div>
                        <div className='img-behind' data-scroll data-scroll-speed="3">
                            <img src={images.image6} alt='' />
                        </div>
                    </div>

                    <div className='step4-dev_products consuctor--gridsys steps-dev_products' >
                        <div className='img'>
                            <img src={images.image3} alt="" />
                        </div>
                        <div className='text'>
                            <div className="title--sampledev">
                            May đo chi tiết
                            </div>
                            <div className="des--sampledev">
                            Sau giai đoạn mô hình và cắt, các thợ may của chúng tôi sẽ tạo ra mẫu nguyên mẫu đầu tiên, được điều chỉnh và hoàn thiện trước khi được khách hàng chấp nhận.
                            </div>
                        </div>
                        <div className='img-behind'>
                            <img src={images.image3} alt="" />
                        </div>
                    </div>
                </div>
                <GalleryInside/>
                <Contact/>

            </section>

        </>

    )
}

