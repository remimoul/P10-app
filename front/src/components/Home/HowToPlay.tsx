"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { Swords } from "lucide-react";

const HowToPlay = () => {
  const steps = [
    {
      title: "Challenge your friends",
      description:
        "Create or join leagues (public or private) and compete against other fans",
      icon: <Swords className="w-16 h-16 text-red-600" />,
    },
    {
      title: "Choose your pilot",
      description: "Bet on who finishes 10ᵉ at the next F1 race",
      icon: <FaUsers className="w-16 h-16 text-red-600" />,
    },
    {
      title: "Conquer the podium",
      description:
        "Every winning bet brings you closer to the ultimate trophy!",
      icon: <GiTrophyCup className="w-16 h-16 text-red-600" />,
    },
  ];

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gray-50">
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-[length:300%_100%] bg-[linear-gradient(to_right,black,red,black,white,black,red,black)] opacity-90"
        initial={{ backgroundPosition: "300% 0" }}
        animate={{ backgroundPosition: "-300% 0" }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl font-bold text-center mb-8 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800"
        >
          How to play ?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-red-600"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(HowToPlay);
