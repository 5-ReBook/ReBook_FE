import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import axios from 'axios';

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('/src/db/productlist.json')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(
          'There was an error fetching the products!',
          error
        );
      });
  }, []);

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default MyProductsPage;
