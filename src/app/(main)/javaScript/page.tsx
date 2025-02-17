"use client";
import { useRef } from "react";
import LineAnimation from "@/components/animations/LineAnimation";
import JavasciptTab from "@/components/JavascriptTab";
import VisualTextWrapper from "@/components/VisualTextWrapper";
import JavascriptTabContent from "@/components/JavascriptTabContent"


const JavaScriptPages = () => {

  const sectionRefs = {
    Mouse: useRef<HTMLDivElement>(null),
    Scroll: useRef<HTMLDivElement>(null),
    Slide: useRef<HTMLDivElement>(null),
    GSAP: useRef<HTMLDivElement>(null),
  };

  return (
    
      <div className="w-full relative">
        {/* VisualTextWrapper 추가 */}
        <VisualTextWrapper />
        <div className="mt-[80rem] relative z-11 bg-[#fffdf6]">
          <section className="bg-[#fffdf6] relative z-11 h-[100vh] ">
            <LineAnimation />
            <div className="lg:flex-row max-w-[160rem] mx-auto items-center justify-center px-6 lg:px-0">
              {/* <AnimationTab /> */}
              <JavasciptTab sectionRefs={sectionRefs}/>
              <div className="w-full lg:w-1/2 text-center mx-auto ">
              {/* <HeartIcon isHovered={false} size="w-auto h-auto" /> */}
                <h2 className="tracking-wide mb-10 md:mb-16 text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal">
                  css,JavaScript Animation<br />Effect Page
                </h2>
                <p className="content-text mb-6 md:mb-10 text-[1.4rem] md:text-[1.6rem] leading-relaxed">
                  간단한 css부터 자바스크립트를 포함한 다양한 애니메이션 예제
                </p>
  
              </div>
            </div>
          </section>
  
          <section ref={sectionRefs.Mouse} className="bg-[#000000] relative z-11 h-[100vh]">
            <LineAnimation strokeColor="#000000" fillColor="#000000" />
            <div className="w-full h-[50rem]">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              Mouse Animation
            </h2>
              <JavascriptTabContent activeCategory="Javascript" activeSubCategory="Mouse"/>
            </div>
          </section>

          <section ref={sectionRefs.Scroll} className="bg-[#fff59b] relative z-11 h-[100vh]">
            <LineAnimation strokeColor="#000000" fillColor="#fff59b" />
            <div className="w-full h-[50rem]">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              Scroll Animation
            </h2>
              <JavascriptTabContent activeCategory="Javascript" activeSubCategory="Scroll"/>
            </div>
          </section>

          <section ref={sectionRefs.Slide} className="bg-[#fff] relative z-11 h-[100vh]">
            <LineAnimation strokeColor="#fff" fillColor="#fff" />
            <div className="w-full h-[50rem]">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              Slide
            </h2>
              <JavascriptTabContent activeCategory="Javascript" activeSubCategory="Interaction"/>
            </div>
          </section>

          <section ref={sectionRefs.GSAP} className="bg-[#000000] relative z-11 h-[100vh]">
            <LineAnimation strokeColor="#000000" fillColor="#000000" />
            <div className="w-full h-[50rem]">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              GSAP Animation
            </h2>
              <JavascriptTabContent activeCategory="Javascript" activeSubCategory="GSAP"/>
            </div>
          </section>
        </div>
  
  
      </div>
    );
 
};

export default JavaScriptPages;
