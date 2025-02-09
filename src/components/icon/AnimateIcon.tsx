"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lottie를 동적으로 불러오기 (SSR 방지)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const AnimateIcon = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("/icon/animation.json"); // public 폴더에서 JSON 불러오기
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("애니메이션 JSON 로드 중 오류 발생:", error);
      }
    };

    fetchAnimation();
  }, []);

  if (!animationData) return <p>로딩 중...</p>;

  return (
    <Lottie
      animationData={animationData}
      loop
      style={{
        height: "600px",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default AnimateIcon;
