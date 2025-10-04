import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 API의 기본 URL
});

// 모든 요청에 JWT 토큰을 자동으로 추가하는 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;