"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import CategoryCard from "../CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import CategoryCardSkeleton from "../skeleton/CategoryCardSkeleton";
import { getCategory } from "@/redux/features/category/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  if(loading){
    return (
      <div className="container mx-auto mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-mono">
        Categories You Love. 24/7
      </h2>
      <Link
        href="/allCategory"
        className="text-lg mt-2 font-mono underline hover:no-underline block text-center"
      >
        More Category
      </Link>
      </div>
      <div className="grid grid-cols-5 mt-2 mb-10">
        {categories?.slice(0, 10)?.map((category) => (
          <CategoryCardSkeleton key={category._id}/>
        ))}
      </div>
    </div>
    )
  }
  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-mono">
        Categories You Love. 24/7
      </h2>
      <Link
        href="/allCategory"
        className="text-lg mt-2 font-mono underline hover:no-underline block text-center"
      >
        More Category
      </Link>
      </div>
      <div className="grid grid-cols-5 mt-2 mb-10">
        {categories?.slice(0, 10)?.map((category) => (
          <CategoryCard key={category?._id} category={category}/>
        ))}
      </div>
    </div>
  );
};

export default Categories;
