"use client"
import Image from "next/image"
import Nav from "./Nav";


const HeaderComponent = () => {
    return (
        <header className="fixed top-0 left-0 flex gap-[30rem] pt-12 pl-6 w-full z-[999]">
            <h1 className="w-36">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={150}
                    height={100}
                    className="w-auto h-auto"
                />
            </h1>
            <Nav />
        </header>

    )
}

export default HeaderComponent;


