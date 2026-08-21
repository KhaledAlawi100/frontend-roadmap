import { useParams } from "react-router-dom";

import useProduct from "../hooks/useProduct";

function ProductDetailsPage() {
 
  const { id } = useParams<{ id: string }>();

  const productId = Number(id);

  const { product, status, retry } = useProduct(productId);

  if (status === "loading") {
    return <p>Loading product...</p>;
  }

  if (status === "error") {
    return (
      <div>
        <p>Failed to load product.</p>

        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={retry}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="mx-auto h-96 object-contain"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-500">{product.category}</p>

        <h2 className="mb-4 text-3xl font-bold">{product.title}</h2>

        <p className="mb-4 text-2xl font-bold">${product.price}</p>

        <p className="mb-6 text-gray-600">{product.description}</p>

        <p className="mb-6">Rating: {product.rating.rate} / 5</p>

        <button className="rounded bg-black px-6 py-3 font-bold text-white hover:bg-gray-800">
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
