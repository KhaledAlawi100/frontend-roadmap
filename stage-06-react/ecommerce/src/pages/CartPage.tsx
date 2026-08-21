import ViewDetailsButton from "../components/ViewDetailsButton";
import QuantityControl from "../components/QuantityControl";
import RemoveButton from "../components/RemoveButton";
import { useCartContext } from "../context/useCartContext";

function CartPage() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
    itemCount,
  } = useCartContext();

  if (items.length === 0) {
    return (
      <section>
        <h2 className="text-3xl font-bold">Shopping Cart</h2>

        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-bold">Shopping Cart</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow transition hover:shadow-lg md:flex-row md:items-center md:justify-between"
          >
            {/* Product information */}
            <div className="flex min-w-0 items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="h-20 w-20 shrink-0 rounded-md object-contain"
              />

              <div className="min-w-0">
                <h3 className="line-clamp-2 font-semibold">
                  {item.product.title}
                </h3>

                <p className="mt-1 text-gray-600">
                  ${item.product.price.toFixed(2)}
                </p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>

            {/* Cart controls */}
            <div className="flex flex-wrap items-center gap-3">
              <QuantityControl
                quantity={item.quantity}
                onDecrease={() => decreaseQuantity(item.product.id)}
                onIncrease={() => increaseQuantity(item.product.id)}
              />

              <ViewDetailsButton productId={item.product.id} />

              <RemoveButton onClick={() => removeFromCart(item.product.id)} />
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <p className="text-gray-600">
          Items: <span className="font-semibold">{itemCount}</span>
        </p>

        <p className="mt-2 text-xl font-bold">Total: ${total.toFixed(2)}</p>

        <button
          type="button"
          onClick={clearCart}
          className="mt-4 h-9 rounded-md bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Clear Cart
        </button>
      </div>
    </section>
  );
}

export default CartPage;
