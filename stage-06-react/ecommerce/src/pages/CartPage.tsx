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
            className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow"
          >
            <div>
              <h3 className="font-semibold">{item.product.title}</h3>

              <p className="text-gray-600">${item.product.price.toFixed(2)}</p>

              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>

            <div className=" mt-7 flex items-center  gap-2">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.product.id)}
                className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                type="button"
                onClick={() => increaseQuantity(item.product.id)}
                className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
                className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <p className="text-gray-600">
          Items: <span className="font-semibold">{itemCount}</span>
        </p>

        <p className="mt-2 text-xl font-bold">Total: ${total.toFixed(2)}</p>

        <button
          type="button"
          onClick={clearCart}
          className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Clear Cart
        </button>
      </div>
    </section>
  );
}

export default CartPage;
