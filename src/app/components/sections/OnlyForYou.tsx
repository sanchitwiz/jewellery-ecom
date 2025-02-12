import Image from 'next/image'

const OnlyForYou = () => {
  return (
    <div className="bg-white py-16 border-t border-b border-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-black mb-8 text-center tracking-tight">
          Only For You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Trending', 'New Arrivals', 'Best Sellers'].map((category) => (
            <div 
              key={category} 
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <Image 
                  src="https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGpld2VsZXJ5fGVufDB8MXwwfHx8MA%3D%3D"
                  alt={category}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium border border-white">
                  {category === 'Trending' ? 'HOT' : category === 'New Arrivals' ? 'NEW' : 'TOP'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-black">{category}</h3>
                <p className="text-gray-600 mb-4 font-light">Discover our {category.toLowerCase()} collection</p>
                <button className="w-full bg-black text-white py-3 rounded-sm hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300 font-medium">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OnlyForYou