import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onInputChange, onClickSearchButton }) => {
  // 유효성 검사 함수
  const validateFilters = () => {
    // 검색어 유효성 검사 (입력된 경우에만 체크)
    if (filters.searchInput.trim() !== '' && filters.searchInput.length < 2) {
      alert('검색어는 최소 2자 이상 입력해주세요.');
      return false;
    }

    // 가격 유효성 검사 (입력된 경우에만 체크)
    if (filters.minPrice && parseInt(filters.minPrice, 10) < 0) {
      alert('최저가는 0 이상이어야 합니다.');
      return false;
    }

    if (filters.maxPrice && parseInt(filters.maxPrice, 10) < 0) {
      alert('최고가는 0 이상이어야 합니다.');
      return false;
    }

    if (
      filters.minPrice &&
      filters.maxPrice &&
      parseInt(filters.minPrice, 10) > parseInt(filters.maxPrice, 10)
    ) {
      alert('최저가는 최고가보다 클 수 없습니다.');
      return false;
    }

    return true;
  };

  const handleSearchClick = () => {
    if (validateFilters()) {
      onClickSearchButton();
    }
  };

  return (
    <div className="FilterBar">
      <div className="search-filter">
        <select
          name="filterType"
          onChange={onInputChange}
          value={filters.filterType}
        >
          <option value="title">제목</option>
          <option value="university">대학교</option>
          <option value="major">전공</option>
        </select>
        <input
          name="searchInput"
          onChange={onInputChange}
          value={filters.searchInput}
          placeholder="검색어를 입력하세요"
          type="text"
        />
        <button type="button" onClick={handleSearchClick}>
          🔍
        </button>
      </div>
      <div className="price-filter">
        <span>최저가</span>
        <input
          type="number"
          name="minPrice"
          placeholder="최저가"
          value={filters.minPrice}
          onChange={onInputChange}
          className="price-input"
        />
        <span>~ 최고가</span>
        <input
          type="number"
          name="maxPrice"
          placeholder="최고가"
          value={filters.maxPrice}
          onChange={onInputChange}
          className="price-input"
        />
        <select
          name="sortOrder"
          onChange={onInputChange}
          value={filters.sortOrder}
        >
          <option value="recent">최신순</option>
          <option value="asc">낮은 가격순</option>
          <option value="desc">높은 가격순</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
