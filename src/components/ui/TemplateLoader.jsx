import React from "react";

// 🔹 Single Card Skeleton
const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-4 border
      bg-white dark:bg-gray-900
      border-gray-200 dark:border-gray-700">

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] 
        bg-gradient-to-r from-transparent via-white/60 dark:via-gray-700/40 to-transparent" />

      {/* Image */}
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-3" />

      {/* Title */}
      <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />

      {/* Description */}
      <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded mb-1" />
      <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />

      {/* Features */}
      <div className="space-y-1">
        <div className="h-2 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-2 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-2 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
};


// 🔹 Grid Loader
const TemplateLoader = ({ count = 6 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default TemplateLoader;