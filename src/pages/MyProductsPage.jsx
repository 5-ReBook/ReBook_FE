import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import axios from 'axios';

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Header
        title="ReBook"
        leftChild={
          <button onClick={toggleSidebar}>=</button>
        }
      />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <ProductList products={products} />
    </div>
  );
};

export default MyProductsPage;
