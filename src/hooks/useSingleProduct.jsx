"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const useSingleProduct = () => {
  const [product, setProduct] = useState([]);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`/api/products?slug=${slug}`);
      setProduct(res?.data?.product);
    };
    fetchProducts();
  }, []);
  return { product };
};

export default useSingleProduct;
