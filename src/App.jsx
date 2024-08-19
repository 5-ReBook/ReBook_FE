import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import Signin from './pages/Signin/Signin';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MyProductsPage from './pages/MyProductsPage';
import SignupForm from './pages/Signup/SignupForm';
import FindPassword from './pages/FindPassword/FindPassword';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasAccess = localStorage.getItem('Authorization');

    if (hasAccess) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      // 리프레시 토큰이 있다면 서버에 새 액세스 토큰 발급 요청
      axios
        .post(
          'http://localhost/auth/members/refreshtoken/reissue',
          {},
          {
            withCredentials: true, // HttpOnly 쿠키를 포함해 요청을 보냄
          }
        )
        .then(response => {
          const newAccessToken = response.headers.access;
          if (newAccessToken) {
            localStorage.setItem('Authorization', newAccessToken);
            setIsAuthenticated(true);
          } else {
            throw new Error('액세스 토큰 획득에 실패했습니다.');
          }
        })
        .catch(() => {
          localStorage.removeItem('Authorization');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
          element={!isAuthenticated ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <MainPage /> : <Navigate to="/signin" />}
        />
        <Route path="/signupform" element={<SignupForm />} />
        <Route
          path="/products/new"
          element={
            isAuthenticated ? (
              <ProductRegistrationPage />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/products/detail"
          element={
            isAuthenticated ? <ProductDetailPage /> : <Navigate to="/signin" />
          }
        />
        <Route
          path="/products/me"
          element={
            isAuthenticated ? <MyProductsPage /> : <Navigate to="/signin" />
          }
        />
        <Route path="/findpassword" element={<FindPassword />} />
      </Routes>
    </div>
  );
}

export default App;
