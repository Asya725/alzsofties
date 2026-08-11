import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Check } from "lucide-react";
import PriceTag from "../ui/PriceTag";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {
  const [size, setSize] = useState(null);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isProductSaved } = useWishlist();

  const wished = isProductSaved(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents click from bubbling up

    if (!product.inStock) return;
    if (product.sizes?.length > 1 && !size) return;

    addToCart(product, size || product.sizes[0]);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents click from bubbling up
    toggleWishlist(product);
  };

  return (
    <div className="flex flex-col group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 font-['Poppins',sans-serif]">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 aspect-4/5">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Top Left: Discount Tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 items-start z-10 pointer-events-none">
          {product.discount > 0 && <PriceTag percent={product.discount} />}
        </div>

        {/* Top Right: Wishlist Button */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={handleWishlistClick}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-label={wished ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              color={wished ? "#E11D48" : "#9CA3AF"}
              fill={wished ? "#E11D48" : "none"}
              className="transition-colors"
            />
          </button>
        </div>

        {/* Sold Out Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-gray-950/60 backdrop-blur-[2px] z-20 pointer-events-none">
            <span className="px-5 py-2 text-xs font-bold tracking-widest uppercase bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-sm shadow-sm">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Details Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus-visible:outline-none focus-visible:underline"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider shrink-0 mt-1 px-2 py-0.5 rounded-sm ${
              product.inStock
                ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            }`}
          >
            {product.inStock ? "In Stock" : "Unavailable"}
          </span>
        </div>

        {/* Blurb */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {product.blurb}
        </p>

        {/* Price Row (Upgraded to fixed decimals) */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through font-medium">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Size Selectors */}
        <div className="flex flex-wrap gap-2 mt-1">
          {product.sizes?.map((s) => (
            <button
              key={s}
              disabled={!product.inStock}
              onClick={() => setSize(s)}
              className={`min-w-10 h-8 text-xs font-medium rounded-sm transition-all duration-200 flex items-center justify-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500
                ${
                  !product.inStock
                    ? "border border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed"
                    : size === s
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border border-gray-900 dark:border-white shadow-sm"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-400 cursor-pointer"
                }
              `}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleAdd}
          disabled={!product.inStock || (product.sizes?.length > 1 && !size)}
          className={`mt-2 w-full py-3 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500
            ${
              !product.inStock
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : justAdded
                  ? "bg-green-600 text-white shadow-sm"
                  : product.sizes?.length > 1 && !size
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 opacity-40 cursor-not-allowed"
                    : "bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 shadow-sm cursor-pointer"
            }
          `}
        >
          {!product.inStock ? (
            "Sold Out"
          ) : justAdded ? (
            <>
              <Check size={16} strokeWidth={2.5} /> Added to Bag
            </>
          ) : product.sizes?.length > 1 && !size ? (
            "Select a Size"
          ) : (
            <>
              <ShoppingBag size={16} strokeWidth={2} /> Add to Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
}
