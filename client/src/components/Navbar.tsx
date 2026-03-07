import React, { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../AppContextProvider";
import type { CartItem } from "../type";

interface Props {
  openCart: () => void;
}

const Navbar: React.FC<Props> = ({ openCart }) => {
  const { cart } = useContext(AppContext);
  const location = useLocation();

  const total = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );

  const isHomeActive = location.pathname === "/";
  const isProductsActive = location.pathname === "/products";

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">PRODUCTO</h1>

        {/* Navigation Links */}
        <div className="flex gap-8 text-sm font-medium">
          {/* Home */}
          <Link
            to="/"
            className={`relative cursor-pointer text-gray-700 font-medium hover:text-gray-500 ${!isHomeActive ? "hover:underline" : ""} transition-colors duration-200`}
          >
            Home
            <span
              className={`
                absolute left-0 -bottom-1 h-1 bg-gray-800
                transition-all duration-300
                origin-left
                ${isHomeActive ? "w-full" : "w-0 group-hover:w-full"}
              `}
            ></span>
          </Link>

          {/* Products */}
          <Link
            to="/products"
            className={`relative cursor-pointer text-gray-700 font-medium hover:text-gray-500 ${!isProductsActive ? "hover:underline" : ""} transition-colors duration-200`}
          >
            Products
            <span
              className={`
                absolute left-0 -bottom-1 h-1 bg-gray-800
                transition-all duration-300
                origin-left
                ${isProductsActive ? "w-full" : "w-0 group-hover:w-full"}
              `}
            ></span>
          </Link>
        </div>

        {/* Cart Icon */}
        <div className="relative cursor-pointer" onClick={openCart}>
          <ShoppingCart size={24} />
          {total > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {total}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
