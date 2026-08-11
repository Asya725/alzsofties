import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, User, Package, Heart, Sun, Moon } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";

export default function Navbar() {
  const { cartCount, cartOpen, setCartOpen } = useCart();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleInteraction(e) {
      if (e.type === "mousedown") {
        if (profileRef.current && !profileRef.current.contains(e.target)) {
          setProfileOpen(false);
        }
      }
      if (e.type === "keydown" && e.key === "Escape") {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  // Theme checking & system preference listener
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || (!savedTheme && mediaQuery.matches)) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme();

    const handleSystemChange = () => {
      if (!localStorage.getItem("theme")) {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  // Toggle manually between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-5 sm:px-8 py-4 bg-[#FFF5F7]/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-rose-100 dark:border-gray-800 transition-all duration-300">
      {/* Brand / Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1 -ml-1"
        aria-label="Alzsofties Homepage"
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm bg-rose-700">
          <span className="text-white font-serif italic text-base">A</span>
        </div>
        <span className="font-sans font-semibold text-2xl text-gray-900 dark:text-white tracking-tight transition-colors">
          Alzsofties
        </span>
      </Link>

      {/* Action Icons */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-rose-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          aria-label={
            isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          {isDarkMode ? (
            <Sun size={22} className="text-gray-200" strokeWidth={1.5} />
          ) : (
            <Moon size={22} className="text-gray-900" strokeWidth={1.5} />
          )}
        </button>

        {/* Profile / Guest Menu Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen((v) => !v);
              setCartOpen(false);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-rose-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-expanded={profileOpen}
            aria-haspopup="true"
            aria-label="Toggle Guest Menu"
          >
            <User
              size={22}
              className="text-gray-900 dark:text-gray-200"
              strokeWidth={1.5}
            />
          </button>

          {profileOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-xl py-2 flex flex-col z-[50] bg-white dark:bg-gray-900 border border-rose-100 dark:border-gray-800 transition-all animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-4 py-3 border-b border-rose-50 dark:border-gray-800 mb-1">
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-0.5">
                  Guest Shopper
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Welcome to Alzsofties
                </p>
              </div>

              <Link
                to="/my-orders"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-gray-800 transition-colors w-full text-left font-medium text-gray-800 dark:text-gray-200 outline-none"
              >
                <Package
                  size={18}
                  strokeWidth={1.5}
                  className="text-rose-500"
                />{" "}
                My Orders
              </Link>

              <div className="h-px w-full my-1 bg-rose-50 dark:bg-gray-800 transition-colors"></div>

              <Link
                to="/saved"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-gray-800 transition-colors w-full text-left font-medium text-gray-800 dark:text-gray-200 outline-none"
              >
                <Heart size={18} strokeWidth={1.5} className="text-rose-500" />{" "}
                Saved Items
              </Link>
            </div>
          )}
        </div>

        {/* Cart Toggle Button */}
        <div>
          <button
            type="button"
            onClick={() => {
              setCartOpen(true);
              setProfileOpen(false);
            }}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-rose-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-label="Toggle Shopping Cart"
          >
            <ShoppingBag
              size={22}
              className="text-gray-900 dark:text-gray-200"
              strokeWidth={1.5}
            />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-rose-600 text-white shadow-sm border border-white dark:border-gray-900">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
