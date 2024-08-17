import { Routes, Route, Navigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import Signin from './pages/Signin/Signin';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MyProductsPage from './pages/MyProductsPage';
import SignupForm from './pages/Signup/SignupForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasAccess = localStorage.getItem('Authorization');
    const hasRefresh = Cookies.get('refresh');

    if (hasAccess && hasRefresh) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else if (!hasAccess && hasRefresh) {
      // 리프레시 토큰이 있으면 새로 액세스 토큰을 발급받습니다.
      axios
        .post(
          'https://localhost/auth/members/refreshtoken/reissue',
          {},
          {
            withCredentials: true,
          }
        )
        .then(response => {
          // 응답 헤더에서 액세스 토큰을 추출합니다.
          const newAccessToken = response.headers.access;
          if (newAccessToken) {
            localStorage.setItem('Authorization', newAccessToken);
            setIsAuthenticated(true);
          } else {
            throw new Error('Access token is missing in response');
          }
        })
        .catch(() => {
          // 토큰 재생성 실패하면 로그인 페이지로 보냅니다.
          Cookies.remove('refresh');
          localStorage.removeItem('Authorization');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // 액세스도 없고 리프레쉬도 없으면 로그인 페이지로 보냅니다.
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시될 화면
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to="/products" />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <MainPage /> : <Navigate to="/signin" />}
        />
        <Route path="/signupform" element={<SignupForm />} />
        <Route path="/products/new" element={<ProductRegistrationPage />} />
        <Route path="/products/detail" element={<ProductDetailPage />} />
        <Route path="/products/me" element={<MyProductsPage />} />

        {/* <Route path="*" element={<Navigate to="/"></Navigate>} */}
      </Routes>
    </div>
  );
}

export default App;
