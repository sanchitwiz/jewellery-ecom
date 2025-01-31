"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
  };

  const heroImages = [
    {
      src: "https://plus.unsplash.com/premium_photo-1708958142067-f52023835f55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amV3ZWxlcnl8ZW58MHwwfDB8fHww",
      alt: "Elegant Necklace",
      title: "Exquisite Necklaces",
      subtitle: "Adorn yourself with timeless elegance",
    },
    {
      src: "https://images.unsplash.com/photo-1617117811969-97f441511dee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amV3ZWxlcnl8ZW58MHwwfDB8fHww",
      alt: "Diamond Ring",
      title: "Stunning Rings",
      subtitle: "Symbols of eternal love and commitment",
    },
    {
      src: "https://images.unsplash.com/photo-1570891836868-673ee4818f81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpld2VsZXJ5fGVufDB8MHwwfHx8MA%3D%3D",
      alt: "Sparkling Earrings",
      title: "Dazzling Earrings",
      subtitle: "Elevate your style with our curated collection",
    },
  ];

  return (
    <div className="relative">
      <Slider {...settings}>
        {heroImages.map((image, index) => (
          <div key={index} className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white px-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center">
                {image.title}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-4 text-center">
                {image.subtitle}
              </p>
              <button className="bg-white text-gray-800 py-2 px-4 rounded-full text-base font-semibold hover:bg-gray-200 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
