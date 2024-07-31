import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Products from './pages/Product/Products';
import MyInfo from './pages/MyInfo/MyInfo';
import { UserProvider } from './context/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <UserProvider>
      <Router>
        <div style={{ minHeight: '100vh', position: 'relative' }}>
          <header>
            <h1>ReBook Logo</h1>
          </header>
          <main style={{ paddingBottom: '60px' }}>
            {' '}
            {/* Footer를 위한 공간 확보 */}
            <Routes>
              <Route
                path="/"
                element={
                  !isAuthenticated ? (
                    <Login onLogin={() => setIsAuthenticated(true)} />
                  ) : (
                    <Navigate to="/products" replace />
                  )
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/products"
                element={
                  isAuthenticated ? <Products /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/myinfo/*"
                element={
                  isAuthenticated ? <MyInfo /> : <Navigate to="/" replace />
                }
              />
            </Routes>
          </main>
          {isAuthenticated && <Footer />}{' '}
          {/* 로그인된 상태에서만 Footer 표시 */}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
