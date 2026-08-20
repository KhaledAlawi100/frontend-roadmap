// import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import ProductList from "../components/ProductList";

function ProductsPage() {
  const products: Product[] = [
    {
      id: 1,
      title: "Example Product",
      price: 29.99,
      description: "Example product description",
      category: "electronics",
      image:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      rating: {
        rate: 4.5,
        count: 100,
      },
    },
    {
      id: 2,
      title: "Example Product",
      price: 29.99,
      description: "Example product description",
      category: "electronics",
      image:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      rating: {
        rate: 4.5,
        count: 100,
      },
    },
    {
      id: 3,
      title: "Example Product",
      price: 29.99,
      description: "Example product description",
      category: "electronics",
      image:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      rating: {
        rate: 4.5,
        count: 100,
      },
    },
    {
      id: 4,
      title: "Example Product",
      price: 29.99,
      description: "Example product description",
      category: "electronics",
      image:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      rating: {
        rate: 4.5,
        count: 100,
      },
    },
  ];

  return (
    <section>
      <h2 className="text-3xl mb-2 font-bold">Products</h2>

      <ProductList products={products} />
    </section>
  );
}

export default ProductsPage;
