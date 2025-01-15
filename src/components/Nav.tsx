"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // usePathname import

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const currentPath = usePathname(); // 현재 경로 확인

  const handleNavigation = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      window.location.href = href; // 페이지 전환
    }, 1000); // 애니메이션 지속 시간과 맞춤
  };

  return (
    <>
      {isAnimating && <PageTransition />}
      <nav className="flex flex-grow">
        <ul className="flex items-center gap-10">
          {menuItems.map((item) => (
            <li key={item.path} className="px-10 group">
              <Link
                href={item.path}
                onClick={handleNavigation(item.path)}
                className={`block text-2xl font-bold relative transition-transform duration-500 ${
                  currentPath === item.path ? "-translate-y-4" : "group-hover:-translate-y-4"
                }`}
              >
                {item.label}
                <span
                  className={`block w-4 h-4 border-[0.2rem] border-gray-800 bg-yellow-300 rounded-full mt-4 mx-auto transition-all duration-500 transform ${
                    currentPath === item.path
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0"
                  }`}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

const PageTransition = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 animate-slide-up"></div>
  );
};

// 메뉴 항목 데이터
const menuItems = [
  { label: "Home", path: "/" },
  { label: "Slider", path: "/slider" },
  { label: "Animation", path: "/animation" },
  { label: "Css", path: "/css" },
  { label: "Clone", path: "/clone" },
];

export default Nav;
