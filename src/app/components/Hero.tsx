"use client"
import React from "react";
import Slider from "react-slick"; // Importing slick slider

const Hero = () => {
  // Slick Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full">
      {/* Carousel */}
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          <div>
            <img
              src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Mia-Library/default/dw1190a667/images/homepage/herobanner/cupid-desktop.jpg"
              alt="Carousel Image 1"
              className="w-full h-85 object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
              Golden Smiles Await
            </div>
          </div>
          <div>
            <img
              src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Mia-Library/default/dw6f3df789/images/homepage/herobanner/homepage-desktop-valentine.jpg"
              alt="Carousel Image 2"
              className="w-full h-85 object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
              Golden Smiles Await
            </div>
          </div>
          <div>
            <img
              src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Mia-Library/default/dw1190a667/images/homepage/herobanner/cupid-desktop.jpg"
              alt="Carousel Image 3"
              className="w-full h-85 object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
              Golden Smiles Await
            </div>
          </div>
          <div>
            <img
              src="https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Mia-Library/default/dw1190a667/images/homepage/herobanner/cupid-desktop.jpg"
              alt="Carousel Image 1"
              className="w-full h-85 object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
              Golden Smiles Await
            </div>
          </div>
          
          
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
