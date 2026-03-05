import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">PROTASK</h1>

        <div className="flex gap-8 text-sm font-medium">
          <a className="hover:text-gray-500 cursor-pointer">Men</a>
          <a className="hover:text-gray-500 cursor-pointer">Women</a>
          <a className="hover:text-gray-500 cursor-pointer">New</a>
          <a className="hover:text-gray-500 cursor-pointer">Sale</a>
        </div>

        <div className="flex gap-4">
          <button className="text-sm hover:text-gray-500">Cart</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
