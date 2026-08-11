import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeItem, changeQty, cartSubtotal } =
    useCart();

  const navigate = useNavigate();

  const closeCart = () => setCartOpen(false);

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  // Convert USD Subtotal to KHR (Approx 4000 KHR per USD)
  const khrTotal = (cartSubtotal * 4000).toLocaleString();

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            closeCart();
          }}
        />
      )}

      {/* Drawer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white dark:bg-[#0a0a0a] shadow-2xl z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col font-['Poppins',sans-serif] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-900/60">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
            Shopping Bag{" "}
            {cart.length > 0 && (
              <span className="text-gray-400 font-medium">({cart.length})</span>
            )}
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeCart();
            }}
            aria-label="Close cart"
            className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 space-y-5">
              <ShoppingBag size={48} strokeWidth={1} className="opacity-40" />
              <p className="text-sm font-medium tracking-wide">
                Your bag is empty.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeCart();
                }}
                className="text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white border-b border-gray-900 dark:border-white pb-0.5 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 pt-4">
              {cart.map((item) => (
                <div key={item.key} className="flex gap-5 group">
                  {/* Item Image */}
                  <div className="w-20 h-28 bg-gray-50 dark:bg-gray-900 overflow-hidden shrink-0 border border-gray-100 dark:border-gray-800">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-col justify-between flex-1 py-0.5">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="pr-4">
                          <h3 className="font-medium text-sm text-gray-900 dark:text-white leading-snug line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex flex-col gap-0.5 mt-1">
                            {item.color && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Color: {item.color}
                              </p>
                            )}
                            {item.size && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Size: {item.size}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.key);
                          }}
                          aria-label="Remove item"
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1 -mt-1"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-sm h-8">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeQty(item.key, -1);
                          }}
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Minus size={12} strokeWidth={2} />
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-gray-900 dark:text-white">
                          {item.qty}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeQty(item.key, 1);
                          }}
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Plus size={12} strokeWidth={2} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Order Summary */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-900/80 p-6 bg-white dark:bg-[#0a0a0a]">
            {/* UPGRADE: Detailed Subtotal block showing USD and KHR */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Subtotal (USD)
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${cartSubtotal?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Subtotal (KHR)
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ៛{khrTotal}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100 dark:border-gray-900/60">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                ${cartSubtotal?.toFixed(2) || "0.00"}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCheckout();
              }}
              className="w-full bg-[#111111] dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 py-4 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Checkout <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
