import { Link, useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import AddToCartButton from "../components/AddToCartButton";

// Small arrow SVG icon – can be extracted later if needed
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { product, status, retry } = useProduct(productId);

  if (status === "loading") {
    return <p className="p-8 text-center">Loading product...</p>;
  }

  if (status === "error") {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Failed to load product.</p>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={retry}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return <p className="p-8 text-center">Product not found.</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Back button with SVG arrow */}
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeftIcon />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 w-full max-w-sm object-contain"
          />
        </div>

        <div>
          <p className="mb-2 text-sm capitalize text-gray-500">
            {product.category}
          </p>
          <h2 className="mb-4 text-3xl font-bold">{product.title}</h2>
          <p className="mb-4 text-2xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-6 text-gray-600">{product.description}</p>

          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-gray-700">Rating:</span>
            <span className="text-sm font-medium text-gray-900">
              {product.rating.rate} / 5
            </span>
            <span className="text-sm text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
