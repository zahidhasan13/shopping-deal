"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const useSingleCategoryProduct = () => {
    const [categoryProducts, setCategoryProducts] = useState({});
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const res = await axios.get(`/api/category?slug=${slug}`);
      setCategoryProducts(res?.data?.category);
    };
    fetchCategoryProducts();
  }, []);
  return { categoryProducts };
};

export default useSingleCategoryProduct;