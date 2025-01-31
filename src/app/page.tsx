import Image from 'next/image'
import {  HeroCarousel } from './components/carausel'
import Navbar from './components/Navbar'
import { RiLeafLine } from 'react-icons/ri';
// import { GiPurity, GiCrystalGrowth } from 'react-icons/gi';
import { MdOutlineSecurity } from 'react-icons/md';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <main className="mt-[80px]"/> {/* Adjust margin-top to match navbar height */}
      <HeroCarousel/>

      {/* Shop By Collection */}
      <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop By Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Traditional', 'Contemporary', 'Bridal'].map((collection) => (
              <div key={collection} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image 
                  src={`/collections/${collection.toLowerCase()}.jpg`} 
                  alt={collection}
                  width={400}
                  height={500}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{collection}</h3>
                    <button className="bg-white text-gray-800 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      

      {/* Featured Products */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src="https://plus.unsplash.com/premium_photo-1675003662150-2569448d2b3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGpld2VsZXJ5fGVufDB8MXwwfHx8MA%3D%3D" alt={`Product ${item}`} width={400} height={300} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Elegant Piece {item}</h3>
                <p className="text-gray-600 mb-4">A stunning addition to your collection</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">$299.99</span>
                  <button className="bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Only For You Section */}
      <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Only For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Trending', 'New Arrivals', 'Best Sellers'].map((category) => (
                <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden group">
                  <div className="relative">
                    <Image 
                      src={`/categories/${category.toLowerCase().replace(' ', '-')}.jpg`}
                      alt={category}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      {category === 'Trending' ? 'Hot' : category === 'New Arrivals' ? 'New' : 'Popular'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{category}</h3>
                    <p className="text-gray-600 mb-4">Discover our {category.toLowerCase()} collection</p>
                    <button className="w-full bg-gray-800 text-white py-2 rounded-full hover:bg-gray-700 transition duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">Every piece is crafted with the finest materials and attention to detail</p>
              </div>
              <div className="text-center">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RiLeafLine className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-gray-600">Sustainable practices and environmentally conscious manufacturing</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdOutlineSecurity className="text-3xl text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lifetime Warranty</h3>
                <p className="text-gray-600">We stand behind our products with lifetime warranty support</p>
              </div>
            </div>
          </div>
        </div>

      {/* About Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="About Us" width={600} height={400} className="rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
                At LuxeGems, we believe in the power of exquisite jewelry to transform moments into memories. 
                Our passion for craftsmanship and dedication to quality shine through in every piece we create.
              </p>
              <button className="bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>



      {/* Footer */}
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
    </div>
  )
}
