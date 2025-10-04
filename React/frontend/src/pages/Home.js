import React from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* index.html의 hero 섹션 */}
      <div className="hero">
        <div>
          <p>WELCOME TO</p>
          <h1>re:view</h1>
          <p>Smart Consumption</p>
          <button
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            LEARN MORE
          </button>
          <button
            onClick={() => navigate("/review")}
          >
            시작하기
          </button>
        </div>
      </div>

      {/* index.html의 section 섹션 */}
      <div className="section" id="about">
        <h2>AI 기반 리뷰 분석 플랫폼</h2>
        <p>
          re:view는 광고성 리뷰를 AI로 분석하여 유사도, 키워드, 감정 정보를 시각적으로 제공하는 소비자 보호 플랫폼입니다.
          리뷰의 신뢰도를 직접 확인하고 합리적인 소비를 시작해보세요.
        </p>
      </div>
    </div>
  );
}