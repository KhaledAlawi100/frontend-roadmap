// useProducts.ts
import { useCallback, useEffect, useState, useRef } from "react";
import type { Product } from "../types/product";
import productService from "../services/productService";

type RequestStatus = "idle" | "loading" | "success" | "error";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const hasMounted = useRef(false);

  const fetchProducts = useCallback(async () => {
    try {
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

  return {
    products,
    status,
    retry: fetchProducts,
  };
}

export default useProducts;
