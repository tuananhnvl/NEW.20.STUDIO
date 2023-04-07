import React,{useEffect} from 'react'

const images = {
    image1: require('.././asset/gallery1.png'),
    image2: require('.././asset/gallery2.png'),
    image3: require('.././asset/gallery3.png'),
    image4: require('.././asset/gallery4.png'),
    image5: require('.././asset/gallery5.png')
  };
 
export default function GalleryinPage({setvalRedirect}) {
    
  const readytoRedirect = (event) => {
    if(event.target.getAttribute("value") !== null) {
        console.log(`VAL FROM COMPO : ${event.target.getAttribute("value")}`)
        setvalRedirect(event.target.getAttribute("value"));
      }else{
        console.log('ERR')
      }
  };
    
  return (
    <>
   
   <div className='warpper-content section-gallery'>
       
       <div className='title'>
       <span className="line line-2"></span>
           <h2>Gallery</h2>
           <p>Have a look at our selected works that we have done so far</p>
           <a value="/aboutus" onClick={readytoRedirect} >About us</a>
       </div>
       <div className='img-gsap-fix'>
           <a><img src={images.image1} alt="Image 1" /></a>
           <a><img src={images.image2} alt="Image 2" /></a>
           <a><img src={images.image3} alt="Image 3" /></a>
           <a><img src={images.image4} alt="Image 4" /></a>
           <a><img src={images.image5} alt="Image 5" /></a>
       </div>
   </div>

       
    </>
  )
}
