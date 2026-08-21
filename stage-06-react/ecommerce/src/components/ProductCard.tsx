import { Link } from "react-router-dom";
import type { Product } from "../types/product";

import ProductImage from "./ProductImage";

import ProductPrice from "./ProductPrice";
import { useCartContext } from "../context/useCartContext";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();
  return (
    <article className="overflow-hidden rounded-lg delay-150 duration-300 bg-white shadow transition-transform hover:-translate-y-2">
      <ProductImage src={product.image} alt={product.title} />

      <div className="p-4">
        <p className="text-sm capitalize text-gray-500">{product.category}</p>
        <h3 className="mt-1 line-clamp-2 text-lg font-semibold">
          {product.title}
        </h3>
        <div className="mt-3">
          <ProductPrice price={product.price} />
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <span>⭐ {product.rating.rate}</span>
          <span>({product.rating.count})</span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <Link
          to={`/products/${product.id}`}
          className="mt-4 block rounded-md bg-black px-4 py-2 text-center text-white hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
