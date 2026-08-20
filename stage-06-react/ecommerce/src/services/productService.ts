import api from "./api";
import type { Product } from "../types/product";

const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");

    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);

    return response.data;
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get<string[]>("/products/categories");

    return response.data;
  },
};

export default productService;
