"use client";

import { useState } from "react";
import HeartIcon from "./icon/Heart";
import AnimationTabContent from "./AnimationTabContent"

// 📌 탭 데이터
const tabs = [
  { id: "All", label: "All" },
  { id: "Basic", label: "Basic" },
  { id: "UI", label: "UI" },
  { id: "Text", label: "Text" },
  { id: "Transition", label: "Transition" },
  { id: "GSAP", label: "GSAP" },
];

export default function TabMenu() {
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center">
      {/* 📌 탭 메뉴 */}
      <div className="flex justify-center items-center gap-6 mb-8">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id ? "opacity-100 scale-110" : "opacity-70 hover:opacity-100"
              }`}
            >
              <HeartIcon isHovered={hoveredTab === tab.id} />
              <span className={`text-lg font-medium transition-all duration-300 ${activeTab === tab.id ? "text-gray-900 font-bold" : "text-gray-600"}`}>
                {tab.label}
              </span>
            </button>
            {index < tabs.length - 1 && <span className="w-2 h-2 bg-[#bffeff] border-[0.2rem] border-[#333333] rounded-full"></span>}
          </div>
        ))}
      </div>

      {/* 📌 탭별 예제 리스트 렌더링 */}
      <AnimationTabContent activeTab={activeTab} />
    </div>
  );
}
