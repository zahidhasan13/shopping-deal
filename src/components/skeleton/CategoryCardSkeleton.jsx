const CategoryCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-200 animate-pulse">
      {/* Background Image Layer Skeleton */}
      <div className="absolute inset-0 bg-gray-300" />

      {/* Dark overlay Skeleton */}
      <div className="absolute inset-0 bg-gray-400/30 z-0" />

      {/* Content Skeleton */}
      <div className="relative z-10 py-20 flex items-center justify-center">
        <div className="h-8 w-32 bg-gray-100 rounded-md"></div>
      </div>
    </div>

    
  );
};

export default CategoryCardSkeleton;