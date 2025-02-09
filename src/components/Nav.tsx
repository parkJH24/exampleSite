"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 현재 경로 확인

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname(); // 현재 경로 확인

  const handleNavigation = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      window.location.href = href; // 페이지 전환
    }, 1000);
  };

  return (
    <>
      {isAnimating && <PageTransition />}

      {/* 데스크톱 네비게이션 (lg 이상) */}
      <nav className="hidden md:flex flex-grow">
        <ul className="flex items-center gap-10">
          {menuItems.map((item) => (
            <li key={item.path} className="px-10 group">
              <Link
                href={item.path}
                onClick={handleNavigation(item.path)}
                className={`block text-2xl relative transition-transform duration-500 ${
                  currentPath === item.path ? "-translate-y-4" : "group-hover:-translate-y-4"
                } ${currentPath === item.path ? "font-bold" : "font-light"}`}
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

      {/* 햄버거 메뉴 버튼 (md 이하) - 네모 박스 */}
      <button
        className="md:hidden fixed top-6 right-6 z-50 p-3 w-12 h-12 bg-gray-900 text-white flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "X" : "MENU"} {/* X는 닫기, MENU는 열기 */}
      </button>

      {/* 커튼 메뉴 (햄버거 클릭 시 등장) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black text-white flex flex-col items-center justify-center transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40 duration-500`}
      >
        <button
          className="absolute top-6 right-6 bg-gray-800 text-white px-4 py-2"
          onClick={() => setIsOpen(false)}
        >
          닫기
        </button>
        <ul className="text-3xl space-y-6">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={handleNavigation(item.path)}
                className="hover:text-yellow-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const PageTransition = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 animate-slide-up">
      <svg
        className="fill-none z-[5] stroke-[#333] stroke-[3px] overflow-visible relative"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#fffdf6" stroke="#333333" strokeWidth="2" d="M0 0 Q951.5 -50 1903 0" />
      </svg>
    </div>
  );
};

// 메뉴 항목 데이터
const menuItems = [
  { label: "Home", path: "/" },
  { label: "Animation", path: "/animation" },
  { label: "JavaScript", path: "/javaScript" },
  { label: "Clone", path: "/clone" },
];

export default Nav;
