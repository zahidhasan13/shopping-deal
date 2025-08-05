const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-sm mx-auto animate-pulse">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-200 aspect-square">
        {/* Discount Badge Skeleton */}
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gray-300 w-10 h-6 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Category Skeleton */}
        <div className="mb-2">
          <div className="bg-gray-200 w-20 h-5 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>

        {/* Description Skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-2/3"></div>

        {/* Reviews Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
          <div className="w-12 h-3 bg-gray-200 rounded"></div>
        </div>

        {/* Price Section Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-6 bg-gray-300 rounded"></div>
            <div className="w-10 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;