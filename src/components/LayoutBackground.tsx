"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageColors } from "@/styles/colors";

export default function LayoutBackground() {
  const pathname = usePathname();
  const cleanedPathname = pathname.replace(/\/$/, ""); // ✅ 마지막 `/` 제거

  useEffect(() => {
    const bgColor = pageColors[cleanedPathname] || pageColors["default"];

    console.log("현재 경로:", cleanedPathname); // ✅ 디버깅 로그
    console.log("적용될 배경색:", bgColor); // ✅ 적용될 배경색 확인

    document.body.style.backgroundColor = bgColor;
  }, [cleanedPathname]); // pathname 변경될 때마다 실행

  return null;
}
