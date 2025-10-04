import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ReviewApp from "./ReviewApp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindAccount from "./pages/FindAccount";
import ContactUser from "./pages/ContactUser";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ContactAdmin from "./pages/ContactAdmin";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout"; // 헤더(내비게이션) 포함된 레이아웃 컴포넌트
import HistoryPage from "./pages/HistoryPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* Home 컴포넌트를 Layout 바깥으로 빼냅니다.*/}
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<ReviewApp />} />

        {/* Layout이 필요한 다른 페이지들 */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/findaccount" element={<FindAccount />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* 추가 */}
          <Route path="/contactuser" element={<ContactUser />} />
          <Route path="/contactadmin" element={<ContactAdmin />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;