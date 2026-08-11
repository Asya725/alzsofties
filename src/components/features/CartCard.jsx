import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartCard() {
  const { cart: items, setCartOpen, removeItem, changeQty } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  // RESTORED: absolute, right-0, top-full, mt-3, and z-50 so it floats properly as a dropdown
  // Added right-[-10px] for mobile and sm:right-0 for desktop
  // Added full dark mode support and transitions
  return (
    <div className="absolute -right-2.5 sm:right-0 top-full mt-3 w-[calc(100vw-32px)] sm:w-90 shadow-2xl flex flex-col bg-[#F8F7F4] dark:bg-gray-950 border border-gray-200 dark:border-gray-800 z-50 font-['Poppins',sans-serif] transition-colors duration-300 rounded-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white tracking-tight">
          Your Bag ({items.length})
        </h3>
        <button
          onClick={() => setCartOpen(false)}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="Close cart"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col max-h-[60vh] overflow-y-auto bg-white dark:bg-gray-900 transition-colors">
        {items.length === 0 ? (
          <div className="px-5 py-10 text-center text-gray-500 dark:text-gray-400 text-sm">
            Your bag is currently empty. Add something you like.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.key}
              className="flex items-start gap-4 px-5 py-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-colors"
            >
              {/* Product Image */}
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 object-cover shrink-0 bg-gray-50 dark:bg-gray-800 rounded-sm"
              />

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between h-20">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Size {item.size}
                    </p>
                  </div>
                  {/* Red Trash Icon */}
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:scale-110 transition-all p-1 -mr-1 -mt-1 shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
                </div>

                {/* Quantity and Price */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-20 h-7 rounded-sm transition-colors">
                    <button
                      onClick={() => changeQty(item.key, -1)}
                      className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="text-sm font-medium w-full text-center text-gray-900 dark:text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => changeQty(item.key, 1)}
                      className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>

                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer / Subtotal Area */}
      {items.length > 0 && (
        <div className="px-5 py-5 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
          <div className="flex items-center justify-between mb-5">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Subtotal
            </span>
            <span className="text-gray-900 dark:text-white text-lg font-semibold">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              setCartOpen(false); // Close the cart first
              navigate("/checkout"); // Then navigate to the checkout page
            }}
            className="w-full bg-[#211F1D] dark:bg-pink-600 hover:bg-black dark:hover:bg-pink-700 text-white py-3.5 text-sm font-semibold tracking-wide transition-colors rounded-sm shadow-sm"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
