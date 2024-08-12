import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProductDetailPage from './pages/ProductDetailPage';

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
      </Routes>
    </>
  );
}

export default App;
