"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Search,
  ArrowLeft,
  ShoppingBag,
  Headphones,
  MapPin,
  Compass,
} from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingIcons = [
    { Icon: ShoppingBag, delay: 0, size: "w-6 h-6" },
    { Icon: Headphones, delay: 1, size: "w-8 h-8" },
    { Icon: MapPin, delay: 2, size: "w-5 h-5" },
    { Icon: Compass, delay: 0.5, size: "w-7 h-7" },
    { Icon: Search, delay: 1.5, size: "w-6 h-6" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-xl"></div>
        <div
          className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-20 w-20 h-20 bg-orange-400/25 rounded-full blur-lg"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating icons */}
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute text-orange-300/40`}
            style={{
              left: `${15 + index * 15}%`,
              top: `${20 + index * 10}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: "3s",
            }}
          >
            <item.Icon className={item.size} />
          </div>
        ))}
      </div>

      {/* Parallax effect background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)`,
        }}
      ></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-orange-200/20 blur-sm leading-none select-none">
            404
          </div>

          {/* Decorative elements around 404 */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-4 border-orange-400 rounded-full"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-orange-500 rounded-full"></div>
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-orange-300 rotate-45"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            It looks like the page you're looking for has wandered off into the
            digital wilderness. Don't worry, even the best explorers sometimes
            take a wrong turn!
          </p>

          {/* Fun message */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mx-auto max-w-lg">
            <p className="text-orange-800 font-medium">
              "Not all who wander are lost... but this page definitely is!"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex items-center justify-center">
          <Link href="/">
            <button className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3 min-w-[200px] cursor-pointer">
              <Home className="w-5 h-5 transition-transform duration-300" />
              Back to Home
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
