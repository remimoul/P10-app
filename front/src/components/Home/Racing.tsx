"use client";

import { motion } from "framer-motion";
import { TbTargetArrow } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import Image from "next/image";

const TimerUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div
    className="flex flex-col items-center mx-2"
    whileHover={{ scale: 1.05 }}
  >
    <div className="font-mono text-3xl md:text-4xl text-red-600">
      {value.toString().padStart(2, "0")}
    </div>
    <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">
      {label}
    </div>
  </motion.div>
);

const Racing = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-03-01T12:00:00") - +new Date();
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hasTimeLeft = Object.values(timeLeft).some((v) => v > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 my-12 md:my-20">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative group hover:shadow-lg transition-shadow duration-300">
        <motion.div
          className="absolute h-1 bg-gradient-to-r from-red-600 via-white to-red-600 w-full top-0"
          initial={{ backgroundPosition: "-200% 0" }}
          animate={{ backgroundPosition: "200% 0" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              <span className="text-red-600 block mb-2">PREDICT THE 10TH</span>
              Australian Grand Prix 2024
            </motion.h2>

            <p className="text-gray-600  text-lg leading-relaxed">
              Create your own prediction and challenge your friends in the
              league...
              <br />
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Let the race begin!
              <br />
            </p>

            <div className="flex items-center mb-8">
              <AiOutlineClockCircle className="mr-4 text-red-600" size={40} />
              <div className="flex space-x-4 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200">
                {hasTimeLeft ? (
                  Object.entries(timeLeft).map(([unit, value]) => (
                    <TimerUnit
                      key={unit}
                      value={value}
                      label={unit.charAt(0).toUpperCase()}
                    />
                  ))
                ) : (
                  <div className="bg-red-100 px-4 py-2 rounded-lg text-red-600 flex items-center">
                    <span className="mr-2">🏁</span>
                    BETS CLOSED - RACE IN PROGRESS !
                  </div>
                )}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden"
            >
              <Button
                variant="default"
                className="bg-gradient-to-br from-[#2B2D42] to-[#2A3439] hover:from-[#D90429] hover:to-[##2B2D42] text-white px-10 py-6 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all group w-full md:w-auto"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="relative"
                  >
                    <TbTargetArrow className="w-6 h-6 text-white" />
                    <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-ping" />
                  </motion.div>

                  <span className="relative">
                    <span className="block transform  transition-transform">
                      Choose your stable
                    </span>
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-transparent">
                      Choose your stable
                    </span>
                  </span>
                </div>

                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-[url('/svg/racing-line.svg')] bg-contain animate-racing-line" />
                </div>
              </Button>

              <div className="absolute -right-2 -top-2 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center border border-gray-200">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  AVAILABLE LEAGUES
                </span>
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 relative">
            <motion.div
              className="h-64 md:h-auto relative"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Image
                src="/circuit.jpeg"
                alt="Circuit d'Albert Park"
                width={800}
                height={600}
                className="w-full h-full object-cover transform origin-center transition-transform duration-500 border-l border-gray-100"
                style={{
                  transform: isHovered
                    ? "scale(1.03) rotate(0.5deg)"
                    : "scale(1)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Racing;
