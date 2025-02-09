"use client";

import LineAnimation from "./animations/LineAnimation";
import AnimateIcon from "./icon/AnimateIcon";

const Curriculum = () => {
  return (
    <section className="bg-[#fffdf6] pb-[10rem] lg:pb-[20rem]">
      <LineAnimation />
      <div className="flex flex-col lg:flex-row max-w-[160rem] mx-auto items-center justify-center px-6 lg:px-0">
        <div className="mb-10 lg:mb-0">
          <AnimateIcon />
        </div>
        
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="tracking-wide mb-10 md:mb-16 text-[3rem] md:text-[4rem] lg:text-[4.8rem] font-normal">
            Web Development,<br />Tutorial Site
          </h2>
          <p className="content-text mb-6 md:mb-10 text-[1.4rem] md:text-[1.6rem] leading-relaxed">
            이 사이트는 웹 개발을 배우고 싶은 사람을 위한 예제를 제공합니다.<br />
            HTML, CSS, JavaScript부터 반응형 웹, 리액트까지 예제가 정리되어 있습니다.
          </p>
          <p className="content-text text-[1.4rem] md:text-[1.6rem] leading-relaxed">
            더 나은 학습 경험을 위해 지속적으로 개선하고 있습니다.<br />
            틀린 부분이나 오류가 있다면 언제든지 피드백 부탁드립니다!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
