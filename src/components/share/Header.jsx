"use client";
import {
  Facebook,
  Heart,
  HomeIcon,
  Instagram,
  List,
  Search,
  ShoppingBag,
  User,
  User2,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { data: session, status } = useSession();
  const { totalQuantity } = useSelector((state) => state.cart);
  return (
    <header className="Header font-mono">
      <div className="header-top bg-gradient-to-r from-indigo-900 to-blue-800">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-gray-200">
            <Link href="/">
              <Facebook className="w-5 h-5 hover:text-white transition duration-200" />
            </Link>
            <Link href="/">
              <Instagram className="w-5 h-5 hover:text-pink-300 transition duration-200" />
            </Link>
          </div>

          {/* Login/Register Button */}
          <div>
            {session?.user ? (
              <div className="flex items-center gap-2 text-white">
                <Avatar className="border-2 border-white">
                  <AvatarImage
                    src={`${
                      session?.user?.image
                        ? session?.user?.image
                        : "https://github.com/shadcn.png"
                    }`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h3>{session?.user?.name}</h3>
              </div>
            ) : (
              <Link href="/login">
                <button className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-md transition cursor-pointer hover:from-amber-600 hover:to-orange-600 shadow-md">
                  Login / Register
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="promotion-text bg-gradient-to-r from-amber-500 to-orange-500 py-2">
        <div className="text-center">
          <p className="uppercase text-white font-medium text-sm font-mono tracking-wide">
            Flash Events | This Weeks Hottest Deals
          </p>
        </div>
      </div>
      {/* Large Device Navbar */}
      <div className="Navbar hidden lg:block border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link href="/">
              <span className="uppercase text-3xl font-semibold tracking-wider bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Shopping Deal
              </span>
            </Link>
          </div>

          {/* Search + Icons */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <form className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 py-2 w-64 focus:outline-none text-sm text-gray-700"
              />
              <button
                type="submit"
                className="px-3 py-2 text-gray-600 hover:text-amber-600 bg-gray-100 h-full"
              >
                <Search className="w-5 h-5 transition cursor-pointer" />
              </button>
            </form>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Link href="/wishlist">
                <Heart className="w-5 h-5 text-gray-700 hover:text-amber-600 transition cursor-pointer" />
              </Link>
              <Link href="/cart" className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-700 hover:text-amber-600 transition cursor-pointer" />
                {totalQuantity > 0 && (
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2 bg-orange-600"
                  >
                    {totalQuantity}
                  </Badge>
                )}
              </Link>
              <Link href="/profile">
                <User2 className="w-5 h-5 text-gray-700 hover:text-amber-600 transition cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Device Search Bar */}
      <div className="Mobile-searchBar md:hidden block border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex flex-col items-center gap-2">
          {/* Logo */}
          <div>
            <Link href="/">
              <span
                className="uppercase text-3xl font-semibold tracking-wider bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent"
                style={{ fontFamily: "'Birthstone', cursive" }}
              >
                T-Shirt Shop
              </span>
            </Link>
          </div>

          {/* Search + Icons */}
          <div className="flex items-center gap-6 w-full">
            {/* Search Bar */}
            <form className="flex items-center justify-between border border-gray-300 rounded-md overflow-hidden w-full focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 py-2 focus:outline-none text-sm w-full text-gray-700"
              />
              <button
                type="submit"
                className="px-3 text-gray-600 hover:text-amber-600 bg-gray-100 h-full"
              >
                <Search className="w-5 h-5 transition cursor-pointer" />
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Mobile NavBar Bottom */}
      <div className="mobile-navbar md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-2 px-4 z-50">
        <div className="flex items-center justify-around">
          <Link href="/" className="p-2 text-gray-700 hover:text-amber-600">
            <HomeIcon className="w-6 h-6" />
          </Link>
          <Link
            href="/categories"
            className="p-2 text-gray-700 hover:text-amber-600"
          >
            <List className="w-6 h-6" />
          </Link>
          <Link href="/cart" className="p-2 text-gray-700 hover:text-amber-600">
            <ShoppingBag className="w-6 h-6" />
          </Link>
          <Link
            href="/profile"
            className="p-2 text-gray-700 hover:text-amber-600"
          >
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
