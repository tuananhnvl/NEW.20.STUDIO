import React from 'react'
import '../styles/page-contacts.css'

export default function Contact() {

  return (

        <section data-scroll-section  style={{display:'flex',width:'100%',height:'100vh'}}>
          <div className='content-contacts-page'>
            <div className="loop-holderrr">
               <div className="loop-holder__text">Liên lạc&nbsp;-&nbsp;Contact&nbsp;-&nbsp;Bộnjour&nbsp;-&nbsp;Contacno&nbsp;-&nbsp;Get in touch&nbsp;-&nbsp;Ni Hao</div>
               <div className="loop-holder__text">Liên lạc&nbsp;-&nbsp;Contact&nbsp;-&nbsp;Bộnjour&nbsp;-&nbsp;Contacno&nbsp;-&nbsp;Get in touch&nbsp;-&nbsp;Ni Hao</div>
            </div>
            
            <div className='info'> 
              <div className='detail'>
                <p className='tit'>Sẵn sàng làm việc cùng 20Studio? Hãy để lại lời nhắn cho chúng tôi nhé.</p>
              </div>
             <div className='sendInfo'>
                <input placeholder='Lời nhắn'></input>
                <button type='submit'>Gửi</button>
              </div>
             <div className='detail-info'>
             <div className='location'>
                <div className='map'>

                </div>
                <ul className='info'>
                  <li>20studio.contact@gmail.com</li>
                  <li>0354 2022 00</li>
                  <li>62/193 Lý Chính Thắng, phường Võ Thị Sáu, quận 3, TP.HCM</li>
                  <li className='btn'><span>xem trên google map</span></li>
                </ul>
              </div>
             
              
                <div className='social'>
                  <span>FACEBOOK</span>
                  <span>INSTAGRAM</span>
                  <span>TIKTOK</span>
                  <span>LINKEDIN</span>
                </div>
             </div>

                <span className='banquyen'>
                  All rights reserved 20studio@
                </span>

            </div>
            <div className='fake-div'>
        
            </div>
          </div>
        </section>

 
  )
}
