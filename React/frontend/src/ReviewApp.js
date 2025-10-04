import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import api from './services/api';
import "./App.css";

// 유사도 점수 차트 컴포넌트
const SimilarityChart = ({ score }) => {
  const data = [
    { name: "유사도", value: score },
    { name: "나머지", value: 100 - score },
  ];
  const COLORS = ["#e6f911ff", "#E0E0E0"];

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <PieChart width={120} height={120}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute text-center">
        <span className="text-xl font-bold">{score.toFixed(1)}%</span>
      </div>
    </div>
  );
};

// 긴 텍스트 접기/펼치기 컴포넌트
const TruncatedText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = text ?? "";

  if (displayText.length <= maxLength) {
    return <span>{displayText}</span>;
  }

  return (
    <div>
      <span>{isExpanded ? displayText : `${displayText.substring(0, maxLength)}...`}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // ✅ 부모 클릭 이벤트 막기
          setIsExpanded(!isExpanded);
        }}
        className="toggle-text-button"
      >
        {isExpanded ? "간략히 보기" : "더 보기"}
      </button>
    </div>
  );
};


// 메인 컴포넌트
function ReviewApp() {
  const [review, setReview] = useState("");
  const [placeholder, setPlaceholder] = useState("리뷰를 입력하세요");
  const [showSimilar, setShowSimilar] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const API_BASE = "http://localhost:8080";

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const textareaRef = useRef(null);

  const categories = [
    "패션잡화",
    "식품건강",
    "뷰티",
    "생활주방",
    "유아동",
    "스포츠레저",
    "가전디지털",
    "문구오피스",
  ];

  // 텍스트 영역의 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [review]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  const handleCategoryClick = (name) => {
    setPlaceholder(name);
    setSelectedCategory(name);
  };

  const handleShowReview = async () => {
    const text = review.trim();
    if (!text) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    setLoading(true);

    // // 분석 시작 시 우측 패널을 숨겨서 초기화 상태로 만듦
    // setShowSimilar(false); 

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // API 호출
      const response = await fetch(`${API_BASE}/review/check`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ userReview: text, category: selectedCategory }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`서버 응답 오류 (${response.status}): ${msg}`);
      }

      const data = await response.json();

      // API 응답 데이터 키를 프론트엔드에서 사용하는 키로 매핑
      const newReview = {
        '입력 리뷰': data['입력 리뷰'],
        '유사도 점수': data['유사도 점수'] || 0,
        '가장 유사한 광고 리뷰': data['가장 유사한 광고 리뷰'],
        '광고 키워드': data['광고 키워드'],
        '비광고 키워드': data['비광고 키워드'],
        '판단': data['판단'],
        'category': selectedCategory,
        'timestamp': Date.now(),
      };

      // 우측 패널에 새로운 분석 결과만 표시
      setReviewsData(prevData => [newReview, ...prevData]);

      setShowSimilar(true);
      setExpandedIndex(null);
    } catch (error) {
      console.error("에러 발생:", error);
      alert("분석 중 오류가 발생했습니다.");
      setReviewsData([]); // 오류 발생 시 데이터 초기화
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (isPositive, reviewData) => {
    if (!reviewData) return;

    try {
      const feedbackResponse = await fetch(`${API_BASE}/review/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review: reviewData["입력 리뷰"],
          decision: reviewData["판단"],
          feedback: isPositive ? "추천" : "비추천",
        }),
      });

      if (!feedbackResponse.ok) {
        throw new Error(`서버 응답 오류 (${feedbackResponse.status})`);
      }
      alert(isPositive ? "추천이 반영되었습니다." : "비추천이 반영되었습니다.");
    } catch (error) {
      console.error("피드백 전송 오류:", error);
      alert("피드백 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="app">
      <header className="header-top">
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          re:view
        </div>
        <nav className="nav-menu">
          {isLoggedIn ? (
            <a href="/" onClick={handleLogout}>
              <img src="/login.png" alt="Logout" />
              로그아웃
            </a>
          ) : (
            <a href="/login">
              <img src="/login.png" alt="Login" />
              로그인
            </a>
          )}
          <a href="/contact">
            <img src="/contact.png" alt="Contact" />
            문의하기
          </a>
        </nav>
      </header>

      <div style={{ display: "flex", paddingTop: "60px", minHeight: "100vh" }}>
        <div className="sidebar">
          <ul>
            <li className="category-title">
              카테고리
              <ul style={{ marginTop: "0.9rem", marginLeft: "2rem" }}>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    style={{
                      padding: "4px 0",
                      cursor: "pointer",
                      color: selectedCategory === cat ? "#00ffccff" : "white",
                      fontWeight: selectedCategory === cat ? "bold" : "normal",
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </li>
            <li className="history-button" onClick={() => navigate("/history")}>
              History
            </li>
          </ul>
        </div>

        <div className="content">
          <p className="main-title">AI 기반 광고성 리뷰 탐지 웹 서비스</p>
          <div className="input-area">
            <textarea
              ref={textareaRef}
              rows="1"
              className="review-input"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder={placeholder}
              disabled={loading}
            />
            <button
              className={`input-button ${loading ? "loading" : ""}`}
              onClick={handleShowReview}
              disabled={loading}
            >
              {loading ? "분석 중..." : "분석"}
            </button>
          </div>
        </div>

        {/* showSimilar 상태가 true일 때만 우측 패널 렌더링 */}
        {showSimilar && (
          <div className="similar-review show">
            <h3>분석 결과</h3>
            {reviewsData.length > 0 ? (
              reviewsData.map((data, index) => {
                const isLatest = index === 0;
                const isOpen = isLatest || expandedIndex === index;
                return (
                  <div
                    key={index}
                    className="review-result-item"
                    onClick={() =>
                      !isLatest && setExpandedIndex(expandedIndex === index ? null : index)
                    }
                    style={{
                      cursor: isLatest ? "default" : "pointer",
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    {/* 접힌 상태 → 입력 리뷰 한 줄만 보임 */}
                    {!isOpen ? (
                      <div className="result-item-group">
                        <p><strong>입력 리뷰 :</strong></p>
                        <div className="result-item-content">
                          {data["입력 리뷰"] && (data["입력 리뷰"].length > 20
                            ? `${data["입력 리뷰"].slice(0, 20)}...`
                            : data["입력 리뷰"])}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="result-item-group">
                          <p><strong>입력 리뷰 :</strong></p>
                          <div className="result-item-content">
                            <TruncatedText text={data["입력 리뷰"]} maxLength={100} />
                          </div>
                        </div>

                        <div className="result-item-group">
                          <p><strong>유사도 점수 :</strong></p>
                          <SimilarityChart score={data["유사도 점수"]} />
                        </div>

                        <div className="result-item-group">
                          <p><strong>가장 유사한 광고 리뷰 :</strong></p>
                          <div className="result-item-content">
                            <TruncatedText
                              text={data["가장 유사한 광고 리뷰"]}
                              maxLength={120}
                            />
                          </div>
                        </div>

                        <div className="result-item-group">
                          <p><strong>광고 키워드 :</strong></p>
                          <div className="keyword-container">
                            {data["광고 키워드"]?.map((keyword, i) => (
                              <span key={i} className="keyword-tag">{keyword}</span>
                            ))}
                          </div>
                        </div>

                        <div className="result-item-group">
                          <p><strong>비광고 키워드 :</strong></p>
                          <div className="keyword-container">
                            {data["비광고 키워드"]?.map((keyword, i) => (
                              <span key={i} className="keyword-tag">{keyword}</span>
                            ))}
                          </div>
                        </div>

                        <div className="result-item-group judgement-line">
                          <strong>판단 :</strong>
                          <span
                            className={`result-judgement ${data["판단"]?.includes("광고") ? "ad" : "not-ad"
                              }`}
                          >
                            {data["판단"]}
                          </span>
                        </div>

                        <div className="feedback-buttons">
                          <button onClick={() => handleFeedback(true, data)}>
                            👍 추천
                          </button>
                          <button onClick={() => handleFeedback(false, data)}>
                            👎 비추천
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="no-result-text">아직 분석 결과가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewApp;