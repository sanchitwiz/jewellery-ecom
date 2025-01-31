'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CiSearch } from 'react-icons/ci';
import { CgHeart, CgProfile, CgShoppingCart } from 'react-icons/cg';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import logo from '@/assets/logo.png';

const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} width={70} height={5} alt="logo" className="transition-transform duration-300 hover:scale-110" />
          <h1 className="text-xl font-bold hidden md:block">Our Shop</h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-gray-700 text-lg">
          {['Female', 'Male', 'Kids', 'All Products'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`}>
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">{item}</li>
            </Link>
          ))}
        </ul>

        {/* Desktop Search Input */}
        <div className="hidden md:flex items-center relative w-1/3">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          />
          <CiSearch size={22} className="absolute right-4 text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200" />
        </div>

        {/* Desktop Icon Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          {[
            { icon: CgHeart, href: '/favourite' },
            { icon: CgProfile, href: '/profile' },
            { icon: CgShoppingCart, href: '/shopping-cart' }
          ].map(({ icon: Icon, href }, index) => (
            <Link key={index} href={href}>
              <button className="relative hover:text-blue-500 transition-colors duration-200 group">
                <Icon size={30} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs group-hover:animate-pulse">0</span>
              </button>
            </Link>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className="hover:text-blue-500 transition-colors duration-200"
            onClick={() => setToggleSearch((prev) => !prev)}
          >
            <CiSearch size={24} />
          </button>

          {[CgHeart, CgShoppingCart].map((Icon, index) => (
            <button key={index} className="hover:text-blue-500 transition-colors duration-200">
              <Icon size={24} />
            </button>
          ))}

          <button
            className="hover:text-blue-500 transition-colors duration-200"
            onClick={() => setToggleMenu((prev) => !prev)}
          >
            {toggleMenu ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {toggleSearch && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md px-4 py-2 z-20 transition-all duration-300">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          />
        </div>
      )}

      {/* Mobile Menu */}
      {toggleMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 transition-all duration-300">
          <ul className="flex flex-col items-center py-4 space-y-4">
            {['Female', 'Male', 'Kids', 'All Products'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} onClick={() => setToggleMenu(false)}>
                <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">{item}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
