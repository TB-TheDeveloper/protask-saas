import React, { useContext } from "react";
import { AppContext } from "../AppContextProvider";
import type { Product } from "../type";

interface ProductCardProps {
  product: Product;
}

const lowStock = 5;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, price, imageUrls, stock, _id } = product;
  const { addToCart, cart } = useContext(AppContext);

  const itemsInCart =
    cart.find((item) => item.product._id === _id)?.quantity || 0;
  const itemsLeft = stock - itemsInCart;
  const isOutOfStock = itemsInCart === stock;

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <img
        src={imageUrls[0]}
        alt={name}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col flex-1">
        {/* Product info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600 mt-2 flex-1">{description}</p>
          <p className="text-gray-900 font-bold mt-4">
            ${(price / 100).toFixed(2)}
          </p>
        </div>

        {/* Button + stock warning */}
        <div className="mt-4 flex flex-col">
          <button
            className={`w-full text-white py-2 rounded ${
              isOutOfStock
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 transition"
            }`}
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* Always reserve space for stock warning */}
          <div className="min-h-[1.25rem]">
            {itemsLeft > 0 && itemsLeft <= lowStock && (
              <p className="text-red-500 text-sm mt-2">
                Only {itemsLeft} left in stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
