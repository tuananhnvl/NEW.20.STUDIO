import React,{useRef,useEffect, useState} from 'react'
import gsap from 'gsap'
import logoSm from '../asset/20-studio-white-sm.png'
import { useLocation } from 'react-router-dom';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
export default function LoadingPage() {
  gsap.registerPlugin(CSSRulePlugin)
  const [loadingPageVisible,setLoadingPageVisible] = useState(false)
  const pseudoLoadingScreen = CSSRulePlugin.getRule(".loading-screen:before");

  const TIME_TOTAL_AVERAGEL = 4
  const TIME_ACTION = (TIME_TOTAL_AVERAGEL * 1000) + 6000
  const location = useLocation();

 


  const colorsLine = ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.36)", "rgba(255, 255, 255, 0.18)", "rgba(255, 255, 255, 0.12)"];
  useEffect(() => {
  
   
      console.log(loadingPageVisible)
      const listspan = document.querySelectorAll(".loading-screen .text-anime span")
      const listp = document.querySelectorAll(".loading-screen .text-anime span p")
      let ctx = gsap.context(() => {
          let tl = gsap.timeline({onComplete: closeLoadingPage})
  
          tl.to(listspan[0],{
            delay:1,
            y: -120,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[0]
          })
          .to(listspan[1],{
            y: -120,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[1]
          },"<")
          .to(listspan[2],{
            y: -120,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[2]
          },"<")
          .to(listspan[3],{
            y: -120,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[3]
          },"<")
          .add("newLine2")
          tl.to(listspan[0],{
            y: -240,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[1],
          },"newLine2")
          .to(listspan[1],{
            y: -240,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[0]
          },"<")
          .to(listspan[2],{
            y: -240,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[1]
          },"<")
          .to(listspan[3],{
            y: -240,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[2]
          },"<")
          .add("newLine3")
          tl.to(listspan[0],{
            y: -360,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[2],
          },"newLine3")
          .to(listspan[1],{
            y: -360,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[1]
          },"<")
          .to(listspan[2],{
            y: -360,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[0]
          },"<")
          .to(listspan[3],{
            y: -360,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[1]
          },"<")
          .add("newLine3")
          tl.to(listspan[0],{
            y: -480,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[3],
          },"newLine3")
          .to(listspan[1],{
            y: -480,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[2]
          },"<")
          .to(listspan[2],{
            y: -480,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[1]
          },"<")
          .to(listspan[3],{
            y: -480,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            color:colorsLine[0]
          },"<")
           .add("hiddentext")
       
          tl.to(listp,{
            delay:.5,
              ease: "power2.inOut",
            duration:(TIME_TOTAL_AVERAGEL/3),
            y:120
          },"hiddentext") 
          .add("closeScreen")
          .to(pseudoLoadingScreen, {
            duration: .5,
            clipPath: 'polygon(0 0, 100% 0, 0% 0%, 0% 100%)'
          },"closeScreen")
        });
      return () => ctx.revert(); // <-- CLEANUP!
  

  }, [])
  function closeLoadingPage() {
    setTimeout(() => {
    
        const loaddingPageMain = document.querySelector(".loading-screen")
      loaddingPageMain.remove()
     loaddingPageMain.classList.add('disable-loadding-screen');  
    }, TIME_ACTION); 
  }
  return (
    <div className='loading-screen'>
        <div className='content'>
            <img src={logoSm} alt=""/>
          <div></div>
            <div className='text-anime'>
                <span><p>We help brands</p></span>
                <span><p>build their products</p></span>
                <span><p>develop their brands</p></span>
                <span><p>and be successful</p></span>
            </div>
        </div>
      
    </div>
  )
}
