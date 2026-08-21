import type { Product } from "../types/product";

import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import AddToCartButton from "./AddToCartButton";
import ViewDetailsButton from "./ViewDetailsButton";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow transition-transform delay-150 duration-300 hover:-translate-y-2">
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

        <AddToCartButton product={product} />

        <ViewDetailsButton productId={product.id} />
      </div>
    </article>
  );
}

export default ProductCard;
