import { useState } from "react";
import type { Product } from "../types/product";
import { useCartContext } from "../context/useCartContext";

interface AddToCartButtonProps {
  product: Product;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
  const { items, addToCart } = useCartContext();
  const [feedback, setFeedback] = useState(false);

  // Find if product is already in cart and get its quantity
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(product);
    setFeedback(true);
    setTimeout(() => setFeedback(false), 500);
  };

  // Common button styling
  const baseClass =
    "mt-4 w-full rounded-md px-4 py-2 text-white transition-colors flex items-center justify-center gap-2";

  if (quantity > 0) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`${baseClass} bg-green-600 hover:bg-green-700`}
      >
        { `In Cart (${quantity})`}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`${baseClass} bg-blue-600 hover:bg-blue-700`}
    >
      {feedback ? "✓ Added!" : "Add to Cart"}
    </button>
  );
}

export default AddToCartButton;
