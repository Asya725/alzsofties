import { Search, Sparkles } from "lucide-react";

// UPGRADE: Accept searchQuery and setSearchQuery as props
export default function Hero({ searchQuery, setSearchQuery }) {
  return (
    <section className="relative w-full pt-16 pb-12 px-5 sm:px-8 flex flex-col items-center justify-center text-center transition-colors duration-300">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-xs font-semibold tracking-wide border border-rose-200 dark:border-rose-800/50 transition-colors">
        <Sparkles size={14} />
        <span>NEW MARKDOWNS</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 transition-colors">
        Welcome to{" "}
        <span className="text-rose-600 dark:text-rose-500">ALZSOFTIES</span>
      </h1>

      {/* Store Description */}
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors">
        Your premium destination for considered basics, tailored outerwear, and
        shoes built to be worn in, not just worn once.
      </p>

      {/* Big Search Bar */}
      <div className="w-full max-w-2xl relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search
            size={22}
            className="text-gray-400 dark:text-gray-500 group-focus-within:text-rose-500 transition-colors"
          />
        </div>
        <input
          type="text"
          // UPGRADE: Added '|| ""' so it is NEVER undefined
          value={searchQuery || ""}
          // UPGRADE: Added defensive check for setSearchQuery
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          className="block w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md focus:shadow-md focus:border-rose-400 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900/30 sm:text-lg outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
          placeholder="Search for outerwear, dresses, basics..."
        />
      </div>
    </section>
  );
}
