import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // 간단한 스타일 재사용

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError('유효하지 않은 접근입니다. 링크를 다시 확인해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) { // 간단한 유효성 검사
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/auth/reset-password?token=${token}`, {
        newPassword: password,
      });
      setMessage('비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => navigate('/login'), 3000); // 3초 후 로그인 페이지로 이동
    } catch (err) {
      const errorMessage = err.response?.data?.message || '비밀번호 변경에 실패했습니다. 토큰이 만료되었거나 유효하지 않을 수 있습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">새 비밀번호 설정</h2>
        {message ? (
          <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="password"
                placeholder="새 비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
