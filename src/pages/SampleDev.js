import React from 'react'

import '.././styles/page-sampledev.css'
import Contact from '../components/Contact'
import usePageTransition from '../hooks/usePageTransition.js'
import GalleryInside from '../components/GalleryInside';
import useLocoScrollTrigger from '.././hooks/useLocoScrollTrigger'
import { images } from '.././utils/load-images.js';

export default function SampleDev() {
    
    console.log('P:: SampleDev render')
    const { redirectPage } = usePageTransition();
    const initScroll = useLocoScrollTrigger(true)

    return (
        <>

<section  data-scroll-container className='container'>
                <div className='sample-dev--banner' >
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
                    <div className='sample-dev--bannersub' >
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
                    <div className='step-config step1-sample_dev wrapper-grid10hook steps-sample_dev' >
                        <div className='img' >
                            <img src={images.sample1} alt="" />
                        </div>
                        <div className='text' >
                            <div className="title" >
                                Nghiên&nbsp;cứu và phát&nbsp;triển
                            </div>
                            <div className="des">
                                Đội ngũ của 20Studio nghiên cứu về vải và phụ kiện, phát triển các quy trình, thêu, in ấn, hoàn thiện và phương pháp giặt độc đáo bằng cả tay nghề và máy móc hiện đại, để tạo ra sản phẩm độc đáo và chất lượng.
                            </div>
                        </div>
                        <div className='img-behind'  >
                            <img src={images.sample1behind1} alt='' />
                        </div>
                    </div>

                    <div className='step-config step2-sample_dev wrapper-grid10hook ' >
                        <div className='img'>
                            <img src={images.sample2} alt="" />
                        </div>
                        <div className='text' >
                            <div className="title"  >
                                Kỹ&nbsp;thuật tinh&nbsp;xảo 
                            </div>
                            <div className="des"  >
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
                        <div className='img-behind s2-img1' >
                            <img src={images.sample2behind1} alt='' />
                        </div>
                        <div className='img-behind s2-img2' >
                            <img src={images.sample2behind2} alt='' />
                        </div>
                    </div>

                    <div className='step-config step3-sample_dev wrapper-grid10hook' >
                        <div className='img'>
                            <img src={images.sample3} alt="" />
                        </div>
                        <div className='text'>
                            <div className="title">
                               Dựng rập
                            </div>
                            <div className="des">
                                Chuyên viên thiết kế mẫu của chúng tôi sẽ tạo ra các mẫu đẹp cho các loại sản phẩm chính như: áo khoác, váy, áo sơ mi, váy chân váy, quần.
                            </div>
                        </div>
                        <div className='img-behind' >
                            <img src={images.sample3behind1} alt='' />
                        </div>
                    </div>

                    <div className=' step-config step4-sample_dev wrapper-grid10hook' >
                        <div className='img'>
                            <img src={images.sample2} alt="" />
                        </div>
                        <div className='text'>
                            <div className="title">
                            May đo chi tiết
                            </div>
                            <div className="des">
                            Sau giai đoạn mô hình và cắt, các thợ may của chúng tôi sẽ tạo ra mẫu nguyên mẫu đầu tiên, được điều chỉnh và hoàn thiện trước khi được khách hàng chấp nhận.
                            </div>
                        </div>
                        <div className='img-behind'>
                            <img src={images.sample2} alt="" />
                        </div>
                    </div>
                </div>
                <GalleryInside/>
                <Contact/>

            </section>

        </>

    )
}

