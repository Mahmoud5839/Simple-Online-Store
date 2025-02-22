import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../component/ProductCard";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("asc");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Check if user is login or register
    if (!user) {
      navigate("/register");
      return;
    } else if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    let filtered = products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) &&
          (category === "all" || p.category === category)
      )
      .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

    setFilteredProducts(filtered);
  }, [search, category, sort, products]);

  if (loading) {
    return <p>Loading products...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="products-page">
      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="men's clothing">Mens Clothing</option>
          <option value="women's clothing">Womens Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => {
                if (!localStorage.getItem("user")) {
                  navigate("/login");
                }
              }}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
