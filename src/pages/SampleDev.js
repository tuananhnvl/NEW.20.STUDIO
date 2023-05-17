import React from 'react'

import '.././styles/page-sampledev.css'
import Contact from '../components/Contact'
import usePageTransition from '../hooks/usePageTransition.js'
import GalleryInside from '../components/GalleryInside';
import useLocoScrollTrigger from '.././hooks/useLocoScrollTrigger'
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
    
    console.log('P:: SampleDev render')
    const { redirectPage } = usePageTransition();
    const initScroll = useLocoScrollTrigger(true)

    return (
        <>

<section  data-scroll-container className='contcainer'>
                <div className='dev_product--banner' >
                    <div className='pin-menu'>
                        <button value='/' onClick={redirectPage}>Home</button>
                        <button value='/sampledev' onClick={redirectPage}>Sample Dev</button>
                        <button value='/products' onClick={redirectPage}>Products</button>
                        <button value='/contact' onClick={redirectPage}>Contact</button>
                    </div>


                    <div className='text hero-text'>
                        <span>Xây dựng</span>
                        <span>Thiết kế</span>
                    </div>
                    <div className='dev_product--bannersub' >
                        <span className='sub'>Chúng tôi giúp khách hàng biến ý tưởng của họ thành sản phẩm hoàn thiện.</span>
                        <div className='sub-next'>
                            <h3>Cách chúng tôi thực hiện</h3>
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
                                    <li><span>Double-face</span></li>
                                    <li><span>Digital print</span></li>
                                    <li><span>Washing and dyeing</span></li>
                                    <li><span>Transfer print</span></li>
                                    <li><span>Laser cuts</span></li>
                                    <li><span>Machine embroidery</span></li>
                                    <li><span>Thermo-adhesive applications</span></li>
                                    <li><span>Embossing / Debossing</span></li>
                                    <li><span>Heat sealing</span></li>
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

