"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res?.data?.products);
    };
    fetchProducts();
  }, []);
  return { products };
};

export default useProducts;