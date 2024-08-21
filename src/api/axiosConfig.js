import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Content-Type': 'application/json',
  },
  //   timeout: 5000, // 5초 후에 타임아웃 발생
});

// 액세스 토큰을 모든 요청에 자동으로 추가
api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('Authorization');
    if (accessToken) {
      config.headers.Authorization = `access=${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // if (!error.response) {
    //   console.error('Unknown error occurred, but assuming 401:', error);
    //   error.response = { status: 401 }; // 임의로 401로 설정
    // }

    // 401 에러 발생시
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Token expired. Trying to refresh...');

      try {
        // 리프레시 토큰을 사용해 새로운 액세스 토큰 발급
        const response = await axios.post(
          'http://localhost/auth/members/refreshtoken/reissue',
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
        originalRequest.headers.Authorization = `access=${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 갱신이 실패하면 사용자 로그아웃 처리 등의 로직 추가
        console.error('Refresh token failed', refreshError);
        // 쿠키 강제로 만료 시킨 후 로그인 페이지로 리다이렉트
        document.cookie =
          'refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
