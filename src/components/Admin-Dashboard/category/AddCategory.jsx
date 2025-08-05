"use client";
import { useForm } from "react-hook-form";
import { Hash, Image, LayoutGrid } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "@/redux/features/category/categorySlice";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await dispatch(addCategory(formData)).unwrap();
      toast.success("Category added successfully!");
      reset();
      setSelectedFile(null);
    } catch (error) {
      toast.error(error.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
        Add Category
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <LayoutGrid className="w-4 h-4 mr-2 text-orange-500" />
            Category
          </label>
          <input
            type="text"
            placeholder="Category name"
            {...register("name", { required: "Category name is required" })}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Hash className="w-4 h-4 mr-2 text-orange-500" />
            Category Slug
          </label>
          <input
            type="text"
            placeholder="category-slug"
            {...register("slug", { required: "Slug is required" })}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.slug ? "border-red-500" : ""
            }`}
          />
          {errors.slug && (
            <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Image className="w-4 h-4 mr-2 text-orange-500" />
            Category Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
          {!selectedFile && (
            <p className="text-red-500 text-xs mt-1">Image is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;