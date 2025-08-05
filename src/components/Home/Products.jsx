"use client";
// import useProducts from "@/hooks/useProducts";
import React, { useEffect } from "react";
import Product from "../Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/redux/features/products/productsSlice";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-mono">Just For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 mb-10">
        {items?.slice(0, 30)?.map((product) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
