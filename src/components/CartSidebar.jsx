"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useSingleUser from "@/hooks/useSingleUser";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { getCart } from "@/redux/features/cart/cartSlice";

const CartSidebar = ({ cartSidebar, setCartSidebar }) => {
  const dispatch = useDispatch();
  const { cartItems = [], loading } = useSelector((state) => state.cart);
  const { user } = useSingleUser();
  const userId = user?._id;
  console.log(cartItems,"sidebar");

  useEffect(() => {
    if (userId) {
      dispatch(getCart(userId));
    }
  }, [dispatch, userId]);

  const calculateTotal = (price, quantity) => {
    if (!price || !quantity) return "0.00";
    return (price * quantity).toFixed(2);
  };

  return (
    <Sheet open={cartSidebar} onOpenChange={setCartSidebar}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] p-0 flex flex-col font-mono"
      >
        {/* Header */}
        <div className="p-5 border-b">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Items you have added to your cart
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading ? (
            <p>Loading cart items...</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id || item.product?._id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                  {item.product?.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title || "Product image"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-2">
                    {item.product?.title || `Product ID: ${item.productId}`}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × $
                    {item.product?.price?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <span className="font-medium">
                  ${calculateTotal(item.product?.price, item.quantity)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Sticky Bottom Checkout Button - Only show if cart has items */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t bg-white sticky bottom-0 space-y-2">
            <Link href="/cart" className="block">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-mono text-sm">
                Go to Cart
              </button>
            </Link>
            <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-mono text-sm">
              Proceed to Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;