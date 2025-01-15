import React from "react";

export default function VisualTextWrapper() {
    return (
        <div className=" box-border fixed top-[0px] left-[0rem] pt-[20rem] px-[10rem]">
            {/* 서브 텍스트 */}
            <p className="tracking-[0.5rem] font-medium text-2xl text-[#333333] mb-8">
                WE ARE A EUROPEAN INVESTMENT FUND
            </p>

            {/* 메인 텍스트 */}
            <p className="font-bold text-[8rem] text-[#333333] relative flex">
                Shaping The Future Of
            </p>
            <p className="font-bold text-[8rem] text-[#333333] relative inline-block">
                Commerce
                {/* After 요소를 대신한 span */}
                <span
                    className="block w-[1.5rem] h-[1.5rem] absolute right-[-3rem] bottom-0 
               opacity-100 translate-y-0 bg-[#fff59b] border-[0.2rem] border-[#333333] 
               rounded-full my-[1rem] mx-auto"
                />
            </p>
        </div>
    );
}

