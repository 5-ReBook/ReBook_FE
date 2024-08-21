import React from 'react';

const FilterBar = ({ filters, onInputChange, onClickSearchButton }) => {
  return (
    <div className="FilterBar">
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
      <button type="button" onClick={onClickSearchButton}>
        {' '}
        🔍{' '}
      </button>
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
          <option value="asc">낮은 가격순</option>
          <option value="desc">높은 가격순</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
