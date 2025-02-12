import React from 'react'
import { MdOutlineSecurity, MdWorkspacePremium } from 'react-icons/md'
import { RiLeafLine } from 'react-icons/ri'

const WhyChooseUs = () => {
  return (
<div className="bg-white py-16">
<div className="container mx-auto px-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Us</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="text-center">
      <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      <MdWorkspacePremium className="text-3xl text-green-600" />
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
  )
}

export default WhyChooseUs
