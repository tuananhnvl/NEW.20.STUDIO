import React, { useRef, useState, useEffect } from "react";
import "../styles/compo-navbar.css";
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";

import gsap from "gsap";

import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import ImgNav from "../asset/hero.png";
import logoSm from "../asset/20-studio-white-sm.png"
gsap.registerPlugin(CSSRulePlugin)

export default function Navbar() {
  
  const modelView = useRef(null);
  const backgroundNavbar = useRef(null);
  const navListItem = useRef(null);
  const maskImg = useRef(null);
  const infoCompany = useRef(null);
  const maskImgCs = CSSRulePlugin.getRule(".maskImg:before");

  const [isOpen, setIsOpen] = useState(false);
 
  const timelineRef = useRef();
  useEffect(() => {
    const listItemPre = [
      navListItem.current.children[0].children,
      navListItem.current.children[1].children,
      navListItem.current.children[2].children,
      navListItem.current.children[3].children
    ]
    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current
      .fromTo(
        modelView.current,
        { opacity: 0},
        { 
          opacity: 1,
          duration: .2
        }
        
      )
      .fromTo(
        '#bgtop',
        { xPercent: -100},
        { 
          xPercent: 0,
          duration: .5
        }
        
      )
      .fromTo(
        '#bgbot',
        { xPercent: 100},
        { 
          xPercent: 0,
          duration: .5
        }
        ,'-=0.5'
      )
      .fromTo(
        listItemPre,
        { y: 100},
        { y: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "ease-in-out"
        },
        "<"
      ) .fromTo('.imgLargeNav',
        {opacity:0},
        {
          opacity: 1,
          duration:0.5
        },
        "<"
        )
      .fromTo(
        maskImgCs,
        {  
          cssRule: {
            width: "100%",
            background: 'rgb(0,0,0,1)'
          }
        },
        { 
          cssRule: {
            width: "0%",
            background: 'rgb(0,0,0,.5)'
          },
          duration: 0.5 
        },
        "-=0.5"
      )
     

      .reverse();

    return () => {
      timelineRef.current.kill();
    };
  }, []);

  const openNav = () => {
    setIsOpen((isOpen) => {
      if (!isOpen) {
        timelineRef.current.play();
        modelView.current.style.pointerEvents = 'auto'
      } else {
        timelineRef.current.reverse();
        modelView.current.style.pointerEvents = 'none'
      }
      return !isOpen;
    });
  };

  const closeNav = () => {
    timelineRef.current.reverse();
    modelView.current.style.pointerEvents = 'none'
  };

  return (
    <>



      <div className="navbar">
        <button onClick={openNav} id="" className="ic-nav-open">
          <SlMenu />
        </button>
      </div>
      <div className="modal-nav-view" ref={modelView}>
        <div className="bg-move" ref={backgroundNavbar}>
          <span id='bgtop'></span>
          <span id='bgbot'></span>
        </div>
        <div className="detail">
          <div className="list-item wrapper-grid10hook ">
            <div ref={navListItem} className="item-menu">

              <Link to="/gallery" onClick={closeNav} href="/gallery">
                <p>Dự&nbsp;án</p>
              </Link>
        
              <Link to="/products" onClick={closeNav} href="/products">
                <p>Sản&nbsp;xuất</p>
              </Link>
              <Link to="/sampledev" onClick={closeNav} href="/sampledev">
                <p>Thiết&nbsp;kế</p>
              </Link>
              <Link to="/contact" onClick={closeNav} href="/contact">
                <p>Liên&nbsp;hệ</p>
              </Link>

            </div>
            <div className="img imgLargeNav" >
              <div className="maskImg">
                <img ref={maskImg} src={ImgNav} alt="" />
              </div>
            </div>
          </div>
          <div className="info-company wrapper-grid10hook" ref={infoCompany}>
            <div className="logo">
              <Link to="/" onClick={closeNav} href="/"><img src={logoSm} alt="" /></Link>
            </div>
            <div className="info1" >
            <span>GGMAP</span>
                <span>20studio@contact.com</span>
            </div>
            <div className="info2">
             
               <span>SOCIAL</span>
               <span>+84 354 202 200</span>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
