"use client";
import CategoryCard from "@/components/CategoryCard";
import CategoryCardSkeleton from "@/components/skeleton/CategoryCardSkeleton";
import { getCategory } from "@/redux/features/category/categorySlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-center text-3xl font-mono">
        Categories You Love. 24/7.
      </h2>
      <div className="grid grid-cols-5 mt-10 mb-5">
        {categories?.map((category) => (
          <CategoryCard key={category?._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
