import React, { useRef, useState } from "react";
import "../styles/Navbar.css";
import { SlMenu } from "react-icons/sl";
import { Link} from "react-router-dom";

import gsap from "gsap";
import LoadingPage from '.././components/LoadingPage';

import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import ImgNav from "../asset/hero.png";
import logoSm from "../asset/20-studio-white-sm.png"

export default function Navbar() {
  gsap.registerPlugin(CSSRulePlugin)
  const navDom = useRef(null);
  const bgNav = useRef(null);
  const navItem = useRef(null);
  const imgNavBanner = useRef(null);
  const infoBotNav = useRef(null);
  const [isNavOpen, setNavOpen] = useState(false);
  const pseudoImgBannerNav = CSSRulePlugin.getRule(".imgNavBanner:before");

  function openNav() {

    let isAnimating = false;
    let animation;
    if (!isNavOpen) {
      console.log('run nav')
    
      animation = gsap.timeline({})
        .to(
          navDom.current,
          {
            opacity: 1,
            pointerEvents: "auto"
          }
        )
        .add("startNavOpen")
        .fromTo([bgNav.current.children[0]],
          { 
            xPercent: 100, 
            duration: 0,
           
          }, { 
            xPercent: 0, 
          duration: 1,
          ease: "power3.inOut",
        },"startNavOpen")
        .fromTo([bgNav.current.children[1]],
          { 
            xPercent: -100, 
            duration: 0,
           
          }, { 
            xPercent: 0, 
          duration: 1,
          ease: "power3.inOut",
        },"<")

        .to(
        [
          navItem.current.children[0].children,
          navItem.current.children[1].children,
          navItem.current.children[2].children,
          navItem.current.children[3].children,
          navItem.current.children[4].children
        ],
        {
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "ease-in-out",
        })
        .to(".imgNavBanner", {
          opacity:1,
          delay:.5,
          duration:.5,
          ease: "ease-in-out"
        },"<")
        .to(infoBotNav.current,{
          opacity:1,
          duration:.5
        },"<")
        .to(pseudoImgBannerNav, {
          cssRule: {
            width: "0%"
          },
          duration: .5
        },"<")


    } else {
      animation = gsap.timeline({})
        .to(
          [
            navItem.current.children[0].children,
            navItem.current.children[1].children,
            navItem.current.children[2].children,
            navItem.current.children[3].children,
            navItem.current.children[4].children
          ],
          {
            y:100,
            duration: 0.3,
            stagger: 0.05,
            ease: "ease-in-out",
          })
        .to(pseudoImgBannerNav, {
          cssRule: {
            width: '100%',
          },
          duration: .5
        }, "<")
        .to(".imgNavBanner", {
          opacity:0,
          duration:.5,
          ease: "ease-in-out"
        },"<")
        .to(infoBotNav.current,{
          opacity:0,
          duration:.5
        },"<")
        .to([bgNav.current.children[0]], {
          xPercent: -100, // move both child elements to the right
          duration: 1,
          pointerEvents: "none",
          ease: "power3.inOut",
        })
        .to([bgNav.current.children[1]], {
          xPercent: 100, // move both child elements to the right
          duration: 1,
          pointerEvents: "none",
          ease: "power3.inOut",
        },"<")
        .to(navDom.current,
        {
          opacity: 0,
          duration: 0.5,
          pointerEvents: "none",
          ease: "ease-in-out",
        }, "<")

    }

    setNavOpen(!isNavOpen);

    return () => {
      if (!isAnimating) {
        animation.reversed(true);
      }
     
    };
  }
  function closeNav() {
    setNavOpen(false);
    let animation;
    animation = gsap.timeline({})
    .to(
      [
        navItem.current.children[0].children,
        navItem.current.children[1].children,
        navItem.current.children[2].children,
        navItem.current.children[3].children,
        navItem.current.children[4].children
      ],
      {
        y:100,
        duration: 0.3,
        stagger: 0.05,
        ease: "ease-in-out",
      })
    .to(pseudoImgBannerNav, {
      cssRule: {
        width: '100%',
      },
      duration: .5
    }, "<")
    .to(".imgNavBanner", {
      opacity:0,
      duration:.5,
      ease: "ease-in-out"
    },"<")
    .to(infoBotNav.current,{
      opacity:0,
      duration:.5
    },"<")
    .to([bgNav.current.children[0]], {
      xPercent: -100, // move both child elements to the right
      duration: 1,
      pointerEvents: "none",
      ease: "power3.inOut",
    })
    .to([bgNav.current.children[1]], {
      xPercent: 100, // move both child elements to the right
      duration: 1,
      pointerEvents: "none",
      ease: "power3.inOut",
    },"<")
    .to(navDom.current,
    {
      opacity: 0,
      duration: 0.5,
      pointerEvents: "none",
      ease: "ease-in-out",
    }, "<")

    

  }

  return (
    <>
       
      
 
      <div className="navbar">
        <a onClick={openNav} id="" className="ic-nav-open">
          <SlMenu />
        </a>
      </div>
      <div className="modal-nav-view" ref={navDom}>
        <div className="bg-move" ref={bgNav}>
          <span></span>
          <span></span>
        </div>
        <div className="detail">
          <div className="list-item">
            <div ref={navItem} className="item-menu">
              <Link to="/gallery" onClick={closeNav}>
                <p>Dự án</p>
              </Link>
              <Link to="/sampledev" onClick={closeNav}>
                <p>Phát triển thiết kế</p>
              </Link>
              <Link to="/products" onClick={closeNav}>
                <p>Sản xuất</p>
              </Link>
              <Link to="/gallery" onClick={closeNav}>
                <p>Gallery</p>
              </Link>
              <Link to="/contact" onClick={closeNav}>
                <p>Liên hệ</p>
              </Link>
 
            </div>
            <div className="img">
              <div className="imgNavBanner">
                <img ref={imgNavBanner} src={ImgNav} alt="" />
              </div>
            </div>
          </div>
          <div className="info-company" ref={infoBotNav}>
            <div className="logo">
              <Link to="/" onClick={closeNav}><img src={logoSm} alt=""/></Link>
            </div>
            <div className="info" >
              <div>
                <span>+84 354 202 200</span>
                <span>20studio@contact.com</span>
                <span>62/193 D.Ly Chinh Thang, P.8, Q.3, HCMC</span>
                <span>GGMAP</span>
              </div>
               
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
