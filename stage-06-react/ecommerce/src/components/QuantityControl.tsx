interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityControlProps) {
  return (
    <div className="flex items-center rounded-md border border-gray-300">
      <button
        type="button"
        onClick={onDecrease}
        className="flex h-9 w-9 items-center justify-center rounded-l-md text-gray-700 transition hover:bg-gray-100"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-300 text-sm font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="flex h-9 w-9 items-center justify-center rounded-r-md text-gray-700 transition hover:bg-gray-100"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
