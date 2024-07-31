import axios from 'axios';

/* 
    모든 요청에 자동으로 Authorization 토큰 추가함
    모든 응답에서 401(unauthorized)나 
    500(spring security 필터 오류도 500 처리되어서 넣음)
    가 반환되면 자동으로 액세스 토큰과 리프레시 토큰 재발급함
    -> 로그아웃 직접 누르기 전까지는 로그인 연장됨
*/

// Axios 인스턴스 생성
const AuthAxios = axios.create({
  baseURL: 'http://localhost:8080', // API의 기본 URL
});

// 요청 인터셉터 설정
AuthAxios.interceptors.request.use(
  config => {
    // 요청을 보내기 전에 수행할 작업
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 모든 요청에 access 토큰 추가
    }
    return config;
  },
  error => {
    // 요청 오류가 있는 경우
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
AuthAxios.interceptors.response.use(
  response => response, // 성공적인 응답은 그대로 반환
  async error => {
    const originalRequest = error.config;

    // 401, 500 에러 및 요청 반복 방지 확인
    if (
      (error.response.status === 500 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 요청 (쿠키 포함)
        const refreshResponse = await axios.post(
          'http://localhost:8080/members/refreshtoken',
          {}, // 본문에 데이터가 필요하지 않으면 빈 객체 전달
          {
            withCredentials: true, // 이 요청에만 쿠키 포함
          },
        );

        // 새로 받은 access 토큰을 localStorage에 저장
        const newAccessToken = refreshResponse.headers['access'];
        localStorage.setItem('Authorization', newAccessToken);

        // 기존 요청에 새로운 access 토큰을 헤더에 추가하여 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 새로운 요청을 보냄
        return AuthAxios(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시, 사용자 로그아웃 처리 및 로그인 페이지로 리디렉션
        localStorage.removeItem('Authorization');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 기타 오류의 경우
    return Promise.reject(error);
  },
);

export default AuthAxios;
