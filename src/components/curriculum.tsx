"use client";

import LineAnimation from "./animations/LineAnimation";
import AnimateIcon from "./icon/AnimateIcon";

const Curriculum = () => {
  return (
    <section className="bg-[#fffdf6] pb-[20rem]">
      <LineAnimation/>
      <div className="flex max-w-[160rem] mx-auto items-center justify-center">
      <AnimateIcon/>
        <div className="w-1/2">
          <h2 className="tracking-wide mb-20 text-[4.8rem] font-normal ">Web Development,<br />Tutorial Site</h2>
          <p className="content-text mb-10 text-[1.6rem]">
            이 사이트는 웹 개발과 관련된 내용을 배우고 싶은 사람을 위한 예제를 제공합니다.<br/>
            HTML, CSS, JavaScript부터 반응형 웹, 리액트까지
            예제가 정리되어 있습니다.
          </p>
          <p className="content-text text-[1.6rem]">
            더 나은 학습 경험을 위해 지속적으로 개선하고 있습니다.<br/>
            틀린 부분이나 오류가 있다면 언제든지 피드백 부탁드립니다!
          </p>
        </div>
        {/* <div className="w-1/2">
          <ul className="curri-list flex flex-col gap-[1.2rem] text-[2rem]">
            <li className="flex gap-[0.6rem] items-center ">
            
              <p className="curri-text">HTML5, CSS로 제작하는 애니메이션 효과</p>
            </li>
            <li>

              <p className="curri-text">다양한 자바스크립트 효과</p>
            </li>
            <li>

              <p className="curri-text">반응형 웹까지 구현한 클론코딩</p>
            </li>
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default Curriculum;
