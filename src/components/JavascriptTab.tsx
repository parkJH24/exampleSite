"use client";

import {useState } from "react";
import HeartIcon from "./icon/Heart";


// 📌 탭 메뉴 데이터
const tabs = [
    { id: "Mouse", label: "Mouse" },
    { id: "Scroll", label: "Scroll" },
    { id: "Slide", label: "Slide" },
    { id: "GSAP", label: "GSAP" },
  ];

export default function JavascriptTab({ sectionRefs }: { sectionRefs: Record<string, React.RefObject<HTMLDivElement>> }) {

  // 📌 Hover 상태 관리
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // 📌 클릭 시 해당 섹션으로 스크롤 이동
  const handleScrollToSection = (id: string) => {
    console.log("클릭된 탭 ID:", id);
    console.log("해당 ID의 ref 객체:", sectionRefs[id]);
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* 🔹 탭 메뉴 (기존 디자인 유지 + Hover 적용) */}
      <div className="lg:flex max-lg:hidden justify-center items-center gap-6 mb-[12rem] mt-[-10rem]">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center gap-[3rem]">
            {/* 탭 버튼 (Hover 적용) */}
            <button
              onClick={() => handleScrollToSection(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className="flex items-center gap-[1rem] transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <HeartIcon isHovered={hoveredTab === tab.id} />
              <span
                className={`text-[1.6rem] font-medium transition-all duration-300 ${
                  hoveredTab === tab.id ? "text-gray-900 font-bold" : "text-gray-600"
                }`}
              >
                {tab.label}
              </span>
            </button>

            {/* 🔹 중간 구분 점 (마지막 탭 제외) */}
            {index < tabs.length - 1 && (
              <span className="w-[0.8rem] h-[0.8rem] bg-[#bffeff] border-[0.2rem] border-[#333333] rounded-full"></span>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
}
