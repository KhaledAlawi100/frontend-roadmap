interface ProductImageProps {
  src: string;
  alt: string;
}

function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <img src={src} alt={alt} className=" h-64 w-full object-contain p-6  " />
  );
}

export default ProductImage;
