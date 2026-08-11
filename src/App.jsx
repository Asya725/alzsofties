import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";

// --- Providers ---
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";

// --- Global UI Components ---
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/features/CartDrawer";

// --- Screens ---
import Home from "./screens/Home";
import ProductDetail from "./screens/ProductDetail";
import Checkout from "./screens/Checkout";
import SavedItems from "./screens/SavedItems";
import MyOrders from "./screens/MyOrders";

// --- Data ---
import { PRODUCTS } from "./constants/data";

// 1. Auto-Scroll to Top on Navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 2. Dynamic Product Route Wrapper
function ProductDetailWrapper() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Poppins',sans-serif] bg-[#FFF5F7] dark:bg-gray-950 transition-colors">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Product not found
        </h2>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}

// 3. 404 Fallback Component
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-['Poppins',sans-serif] bg-[#FFF5F7] dark:bg-gray-950 transition-colors">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        404
      </h2>
      <p className="text-gray-600 dark:text-gray-400">Page not found</p>
    </div>
  );
}

// UPGRADE: Layout Component for Conditional UI Rendering
function AppLayout() {
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";

  return (
    <>
      {/* Hide the main navigation on the checkout page */}
      {!isCheckout && <Navbar />}

      <CartDrawer />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailWrapper />} />
          <Route path="/saved" element={<SavedItems />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* FIXED: Added missing closing bracket here */}
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Hide the footer on the checkout page */}
      {!isCheckout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <WishlistProvider>
          {/* Master wrapper with w-full and overflow-x-hidden */}
          <div className="w-full max-w-[100vw] overflow-x-hidden min-h-screen flex flex-col relative">
            <Router>
              <ScrollToTop />
              {/* The Layout component must sit inside Router to access useLocation */}
              <AppLayout />
            </Router>
          </div>
        </WishlistProvider>
      </CartProvider>
    </OrderProvider>
  );
}
