import React, { useState } from "react";
import { Star, Heart, ShoppingCart, Eye, Share2 } from "lucide-react";
import Link from "next/link";

const Product = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productData = product;
  const discountPercentage = Math.round(
    ((productData.oldPrice - productData.price) / productData.oldPrice) * 100
  );

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Link href={`/product?slug=${productData?.slug}`}>
      <div className="bg-white rounded shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-sm mx-auto">
        {/* Image Section */}
        <div className="relative overflow-hidden bg-gray-50">
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                -{discountPercentage}%
              </span>
            </div>
          )}
          {/* Main Image */}
          <div className="aspect-square overflow-hidden">
            <img
              src={productData.images[currentImageIndex]}
              alt={productData.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image Thumbnails */}
          {productData.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                {productData.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {productData.category?.name || "Category"}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight h-10">
            {productData.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
            {productData.description}
          </p>

          {/* Reviews */}
          {productData.reviews && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {renderStars(productData.reviews.averageRating)}
              </div>
              <span className="text-sm text-gray-500">
                ({productData.reviews.totalReviews})
              </span>
              <span className="text-xs text-gray-400">
                • {productData.sold} sold
              </span>
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-orange-600">
                ${productData.price}
              </span>
              {productData.oldPrice > productData.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${productData.oldPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover Overlay for Quick Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
      </div>
    </Link>
  );
};

export default Product;
