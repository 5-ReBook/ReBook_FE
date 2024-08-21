import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainPage from './pages/Product/MainPage';
import Signin from './pages/Signin/Signin';
import ProductRegistrationPage from './pages/Product/ProductRegistrationPage';
import ProductDetailPage from './pages/Product/ProductDetailPage';
import MyProductsPage from './pages/Product/MyProductsPage';
import SignupForm from './pages/Signup/SignupForm';
import './App.css';

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
          path="/products/:productId"
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
      </Routes>
    </div>
  );
}

export default App;
