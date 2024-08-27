/* eslint-disable no-underscore-dangle */
import axios from 'axios';

// Axios 인스턴스 생성
const AxiosInstance = axios.create({
  // VITE는 환경변수 앞에 반드시 import.meta.env.VITE_~~~
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 액세스 토큰을 모든 요청에 자동으로 추가
AxiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('Authorization');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 응답 인터셉터 설정
AxiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 에러 발생시
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Token expired. Trying to refresh...');

      try {
        // 리프레시 토큰을 사용해 새로운 액세스 토큰 발급
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/members/refreshtoken/reissue`,
          {},
          {
            withCredentials: true, // 쿠키 사용을 위해 설정
          }
        );

        const newAccessToken = response.headers.get('Access');
        console.log('New token received: ', newAccessToken);

        // 새로운 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem('Authorization', newAccessToken);

        // 실패했던 요청에 새로운 액세스 토큰을 추가하여 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 갱신이 실패하면 사용자 로그아웃 처리 등의 로직 추가
        console.error('Refresh token failed', refreshError);

        // 로그인 페이지로 리다이렉트
        if (
          window.location.pathname !== '/signin' &&
          window.location.pathname !== '/signupform'
        ) {
          window.location.href = '/signin';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
