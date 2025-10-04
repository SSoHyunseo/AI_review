import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FindAccount.css";

function FindAccount() {
  const [mode, setMode] = useState("id"); // 'id' or 'password'
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "http://localhost:8080/api/auth";

  const handleFindId = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/find-id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`회원님의 아이디는 ${data.username} 입니다.`);
      } else {
        setMessage(data.message || "아이디를 찾을 수 없습니다.");
      }
    } catch (err) {
      setMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/request-password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        setMessage("비밀번호 재설정 링크가 이메일로 발송되었습니다. 메일을 확인해주세요.");
      } else {
        const data = await response.json();
        setMessage(data.message || "요청에 실패했습니다. 입력 정보를 확인해주세요.");
      }
    } catch (err) {
      setMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="find-container">
      <div className="find-box">
        <h2>{mode === "id" ? "아이디 찾기" : "비밀번호 찾기"}</h2>

        <div className="tab-buttons">
          <button className={mode === "id" ? "active" : ""} onClick={() => setMode("id")}>아이디 찾기</button>
          <button className={mode === "password" ? "active" : ""} onClick={() => setMode("password")}>비밀번호 찾기</button>
        </div>

        {mode === "id" ? (
          <form onSubmit={handleFindId}>
            <input type="email" placeholder="이메일 입력" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" disabled={isLoading}>{isLoading ? "찾는 중..." : "아이디 찾기"}</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <input type="text" placeholder="아이디 입력" required value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="이메일 입력" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" disabled={isLoading}>{isLoading ? "요청 중..." : "비밀번호 재설정 링크 받기"}</button>
          </form>
        )}

        {message && <p className="status-message">{message}</p>}

        <p className="back-link">
          <Link to="/login">로그인 화면으로 돌아가기</Link>
        </p>
      </div>
    </div>
  );
}

export default FindAccount;