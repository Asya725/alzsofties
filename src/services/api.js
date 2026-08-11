import { PRODUCTS, CATEGORIES } from "../constants/data";

// Helper function to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async () => {
  await delay(400); // 400ms simulated network delay
  return PRODUCTS;
};

export const getProductById = async (id) => {
  await delay(300);
  const product = PRODUCTS.find((p) => p.id === parseInt(id, 10));
  if (!product) throw new Error("Product not found");
  return product;
};

export const getProductsByCategory = async (category) => {
  await delay(400);
  if (category === "All") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
};

export const searchProducts = async (query) => {
  await delay(300);
  const lowercasedQuery = query.toLowerCase();

  return PRODUCTS.filter((product) => {
    // Search by name, category, or the new tags we just added!
    const matchesName = product.name.toLowerCase().includes(lowercasedQuery);
    const matchesCategory = product.category
      .toLowerCase()
      .includes(lowercasedQuery);
    const matchesTags = product.tags?.some((tag) =>
      tag.toLowerCase().includes(lowercasedQuery),
    );

    return matchesName || matchesCategory || matchesTags;
  });
};

export const getCategories = async () => {
  await delay(100);
  return CATEGORIES;
};
