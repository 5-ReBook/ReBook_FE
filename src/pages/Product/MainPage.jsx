import { useEffect, useState, useCallback, useRef } from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import FilterBar from '../../components/Product/FilterBar';
import ProductList from '../../components/Product/ProductList';
import './MainPage.css';
import {
  defaultLayoutConfig,
  useLayout,
} from '../../components/Layouts/provider/LayoutProvider';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    filterType: 'title',
    searchInput: '',
    minPrice: '',
    maxPrice: '',
    sortOrder: 'asc',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { setLayoutConfig } = useLayout();

  const observer = useRef();

  const lastProductElementRef = useCallback(
    node => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchProducts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    let url = `/products?order=${filters.sortOrder}&page=${currentPage}&size=10`;

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

    AxiosInstance.get(url)
      .then(response => {
        if (response.data && response.data.content) {
          const newProducts = response.data.content;
          setProducts(prevProducts => [...prevProducts, ...newProducts]);
          setHasMore(response.data.currentPage + 1 < response.data.totalPages);

          if (response.data.currentPage + 1 >= response.data.totalPages) {
            observer.current.disconnect(); // 데이터 로드가 완료되면 Observer 해제
          }
        }
      })
      .catch(error => console.error('Error fetching products:', error))
      .finally(() => setIsLoading(false));
  }, [filters, currentPage, isLoading, hasMore]);

  useEffect(() => {
    setLayoutConfig({
      header: true,
      leftButton: 'none',
      footerNav: true,
    });

    // 컴포넌트가 언마운트될 때 레이아웃을 기본값으로 복원
    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, defaultLayoutConfig]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setProducts([]);
    setCurrentPage(0);
    setHasMore(true);
  };

  const onClickSearchButton = () => {
    setProducts([]);
    setCurrentPage(0);
    fetchProducts();
  };

  return (
    <div className="product-list">
      <FilterBar
        filters={filters}
        onInputChange={handleInputChange}
        onClickSearchButton={onClickSearchButton}
      />
      <ProductList
        products={products}
        lastProductElementRef={lastProductElementRef}
      />
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default MainPage;
