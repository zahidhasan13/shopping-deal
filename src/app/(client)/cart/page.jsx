"use client";
import React, { useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeCart } from "@/redux/features/cart/cartSlice";
import useSingleUser from "@/hooks/useSingleUser";
import Link from "next/link";

const CartPage = () => {
  const dispatch = useDispatch();
  const {
    cartItems = [],
    loading,
    totalQuantity,
  } = useSelector((state) => state.cart);
  const { user } = useSingleUser();
  const userId = user?._id;
  console.log(cartItems, "cart page");

  useEffect(() => {
    if (userId) {
      dispatch(getCart(userId));
    }
  }, [dispatch, userId]);

  const updateQuantityHandler = (productId, newQuantity) => {
    console.log(userId, productId, newQuantity);
    if (newQuantity < 1) return;
    dispatch(updateCart({ userId, productId, quantity: newQuantity }));
  };

  const removeItemHandler = (productId) => {
    dispatch(removeCart({ userId, productId }));
  };

  // Safe calculations with proper fallbacks
  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.product?.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/"><Button
            variant="ghost"
            className="mb-4 p-0 h-auto text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Button></Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {totalQuantity} items in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <Card>
              <CardContent className="p-0">
                {cartItems?.map((item, index) => {
                  const productPrice = Number(item.product?.price) || 0;
                  const quantity = Number(item.quantity) || 0;
                  const totalPrice = productPrice * quantity;

                  return (
                    <div key={item.product?._id || index}>
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            {item.product?.images?.[0] ? (
                              <img
                                src={item.product.images[0]}
                                alt={item.product?.title || "Product image"}
                                className="h-24 w-24 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center">
                                <ShoppingBag className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {item.product?.title || "No title"}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              {item.product?.color && (
                                <span>Color: {item.product.color}</span>
                              )}
                              {item.product?.size && (
                                <span>Size: {item.product.size}</span>
                              )}
                            </div>

                            {/* Mobile Price */}
                            <div className="md:hidden mb-3">
                              <span className="text-lg font-semibold text-gray-900">
                                ${productPrice.toFixed(2)}
                              </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={loading}
                                  onClick={() =>
                                    updateQuantityHandler(
                                      item.product?._id,
                                      quantity - 1
                                    )
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium w-12 text-center">
                                  {quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={loading}
                                  onClick={() =>
                                    updateQuantityHandler(
                                      item.product?._id,
                                      quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() =>
                                  removeItemHandler(item.product?._id)
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                              </Button>
                            </div>
                          </div>

                          {/* Desktop Price */}
                          <div className="hidden md:flex flex-col items-end">
                            <span className="text-lg font-semibold text-gray-900">
                              ${productPrice.toFixed(2)}
                            </span>
                            {quantity > 1 && (
                              <span className="text-sm text-gray-600">
                                ${totalPrice.toFixed(2)} total
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-base font-semibold">Total</span>
                    <span className="text-lg font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {shipping > 0 && subtotal < 100 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      Add ${(100 - subtotal).toFixed(2)} more to get free
                      shipping!
                    </p>
                  </div>
                )}

                <Button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-mono text-sm">
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Secure checkout powered by SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
