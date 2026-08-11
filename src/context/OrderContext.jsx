import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  // 1. Load orders from local storage with error handling
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("alzsofties_orders");
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error("Failed to load orders from localStorage:", error);
      return [];
    }
  });

  // 2. Save to local storage whenever orders change (Safely)
  useEffect(() => {
    try {
      localStorage.setItem("alzsofties_orders", JSON.stringify(orders));
    } catch (error) {
      console.error("Failed to save orders to localStorage:", error);
    }
  }, [orders]);

  // 3. Add a new order (Memoized for performance)
  const addOrder = useCallback((orderData) => {
    const newOrder = {
      // Fallback values just in case the component doesn't provide them
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      status: "Pending Review",

      // Spreading orderData last allows the component to securely override the defaults
      ...orderData,
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  }, []);

  // 4. Update order status for Admin Panel (Memoized)
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  }, []);

  // 5. Clear order history utility (Memoized)
  const clearOrders = useCallback(() => {
    setOrders([]);
  }, []);

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrderStatus, clearOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// UPGRADE: Safety check ensures it's used inside the provider
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
