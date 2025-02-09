"use client"
import Image from "next/image"
import Nav from "./Nav";

const HeaderComponent = () => {
    return (
        <header className="fixed top-0 left-0 flex items-center w-full p-6 z-[999]">
            {/* 로고 */}
            <h1 className="w-36">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={150}
                    height={100}
                    className="w-auto h-auto"
                />
            </h1>

            {/* 네비게이션 */}
            <div className="md:flex m-auto"> {/* 데스크톱에서만 보이도록 설정 */}
                <Nav />
            </div>

            {/* 모바일 햄버거 메뉴 (네비게이션 내부에서 관리) */}
        </header>
    )
}

export default HeaderComponent;
