// import { useState } from "react";

// const images = [
//   "img/Banner1.jpg",
//   "img/banner2.webp",
//   "img/banner3.jfif"
// ];

// const SliderBanner = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   return (
//     <div className="relative w-full max-w-4xl mx-auto">
//       <img src={images[currentIndex]} alt="Banner" className="w-full h-64 object-cover rounded-md shadow-lg" />
//       <button 
//         onClick={prevSlide}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
//       >
//         ❮
//       </button>

//       <button 
//         onClick={nextSlide}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
//       >
//         ❯
//       </button>
//     </div>
//   );
// };

// export default SliderBanner;





import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Importing icons

const images = [
  "img/Banner4.jpg",
  "img/banner2.webp",
  "img/Banner5.jpg"
];

const SliderBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-xl mb-8">
      <img
        src={images[currentIndex]}
        alt="Banner"
        className="w-full h-64 object-cover transition-opacity duration-700 ease-in-out" // Changed h-80 to h-64
      />

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition duration-300"
        aria-label="Previous Slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition duration-300"
        aria-label="Next Slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 w-2.5 rounded-full ${
              currentIndex === idx ? "bg-white" : "bg-white/50"
            } hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition duration-300`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderBanner;