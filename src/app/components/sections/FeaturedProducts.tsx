import Image from 'next/image'

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: 'Silk Embroidered Dress',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80',
      url: '/products/silk-dress'
    },
    {
      id: 2,
      name: 'Handcrafted Jewelry Set',
      price: 189.50,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3556e?auto=format&fit=crop&w=800&q=80',
      url: '/products/jewelry-set'
    },
    {
      id: 3,
      name: 'Traditional Footwear',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      url: '/products/traditional-footwear'
    },
    {
      id: 4,
      name: 'Designer Saree Collection',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
      url: '/products/designer-saree'
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-medium text-gray-900 md:text-5xl tracking-tight">
          Featured Collection
        </h2>
        <p className="mt-3 text-gray-500 md:text-lg">Curated Premium Fashion</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
        {products.map((product) => (
          <div 
            key={product.id}
            className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300"
          >
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-opacity duration-300 group-hover:opacity-95"
                loading="lazy"
              />
              
              <div className="absolute top-4 right-4">
                <span className="rounded-sm bg-gray-900 text-white px-3 py-1 text-xs font-medium uppercase tracking-wide border border-white/10">
                  New Arrival
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-normal text-gray-900 mb-1">{product.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium text-gray-900">${product.price}</p>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M12 4v16m8-8H4" 
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80">
              <button className="text-sm tracking-wide uppercase font-medium text-white border-b border-white/20 hover:border-white/50 transition-colors">
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="/collections"
          className="inline-block text-sm uppercase tracking-wide font-medium text-gray-900 border-b border-gray-900/20 hover:border-gray-900/50 transition-colors"
        >
          View All Products
        </a>
      </div>
    </section>
  )
}