"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function VisualTextWrapper() {
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const mainTextRef1 = useRef<HTMLParagraphElement>(null);
  const mainTextRef2 = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 초기 상태 설정 (위치는 유지, 투명도 0)
    gsap.set([subTextRef.current, mainTextRef1.current, mainTextRef2.current, dotRef.current], {
      opacity: 0,
    });

    tl
      // 서브 텍스트 (왼쪽에서 오른쪽으로 등장 + 약간 확대)
      .fromTo(
        subTextRef.current,
        { opacity: 0, x: -50, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      )

      // 메인 텍스트 1 (아래에서 위로 자연스럽게 등장)
      .fromTo(
        mainTextRef1.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8" // 이전 애니메이션과 살짝 겹침
      )

      // 메인 텍스트 2 (아래에서 위로 자연스럽게 등장)
      .fromTo(
        mainTextRef2.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      )

      // 점 (⚫) 3단 점프 후 등장 (반동 효과)
      .fromTo(
        dotRef.current,
        { opacity: 0, y: -30, scale: 0.7 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "bounce.out" },
        "-=0.5"
      )
      .to(dotRef.current, { y: -10, duration: 0.2, ease: "power2.out" }) // 살짝 점프
      .to(dotRef.current, { y: 0, duration: 0.3, ease: "bounce.out" }); // 다시 원래 위치로

  }, []);

  return (
    <div className="box-border fixed top-[0px] left-[0rem] pt-[20rem] px-[20rem] max-lg:px-[10rem] max-sm:px-[2.4rem] max-sm:pt-[10rem] ">
      {/* 서브 텍스트 */}
      <p
        ref={subTextRef}
        className="tracking-[0.5rem] font-medium text-[1.5rem] text-[#333333] mb-8 opacity-0 max-lg:text-[1.2rem]" 
      >
        CODING EXAMPLE TUTORIAL SITE
      </p>

      {/* 메인 텍스트 */}

      <p ref={mainTextRef1} className="font-bold text-[8rem] text-[#333333] relative flex opacity-0 max-lg:text-[6rem] max-sm:text-[4rem]">
        Shaping The Future Of
      </p>
      <p ref={mainTextRef2} className="font-bold text-[8rem] text-[#333333] relative inline-block opacity-0 max-lg:text-[6rem] max-sm:text-[4rem]">
        Develop
        {/* 점 (⚫) */}
        <span
          ref={dotRef}
          className="block w-[1.5rem] h-[1.5rem] absolute right-[-2rem] bottom-0 max-lg:w-[1rem] max-lg:h-[1rem] 
          bg-[#fff59b] border-[0.2rem] border-[#333333] rounded-full my-[1rem] mx-auto opacity-0"
        />
      </p>
    </div>
  );
}
