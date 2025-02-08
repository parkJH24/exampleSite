"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageColors } from "@/styles/colors";

export default function LayoutBackground() {
  const pathname = usePathname();

  useEffect(() => {
    // 각 페이지의 색상 지정
    const mainColor = pageColors[pathname] || pageColors["default"];
    document.body.style.backgroundColor = mainColor;
  }, [pathname]);

  return null; // UI를 렌더링하지 않음
}
