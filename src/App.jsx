import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layouts/Layout';
import MainPage from './pages/MainPage';
import Signin from './pages/Signin/Signin';
import ProductRegistrationPage from './pages/Product/ProductRegistrationPage';
import ProductDetailPage from './pages/Product/ProductDetailPage';
import MyProductsPage from './pages/Product/MyProductsPage';
import SignupForm from './pages/Signup/SignupForm';
import FindPassword from './pages/FindPassword/FindPassword';
import MyPage from './pages/MyPage/MyPage';
import './App.css';
import UpdateUniversity from './pages/UpdateUniversity/UpdateUniversity';
import UpdateMajors from './pages/UpdateMajors/UpdateMajors';
import ChatRoomListPage from './pages/Chat/ChatRoomListPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasAccess = localStorage.getItem('Authorization');

    setIsAuthenticated(!!hasAccess);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시될 화면
  }

  return (
    <ChakraProvider>
      <Layout>
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
            path="/mypage"
            element={isAuthenticated ? <MyPage /> : <Navigate to="/signin" />}
          />
          {/* TODO /mypage/unv 로 path 지정했을 때 이미지 로드 안되는 버그 왜인지 알아보기 */}
          <Route
            path="/myunv"
            element={
              isAuthenticated ? <UpdateUniversity /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/mymajors"
            element={
              isAuthenticated ? <UpdateMajors /> : <Navigate to="/signin" />
            }
          />
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
              isAuthenticated ? (
                <ProductDetailPage />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/products/me"
            element={
              isAuthenticated ? <MyProductsPage /> : <Navigate to="/signin" />
            }
          />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route
            path="/chat/roomlist"
            element={
              isAuthenticated ? <ChatRoomListPage /> : <Navigate to="/signin" />
            }
          />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
