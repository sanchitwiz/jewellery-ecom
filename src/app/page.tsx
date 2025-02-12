import Navbar from './components/Navbar'
import ShopByCollection from './components/sections/ShopByCollection'
import FeaturedProducts from './components/sections/FeaturedProducts'
import OnlyForYou from './components/sections/OnlyForYou'
import WhyChooseUs from './components/sections/WhyChooseUs'
import AboutSection from './components/sections/AboutSection'
import Footer from './components/Footer'
import { HeroCarousel } from './components/sections/HeroCarausel'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="mt-[80px]">
        <HeroCarousel />
        
        <ShopByCollection />
        <FeaturedProducts />
        <OnlyForYou />
        <WhyChooseUs />
        <AboutSection />
      </main>

      <Footer />
    </div>
  )
}