import ProductList from "../components/ProductList";
import useProducts from "../hooks/useProducts";

function ProductsPage() {
  const { products, status, retry } = useProducts();

  if (status === "loading") {
    return <p>Loading products...</p>;
  }

  if (status === "error") {
    return (
      <div>
        <p>Failed to load products.</p>

        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={retry}
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "success" && products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <section>
      <h2 className="mb-2 text-3xl font-bold">Products</h2>

      <ProductList products={products} />
    </section>
  );
}
export default ProductsPage;
