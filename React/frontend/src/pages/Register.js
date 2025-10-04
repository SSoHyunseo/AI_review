import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // useNavigate 제거
import axios from 'axios';
import "./Register.css";


function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const navigate = useNavigate(); // 제거

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 서버에 회원가입 데이터(id, password) 전송
      await axios.post('http://localhost:8080/api/auth/register', { username: id, password: password, email: email });

      // API 호출 성공 시 'isSubmitted' 상태를 true로 변경
      setIsSubmitted(true);

    } catch (error) {
      // API 호출 실패 시
      console.error('Registration failed:', error.response?.data || error.message);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="register-container">

      <div className="register-box">
        <h2>회원가입</h2>

        {!isSubmitted ? (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="아이디"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="email"
              placeholder="이메일 (선택)"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">회원가입</button>
          </form>
        ) : (
          <p className="register-message">
            회원가입이 완료되었습니다!{" "}
            <Link to="/login">로그인 화면으로 이동</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;