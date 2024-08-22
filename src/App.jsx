import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layouts/Layout';

const MainPage = lazy(() => import('./pages/MainPage'));
const Signin = lazy(() => import('./pages/Signin/Signin'));
const SignupForm = lazy(() => import('./pages/Signup/SignupForm'));
const FindPassword = lazy(() => import('./pages/FindPassword/FindPassword'));
const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
const UpdateUniversity = lazy(
  () => import('./pages/UpdateUniversity/UpdateUniversity')
);
const UpdateMajors = lazy(() => import('./pages/UpdateMajors/UpdateMajors'));
const ProductRegistrationPage = lazy(
  () => import('./pages/Product/ProductRegistrationPage')
);
const ProductDetailPage = lazy(
  () => import('./pages/Product/ProductDetailPage')
);
const MyProductsPage = lazy(() => import('./pages/Product/MyProductsPage'));
const ChatRoomListPage = lazy(() => import('./pages/Chat/ChatRoomListPage'));
const ChatRoomPage = lazy(() => import('./pages/Chat/ChatRoomPage'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import('./App.css');
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
        {/* TODO : 로딩 스피너 만들기 */}
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route
              path="/signin"
              element={!isAuthenticated ? <Signin /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? <MainPage /> : <Navigate to="/signin" />
              }
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
                isAuthenticated ? (
                  <UpdateUniversity />
                ) : (
                  <Navigate to="/signin" />
                )
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
                isAuthenticated ? (
                  <ChatRoomListPage />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/chat/room/:id"
              element={
                isAuthenticated ? <ChatRoomPage /> : <Navigate to="/signin" />
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
