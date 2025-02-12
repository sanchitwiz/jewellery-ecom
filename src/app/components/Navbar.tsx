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
  const [cartItems] = useState(3); // Replace with actual cart state

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
      scrolled ? 'bg-white/95 shadow-md py-3' : 'bg-white/80 py-4'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Image 
            src={logo} 
            width={70} 
            height={50}
            alt="logo" 
            className="transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-xl font-bold hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Shop
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-gray-700 text-lg">
          {['Female', 'Male', 'Kids', 'All Products'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="relative group"
            >
              <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </li>
            </Link>
          ))}
        </ul>

        {/* Desktop Search Input */}
        <div className="hidden md:flex items-center relative w-1/3 transform transition-all duration-300 hover:scale-[1.02]">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
          />
          <CiSearch 
            size={24} 
            className="absolute right-6 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors duration-200" 
          />
        </div>

        {/* Desktop Icon Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          {[
            { icon: CgHeart, href: '/favourite', count: 0 },
            { icon: CgProfile, href: '/profile' },
            { icon: CgShoppingCart, href: '/cart', count: cartItems }
          ].map(({ icon: Icon, href, count }, index) => (
            <Link key={index} href={href}>
              <button className="relative hover:text-blue-600 transition-colors duration-200 group p-2">
                <Icon size={28} className="hover:scale-110 transition-transform" />
                {typeof count === 'number' && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs group-hover:animate-bounce">
                    {count}
                  </span>
                )}
              </button>
            </Link>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className="hover:text-blue-600 transition-colors duration-200 p-2"
            onClick={() => setToggleSearch((prev) => !prev)}
          >
            <CiSearch size={24} />
          </button>

          {[CgHeart, CgShoppingCart].map((Icon, index) => (
            <button 
              key={index} 
              className="hover:text-blue-600 transition-colors duration-200 p-2 relative"
            >
              <Icon size={24} />
              {index === 1 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </span>
              )}
            </button>
          ))}

          <button
            className="hover:text-blue-600 transition-colors duration-200 p-2"
            onClick={() => setToggleMenu((prev) => !prev)}
          >
            {toggleMenu ? (
              <RiCloseLine size={24} className="animate-rotate" />
            ) : (
              <RiMenu3Line size={24} className="animate-bounce" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        {toggleSearch && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg px-4 py-3 z-20 animate-slideDown">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-300"
              />
              <CiSearch 
                size={24} 
                className="absolute right-6 top-3 text-gray-500" 
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {toggleMenu && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10 animate-slideDown">
            <ul className="flex flex-col items-center py-4 space-y-4">
              {['Female', 'Male', 'Kids', 'All Products'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase().replace(' ', '-')}`} 
                  onClick={() => setToggleMenu(false)}
                  className="w-full text-center"
                >
                  <li className="py-3 hover:bg-blue-50 w-full text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    {item}
                  </li>
                </Link>
              ))}
            </ul>
            <div className="border-t py-4 px-6">
              <div className="flex justify-center space-x-6">
                {[CgProfile, CgHeart].map((Icon, index) => (
                  <button 
                    key={index} 
                    className="p-2 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Icon size={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;