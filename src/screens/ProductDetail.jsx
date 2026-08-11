import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share,
  Minus,
  Plus,
  Truck,
  Headphones,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Standard Product States
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Dynamic color selection and accordion
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || "Standard",
  );
  const [infoOpen, setInfoOpen] = useState(true);

  // New Interactive States
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  // Fallback array for gallery demonstration
  const images = product?.images?.length
    ? product.images
    : [product?.img, product?.img, product?.img, product?.img].filter(Boolean);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-[Poppins,sans-serif] bg-[#FFF5F7] dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
        <p>Product not found</p>
      </div>
    );
  }

  // --- Handlers ---

  const handleAddToCart = () => {
    if (!product.inStock || isAdding) return;

    // Trigger animation state
    setIsAdding(true);

    // Find the exact image for the selected color so the cart shows the right one
    const activeColorData = product?.colors?.find(
      (c) => c.name === selectedColor,
    );
    const cartImage = activeColorData?.img || product.img;

    // Explicitly set the 'img' property to override the default product.img
    addToCart({
      ...product,
      img: cartImage,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    // Reset button after 1.5 seconds
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1500);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} on Alzsofties!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="min-h-screen font-[Poppins,sans-serif] bg-[#FFF5F7] dark:bg-gray-950 transition-colors duration-300 flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-5 sm:px-8 py-6 w-full">
        {/* Back Navigation Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors mb-6 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded p-1 -ml-1"
          aria-label="Go back to previous page"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* LEFT SIDE: Image Gallery */}
          <div className="flex-1 flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`w-16 h-20 md:w-20 md:h-24 shrink-0 border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    activeImageIndex === idx
                      ? "border-rose-500"
                      : "border-transparent hover:border-rose-200 dark:hover:border-gray-700"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover bg-white dark:bg-gray-800"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 bg-white dark:bg-gray-900 aspect-3/4 md:aspect-auto md:min-h-150 border border-rose-100 dark:border-gray-800 flex items-center justify-center group transition-colors">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    className="absolute left-4 p-2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-sm text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-all focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    aria-label="Next image"
                    className="absolute right-4 p-2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-sm text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-all focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Product Details */}
          <div className="w-full lg:w-112.5 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 dark:text-gray-500 line-through transition-colors">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                aria-label="Share product"
                className="relative p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-full"
              >
                <Share size={20} />
                {shareFeedback && (
                  <span className="absolute -top-8 right-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded font-medium shadow-md whitespace-nowrap">
                    Copied link!
                  </span>
                )}
              </button>
            </div>

            {/* Dynamic Color Selector */}
            {product?.colors && product.colors.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 transition-colors">
                  {product.colors.length}{" "}
                  {product.colors.length === 1 ? "Color" : "Colors"} available
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-16 h-20 border-2 p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                          selectedColor === color.name
                            ? "border-gray-900 dark:border-gray-100"
                            : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                        aria-label={`Select color ${color.name}`}
                      >
                        <img
                          src={color.img}
                          alt={color.name}
                          className="w-full h-full object-cover bg-white dark:bg-gray-800"
                        />
                      </button>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 transition-colors">
                  1 Color available
                </h3>
                <div className="w-16 h-20 border-2 border-gray-900 dark:border-gray-500 p-0.5 transition-colors">
                  <img
                    src={product.img}
                    alt="Standard Color"
                    className="w-full h-full object-cover bg-white dark:bg-gray-800"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors">
                  Standard
                </p>
              </div>
            )}

            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors">
                  Size
                </h3>
                <button className="text-xs text-rose-600 dark:text-rose-400 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded px-1">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 h-10 px-3 flex items-center justify-center border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                      selectedSize === size
                        ? "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 transition-colors">
                Quantity
              </h3>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-32 h-11 transition-colors">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-10 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 z-10"
                >
                  <Minus size={16} />
                </button>
                <span
                  className="flex-1 text-center font-medium text-gray-900 dark:text-white transition-colors"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 z-10"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className={`flex-1 flex items-center justify-center gap-2 h-12 font-semibold text-sm tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed ${
                  isAdding
                    ? "bg-rose-600 dark:bg-rose-500 text-white scale-[0.98]"
                    : "bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-950 disabled:bg-gray-300 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
                }`}
              >
                {isAdding ? (
                  <>
                    <Check size={18} strokeWidth={2.5} />
                    Added to bag
                  </>
                ) : product.inStock ? (
                  "Add to bag"
                ) : (
                  "Out of Stock"
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                className="group w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 hover:border-rose-400 dark:hover:border-rose-500"
              >
                <Heart
                  size={20}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${
                    isWishlisted
                      ? "fill-rose-500 text-rose-500"
                      : "fill-transparent text-gray-600 dark:text-gray-400 group-hover:text-rose-500 dark:group-hover:text-rose-400"
                  }`}
                />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm shadow-sm transition-colors">
              <div className="flex gap-3">
                <Truck
                  size={20}
                  className="text-gray-400 dark:text-gray-500 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200">
                    Fast Delivery
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    From 1 - 3 days
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Headphones
                  size={20}
                  className="text-gray-400 dark:text-gray-500 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200">
                    Support hotline
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    (+855) 085 264 570
                  </p>
                </div>
              </div>
              <div className="flex gap-3 col-span-2 mt-2">
                <CreditCard
                  size={20}
                  className="text-gray-400 dark:text-gray-500 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200">
                    Easy payment
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Many forms accepted
                  </p>
                </div>
              </div>
            </div>

            {/* Model Info Accordion */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
              <button
                onClick={() => setInfoOpen(!infoOpen)}
                className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded"
              >
                Model info & Details
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${infoOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Animated height container */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${infoOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {product.blurb}
                    <br />
                    <br />
                    Model is 178 cm tall / 68 kg weight and is wearing size M.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
