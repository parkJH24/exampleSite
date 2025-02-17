"use client";

import Curriculum from "@/components/curriculum";
import MainList from "@/components/MainList";
import VisualTextWrapper from "@/components/VisualTextWrapper";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const pathname = usePathname();

  // 경로별 배경색 설정
  const backgroundColors: { [key: string]: string } = {
    "/": "#bffeff", // Home
    // "/slider": "#ffe4b2", // Slider
    "/animation": "#c3f7c3", // Animation
    "/javaScript": "#ffdadf", // CSS
    "/clone": "#e3d7fe", // Clone
  };

  useEffect(() => {
    // 현재 경로에 따른 배경색 선택, 기본값 설정
    const backgroundColor = backgroundColors[pathname] || "#ffffff";
    document.body.style.backgroundColor = backgroundColor;

    // Cleanup: 페이지 이동 시 body 스타일 초기화 방지
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [pathname]);

  return (
    <div className="w-full relative z-11">
      {/* Page Active Section */}
      <VisualTextWrapper />
      <div className="mt-[80rem] relative z-11 bg-[#fffdf6]">
        <Curriculum />
        <MainList/>
      </div>
    </div>
  );
}
