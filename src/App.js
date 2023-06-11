import React, {lazy, useEffect} from 'react'
import './styles/App.css';
import './styles/locomotive-scroll.css';
import './styles/reponsive-css.css'
import Navbar from './components/Navbar';
import Grid10 from './components/Grid10'
import './fonts/Marcellus-Regular.ttf';
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";

import SampleDev from "./pages/SampleDev"
import Products from './pages/Products';
import PageNotFound from './pages/PageNotFound'
import DreiScroll from './pages/DreiScroll'




function App() {
  console.log('C:: App Render !')
  const location = useLocation()
  useEffect(() => {
    const circle = document.querySelector(".customCursor")
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0;  
    let cursorY  = 0;
    const lerpSpeed = 0.8;

    function updateCursor(){
      cursorX = lerp(cursorX, mouseX, lerpSpeed)
      cursorY = lerp(cursorY, mouseY, lerpSpeed)
      circle.style.top = cursorY + "px"
      circle.style.left = cursorX + "px"
      requestAnimationFrame(updateCursor)
    }

    function lerp(min, max, value){
      return (min - max) * value + max 
    }

    window.addEventListener("mousemove",function(event){
      mouseX = event.clientX
      mouseY = event.clientY
    })

    updateCursor();
  },[location])
  return (
    <>
      <div class="customCursor"></div>
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
