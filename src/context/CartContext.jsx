import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Initialize from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("alzsoftie_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);

  // 2. Save to LocalStorage on every cart change
  useEffect(() => {
    localStorage.setItem("alzsoftie_cart", JSON.stringify(cart));
  }, [cart]);

  // UPGRADE: Intelligently handle different data structures from ProductCard vs ProductDetail
  function addToCart(product, sizeParam, qtyParam = 1) {
    const size = sizeParam || product.size || "Standard";
    const color = product.color || null;
    const qty = product.quantity || qtyParam || 1;

    // Create a unique key that accounts for color as well, so different colors don't merge
    const key = color
      ? `${product.id}-${size}-${color}`
      : `${product.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        // If it exists, add the new quantity to the existing quantity
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          size,
          color,
          qty,
        },
      ];
    });
  }

  function removeItem(key) {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }

  function changeQty(key, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }

  // UPGRADE: Added clearCart to empty the bag after a successful checkout
  function clearCart() {
    setCart([]);
  }

  // 4. Financial Calculations (Cleaned up tax and shipping overhead)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Kept cartTotal to prevent breaking any other components that might import it
  const cartTotal = cartSubtotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeItem,
        changeQty,
        clearCart, // <-- Exposed to your Checkout.jsx screen
        cartCount,
        cartSubtotal,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
