import type { Product } from "../types/product";
import { useCartContext } from "../context/useCartContext";

interface AddToCartButtonProps {
  product: Product;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCartContext();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
