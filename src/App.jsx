import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import Layout from './components/Layouts/Layout';
import MainPage from './pages/Product/MainPage';
import Signin from './pages/Signin/Signin';
import ProductRegistrationPage from './pages/Product/ProductRegistrationPage';
import ProductDetailPage from './pages/Product/ProductDetailPage';
import ProductEditPage from './pages/Product/ProductEditPage';
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
import { useLoginInfo } from './provider/LoginInfoProvider';

function App() {
  const { setLoginInfo } = useLoginInfo();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/members/me');
        setLoginInfo(response.data.result);

        if (
          response.status === HttpStatusCode.Ok &&
          (location.pathname === '/signin' ||
            location.pathname === '/signupform')
        ) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error with Authorize:', error);
        if (
          location.pathname !== '/signin' &&
          location.pathname !== '/signupform' &&
          location.pathname !== '/findpassword'
        ) {
          navigate('/signin');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, setLoginInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
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
          <Route
            path="/products/edit/:productId"
            element={<ProductEditPage />}
          />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/chat/roomlist" element={<ChatRoomListPage />} />
          <Route path="/chat/rooms/:id" element={<ChatRoomPage />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
