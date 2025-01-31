import Image from 'next/image'
import React from 'react'

const ShopByCategory = () => {
  return (
    <div>
        <div className='flex align-bottom font-bold justify-center pt-15 text-4xl '>shop By <span className='flex'> Category</span></div>
      <div className="flex justify-around py-4 bg-[#F4F4F4] space-x-6 rounded-md">
        <div className="category-item text-center">
          <Image
            src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw4ab7562e/images/hi-res/5923BLO.jpg?sw=480&sh=480"
            alt="Bracelet"
            className="w-25 h-25 mx-auto rounded-full"
          />
          <span className="block text-sm text-[#8458B3]">Bracelet</span>
        </div>
        <div className="category-item text-center">
          <Image
            src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwa530aa39/images/Mia/hi-res/3024FQE.jpg?sw=480&sh=480"
            alt="Ring"
            className="w-25 h-25 mx-auto rounded-full"
          />
          <span className="block text-sm text-[#8458B3]">Ring</span>
        </div>
        <div className="category-item text-center">
          <Image
            src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8b7c6a4b/images/hi-res/3023VBN.jpg?sw=480&sh=480"
            alt="Necklace"
            className="w-25 h-25 mx-auto rounded-full"
          />
          <span className="block text-sm text-[#8458B3]">Bangles</span>
        </div>
        <div className="category-item text-center">
          <Image
            src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwe81ae315/images/hi-res/3023NFU.jpg?sw=480&sh=480"
            alt="Earring"
            className="w-25 h-25 mx-auto rounded-full"
          />
          <span className="block text-sm text-[#8458B3]">Necklace</span>
        </div>
        <div className="category-item text-center">
          <Image
            src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw0036b21c/images/Mia/hi-res/4020SFP.jpg?sw=480&sh=480"
            alt="Bangles"
            className="w-25 h-25 mx-auto rounded-full"
          />
          
          <span className="block text-sm text-[#8458B3]">Earring</span>
        </div>
      </div>
    </div>
  )
}

export default ShopByCategory
