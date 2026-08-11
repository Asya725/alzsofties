import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Search } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/features/ProductCard";

export default function SavedItems() {
  const { wishlist = [] } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* 1. Vibrant Blue Header Banner matching your screenshot */}
      <div className="bg-pink-800 dark:bg-pink-900 pt-8 pb-24 px-5 sm:px-8 border-b border-pink-700 dark:border-pink-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Back Button (Slightly rounded to match your screenshot style) */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-lg transition-all duration-200 mb-8 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white hover:-translate-x-1"
          >
            <ArrowLeft size={18} />
            Back to Store
          </Link>

          {/* Title Area */}
          <div className="flex items-center gap-3 mb-2">
            <Heart size={24} className="text-white fill-white" />
            <h1 className="text-2xl sm:text-xl font-bold text-white tracking-tight">
              Saved Items
            </h1>
          </div>

          {/* Subtitle with a nice dynamic item count pill */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-blue-100 dark:text-blue-200 text-base sm:text-lg">
            <p>Your personal collection of favorite products.</p>
            <span className="inline-flex items-center justify-center bg-white/20 px-3 py-1 rounded-full text-sm font-semibold text-white w-max">
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Product Grid (Overlaps the header slightly using -mt-12) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 -mt-12 relative z-10">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* 3. Clean Empty State (Updated to Blue Theme) */
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 text-center flex flex-col items-center mt-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-blue-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <Heart size={32} className="text-pink-400 dark:text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No saved items yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your wishlist. Start
              exploring and save your favorite items!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3.5 rounded-full font-medium transition-transform hover:scale-105 shadow-sm"
            >
              <Search size={18} />
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
