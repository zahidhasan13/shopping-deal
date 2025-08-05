
import axios from "axios";

export const fetchCategory = async () => {
  const res = await axios.get("/api/category");
  console.log(res,"res");
  return res.data.categories;
};

export const createCategory = async (product) => {
  const res = await axios.post("/api/category", product);
  return res.data.products;
};

// export const updateProduct = async (id, data) => {
//   const res = await axios.put(`/api/products/${id}`, data);
//   return res.data;
// };

export const deleteCategory = async (id) => {
  await axios.delete(`/api/category?id=${id}`);
};
