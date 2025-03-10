"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface LineAnimationProps {
  strokeColor?: string; // 스트로크 색상 (기본값 설정 가능)
  fillColor?: string;   // 배경색 (기본값 설정 가능)
}

const LineAnimation = ({ strokeColor = "#333", fillColor = "#fffdf6" }: LineAnimationProps) => {
  const lineRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const line = lineRef.current;
    let winX = window.innerWidth;
    let lineC = winX / 2;

    const onResize = () => {
      winX = window.innerWidth;
      lineC = winX / 2;
      if (line) {
        line.setAttribute("d", `M0 0 Q${lineC} -50 ${winX} 0`);
      }
    };

    const bounceMove = () => {
      const scrollTop = document.documentElement.scrollTop;

      // 페이지가 맨 위에 있을 때 애니메이션 실행 안 함
      if (scrollTop === 0) return;

      const scrollLength = scrollTop * 0.0010;

      if (line) {
        gsap.timeline()
          .set(line, {
            attr: {
              d: `M0 0 Q${lineC} -${scrollLength} ${winX} 0`
            }
          })
          .to(line, {
            duration: 1.5,
            ease: "elastic(1, 0.3)",
            attr: {
              d: `M0 0 Q${lineC} -50 ${winX} 0`
            }
          });
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", bounceMove);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", bounceMove);
    };
  }, []);

  return (
    <svg
      className="fill-none z-[5] stroke-[3px] overflow-visible relative"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={lineRef}
        fill={fillColor} // 동적 배경색
        stroke={strokeColor} // 동적 선 색상
        strokeWidth="2"
        d="M0 0 Q951.5 -50 1903 0"
      />
    </svg>
  );
};

export default LineAnimation;
