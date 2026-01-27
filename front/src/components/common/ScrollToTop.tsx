"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const speedLines = Array.from({ length: 8 }, (_, i) => i);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{
            scale: 1.15,
            y: -4,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Remonter en haut de la page"
        >
          <div className="relative">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 overflow-hidden">
              {speedLines.map((line, index) => (
                <motion.div
                  key={index}
                  className="absolute w-full bg-gradient-to-b from-transparent via-red-500/60 to-transparent"
                  style={{
                    height: `${8 + index * 2}px`,
                    left: `${-2 + index * 0.5}px`,
                    opacity: 0.4 - index * 0.05,
                  }}
                  animate={isHovered ? {
                    y: [-20, -60],
                    opacity: [0.4 - index * 0.05, 0],
                  } : {
                    y: [-10, -30],
                    opacity: [0.2 - index * 0.03, 0],
                  }}
                  transition={{
                    duration: 0.8 + index * 0.1,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.1,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-t from-red-600/40 to-transparent blur-md"
              animate={isHovered ? {
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              } : {
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-400 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={isHovered ? {
                  x: [
                    Math.cos((i * 60) * Math.PI / 180) * 20,
                    Math.cos((i * 60) * Math.PI / 180) * 50,
                  ],
                  y: [
                    Math.sin((i * 60) * Math.PI / 180) * 20,
                    Math.sin((i * 60) * Math.PI / 180) * 50,
                  ],
                  opacity: [0.8, 0],
                  scale: [1, 0],
                } : {}}
                transition={{
                  duration: 0.6,
                  repeat: isHovered ? Infinity : 0,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full blur-xl"
              animate={isHovered ? {
                opacity: [0.6, 0.9, 0.6],
                scale: [1, 1.2, 1],
              } : {
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative bg-gradient-to-br from-[var(--primary-red)] via-[var(--secondary-red)] to-red-800 text-white p-4 rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-sm overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                }}
                animate={isHovered ? {
                  y: ["0%", "100%"],
                } : {
                  y: ["0%", "50%"],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: isHovered ? 0.8 : 2,
                  repeat: Infinity,
                  repeatDelay: isHovered ? 0.2 : 1,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                animate={isHovered ? {
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1],
                } : {
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: isHovered ? 0.6 : 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <ArrowUp className="w-6 h-6 drop-shadow-lg" />
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={isHovered ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                } : {
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </div>

            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border border-red-400/40"
                style={{
                  scale: 1 + ring * 0.15,
                }}
                animate={isHovered ? {
                  scale: [1 + ring * 0.15, 1.3 + ring * 0.2, 1 + ring * 0.15],
                  opacity: [0.4, 0, 0.4],
                } : {
                  scale: [1 + ring * 0.15, 1.2 + ring * 0.15, 1 + ring * 0.15],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 1.5 + ring * 0.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: ring * 0.1,
                }}
              />
            ))}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
