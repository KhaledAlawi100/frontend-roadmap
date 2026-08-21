import { useCallback, useEffect, useState, useRef } from "react";
import type { Product } from "../types/product";
import productService from "../services/productService";

type RequestStatus = "idle" | "loading" | "success" | "error";

function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const hasMounted = useRef(false);

  const fetchProduct = useCallback(async () => {
    try {
      setStatus("loading");

      const data = await productService.getProductById(id);

      setProduct(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    if (!hasMounted.current) {
      fetchProduct();
    }
  }, [fetchProduct]);

  return {
    product,
    status,
    retry: fetchProduct,
  };
}

export default useProduct;
