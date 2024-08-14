import { useEffect, useState } from 'react';
import FilterBar from '../components/Product/FilterBar';
import ProductList from '../components/Product/ProductList';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import axios from 'axios';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    filterType: 'title',
    searchInput: '',
    minPrice: '',
    maxPrice: '',
    sortOrder: 'asc',
  });
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

  // useEffect(() => {
  //   // 데이터 가져오기
  //   axios
  //     .get('https://localhost/products')
  //     .then((response) => {
  //       if (response.data.status === 'OK') {
  //         setProducts(response.data.result);
  //       } else {
  //         console.error(
  //           'Failed to fetch products:',
  //           response.data.message
  //         );
  //       }
  //     })
  //     .catch((error) =>
  //       console.error('Error fetching products:', error)
  //     );
  // }, []);

  //   const fetchProducts = () => {
  //     let url = `/api/products?sortOrder=${filters.sortOrder}`;

  //     // 필터 값이 있으면 추가
  //     if (filters.minPrice)
  //       url += `&minPrice=${filters.minPrice}`;
  //     if (filters.maxPrice)
  //       url += `&maxPrice=${filters.maxPrice}`;
  //     if (filters.searchInput)
  //       url += `&search=${filters.searchInput}`;

  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => setProducts(data))
  //       .catch((error) =>
  //         console.error('Error fetching products:', error)
  //       );
  //   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const onClickSearchButton = () => {
    // TODO : 검색 버튼 클릭 시의 로직
  };

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
      <FilterBar
        filters={filters}
        onInputChange={handleInputChange}
        onClickSearchButton={onClickSearchButton}
      />
      <ProductList products={products} />
    </div>
  );
};

export default MainPage;
