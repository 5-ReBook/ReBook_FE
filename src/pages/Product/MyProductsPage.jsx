import { useEffect, useState } from 'react';
import ProductList from '../../components/Product/ProductList';
import AxiosInstance from '../../api/AxiosInstance';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';
import './MyProductsPage.css';

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { setLayoutConfig } = useLayout();

  useEffect(() => {
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: true,
    });

    // 컴포넌트가 언마운트될 때 레이아웃을 기본값으로 복원
    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, defaultLayoutConfig]);

  useEffect(() => {
    AxiosInstance.get('/products/me')
      .then(response => {
        setProducts(response.data.result);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="my-product-list">
      <h2 className="my-product-title">내가 쓴글</h2>
      <ProductList products={products} />
    </div>
  );
};

export default MyProductsPage;
