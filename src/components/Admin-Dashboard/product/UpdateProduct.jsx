import React from "react";
import { X, Package, DollarSign, Image, Tag, FileText, Hash, Warehouse, Star, Check, Upload, LayoutGrid } from "lucide-react";

const UpdateProduct = ({ setOpenModal }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Update Product</h2>
          </div>
          <button 
            onClick={()=>setOpenModal(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Title */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-orange-500" />
                Product Title
              </label>
              <input
                type="text"
                defaultValue="Premium Wireless Headphones"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Hash className="w-4 h-4 mr-2 text-orange-500" />
                Product Slug
              </label>
              <input
                type="text"
                defaultValue="premium-wireless-headphones"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <LayoutGrid className="w-4 h-4 mr-2 text-orange-500" />
                Category
              </label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white">
                <option value="electronics">Electronics</option>
                <option value="audio">Audio</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-orange-500" />
                Description
              </label>
              <textarea
                rows={4}
                defaultValue="High-quality wireless headphones with noise cancellation and 30-hour battery life."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
            </div>

            {/* Pricing */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
                Current Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  defaultValue="199.99"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>
            </div>

            {/* Old Price */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                Original Price
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Optional</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  defaultValue="249.99"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Image className="w-4 h-4 mr-2 text-orange-500" />
              Product Images
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* Existing Images */}
              {[1, 2, 3].map((img) => (
                <div key={img} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Image className="w-8 h-8" />
                    </div>
                  </div>
                  <button className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
              
              {/* Add New Image */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Image</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end space-x-3">
          <button
            onClick={()=>setOpenModal(false)}
            className="px-4 py-2.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-mono text-sm flex items-center">
            <Check className="w-5 h-5 mr-2" />
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;