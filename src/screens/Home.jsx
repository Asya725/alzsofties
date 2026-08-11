import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "../constants/data";
import ProductCard from "../components/features/ProductCard";
import Hero from "../components/layout/Hero";

export default function Home() {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = PRODUCTS;

    // 1. First, filter by Category
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // 2. Then, filter by Search Query (ignoring uppercase/lowercase)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    return result;
  }, [category, searchQuery]);

  return (
    <div className="min-h-screen font-sans bg-[#FFF5F7] dark:bg-gray-950 transition-colors duration-300 flex flex-col">
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Categories Section */}
      <section id="shop" className="px-5 sm:px-8 max-w-7xl mx-auto mt-4 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-2xl text-gray-900 dark:text-white transition-colors">
            Shop by Category
          </h2>
          <span className="text-sm hidden sm:block font-medium tracking-wide text-gray-500 dark:text-gray-400 transition-colors">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Edge-to-edge mobile scrolling with -mx-5 px-5 */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 border-b border-rose-100 dark:border-gray-800 scrollbar-hide transition-colors -mx-5 px-5 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSearchQuery("");
              }}
              aria-pressed={category === cat}
              className={`shrink-0 px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                category === cat
                  ? "bg-rose-600 text-white shadow-md shadow-rose-200/50 dark:shadow-none"
                  : "bg-white/60 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-rose-200 dark:border-gray-700 hover:border-rose-400 dark:hover:border-rose-500 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <main className="flex-1 px-5 sm:px-8 max-w-7xl mx-auto pb-20 w-full">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              We couldn't find anything matching "{searchQuery}". Try adjusting
              your search or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategory("All");
              }}
              className="mt-6 text-sm font-medium text-rose-600 dark:text-rose-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded px-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
