"use client";
import LineAnimation from "@/components/animations/LineAnimation";
import AnimationTab from "@/components/AnimationTab";
import HeartIcon from "@/components/icon/Heart";
import VisualTextWrapper from "@/components/VisualTextWrapper";


const animationPages = () => {
  return (
    <div className="w-full relative">
      {/* VisualTextWrapper 추가 */}
      <VisualTextWrapper />
      <div className="mt-[80rem] relative z-11 bg-[#fffdf6]">
        <section className="bg-[#fffdf6] relative z-11 h-[100vh] ">
          <LineAnimation />
          <div className="lg:flex-row max-w-[160rem] mx-auto items-center justify-center px-6 lg:px-0">
            <AnimationTab />
            <div className="w-full lg:w-1/2 text-center mx-auto ">
            <HeartIcon isHovered={false} size="w-auto h-auto" />
              <h2 className="tracking-wide mb-10 md:mb-16 text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal">
                css,JavaScript Animation<br />Effect Page
              </h2>
              <p className="content-text mb-6 md:mb-10 text-[1.4rem] md:text-[1.6rem] leading-relaxed">
                간단한 css부터 자바스크립트를 포함한 다양한 애니메이션 예제
              </p>

            </div>
          </div>
        </section>

        <section className="bg-[#000000] relative z-11 h-[100vh]">
          <LineAnimation strokeColor="#000000" fillColor="#000000" />
          <div className="w-full h-[50rem]"></div>
        </section>
      </div>


    </div>
  );
};

export default animationPages;
