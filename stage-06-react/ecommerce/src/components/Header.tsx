import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/useCartContext";

function Header() {
  const { itemCount } = useCartContext();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "font-bold text-black" : "text-gray-600 hover:text-black";

  return (
    <header className="bg-white shadow">
      <div
        className="
          mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4
          sm:flex-row sm:justify-between
          lg:grid lg:grid-cols-3
        "
      >
        {/* Logo */}
        <div className="lg:justify-self-start">
          <h1 className="text-xl font-bold text-gray-900">Khaled Store</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:justify-self-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            Cart{" "}
            {itemCount > 0 && (
              <span
                className={
                  itemCount
                    ? "ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 px-1 text-xs font-bold text-white"
                    : ""
                }
              >
                {itemCount}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Empty third column on desktop */}
        <div className="hidden lg:block" />
      </div>
    </header>
  );
}

export default Header;
