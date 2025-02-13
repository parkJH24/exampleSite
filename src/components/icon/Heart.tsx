"use client";

import { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/assets/animations/heart.json"; // JSON 파일 불러오기

interface HeartIconProps {
  isHovered: boolean;
  size?: string; // Tailwind의 사이즈 클래스를 string으로 받음 (ex: "w-20 h-20")
}

const HeartIcon = ({ isHovered, size = "w-40 h-40" }: HeartIconProps) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (isHovered) {
      lottieRef.current?.play(); // 애니메이션 재생
    } else {
      lottieRef.current?.stop(); // 애니메이션 정지
    }
  }, [isHovered]); // `isHovered` 값이 변경될 때마다 실행

  return (
    <div className={`cursor-pointer mt-[-1rem] mr-[-2rem] ${size}`}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default HeartIcon;
