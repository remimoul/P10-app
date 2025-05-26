"use client";

import { motion } from "framer-motion";
import type { SectionHeaderProps } from "@/lib/types/leagues";
import { GiTyre, GiSteeringWheel } from "react-icons/gi";

const SectionHeader = ({ title, isPublic }: SectionHeaderProps) => (
  <motion.div
    className="flex items-center gap-6 mb-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
  >
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--secondary-red)] to-transparent" />
    <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-4">
      {isPublic ? (
        <GiTyre className="text-[var(--secondary-red)] text-3sxl animate-spin-slow" />
      ) : (
        <GiSteeringWheel className="text-[var(--secondary-blue)] text-4xl animate-steering-spin-accel" />
      )}
      {title}
      {isPublic ? (
        <GiTyre className="text-[var(--secondary-red)] text-3xl animate-spin-slow" />
      ) : (
        <GiSteeringWheel className="text-[var(--secondary-blue)] text-4xl animate-steering-spin-accel" />
      )}
    </h2>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
  </motion.div>
);

export default SectionHeader;
