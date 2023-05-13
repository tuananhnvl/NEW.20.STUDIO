import React, { createContext, useState, useLayoutEffect, useEffect, useCallback, lazy, Suspense, useRef, useMemo } from 'react'
import './styles/App.css';
import './styles/lib-locomotive-scroll.css';
import './styles/reponsive-css.css'
import Navbar from './components/Navbar';
import Grid from './components/Grid'
import './fonts/Marcellus-Regular.ttf';
import { Link, Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import SampleDev from "./pages/SampleDev"
import HoverR3F1 from './components/3d/HoverR3F1.js'
import Products from './pages/Products';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import DemoTriggleEffect from './components/demolib/DemoTriggleEffect'
import PageNotFound from './pages/PageNotFound'
import DreiScroll from './pages/DreiScroll'
import useLocoScroll from './hooks/useLocoScroll';

import ScrollTrigger from 'gsap/ScrollTrigger';

//import Test from "./components/Test";
const Test = lazy(() => import("./components/Test"));


gsap.registerPlugin(ScrollTrigger);

function App() {
  console.log('App Render !')
  const location = useLocation();
  const containerRef = useRef(null)
  const configVal = useRef(0)
  const [statePosY,setStatePosY]= useState(0)
  const locationRef = useRef(null)

  useLayoutEffect(() => {

    if(location.pathname == '/demodrei'|| location.pathname == '/gallery') {return}
    
    console.log(`useLocoScroll start!`)

  
    let locoScroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 1.2,
    });

    console.log(`useLocoScroll complete!`)
    locoScroll.on('scroll',() => {
      localStorage.setItem('scrollPosCre', locoScroll.scroll.instance.scroll.y)
     // console.log(locoScroll.scroll.instance.scroll.y)
    //  onScrollPosChange(locoScroll.scroll.instance.scroll.y);
      })
    return () => {
      if (locoScroll) {
    
        locoScroll.destroy();
        locoScroll = null;
        console.log('locoScroll =>>>> null')
      }
    };
    
   
  }, [location]);

  return (
    <>
      <Navbar />
     {/*  <Grid /> */}
     {/*  <CanvasThree /> */}
      <main data-scroll-container className='containerScroll' ref={containerRef}>
        <div id='transition-section'><h2></h2></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sampledev" element={<SampleDev />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/gallery" element={<DreiScroll />} />
          <Route path="/demodrei" element={<DreiScroll />} />
          <Route path='/hoverr3f1' element={<HoverR3F1/>} />
          <Route path='/demotriggle' element={<DemoTriggleEffect/>} />
        </Routes>
      </main>
    </>
  );
}
export default App;
