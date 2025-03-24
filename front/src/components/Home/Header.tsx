"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Header = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      image: "/",
      alt: "...",
      caption: "...",
    },
    {
      image: "/",
      alt: "...",
      caption: "...",
    },
    {
      image: "/",
      alt: "...",
      caption: "...",
    },
  ];

  return (
    <header className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-80 md:h-[600px]">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              className="w-full h-full object-cover"
              quality={80}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <motion.h1
                className="text-2xl md:text-5xl text-white font-extrabold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {slide.caption}
              </motion.h1>
            </div>
          </div>
        ))}
      </Slider>
    </header>
  );
};

export default Header;
