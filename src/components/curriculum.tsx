"use client";

import LineAnimation from "./animations/LineAnimation";

const Curriculum = () => {
  return (
    <section className="curri-wrapper">
      <LineAnimation/>
      <div className="inner">
        <div className="title-box">
          <h2 className="content-title">Web Development, Web Design<br />Tutorial Site</h2>
          <p className="content-text">
            사이트를 만들기 위해 필요한 기술들을<br />
            최대한 쉽게 알려드리기 위해 기획한 사이트입니다.<br />
            틀린 사항이나 오류에 대한 피드백은 항상 감사합니다.
          </p>
        </div>
        <div className="curri-icon-wrapper">
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
  );
};

export default Curriculum;
