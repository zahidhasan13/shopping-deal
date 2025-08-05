"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import Link from "next/link";
import useSingleUser from "@/hooks/useSingleUser";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlistItems, loading } = useSelector((state) => state.wishlist);
  const { user } = useSingleUser();
  const userId = user?._id;

  // Fetch wishlist when page loads
  useEffect(() => {
    if (userId) {
      dispatch(getWishlist(userId));
    }
  }, [dispatch, userId]);

  // Remove product from wishlist
  const handleRemove = (productId) => {
    dispatch(removeWishlist({ userId, productId }));
  };

  

  if (!wishlistItems.length) {
    return <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your wishlist yet.
            </p>
            <div className="flex items-center justify-center">
              <Link href="/">
                <Button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-mono text-sm flex items-center justify-center gap-2">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  }

  return (
    <div className="container mx-auto p-5 font-mono">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 flex flex-col shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h2 className="font-semibold line-clamp-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>

            <div className="flex justify-between mt-auto gap-2">
              <Link
                href={`/product?slug=${product.slug}`}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center text-sm"
              >
                View
              </Link>
              <button
                onClick={() => handleRemove(product._id)}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
