import type { Product } from "../types/product";
import ProductList from "../components/ProductList";
import { useState, useEffect, useCallback, useRef } from "react";
import productService from "../services/productService";

type RequestStatus = "idle" | "loading" | "success" | "error";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const hasMounted = useRef(false);

  const fetchProducts = useCallback(async () => {
    try {
      setStatus("loading");
      const data = await productService.getProducts();
      setProducts(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      fetchProducts();
    }
  }, [fetchProducts]);

  if (status === "loading") {
    return <p>Loading products...</p>;
  }

  if (status === "error") {
    return (
      <div>
        <p>Failed to load products.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchProducts}
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
    <section>
      <h2 className="text-3xl mb-2 font-bold">Products</h2>

      <ProductList products={products} />
    </section>
  );
}

export default ProductsPage;
