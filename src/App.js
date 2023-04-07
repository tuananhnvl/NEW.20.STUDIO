import { useState, useEffect, useCallback, lazy, Suspense, useRef } from 'react'
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

import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { LocomotiveScrollProvider, useLocomotiveScroll } from "react-locomotive-scroll";
import PageNotFound from './pages/PageNotFound'
import VirtualScroll from 'virtual-scroll'
import { SmoothScroll } from './hooks/SmoothScroll';

const Test = lazy(() => import("./components/Test"));

function App() {
  console.log('App Render !')
 // const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null)
  const [posSend, setPosSend] = useState(0)
  /*   useEffect(() => {
      console.log('run when containerRef update')
      const locoscroll = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true
      });
      console.log(locoscroll)
      return () => {
        locoscroll.destroy();
      };
    }, [containerRef,location]);
   */
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      <Navbar />
      <Grid />
     
        <CanvasThree pos={posSend} />
        <div id='transition-section'><h2></h2></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sampledev" element={<SampleDev />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>

    </>
  );
}
export default App;
