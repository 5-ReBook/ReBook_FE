import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Signin from "./pages/Signin/Signin";
import ProductRegistrationPage from "./pages/ProductRegistrationPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MyProductsPage from "./pages/ProductDetailPage";


function App() {
  const isAuthenticated = localStorage.getItem("Authorization");

  return (
    <Routes>
      <Route
        path="/signin"
        element={!isAuthenticated ? <Signin /> : <Navigate to="/products"/>}
      />
      <Route
        path="/"
        element={isAuthenticated ? <MainPage/> : <Navigate to="/signin"/>}
      />
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
  );
}

export default App;
