import { Link } from "react-router-dom";
function ProductsPage() {
  return (
    <section>
      <h2 className="text-3xl font-bold">Products</h2>

      <div>
        <Link to="/products/1" className="text-blue-600 hover:underline">
          View Product 1
        </Link>
      </div>
    </section>
  );
}

export default ProductsPage;
