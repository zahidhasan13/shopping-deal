"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSliders from "@/hooks/useSliders";

const HeroSlider = () => {
  const { sliders } = useSliders();
  return (
    <div className="relative container mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".hero-carousel-next",
          prevEl: ".hero-carousel-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        spaceBetween={40}
        centeredSlides={true}
        className="overflow-hidden"
      >
        {sliders?.map((slider) => (
          <SwiperSlide key={slider?._id}>
            <div className="relative w-full">
              <Image
                src={slider?.img}
                alt="Slider"
                width={1920}
                height={500}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        aria-label="Previous slide"
        className="hero-carousel-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-orange-600 transition-colors focus:outline-none cursor-pointer"
      >
        <ChevronLeft className="text-orange-600 hover:text-white" size={30} />
      </button>
      <button
        aria-label="Next slide"
        className="hero-carousel-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-orange-600 transition-colors focus:outline-none cursor-pointer"
      >
        <ChevronRight className="text-orange-600 hover:text-white" size={30} />
      </button>
    </div>
  );
};

export default HeroSlider;
