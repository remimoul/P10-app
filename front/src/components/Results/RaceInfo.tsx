import { RaceInfoProps } from "@/lib/types";
import { motion } from "framer-motion";
import {
  FaRuler,
  FaCalendar,
  FaTachometerAlt,
  FaStopwatch,
  FaUserTie,
} from "react-icons/fa";

const RaceInfo = ({ race }: RaceInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 relative overflow-hidden group hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent opacity-40 group-hover:opacity-50 transition-opacity duration-500" />

      <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-500 blur-xl group-hover:scale-110 group-hover:translate-x-2 group-hover:translate-y-2" />
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-500 blur-xl group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-500 blur-2xl group-hover:scale-110" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,_rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

      <div className="absolute inset-0 rounded-2xl border border-red-100/30 group-hover:border-red-200/50 transition-colors duration-500" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-50/10 to-transparent opacity-30 group-hover:opacity-40 transition-opacity duration-500" />

      <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-red-50/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-100/0 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,0,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,0,0.05)_0%,_transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 group-hover:from-red-700 group-hover:to-red-900 transition-colors duration-300 group-hover:scale-105 transform">
            {race.name}
          </h2>
          <div className="flex items-center gap-3 group-hover:scale-105 transform transition-transform duration-300">
            <span className="text-gray-500 font-medium text-2xl group-hover:text-gray-700 transition-colors duration-300">
              {race.country}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="flex items-center group/item hover:bg-red-50/50 p-4 rounded-3xl transition-all duration-300">
              <div className="w-48 text-gray-500 font-medium flex items-center text-lg">
                <FaRuler className="mr-4 text-red-500 group-hover/item:text-red-600 transition-colors duration-300 text-xl" />
                Circuit:
              </div>
              <div className="text-gray-900 font-medium text-lg group-hover/item:text-red-600 transition-colors duration-300">
                {race.circuit}
              </div>
            </div>
            <div className="flex items-center group/item hover:bg-red-50/50 p-4 rounded-3xl transition-all duration-300">
              <div className="w-48 text-gray-500 font-medium flex items-center text-lg">
                <FaCalendar className="mr-4 text-red-500 group-hover/item:text-red-600 transition-colors duration-300 text-xl" />
                Date:
              </div>
              <div className="text-gray-900 font-medium text-lg group-hover/item:text-red-600 transition-colors duration-300">
                {race.date}
              </div>
            </div>
            <div className="flex items-center group/item hover:bg-red-50/50 p-4 rounded-3xl transition-all duration-300">
              <div className="w-48 text-gray-500 font-medium flex items-center text-lg">
                <FaRuler className="mr-4 text-red-500 group-hover/item:text-red-600 transition-colors duration-300 text-xl" />
                Length:
              </div>
              <div className="text-gray-900 font-medium text-lg group-hover/item:text-red-600 transition-colors duration-300">
                {race.length}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex items-center group/item hover:bg-red-50/50 p-4 rounded-3xl transition-all duration-300">
              <div className="w-48 text-gray-500 font-medium flex items-center text-lg">
                <FaTachometerAlt className="mr-4 text-red-500 group-hover/item:text-red-600 transition-colors duration-300 text-xl" />
                Laps:
              </div>
              <div className="text-gray-900 font-medium text-lg group-hover/item:text-red-600 transition-colors duration-300">
                {race.laps}
              </div>
            </div>
            <div className="flex items-center group/item hover:bg-red-50/50 p-4 rounded-3xl transition-all duration-300">
              <div className="w-48 text-gray-500 font-medium flex items-center text-lg">
                <FaStopwatch className="mr-4 text-red-500 group-hover/item:text-red-600 transition-colors duration-300 text-xl" />
                Lap Record:
              </div>
              <div className="text-gray-900 font-medium text-lg group-hover/item:text-red-600 transition-colors duration-300">
                {race.lapRecord}
              </div>
            </div>
            <div className="flex items-center group/item hover:bg-red-50/50 p-4 rounded-3xl transition-all duration-300">
              <div className="w-48 text-gray-500 font-medium flex items-center text-lg">
                <FaUserTie className="mr-4 text-red-500 group-hover/item:text-red-600 transition-colors duration-300 text-xl" />
                Record Holder:
              </div>
              <div className="text-gray-900 font-medium text-lg group-hover/item:text-red-600 transition-colors duration-300">
                {race.recordHolder} ({race.recordYear})
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RaceInfo;
