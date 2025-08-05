export const fetchCart = async (userId) => {
  const res = await fetch(`/api/cart?userId=${userId}`);
  return await res.json();
};

export const addToCart = async (userId, productId, quantity) => {
  const res = await fetch(`/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, quantity }),
  });
  return await res.json();
};

export const removeFromCart = async (userId, productId) => {
  await fetch(`/api/cart`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
};
