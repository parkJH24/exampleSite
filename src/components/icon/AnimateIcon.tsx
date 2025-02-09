"use client";

import dynamic from "next/dynamic";
import animationData from "/public/icon/animation.json"; // public 폴더의 JSON 파일 불러오기

// Lottie를 동적으로 불러와서 서버 사이드 렌더링 방지
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const AnimateIcon = () => {
  return <Lottie animationData={animationData} loop 
  style={{
    height : '600px',
    backgroundColor: "transparent"
  }}
  
  />;
};

export default AnimateIcon;
