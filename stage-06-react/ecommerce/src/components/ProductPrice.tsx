import sarIcon from "../assets/Saudi_Riyal_Symbol-2.svg";

interface ProductPriceProps {
  price: number;
}

function ProductPrice({ price }: ProductPriceProps) {
  return (
    <>
      <p className="text-xl font-fold text-gray-900">
        <img src={sarIcon} alt="SAR" className="w-5 h-5  inline-block" />

        <span className="ml-2">{price.toFixed(2)}</span>
      </p>
    </>
  );
}

export default ProductPrice;
