import { useContext } from "react";

import { X } from "lucide-react";
import { AppContext } from "../AppContextProvider";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const CartDrawer: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { cart, setCart } = useContext(AppContext);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const removeCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const checkout = async () => {
    const res = await fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>

          <button onClick={() => setIsOpen(false)} className="cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 && (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          {cart.map((item) => (
            <div key={item.product._id} className="flex gap-4 items-center">
              <img
                src={item.product.imageUrl}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-gray-500">
                  ${(item.product.price / 100).toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2 justify-center">
                  <button
                    onClick={() => decreaseQuantity(item.product._id)}
                    className="px-2 border rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.product._id)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeCartItem(item.product._id)}
                className="cursor-pointer self-start"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-bold">${(total / 100).toFixed(2)}</span>
          </div>

          <button
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition cursor-pointer"
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
