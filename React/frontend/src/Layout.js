import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "./App.css"; // Layout.js는 이 파일의 스타일을 사용합니다.

function Layout() {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  return (
    <div className="app">
      {/* 상단바 */}
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
            <Link to="/login">
              <img src="/login.png" alt="Login" />
              로그인
            </Link>
          )}
          <Link to="/contact">
            <img src="/contact.png" alt="Contact" />
            문의하기
          </Link>
          <Link to="/admin">
            <img src="/contact.png" alt="Admin" />
            관리자
          </Link>
          <Link to="/dashboard">
            <img src="/contact.png" alt="Dashboard" />
            대쉬보드
          </Link>
        </nav>
      </header>

      {/* 페이지별 내용 */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;