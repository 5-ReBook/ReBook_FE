import { useEffect, useState } from 'react';
import api from '../../api/AxiosInstance';
import FilterBar from '../../components/Product/FilterBar';
import ProductList from '../../components/Product/ProductList';
import Sidebar from '../../components/SideBar';

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

  const fetchProducts = () => {
    let url = `/products?order=${filters.sortOrder}`;

    // 필터 값이 있으면 추가
    if (filters.minPrice) url += `&minPrice=${filters.minPrice}`;
    if (filters.maxPrice) url += `&maxPrice=${filters.maxPrice}`;
    if (filters.searchInput) {
      if (filters.filterType === 'title') {
        url += `&title=${filters.searchInput}`;
      } else if (filters.filterType === 'university') {
        url += `&university=${filters.searchInput}`;
      } else if (filters.filterType === 'major') {
        url += `&major=${filters.searchInput}`;
      }
    }

    // 변경된 부분: api 인스턴스로 API 호출
    api
      .get(url)
      .then(response => {
        if (response.data.status === 'OK') {
          setProducts(response.data.result);
        } else {
          console.error('Failed to fetch products:', response.data.message);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    setLayoutConfig;
    fetchProducts();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const onClickSearchButton = () => {
    fetchProducts();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
