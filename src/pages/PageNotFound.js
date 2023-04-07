import React,{useEffect} from 'react'
import Link from 'react-router-dom'
import usePageTransition from '../hooks/usePageTransition'
import useLocoScroll from '../hooks/useLocoScroll';
import gsap,{Power4}  from 'gsap';
export default function PageNotFound() {
 
   const { redirectPage } = usePageTransition();

   useEffect(() => {
     const listTxtError = document.querySelectorAll('.txt-error span')
     const listTxt404 = document.querySelectorAll('.txt-404 span')
     gsap.timeline()
     .to(listTxtError,{
      opacity: 1,
     x: 800,
     stagger: 0.07,
     ease:Power4.easeIn,
     duration:1
    })
    .to(listTxt404,{
      opacity: 1,
      x: -500,
      ease:Power4.easeIn,
      stagger: 0.07,
      duration:1
     },"<");
     console.log(listTxtError)
   }, [])
   
   return (

         <div className='page404'>
            <a className="loop-holder top-page">
               <div className="loop-holder__text">Comming Soon &nbsp; &nbsp; &nbsp;Comming Soon &nbsp; &nbsp; &nbsp;Comming Soon &nbsp; &nbsp; &nbsp;</div>
               <div className="loop-holder__text">Comming Soon &nbsp; &nbsp; &nbsp;Comming Soon &nbsp; &nbsp; &nbsp;Comming Soon &nbsp; &nbsp; &nbsp;</div>
            </a>
            <a className="loop-holder bottom-page">
               <div className="loop-holder__text">Comming Soon &nbsp; &nbsp; &nbsp;Comming Soon &nbsp; &nbsp; &nbsp;Comming Soon &nbsp; &nbsp; &nbsp;</div>
               <div className="loop-holder__text">Comming Soon &nbsp; &nbsp; &nbsp;Comming Soon &nbsp; &nbsp; &nbsp;Comming Soon &nbsp; &nbsp; &nbsp;</div>
            </a>
            <div className='title-large'>
               <a className='txt-error' style={{marginRight:'100px'}}>
                  <span>E</span>
                  <span>R</span>
                  <span>R</span>
                  <span>O</span>
                  <span>R</span>
               </a>
               <a className="txt-404">
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
               </a>
            </div>

            <a className='btn-home' value='/' onClick={redirectPage} >Back to Home</a>
         </div>

   )
}
