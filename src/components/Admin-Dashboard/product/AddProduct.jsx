"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  DollarSign,
  FileText,
  Hash,
  Image,
  LayoutGrid,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCategory } from "@/redux/features/category/categorySlice";
import { addProduct } from "@/redux/features/products/productsSlice";
import toast from "react-hot-toast";

export default function AddProduct() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const onSubmit = async (data) => {
    console.log(data.category, "add");
    setLoading(true);

    try {
      const formData = new FormData();
      console.log(formData, "formData");

      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append files
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });
      console.log(formData, "formData");
      console.log(selectedFiles, "selectedFiles");

      // Dispatch to Redux
      dispatch(addProduct(formData))
        .unwrap()
        .then(() => {
          toast.success("Product added successfully!");
          reset();
          setSelectedFiles([]);
        })
        .catch((error) => {
          console.log(error,"error");
          toast.error(error.message || "Failed to add product");
        });
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 p-8 bg-white mt-5 rounded shadow"
      >
        {/* Product Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Tag className="w-4 h-4 mr-2 text-orange-500" />
            Product Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Product Title"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Product Slug */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Hash className="w-4 h-4 mr-2 text-orange-500" />
            Product Slug
          </label>
          <input
            {...register("slug", { required: "Slug is required" })}
            type="text"
            placeholder="Product Slug"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.slug ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-orange-500" />
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            placeholder="Description"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <LayoutGrid className="w-4 h-4 mr-2 text-orange-500" />
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Current Price */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
              Current Price
            </label>
            <input
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              type="number"
              step="0.01"
              placeholder="Current Price"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* Old Price */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
            Old Price
          </label>
          <input
            {...register("oldPrice", {
              min: { value: 0, message: "Price must be positive" },
            })}
            type="number"
            step="0.01"
            placeholder="Old Price"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.oldPrice ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.oldPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPrice.message}
            </p>
          )}
        </div>

        {/* Product Images */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Image className="w-4 h-4 mr-2 text-orange-500" />
            Product Images
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>
          </div>
          {selectedFiles.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""}{" "}
              selected
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
}
