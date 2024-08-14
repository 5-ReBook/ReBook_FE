import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MyProductsPage from './pages/MyProductsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/products/new"
          element={<ProductRegistrationPage />}
        />
        <Route
          path="/products/detail"
          element={<ProductDetailPage />}
        />
        <Route
          path="/products/me"
          element={<MyProductsPage />}
        />
      </Routes>
    </>
  );
}

export default App;
