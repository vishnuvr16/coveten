'use client'

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Import Swiper styles

interface HeroItem {
  id: string;
  title: string;
  image: string;
  description: string;
  location: string;
}

interface SmallHeroSwiperProps {
    smallHeroes: HeroItem[]; // Combined list of smallheroes and secondary largeheroes
    smallHeroCount: number; // Count of smallheroes
    onImageClick: (id: string, type: string) => void;
  }

const SmallHeroSwiper: React.FC<SmallHeroSwiperProps> = ({
    smallHeroes,
    smallHeroCount,
    onImageClick,  
}) => {
  const router = useRouter();

  return (
    <Swiper
      slidesPerView={2} // Adjust slides based on device width
      spaceBetween={10}
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 15 }, // For tablets
        768: { slidesPerView: 4, spaceBetween: 20 }, // For desktops
      }}
    >
      {smallHeroes.map((hero, index) => (
        <SwiperSlide key={hero.id}>
          <div
             className="relative w-full h-56 overflow-hidden  cursor-pointer"
            onClick={() =>
              onImageClick(
                hero.id,
                index < smallHeroCount ? "smallhero" : "largehero"
              )
            }
          >
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                transition: "transform 0.6s ease-in-out",
              }}
              className="hover:scale-125"
            />
            <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
              {hero.title}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SmallHeroSwiper;
