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

    // 초기 상태 설정 (위치는 그대로, 투명도만 0)
    gsap.set([subTextRef.current, mainTextRef1.current, mainTextRef2.current, dotRef.current], {
      opacity: 0,
    });

    // 서브 텍스트 (왼쪽에서 오른쪽으로 등장)
    tl.fromTo(
      subTextRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    )

    // 메인 텍스트 1 (아래에서 위로 등장)
    .fromTo(
      mainTextRef1.current,
      { opacity: 0, y: 50 }, // 현재 위치에서 50px 아래 시작
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8" // 이전 애니메이션과 겹쳐서 실행
    )

    // 메인 텍스트 2 (아래에서 위로 등장)
    .fromTo(
      mainTextRef2.current,
      { opacity: 0, y: 50 }, // 현재 위치에서 50px 아래 시작
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )

    // 점 (⚫) 살짝 점프하면서 등장
    .fromTo(
        dotRef.current,
        { opacity: 0, y: -30,  }, // 시작 위치 (살짝 아래)
        { opacity: 1, y: 0, duration: 1, ease: "bounce.out" },
        "-=0.5"
      )
  
  }, []);

  return (
    <div className="box-border fixed top-[0px] left-[0rem] pt-[20rem] px-[20rem]">
      {/* 서브 텍스트 */}
      <p
        ref={subTextRef}
        className="tracking-[0.5rem] font-medium text-2xl text-[#333333] mb-8 opacity-0"
      >
        CODING EXAMPLE TUTORIAL SITE
      </p>

      {/* 메인 텍스트 */}
      <p ref={mainTextRef1} className="font-bold text-[8rem] text-[#333333] relative flex opacity-0">
        Shaping The Future Of
      </p>
      <p ref={mainTextRef2} className="font-bold text-[8rem] text-[#333333] relative inline-block opacity-0">
        Commerce
        {/* After 요소를 대신한 span */}
        <span
          ref={dotRef}
          className="block w-[1.5rem] h-[1.5rem] absolute right-[-3rem] bottom-0 
          bg-[#fff59b] border-[0.2rem] border-[#333333] rounded-full my-[1rem] mx-auto opacity-0"
        />
      </p>
    </div>
  );
}
