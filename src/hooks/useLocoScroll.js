import { useLayoutEffect} from 'react';
import LocomotiveScroll from 'locomotive-scroll';


const useLocoScroll = (start) => {
   // const [scrollPosChange,onScrollPosChange] = useState(0)

  useLayoutEffect(() => {
    if (!start) return;

    const scrollEl = document.querySelector('.containerScroll');
    console.log('========== found scrollEl')
    console.log(`useLocoScroll start!`)
    
    let locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.2,
    });

    console.log(`useLocoScroll complete!`)
    locoScroll.on('scroll',() => {
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
    
   
  }, [start]);
//  return  useMemo(() => scrollPosChange, [scrollPosChange]);
}; 



export default useLocoScroll;