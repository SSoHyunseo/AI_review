/* 프로젝트 간단 소개 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* 본문 */}
      <div className="about-box">
        <h2>About Us</h2>
        <p>우리는 <strong>“신뢰할 수 있는 소비”</strong>를 꿈꾸는 개발자들입니다.</p>
        <p>
          <strong>re:view</strong>는 AI 기반 리뷰 분석 플랫폼으로, 광고성 리뷰와
          진짜 사용자의 리뷰를 구분하여 소비자가 더 똑똑하게 선택할 수 있도록 돕는 서비스입니다.
        </p>
        <p>
          문장 유사도 분석, 키워드 시각화, 감정 분석 등을 통해 한눈에 리뷰의 신뢰도를 파악할 수 있습니다.
        </p>
        <p>
          무분별한 마케팅에 휘둘리지 않고, 진짜 소비자의 목소리를 듣고 싶은 여러분을 위해
          re:view는 계속 진화합니다.
        </p>

        <button className="back-button" onClick={() => navigate("/")}>
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default About;
