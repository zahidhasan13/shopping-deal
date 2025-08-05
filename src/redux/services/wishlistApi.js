export const fetchWishlist = async (userId) => {
  const res = await fetch(`/api/wishlist?userId=${userId}`);
  return await res.json();
};

export const addToWishlist = async (userId, productId, quantity) => {
  const res = await fetch(`/api/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, quantity }),
  });
  return await res.json();
};

export const removeFromWishlist = async (userId, productId) => {
  await fetch(`/api/wishlist`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
};
