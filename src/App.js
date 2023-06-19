import React, {useRef, useEffect,useCallback} from 'react'
import './styles/App.css';
import './styles/locomotive-scroll.css';
import './styles/reponsive-css.css'
import Navbar from './components/Navbar';
import Grid10 from './components/Grid10'

import { Route, Routes, useLocation } from "react-router-dom";
import './fonts/Marcellus-Regular.ttf';


import Home from "./pages/Home";
import Contact from "./pages/Contact";

import SampleDev from "./pages/SampleDev"
import Products from './pages/Products';
import PageNotFound from './pages/PageNotFound'
import DreiScroll from './pages/DreiScroll'


function App() {
  const { pathname } = useLocation();
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorRef = useRef();
  const lerpSpeed = 0.8;
  let cursorX = 0;
  let cursorY = 0;

  const lerp = useCallback((min, max, value) => {
    return (min - max) * value + max;
  }, []);

  const updateCursor = useCallback(() => {
    cursorX = lerp(cursorX, mousePos.current.x, lerpSpeed);
    cursorY = lerp(cursorY, mousePos.current.y, lerpSpeed);
    cursorRef.current.style.transform = `translate3d(${cursorX - 21}px, ${cursorY -21}px, 0)`;
    requestAnimationFrame(updateCursor);
  }, [lerp, cursorRef, lerpSpeed]);

  useEffect(() => {
    function handleMouseMove(event) {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
    }

    window.addEventListener('mousemove', handleMouseMove);

    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [updateCursor]);
  return (
    <>
      <div ref={cursorRef} id="customCursor"></div>
      <Navbar />
      <Grid10 />
      <main >
        <div id='transition-section'><h2></h2></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sampledev" element={<SampleDev />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/gallery" element={<DreiScroll />} />
        
        </Routes>
        
      </main>
    </>
  );
}
export default App;
