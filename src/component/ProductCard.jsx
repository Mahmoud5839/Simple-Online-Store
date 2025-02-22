const ProductCard = ({ product }) => {
  if (!product) {
    return <p>Loading....</p>;
  }

  console.log("Product Image URL:", product.image);

  const addtCart = () => {
    console.log(true);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={addtCart}>Add To Cart</button>
    </div>
  );
};

export default ProductCard;
