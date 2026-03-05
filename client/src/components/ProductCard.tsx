import React from "react";

interface ProductCardProps {
  name: string;
  description: string;
  price: number; // in cents
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  imageUrl,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img src={imageUrl} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-gray-900 font-bold mt-4">
          ${(price / 100).toFixed(2)}
        </p>
        <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
