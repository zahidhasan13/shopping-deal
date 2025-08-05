
import axios from "axios";

export const fetchProducts = async () => {
  const res = await axios.get("/api/products");
  return res.data.products;
};


export const createProduct = async (product) => {
  console.log(product,"redux");
  try {
    const res = await axios.post("/api/products", product, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return res.data.products;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};


// export const updateProduct = async (id, data) => {
//   const res = await axios.put(`/api/products/${id}`, data);
//   return res.data;
// };

export const deleteProduct = async (id) => {
  await axios.delete(`/api/products?id=${id}`);
};
