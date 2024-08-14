import ProductListItem from './ProductListItem';

const ProductList = ({ products }) => {
  return (
    <div className="ProductList">
      {products.map((product) => (
        <ProductListItem
          key={product.productId}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductList;
