"use client";

import { motion } from "framer-motion";
import type { SectionHeaderProps } from "@/lib/types";
import { GiTyre, GiCheckeredFlag } from "react-icons/gi";

const SectionHeader = ({ title, isPublic }: SectionHeaderProps) => (
  <motion.div
    className="flex items-center gap-6 mb-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
  >
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
    <h2 className="text-4xl font-extrabold text-gray-900 flex items-center gap-4">
      {isPublic ? (
        <GiTyre className="text-red-600 text-3xl animate-spin-slow" />
      ) : (
        <GiCheckeredFlag className="text-blue-600 text-3xl" />
      )}
      {title}
      {isPublic ? (
        <GiTyre className="text-red-600 text-3xl animate-spin-slow" />
      ) : (
        <GiCheckeredFlag className="text-blue-600 text-3xl" />
      )}
    </h2>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
  </motion.div>
);

export default SectionHeader;
