import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import MainPage from './pages/MainPage';
import Signin from './pages/Signin/Signin';
import ProductRegistrationPage from './pages/Product/ProductRegistrationPage';
import ProductDetailPage from './pages/Product/ProductDetailPage';
import MyProductsPage from './pages/Product/MyProductsPage';
import SignupForm from './pages/Signup/SignupForm';
import FindPassword from './pages/FindPassword/FindPassword';
import MyPage from './pages/MyPage/MyPage';
import './App.css';
import UpdateUniversity from './pages/UpdateUniversity/UpdateUniversity';
import UpdateMajors from './pages/UpdateMajors/UpdateMajors';
import ChatRoomListPage from './pages/Chat/ChatRoomListPage';
import ChatRoomPage from './pages/Chat/ChatRoomPage';
import AxiosInstance from './api/AxiosInstance';
import { HttpStatusCode } from 'axios';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    AxiosInstance.get('/members/me')
      .then(response => {
        if (
          response.status === HttpStatusCode.Ok &&
          location.pathname === '/signin'
        ) {
          navigate('/'); // 인증 성공 시에만 리다이렉트
        }
      })
      .catch(error => {
        console.error('Error with Authorize:', error);
        if (location.pathname !== '/signin') {
          navigate('/signin'); // 인증 실패 시에만 리다이렉트
        }
      })
      .finally(() => setIsLoading(false)); // 로딩 완료
  }, [navigate]); // navigate를 의존성 배열에 추가

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시될 화면
  }

  return (
    <ChakraProvider>
      <Layout>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/signupform" element={<SignupForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myunv" element={<UpdateUniversity />} />
          <Route path="/mymajors" element={<UpdateMajors />} />
          <Route path="/products/new" element={<ProductRegistrationPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/products/me" element={<MyProductsPage />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/chat/roomlist" element={<ChatRoomListPage />} />
          <Route path="/chat/room/:id" element={<ChatRoomPage />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
