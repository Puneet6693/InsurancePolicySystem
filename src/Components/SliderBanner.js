import { useState } from "react";

const images = [
  "img/Banner1.jpg",
  "img/banner2.webp",
  "img/banner3.jfif"
];

const SliderBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <img src={images[currentIndex]} alt="Banner" className="w-full h-64 object-cover rounded-md shadow-lg" />
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
      >
        ❮
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
      >
        ❯
      </button>
    </div>
  );
};

export default SliderBanner;
