import React, { useEffect, useState } from 'react';
import FilterBar from '../components/Product/FilterBar';
import ProductList from '../components/Product/ProductList';
import Header from '../components/Header';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    filterType: 'title',
    searchInput: '',
    minPrice: '',
    maxPrice: '',
    sortOrder: 'asc',
  });

  useEffect(() => {
    fetch('src/db/productlist.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error('Error fetching products', error)
      );
  }, []);

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

  return (
    <div>
      <Header title="ReBook" />
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
