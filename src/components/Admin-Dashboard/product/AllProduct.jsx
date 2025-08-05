"use client";

import { getProducts, removeProduct } from "@/redux/features/products/productsSlice";
import { Edit, Eye, Package, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateProduct from "./UpdateProduct";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleProductDelete = (id) => {
    console.log("click");
    dispatch(removeProduct(id))
  }


  if (!items || items.length === 0) {
    return <p className="text-center py-6">No products found.</p>;
  }


  return (
    <>
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
        Product List
      </h2>

      {/* 📱 Mobile View */}
      <div className="block lg:hidden">
        {items.map((product) => (
          <div key={product._id} className="p-4 border-b last:border-b-0">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-12 w-12">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate max-w-[6rem]">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500">SKU: {product.slug}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.category?.name || "Uncategorized"} | $
                      {product.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 ml-2">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock || 0}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={()=>handleProductDelete(product?._id)} className="text-red-600 hover:text-red-900 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 max-w-[15rem] truncate">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        SKU: {product.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.category?.name || "Uncategorized"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.stock || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.sold || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={()=>setOpenModal(true)} className="text-green-600 hover:text-green-900 cursor-pointer">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={()=>handleProductDelete(product?._id)} className="text-red-600 hover:text-red-900 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {
        openModal && <UpdateProduct setOpenModal={setOpenModal}/>
    }
    </>
  );
};

export default AllProduct;
