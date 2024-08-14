import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProductRegistrationPage from "./pages/ProductRegistrationPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MyProductsPage from "./pages/MyProductsPage";

function App() {
  const isAuthenticated = localStorage.getItem("Authorization");

  return (
    <>
      <Routes>
        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to="/product" />}
        />
        <Route
          path="/product"
          element={isAuthenticated ? <Product /> : <Navigate to="/signin" />}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/product" : "/signin"} />}
        />
        <Route path="/" element={<MainPage />} />
        <Route path="/products/new" element={<ProductRegistrationPage />} />
        <Route path="/products/detail" element={<ProductDetailPage />} />
        <Route path="/products/me" element={<MyProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
