"use client";
import LineAnimation from "@/components/animations/LineAnimation";
import VisualTextWrapper from "@/components/VisualTextWrapper";


const animationPages = () => {
  return (
    <div className="w-full h-screen">
      {/* VisualTextWrapper 추가 */}
      <VisualTextWrapper />
      <section className="bg-[#fffdf6] mt-[80rem] relative z-11 h-[100vh] ">
        <LineAnimation />
        <div className="flex max-w-[160rem] mx-auto">
          <div className="w-1/2 flex flex-col gap-[5rem] ">
            <h2 className="text-[4.6rem] tracking-wide font-medium">
              Web Development, Web Design<br />
              Tutorial Site
            </h2>
            <p className="content-text text-[2rem] font-light">
              사이트를 만들기 위해 필요한 기술들을<br />
              최대한 쉽게 알려드리기 위해 기획한 사이트입니다.
            </p>
          </div>
          <div className="w-1/2">
            <ul className="curri-list">
              <li>
                <p className="curri-text">HTML5, CSS, Web Accessibility</p>
              </li>
              <li>
                <p className="curri-text">HTML5, CSS, Web Accessibility</p>
              </li>
              <li>
                <p className="curri-text">HTML5, CSS, Web Accessibility</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Curriculum 추가 */}
     
    </div>
  );
};

export default animationPages;
