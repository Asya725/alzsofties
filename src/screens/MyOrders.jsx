import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  ShoppingBag,
} from "lucide-react";
import { useOrder } from "../context/OrderContext";

export default function MyOrders() {
  const { orders } = useOrder();
  const navigate = useNavigate();

  // Helper function to format the ugly ISO date string into a clean, readable format
  const formatOrderDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] dark:bg-[#050505] pt-8 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 font-['Poppins',sans-serif]">
      <div className="max-w-4xl mx-auto">
        {/* --- Header with Back Arrow --- */}
        <div className="flex items-center gap-5 mb-10">
          <button
            onClick={() => navigate("/")} // <--- Hardcoded to go Home!
            className="p-2.5 rounded-full hover:bg-rose-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-label="Go back to Home"
          >
            <ArrowLeft size={26} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Orders
          </h1>
        </div>

        {/* --- Main Content Area --- */}
        {!orders || orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-[#111111] rounded-3xl shadow-sm p-12 text-center border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={48} className="text-[#e30039]" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No orders yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto text-base">
              Looks like you haven't placed any orders. Start shopping to see
              your purchase history here!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#e30039] hover:bg-rose-700 text-white px-8 py-4 rounded-xl font-bold transition-all active:scale-[0.98] shadow-sm tracking-wide"
            >
              <ShoppingBag size={20} />
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-[#111111] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors"
              >
                {/* Order Header */}
                <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-transparent">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Order {order.id}
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {formatOrderDate(order.date)}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`inline-flex items-center self-start sm:self-auto gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-wide ${
                      order.status === "Confirmed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-500 border border-green-200 dark:border-green-900/30"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-500 border border-amber-200 dark:border-amber-900/30"
                    }`}
                  >
                    {order.status === "Confirmed" ? (
                      <CheckCircle size={18} strokeWidth={2.5} />
                    ) : (
                      <Clock size={18} strokeWidth={2.5} />
                    )}
                    {order.status || "Pending Review"}
                  </div>
                </div>

                {/* Order Items List */}
                <div className="p-6 sm:p-8">
                  <div className="space-y-6">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center gap-5">
                        {/* FIX: Changed item.image to item.img */}
                        <div className="w-20 h-24 rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
                            {item.name}
                          </h4>
                          {/* FIX: Changed item.quantity to item.qty */}
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Qty: {item.qty}
                          </p>
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {/* FIX: Safely calculate price * qty */}$
                          {(item.price * (item.qty || 1)).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer (Total) */}
                <div className="px-6 py-5 sm:px-8 sm:py-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-transparent">
                  <span className="text-base font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total Amount
                  </span>
                  {/* FIX: Changed order.total to order.totalUSD */}
                  <span className="text-2xl font-extrabold text-[#e30039] dark:text-rose-500">
                    ${order.totalUSD?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
