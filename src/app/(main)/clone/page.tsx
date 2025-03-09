"use client";
import { useRef } from "react";
import LineAnimation from "@/components/animations/LineAnimation";
import CloneTabContent from "@/components/CloneTabContent";

import VisualTextWrapper from "@/components/VisualTextWrapper";
import CloneTab from "@/components/CloneTab";

const ClonePages = () => {
  // 📌 각 섹션의 ref 생성
  const sectionRefs = {
    Html: useRef<HTMLDivElement>(null),
    Mobile: useRef<HTMLDivElement>(null),
    React: useRef<HTMLDivElement>(null),
  };

  return (
    <div className="w-full relative">
      <VisualTextWrapper />
      

      <div className="mt-[80rem] relative z-11 bg-[#fffdf6]">
        {/* 🔹 Html Css Clone */}
        <section ref={sectionRefs.Html} className="bg-[#fffdf6] relative z-11 pb-[20rem]">
          <LineAnimation />
          <div className="max-w-[160rem] mx-auto px-6 lg:px-0">
          <CloneTab sectionRefs={sectionRefs} /> {/* 탭 메뉴에 refs 전달 */}
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              Basic Animation
            </h2>
            <CloneTabContent activeCategory="Clone" activeSubCategory="Html" />
          </div>
        </section>

        {/* 🔹 Mobile Clone */}
        <section ref={sectionRefs.Mobile} className="bg-[#000000] text-white relative z-11 pb-[20rem]">
          <LineAnimation strokeColor="#ffffff" fillColor="#000000" />
          <div className="max-w-[160rem] mx-auto px-6 lg:px-0">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
              UI Animation
            </h2>
            <CloneTabContent activeCategory="Clone" activeSubCategory="Mobile" />
          </div>
        </section>

        {/* 🔹 React Clone */}
        <section ref={sectionRefs.React} className="bg-[#ffdeac] relative z-11 pb-[20rem]">
          <LineAnimation strokeColor="#000000" fillColor="#ffdeac" />
          <div className="max-w-[160rem] mx-auto px-6 lg:px-0">
            <h2 className="text-center text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal mb-10">
            React Clone
            </h2>
            <CloneTabContent activeCategory="Clone" activeSubCategory="React" />
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default ClonePages;
