import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layouts/Layout';
import MainPage from './pages/MainPage';
import Signin from './pages/Signin/Signin';
import ProductRegistrationPage from './pages/Product/ProductRegistrationPage';
import ProductDetailPage from './pages/Product/ProductDetailPage';
import MyProductsPage from './pages/Product/MyProductsPage';
import SignupForm from './pages/Signup/SignupForm';
import FindPassword from './pages/FindPassword/FindPassword';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
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
