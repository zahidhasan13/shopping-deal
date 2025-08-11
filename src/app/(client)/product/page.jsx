"use client";
import React, { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useSingleProduct from "@/hooks/useSingleProduct";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDispatch } from "react-redux";
import { addCart } from "@/redux/features/cart/cartSlice";
import useSingleUser from "@/hooks/useSingleUser";
import CartSidebar from "@/components/CartSidebar";
import { useRouter } from "next/navigation";

const ProductDetailsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [cartSidebar, setCartSidebar] = useState(false);

  const { product } = useSingleProduct();
  const router = useRouter();
  const { user } = useSingleUser();
  const userId = user?._id;
  const dispatch = useDispatch();
  const productData = product;

  const discountPercentage = Math?.round(
    ((productData?.oldPrice - productData?.price) / productData?.oldPrice) * 100
  );

  // Image navigation
  const handleImageChange = (index) => setCurrentImageIndex(index);
  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === productData?.images.length - 1 ? 0 : prev + 1
    );
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? productData?.images.length - 1 : prev - 1
    );

  // Wishlist
  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  // Quantity update
  const updateQuantity = (change) =>
    setQuantity((prev) => Math?.max(1, prev + change));

  // Stars renderer
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math?.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };
  // Add to cart
  const handleAddToCart = () => {
    if(!userId){
      router.push("/login");
    }
    dispatch(addCart({userId, productId: productData?._id, quantity}));
    setTimeout(() => {
      setCartSidebar(true);
    }, 1000);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-mono">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/category?slug=${productData?.category?.slug}`}
                >
                  {productData?.category?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate">{productData?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded overflow-hidden shadow-lg">
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      -{discountPercentage}% OFF
                    </span>
                  </div>
                )}

                {productData?.images?.length > 0 && (
                  <img
                    src={productData.images[currentImageIndex]}
                    alt={productData?.title || "Product Image"}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Navigation Arrows */}
                {productData?.images?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 sm:p-2 shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 sm:p-2 shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productData?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productData?.slug}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {productData?.category?.name}
              </span>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight line-clamp-3">
                {productData?.title}
              </h1>

              {/* Reviews */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(productData?.reviews?.averageRating)}
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    {productData?.reviews?.averageRating}
                  </span>
                  <span className="text-gray-600 text-sm">
                    ({productData?.reviews?.totalReviews} reviews)
                  </span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="text-gray-600 text-sm">
                  {productData?.sold} sold
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                    ${productData?.price}
                  </span>
                  {productData?.oldPrice > productData?.price && (
                    <span className="text-lg sm:text-xl text-gray-500 line-through">
                      ${productData?.oldPrice}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-green-600 font-medium text-sm sm:text-base">
                    You save $
                    {(productData?.oldPrice - productData?.price).toFixed(2)} (
                    {discountPercentage}% off)
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-mono text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`p-3 rounded border-2 transition-colors ${
                    isWishlisted
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={
                      isWishlisted ? "w-5 h-5 fill-current" : "w-5 h-5"
                    }
                  />
                </button>
                <button className="p-3 rounded border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar cartSidebar={cartSidebar} setCartSidebar={setCartSidebar}/>
    </>
  );
};

export default ProductDetailsPage;
