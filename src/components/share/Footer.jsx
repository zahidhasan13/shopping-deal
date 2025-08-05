import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="Footer bg-gradient-to-b from-gray-50 to-white pt-10 pb-20 md:pb-10 border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 md:gap-0">
          <div className="lg:col-span-2">
            <div className="footer-social flex items-center gap-4">
              <Link href="/" className="p-2 bg-blue-800 rounded-full text-white hover:bg-blue-700 transition">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="/" className="p-2 bg-gradient-to-r from-amber-500 to-pink-500 rounded-full text-white hover:from-amber-600 hover:to-pink-600 transition">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
            <div className="subscription my-10">
              <h3 className="text-xl font-mono text-gray-800">Don't miss out!</h3>
              <p className="text-gray-500 font-mono text-sm mt-2">
                Get early access to the latest fashion trends, deals and just in styles.
              </p>
              <form className="flex flex-col md:flex-row md:items-center gap-3 mt-5">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 focus:outline-none border border-gray-300 rounded w-full md:w-80 font-mono text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase rounded font-medium cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-mono text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-3"></div>
          <div className="lg:col-span-2">
            <h3 className="text-xl font-mono font-semibold text-gray-800">Quick Links</h3>
            <div className="grid grid-cols-2 mt-5 gap-y-3">
              <div className="flex flex-col gap-3 text-sm">
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Help/FAQs</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Contact Us</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Shipping Policy</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Return Policy</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Refund Policy</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Privacy Policy</Link>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Terms of Service</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Accessibility</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">About Us</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Rewards</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Influencer Program</Link>
                <Link href="/" className="font-mono text-gray-600 hover:text-amber-600 transition">Gift Cards</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright mt-10 border-t border-gray-200 pt-5">
          <p className="text-gray-500 text-center font-mono text-xs uppercase tracking-wide">
            COPYRIGHT© {new Date().getFullYear()} T-Shirt Shop, LLC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;