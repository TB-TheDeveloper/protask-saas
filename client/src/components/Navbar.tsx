import React, { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { AppContext } from "../AppContextProvider";
import type { CartItem } from "../type";

interface Props {
  openCart: () => void;
}

const Navbar: React.FC<Props> = ({ openCart }) => {
  const { cart } = useContext(AppContext);

  const total = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">PRODUCTO</h1>

        <div className="flex gap-8 text-sm font-medium">
          <a className="hover:text-gray-500 cursor-pointer">Men</a>
          <a className="hover:text-gray-500 cursor-pointer">Women</a>
          <a className="hover:text-gray-500 cursor-pointer">New</a>
          <a className="hover:text-gray-500 cursor-pointer">Sale</a>
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
