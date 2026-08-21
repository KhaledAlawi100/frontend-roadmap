import { Link } from "react-router-dom";

interface ViewDetailsButtonProps {
  productId: number;
}

function ViewDetailsButton({ productId }: ViewDetailsButtonProps) {
  return (
    <Link
      to={`/products/${productId}`}
      className="mt-4 block rounded-md bg-black px-4 py-2 text-center text-white hover:bg-gray-800"
    >
      View Details
    </Link>
  );
}

export default ViewDetailsButton;
