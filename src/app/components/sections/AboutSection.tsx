import Image from 'next/image'
import React from 'react'

const AboutSection = () => {
  return (
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
  )
}

export default AboutSection
