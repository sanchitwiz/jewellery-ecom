import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-4">LuxeGems</h3>
          <p className="text-gray-400">Crafting elegance since 1990</p>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Collections</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">123 Jewelry Lane</p>
          <p className="text-gray-400">Gem City, GC 12345</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
        </div>
        <div className="w-full md:w-1/4">
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-400 mb-4">Subscribe for updates and exclusive offers</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="bg-gray-700 text-white px-4 py-2 rounded-l-full focus:outline-none" />
            <button className="bg-white text-gray-800 px-4 py-2 rounded-r-full hover:bg-gray-200 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2023 LuxeGems. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
