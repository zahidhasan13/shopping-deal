"use client";
import Product from "@/components/Product";
import useCategories from "@/hooks/useCategories";
import useSingleCategoryProduct from "@/hooks/useSingleCategoryProduct";
import Link from "next/link";

const CategoryPage = () => {
  const { categoryProducts } = useSingleCategoryProduct();
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-mono">
        {categoryProducts?.name} Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
        {
            categoryProducts?.products?.map(product => <Product key={product?._id} product={product}/>)
        }
      </div>
    </div>
  );
};

export default CategoryPage;
