import { motion } from "framer-motion";
import { NoRacesMessageProps } from "@/lib/types/racing";

const NoRacesMessage = ({ season }: NoRacesMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent opacity-40" />
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-red-100 rounded-full opacity-20" />
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-red-100 rounded-full opacity-20" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          No races available
        </h3>
        <p className="text-gray-600 text-lg">
          There are no races available for the season {season}.
        </p>
      </div>
    </motion.div>
  );
};

export default NoRacesMessage;
