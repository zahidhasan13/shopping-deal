import Link from 'next/link';
import React from 'react';

const CategoryCard = ({category}) => {
    return (
        <Link href={`/category?slug=${category?.slug}`}>
            <div className="group relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Background Image Layer */}
              {category?.image && (
                <div
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category?.image})` }}
                />
              )}

              {/* Dark overlay */}
              {category?.image && (
                <div className="absolute inset-0 bg-black/50 z-0" />
              )}

              {/* Content */}
              <div className="relative z-10 py-20 flex items-center justify-center">
                <span className="text-white text-center font-mono font-bold uppercase">
                  {category?.name}
                </span>
              </div>
            </div>
          </Link>
    );
};

export default CategoryCard;