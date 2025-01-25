
import React from "react";
import { FiUser } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link"; // Import Link from next/link

const Navbar = () => {
  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#D0BDF4] shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold text-[#8458B3]">BrandName</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-md bg-white text-black px-4 py-2 rounded-full border-[#8458B3]"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-[#8458B3]">
          <Link href="/wishlist">
            <LuHeart className="w-6 h-6 hover:text-gray-700" />
          </Link>
          <Link href="/login">
            <FiUser className="w-6 h-6 hover:text-gray-700" />
          </Link>
          <Link href="/cart">
            <HiOutlineShoppingCart className="w-6 h-6 hover:text-gray-700" />
          </Link>
        </div>
      </div>

      {/* Shadow between the bars */}
      <div className="h-1 bg-gradient-to-b from-transparent to-[#A0D2EB] shadow-sm" />

      {/* Lower Bar */}
      <div className="flex justify-center bg-[#A0D2EB] py-3 shadow-sm">
        <nav className="flex space-x-8 text-[#8458B3] font-medium">
          <Link href="/new-arrival">
            <span className="hover:text-[#8458B3]/80">New Arrival</span>
          </Link>
          <Link href="/collection">
            <span className="hover:text-[#8458B3]/80">Collection</span>
          </Link>
          <Link href="/shop-by">
            <span className="hover:text-[#8458B3]/80">Shop-by</span>
          </Link>
          <Link href="/made-for-you">
            <span className="hover:text-[#8458B3]/80">Made for You</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
