import React, { createContext, useState, useLayoutEffect, useEffect, useCallback, lazy, Suspense, useRef, useMemo } from 'react'
import './styles/App.css';
import './libs/locomotive-scroll.css';
import './styles/Responve-Pagews.css'
import Navbar from './components/Navbar';
import Grid from './components/Grid'
import './fonts/Marcellus-Regular.ttf';
import { Link, Route, Routes, useLocation } from "react-router-dom";
//import Test from "./components/Test";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import SampleDev from "./pages/SampleDev"
import PatternMaking from "./pages/PatternMaking"
import LoadingPage from "./components/LoadingPage"
import CanvasThree from './components/CanvasThree';
import Products from './pages/Products';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import PageNotFound from './pages/PageNotFound'
import VirtualScroll from 'virtual-scroll'
//import DataContext from './hooks/DataContext';

const Test = lazy(() => import("./components/Test"));
gsap.registerPlugin(ScrollTrigger);


function App() {
  console.log('App Render !')
  const location = useLocation();
  const containerRef = useRef(null)
  const configVal = useRef(0)

  useLayoutEffect(() => {
  
    containerRef.current.style.pointerEvents = 'none !important'
    //if(/* location.pathname == '/gallery' */ 1 === 1) {return}
    console.log('=>>>> Creat LocoScroll')
    const locoScroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true
    });

    locoScroll.on('scroll', handleScroll);
    setTimeout(() => {
     // containerRef.current.style.pointerEvents = 'all'
    }, 2000);
    return () => {
      if (locoScroll) {
        locoScroll.destroy();
      }
    };
 
  }, [location]);

  const handleScroll = (locoScroll) => {
    //console.log(locoScroll.scroll.y)
    let posYCur = locoScroll.scroll.y
    localStorage.setItem('scrollPosCre', posYCur);
  }
  return (
    <>
      <Navbar />
      <Grid />
      <CanvasThree value={configVal} />
      <main data-scroll-container ref={containerRef}>
        <div id='transition-section'><h2></h2></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sampledev" element={<SampleDev />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </>
  );
}
export default App;
