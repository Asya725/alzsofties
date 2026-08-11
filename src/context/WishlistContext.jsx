import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // Initialize wishlist from localStorage so items persist after refreshing
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("alzsofties_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever the wishlist changes
  useEffect(() => {
    localStorage.setItem("alzsofties_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isSaved = prevWishlist.some((item) => item.id === product.id);

      if (isSaved) {
        // Remove item if it's already saved
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        // Add item if it's not saved
        return [...prevWishlist, product];
      }
    });
  };

  const isProductSaved = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isProductSaved }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
