import React, { createContext, useState, useLayoutEffect, useEffect, useCallback, lazy, Suspense, useRef, useMemo } from 'react'
import './styles/App.css';
import './styles/locomotive-scroll.css';
import './styles/reponsive-css.css'
import Navbar from './components/Navbar';
import Grid10 from './components/Grid10'
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
import {images} from './utils/load-image.js'
import ScrollTrigger from 'gsap/ScrollTrigger';

//import Test from "./components/Test";
const Test = lazy(() => import("./components/Test"));


function App() {
  
  console.log('C:: App Render !')
  let locoScroll = null;
  const location = useLocation();
  

  return (
    <>
      <Navbar />
      <Grid10 />
     {/*  <CanvasThree /> */}
      <main >
        <div id='transition-section'><h2></h2></div>
      
        <Routes>
          <Route path="/" element={<Home locoScroll={locoScroll} />} />
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
