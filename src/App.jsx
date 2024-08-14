import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './views/Signin/Signin';

function Product() {
  return <h1>Product 페이지입니다.</h1>;
}

function App() {
  const isAuthenticated = localStorage.getItem('Authorization');

  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;