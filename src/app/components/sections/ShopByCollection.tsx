import Image from 'next/image'

export default function ShopByCollection() {
  const collections = [
    {
      name: 'Traditional',
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      url: '/collections/traditional'
    },
    {
      name: 'Contemporary',
      image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      url: '/collections/contemporary'
    },
    {
      name: 'Bridal',
      image: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      url: '/collections/bridal'
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-medium text-gray-900 md:text-5xl lg:text-6xl tracking-tight">
          Shop By Collection
        </h2>
        <p className="mt-4 text-gray-500 md:text-lg">Explore Our Curated Collections</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {collections.map((collection) => (
          <div 
            key={collection.name}
            className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300"
          >
            <div className="relative aspect-square">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-opacity duration-300 group-hover:opacity-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
              <h3 className="mb-4 text-3xl font-medium text-white drop-shadow-md md:text-4xl">
                {collection.name}
              </h3>
              <a
                href={collection.url}
                className="flex items-center justify-center space-x-2 rounded-sm bg-white px-6 py-2 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
              >
                <span>Explore Collection</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 translate-x-0 transition-all duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="/collections"
          className="inline-block text-sm uppercase tracking-wide font-medium text-gray-900 border-b border-gray-900/20 hover:border-gray-900/50 transition-colors"
        >
          View All Collections
        </a>
      </div>
    </section>
  )
}