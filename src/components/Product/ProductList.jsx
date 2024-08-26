import ProductListItem from './ProductListItem';

const ProductList = ({ products, lastProductElementRef }) => {
  return (
    <ul className="ProductList">
      {products.map((product, index) => {
        const uniqueKey = `${product.productId}-${index}`; // productId에 index를 결합하여 고유 키 생성
        if (products.length === index + 1) {
          return (
            <li ref={lastProductElementRef} key={uniqueKey}>
              <ProductListItem key={uniqueKey} product={product} />
            </li>
          );
        } else {
          return (
            <li key={uniqueKey}>
              <ProductListItem key={uniqueKey} product={product} />
            </li>
          );
        }
      })}
    </ul>
  );
};

export default ProductList;
