"use client";

import { motion } from "framer-motion";

const SpeedBackground = () => {
  // Lignes de circuit (comme les lignes blanches sur les circuits F1)
  const circuitLines = Array.from({ length: 50 }, (_, i) => i);
  
  // Traînées de vitesse (effet de voiture qui passe)
  const speedTrails = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Lignes de circuit blanches intensives (comme sur les circuits F1) */}
      <div className="absolute inset-0 w-full h-full">
        {circuitLines.map((line, index) => (
          <motion.div
            key={`circuit-${index}`}
            className="absolute w-full h-3 bg-gradient-to-r from-transparent via-white/90 to-transparent"
            style={{
              top: `${(index * 2.2) % 100}%`,
              left: 0,
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 0.5 + (index % 3) * 0.05,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.03,
            }}
          />
        ))}
      </div>

      {/* Traînées de vitesse ultra-intenses (comme une voiture F1 qui passe) */}
      {speedTrails.map((trail, index) => {
        const lanePosition = 5 + index * 8;
        return (
          <div key={`speed-trail-${index}`} className="absolute inset-0">
            {/* Traînée principale avec blur intense */}
            <motion.div
              className="absolute w-48 h-screen bg-gradient-to-r from-red-600 via-red-500 to-red-600"
              style={{
                left: `${lanePosition}%`,
                top: 0,
                filter: "blur(40px)",
                opacity: 0.6,
              }}
              animate={{
                y: ["-100%", "100%"],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 0.8 + (index % 3) * 0.15,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.25,
              }}
            />
            {/* Traînée secondaire plus nette */}
            <motion.div
              className="absolute w-24 h-screen bg-gradient-to-r from-red-500/90 via-red-400 to-red-500/90"
              style={{
                left: `${lanePosition}%`,
                top: 0,
                filter: "blur(20px)",
              }}
              animate={{
                y: ["-100%", "100%"],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 0.8 + (index % 3) * 0.15,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.25,
              }}
            />
            {/* Lignes blanches de vitesse dans la traînée */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`speed-line-${index}-${i}`}
                className="absolute w-2 h-60 bg-gradient-to-b from-white via-white/90 to-transparent"
                style={{
                  left: `${lanePosition + (i - 3.5) * 1.5}%`,
                  top: "-15%",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
                }}
                animate={{
                  y: ["-15%", "115%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.4 + (i % 2) * 0.05,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.25 + i * 0.08,
                }}
              />
            ))}
          </div>
        );
      })}

      {/* Circuit courbe intensifié (virages de circuit F1) */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, opacity: 0.4 }}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Ligne de circuit principale - plus épaisse et visible */}
        <motion.path
          d="M 0,540 Q 480,200 960,540 T 1920,540"
          stroke="url(#circuitGradient)"
          strokeWidth="6"
          fill="none"
          strokeDasharray="15,10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.9, 0],
            strokeDashoffset: [0, -25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Ligne de circuit secondaire */}
        <motion.path
          d="M 0,600 Q 480,800 960,600 T 1920,600"
          stroke="url(#circuitGradient2)"
          strokeWidth="5"
          fill="none"
          strokeDasharray="12,8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
            strokeDashoffset: [0, -20],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.3,
          }}
        />
        {/* Ligne de circuit supplémentaire */}
        <motion.path
          d="M 0,480 Q 480,300 960,480 T 1920,480"
          stroke="url(#circuitGradient3)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="10,6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.7, 0],
            strokeDashoffset: [0, -18],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 0.6,
          }}
        />
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#EF233C" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#EF233C" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="circuitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#D90429" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#D90429" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="circuitGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#EF233C" />
            <stop offset="70%" stopColor="#EF233C" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Lignes de vitesse diagonales intensifiées (effet de mouvement rapide) */}
      {[...Array(35)].map((_, i) => {
        const isLeft = i % 2 === 0;
        return (
          <motion.div
            key={`diagonal-speed-${i}`}
            className="absolute w-3 h-32 bg-gradient-to-b from-red-500 via-white/80 to-transparent"
            style={{
              top: `${(i * 3) % 100}%`,
              left: isLeft ? `${(i * 3) % 45}%` : `${55 + (i * 3) % 45}%`,
              transform: `rotate(${isLeft ? 45 : -45}deg)`,
              transformOrigin: "center",
              boxShadow: "0 0 12px rgba(239, 35, 60, 0.6)",
            }}
            animate={{
              x: isLeft ? [0, "60vw"] : [0, "-60vw"],
              y: [0, "-40vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.7 + (i % 3) * 0.15,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.1,
            }}
          />
        );
      })}

      {/* Particules de vitesse intensifiées (étincelles/particules) */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-3 h-3 bg-red-500 rounded-full"
          style={{
            left: `${(i * 11) % 100}%`,
            top: `${(i * 13) % 100}%`,
            boxShadow: "0 0 15px rgba(239, 35, 60, 1), 0 0 30px rgba(239, 35, 60, 0.6)",
          }}
          animate={{
            y: ["100vh", "-10vh"],
            x: [
              `${(i * 11) % 100}%`,
              `${((i * 11) % 100) + (i % 2 === 0 ? 30 : -30)}%`,
            ],
            opacity: [0, 1, 0],
            scale: [0.3, 2, 0.3],
          }}
          transition={{
            duration: 1.5 + (i % 4) * 0.3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.04,
          }}
        />
      ))}

      {/* Effet de vitesse radiale intensifié (comme un compteur de vitesse) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={`speed-gauge-${i}`}
            className="absolute w-2 h-60 bg-gradient-to-b from-red-500 via-white/60 to-transparent"
            style={{
              transformOrigin: "bottom center",
              transform: `rotate(${i * 10}deg)`,
              boxShadow: "0 0 10px rgba(239, 35, 60, 0.5)",
            }}
            animate={{
              scaleY: [0.2, 3, 0.2],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.03,
            }}
          />
        ))}
      </div>

      {/* Lignes de vitesse verticales supplémentaires */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`vertical-speed-${i}`}
          className="absolute w-1.5 h-screen bg-gradient-to-b from-transparent via-red-500/70 to-transparent"
          style={{
            left: `${2 + i * 5}%`,
            top: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scaleX: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 1.5 + (i % 3) * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Overlay très subtil pour adoucir */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/15" />
    </div>
  );
};

export default SpeedBackground;
