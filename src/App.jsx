import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Signin from './pages/Signin/Signin';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MyProductsPage from './pages/MyProductsPage';
import SignupForm from './pages/Signup/SignupForm';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('Authorization');

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
        <Route path="/products/new" element={<ProductRegistrationPage />} />
        <Route path="/products/detail" element={<ProductDetailPage />} />
        <Route path="/products/me" element={<MyProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
