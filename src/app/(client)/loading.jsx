import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 border-4 border-orange-300 rounded-full animate-spin border-t-orange-500"></div>
        {/* Inner glowing circle */}
        <div className="absolute inset-2 bg-orange-500 rounded-full animate-pulse opacity-75"></div>
      </div>
    </div>
    );
};

export default Loading;