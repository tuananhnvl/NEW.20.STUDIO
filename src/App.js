import React, {lazy} from 'react'
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


//import Test from "./components/Test";
//const Test = lazy(() => import("./components/Test"));


function App() {
  console.log('C:: App Render !')
  return (
    <>
      <Navbar />
      <Grid10 />
      <main >
        <div id='transition-section'><h2></h2></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sampledev" element={<SampleDev />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/gallery" element={<DreiScroll />} />
        </Routes>
        
      </main>
    </>
  );
}
export default App;
