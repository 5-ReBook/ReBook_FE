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
    sortOrder: 'recent',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // offset pagination에서 페이지 번호를 사용
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
          setCurrentPage(prevPage => prevPage + 1); // 다음 페이지로 이동
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

    let url = `/products?sortOrder=${filters.sortOrder}&page=${currentPage}&size=10`;

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

          // 더 이상 가져올 데이터가 없으면 hasMore를 false로 설정
          setHasMore(newProducts.length === 10); // 페이지 사이즈만큼의 데이터가 있을 때만 더 가져올 수 있음
        }
      })
      .catch(error => console.error('Error fetching products:', error))
      .finally(() => setIsLoading(false));
  }, [filters, currentPage, isLoading, hasMore]);

  useEffect(() => {
    setLayoutConfig({
      header: true,
      leftButton: 'goBack',
      footerNav: true,
    });

    fetchProducts(); // 컴포넌트 마운트 시 데이터 로드

    // 컴포넌트가 언마운트될 때 레이아웃을 기본값으로 복원
    return () => {
      setLayoutConfig(defaultLayoutConfig);
    };
  }, [setLayoutConfig, currentPage]); // currentPage에 의존하도록 변경

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const onClickSearchButton = () => {
    setProducts([]);
    setCurrentPage(0); // 검색 시 페이지를 초기화
    setHasMore(true);
    fetchProducts(); // 검색 버튼 클릭 시에만 fetchProducts를 호출
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
