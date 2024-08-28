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
  const [lastId, setLastId] = useState(null); // lastId를 사용하여 No-Offset Pagination 구현
  const [hasMore, setHasMore] = useState(true);
  const { setLayoutConfig } = useLayout();

  const observer = useRef();

  // IntersectionObserver를 사용하여 리스트의 마지막 요소를 감지
  const lastProductElementRef = useCallback(
    node => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchProducts(); // lastId 기반으로 새로운 데이터를 가져옴
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // API에서 데이터를 가져오는 함수
  const fetchProducts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    let url = `/products?order=${filters.sortOrder}&size=10`;

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

    if (lastId) {
      url += `&lastId=${lastId}`; // lastId를 쿼리 파라미터로 추가
    }

    AxiosInstance.get(url)
      .then(response => {
        if (response.data && response.data.content) {
          const newProducts = response.data.content;
          setProducts(prevProducts => [...prevProducts, ...newProducts]);

          // 새로운 lastId를 설정 (마지막 요소의 ID)
          if (newProducts.length > 0) {
            setLastId(newProducts[newProducts.length - 1].productId);
          }

          // 더 이상 가져올 데이터가 없으면 hasMore를 false로 설정
          setHasMore(newProducts.length === 10); // 페이지 사이즈만큼의 데이터가 있을 때만 더 가져올 수 있음
        }
      })
      .catch(error => console.error('Error fetching products:', error))
      .finally(() => setIsLoading(false));
  }, [filters, lastId, isLoading, hasMore]);

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
  }, [setLayoutConfig]);

  useEffect(() => {
    fetchProducts(); // 컴포넌트 마운트 시 데이터 로드
  }, []); // lastId에 의존하지 않도록 빈 배열로 설정

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setProducts([]);
    setLastId(null); // lastId를 초기화
    setHasMore(true);
  };

  const onClickSearchButton = () => {
    setProducts([]);
    setLastId(null); // lastId를 초기화
    setHasMore(true);
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
