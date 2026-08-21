import { useEffect, useMemo, useState } from "react";
import ProductList from "../components/ProductList";
import useProducts from "../hooks/useProducts";
import productService from "../services/productService";

function ProductsPage() {
  const { products, status, retry } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    productService.getCategories().then(setCategories).catch(console.error);
  }, []);

  const displayProducts = useMemo(() => {
    // Filter
    const filtered = products.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      if (
        searchTerm &&
        !product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    // Sort
    switch (sortOption) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [products, searchTerm, selectedCategory, sortOption]);

  if (status === "loading") {
    return <p>Loading products...</p>;
  }

  if (status === "error") {
    return (
      <div>
        <p>Failed to load products.</p>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={retry}
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "success" && products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="mb-2 text-3xl font-bold">Products</h2>

      {/* Filters bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48"
        >
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
        </select>
      </div>

      {/* Product list or empty state */}
      {displayProducts.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">
          No products match your criteria.
        </p>
      ) : (
        <ProductList products={displayProducts} />
      )}
    </section>
  );
}

export default ProductsPage;
