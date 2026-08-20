import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">E-Commerce</h1>

        <nav className="flex gap-6">
          <NavLink to="/" className="text-gray-600 hover:text-black">
            Home
          </NavLink>

          <NavLink to="/products" className="text-gray-600 hover:text-black">
            Products
          </NavLink>

          <NavLink to="/cart" className="text-gray-600 hover:text-black">
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
