"use client";
import { useRef } from "react";
import LineAnimation from "@/components/animations/LineAnimation";
import AnimationTabContent from "@/components/AnimationTabContent";
import AnimationTab from "@/components/AnimationTab";
import VisualTextWrapper from "@/components/VisualTextWrapper";

const AnimationPages = () => {
  // 📌 각 섹션의 ref 생성
  const sectionRefs = {
    Basic: useRef<HTMLDivElement>(null),
    UI: useRef<HTMLDivElement>(null),
    Text: useRef<HTMLDivElement>(null),
    Transition: useRef<HTMLDivElement>(null),
    GSAP: useRef<HTMLDivElement>(null),
  };

  return (
    <div className="w-full relative">
      <VisualTextWrapper />
      

      <div className="mt-[80rem] relative z-11 bg-[#fffdf6]">
        {/* 🔹 Basic Animation */}
        <section ref={sectionRefs.Basic} className="bg-[#fffdf6] relative z-11 pb-[20rem]">
          <LineAnimation />
          <div className="max-w-[160rem] mx-auto px-6 lg:px-0">
          <AnimationTab sectionRefs={sectionRefs} /> {/* 탭 메뉴에 refs 전달 */}
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              Basic Animation
            </h2>
            <AnimationTabContent activeCategory="Animation" activeSubCategory="Basic" />
          </div>
        </section>

        {/* 🔹 UI Animation */}
        <section ref={sectionRefs.UI} className="bg-[#000000] text-white relative z-11 pb-[20rem]">
          <LineAnimation strokeColor="#ffffff" fillColor="#000000" />
          <div className="max-w-[160rem] mx-auto px-6 lg:px-0">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              UI Animation
            </h2>
            <AnimationTabContent activeCategory="Animation" activeSubCategory="UI" />
          </div>
        </section>

        {/* 🔹 Text Animation */}
        <section ref={sectionRefs.Text} className="bg-[#ffdeac] relative z-11 pb-[20rem]">
          <LineAnimation strokeColor="#000000" fillColor="#ffdeac" />
          <div className="max-w-[160rem] mx-auto px-6 lg:px-0">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              Text Animation
            </h2>
            <AnimationTabContent activeCategory="Animation" activeSubCategory="Text" />
          </div>
        </section>

        {/* 🔹 Transition Effects */}
        <section ref={sectionRefs.Transition} className="bg-[#bffeff] relative z-11 pb-[20rem]">
          <LineAnimation strokeColor="#000000" fillColor="#bffeff" />
          <div className="max-w-[160rem] mx-auto px-6 lg:px-0">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              Transition Effects
            </h2>
            <AnimationTabContent activeCategory="Animation" activeSubCategory="Transition" />

          </div>
        </section>

        {/* 🔹 GSAP Animations */}
        <section ref={sectionRefs.GSAP} className="bg-[#ffdadf] relative z-11 pb-[20rem]">
          <LineAnimation strokeColor="#000000" fillColor="#ffdadf" />
          <div className="max-w-[160rem] mx-auto px-6 lg:px-0">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              GSAP Animations
            </h2>
            <AnimationTabContent activeCategory="Animation" activeSubCategory="GSAP" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimationPages;
