'use client';
// This is Done
import React, { useState } from 'react';
import Image from 'next/image';
import { CiSearch } from 'react-icons/ci';
import { CgHeart, CgProfile, CgShoppingCart } from 'react-icons/cg';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import logo from '@/assets/logo.png';

const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 py-3 relative">
      <Link href="/" className="md:flex items-center space-x-2">
        <Image src={logo} width={70} height={5} alt="logo" />
      </Link>
      <Link href="/" className="hidden md:flex items-center space-x-2">
        <h1 className="text-xl font-bold">Our Shop</h1>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6 text-gray-700 px-36 text-lg">
        <Link href="/female">
          <li>Female</li>
        </Link>
        <Link href="/male">
          <li>Male</li>
        </Link>
        <Link href="/kids">
          <li>Kids</li>
        </Link>
        <Link href="/products">
          <li>All Products</li>
        </Link>
      </ul>

      {/* Desktop Search Input */}
      <div className="relative items-center flex-1 md:justify-end pr-48 hidden md:flex">
        <div className="flex items-center w-full max-w-s">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="px-4 py-2 border rounded-lg w-full"
          />
          <CiSearch size={22} className="absolute right-52 text-gray-500" />
        </div>
      </div>

      {/* Desktop Icon Buttons */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href='/favourite'>
        <button className="relative hover:text-blue-500 transition-colors duration-200">
          <CgHeart size={30} />
        </button>
        </Link>
        <Link href='/profile'>
        <button className="relative hover:text-blue-500 transition-colors duration-200">
          <CgProfile size={30} />
        </button>
        </Link>
        <Link href='/shopping-cart'>
        <button className="relative hover:text-blue-500 transition-colors duration-200">
          <CgShoppingCart size={30} />
        </button>
        </Link>

      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center space-x-4">
        {/* Mobile Search Toggle */}
        <button
          className="hover:text-blue-500"
          onClick={() => setToggleSearch((prev) => !prev)}
        >
          <CiSearch size={24} />
        </button>

        {/* Mobile Search Bar */}
        {toggleSearch && (
          <div className="absolute top-14 left-0 w-5/6 bg-white shadow-md rounded-md px-4 py-2 z-20">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-xl"
            />
          </div>
        )}

        {/* Mobile Icons */}
        <button className="hover:text-blue-500">
          <CgHeart size={24} />
        </button>
        <button className="hover:text-blue-500">
          <CgShoppingCart size={20} />
        </button>

        {/* Mobile Menu Toggle */}
        {toggleMenu ? (
          <RiCloseLine
            size={24}
            className="hover:text-blue-500"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            size={24}
            className="hover:text-blue-500"
            onClick={() => setToggleMenu(true)}
          />
        )}
      </div>

      {/* Mobile Menu */}
      {toggleMenu && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md z-10">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <Link href="/female" onClick={() => setToggleMenu(false)}>
              <li>Female</li>
            </Link>
            <Link href="/male" onClick={() => setToggleMenu(false)}>
              <li>Male</li>
            </Link>
            <Link href="/kids" onClick={() => setToggleMenu(false)}>
              <li>Kids</li>
            </Link>
            <Link href="/products" onClick={() => setToggleMenu(false)}>
              <li>All Products</li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
