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
    lastProductId: null, // 마지막 제품의 ID 추가
    lastPrice: null, // 마지막 제품의 가격 추가
  });
  const [isLoading, setIsLoading] = useState(false);
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
          fetchProducts(); // 새로운 데이터 가져오기
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, filters] // filters에 커서 값 추가
  );

  // API에서 데이터를 가져오는 함수
  const fetchProducts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    let url = `/products?sortOrder=${filters.sortOrder}&size=10`;

    // 마지막으로 조회한 제품의 ID와 가격을 커서로 사용
    if (filters.lastProductId) url += `&lastProductId=${filters.lastProductId}`;
    if (filters.lastPrice) url += `&lastPrice=${filters.lastPrice}`;

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

          // 중복된 제품을 필터링하고 새로운 데이터를 추가
          setProducts(prevProducts => {
            const filteredProducts = newProducts.filter(
              newProduct =>
                !prevProducts.some(
                  prevProduct => prevProduct.productId === newProduct.productId
                )
            );
            return [...prevProducts, ...filteredProducts];
          });

          if (
            newProducts.length === 0 ||
            newProducts[newProducts.length - 1].productId ===
              filters.lastProductId
          ) {
            setHasMore(false); // 더 이상 가져올 데이터가 없거나 마지막 데이터가 같을 경우
          } else {
            // 마지막 제품의 ID와 가격을 업데이트
            const lastProduct = newProducts[newProducts.length - 1];
            setFilters(prevFilters => ({
              ...prevFilters,
              lastProductId: lastProduct.productId,
              lastPrice: lastProduct.price,
            }));
          }
        } else {
          // 응답에 데이터가 없는 경우
          setHasMore(false);
        }
      })
      .catch(error => console.error('Error fetching products:', error))
      .finally(() => setIsLoading(false));
  }, [filters, isLoading, hasMore]);

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
  }, [setLayoutConfig, filters]); // filters에 의존성 추가

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      lastProductId: null, // 필터 변경 시 커서 초기화
      lastPrice: null,
    });
  };

  const onClickSearchButton = () => {
    setProducts([]);
    setFilters(prevFilters => ({
      ...prevFilters,
      lastProductId: null, // 검색 시 커서를 초기화
      lastPrice: null,
    }));
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
