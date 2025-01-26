import React from 'react'
import Hero from './components/Hero'
import ShopByCategory from './components/ShopByCategory'
import ProductPage from '@/extraUi/ProductPage'
// import Hero from './components/Heroo'

const page = () => {
  return (
    <div>
      <Hero/>
      <ShopByCategory/>
      <ProductPage />
    </div>
  )
}

export default page
