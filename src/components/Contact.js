import React from 'react'

export default function Contact() {
  return (
    <>
        <div className='contact-section' data-scroll-container>
                <div className='title'>
                <h2>LET’S TALK</h2>
                </div>
                <div className='detail'>
                    <div className='info'>
                        <div className='gr-info'>
                        <span>20studio@contact.com</span>
                        <span>+84 354 202 200</span>
                        <span>62/193 Ly Chinh Thang, P.8, Q.3, HCMC.</span>
                        </div>
                    </div>
                    <form>
                        <div className='nor'>
                            <input type="text" name="name" defaultValue="" placeholder='Contact name' />
                        </div>
                        <div className='spec'>
                            <input type="text" name="email" defaultValue="" placeholder='Email' />
                            <input type="text" name="phone" defaultValue="" placeholder='Phone Number' />
                        </div>
                        <div  className='nor'>
                            <select defaultValue="" placeholder='Chọn dịch vụ' >
                                <option value="" disabled>Select services</option>
                                <option value="1">May</option>
                                <option value="2">Vá</option>
                                <option value="3">Rập</option>
                            </select>
                        </div>
                        <div className='nor'>
                            <textarea  defaultValue="Notes"></textarea>
                        </div>
                        <div  className='nor button-send'>
                            <a className="loop-holder">
                            <div className="loop-holder__text">Send - Send - Send - Send - </div>
                            <div className="loop-holder__text">Send - Send - Send - Send - </div>
                               
                            </a>

                        </div>
                     
                    </form>
                </div>
        </div>
    </>
  )
}
