import { Link } from "react-router-dom";

function ProductDetailsPage() {
  return (
    <section>
      <h2 className="text-3xl font-bold">Product Details</h2>

      <p className="mt-2 text-gray-600">
        Product details will be displayed here.
      </p>
      <Link
        to="/products"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        ← Back to Products
      </Link>
    </section>
  );
}

export default ProductDetailsPage;
