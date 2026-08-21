import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/useCartContext";

// Optional: you can extract these to a separate icons file later
const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

function Header() {
  const { itemCount } = useCartContext();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "border-b-2 border-blue-500 font-semibold text-blue-600"
      : "text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 transition-colors";

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo with SVG */}
        <NavLink to="/" className="flex items-center gap-2">
          <ShoppingBagIcon />
          <span className="text-2xl font-bold text-blue-600 hover:text-blue-800">
            Khaled Store
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          {/* Cart with SVG and badge */}
          <NavLink to="/cart" className="relative flex items-center gap-1">
            {({ isActive }) => (
              <>
                <span
                  className={
                    isActive
                      ? "border-b-2 border-blue-500 font-semibold text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }
                >
                  <CartIcon />
                </span>
                <span
                  className={
                    isActive
                      ? "border-b-2 border-blue-500 font-semibold text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }
                >
                  Cart
                </span>
                {itemCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
