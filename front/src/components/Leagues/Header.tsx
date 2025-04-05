import { motion } from "framer-motion";

const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-16"
  >
    <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
      F1 LEAGUES
    </h1>
    <div className="flex items-center justify-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      <p className="text-gray-600 uppercase tracking-widest text-lg">
        Join the ultimate racing competition
      </p>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
    </div>
  </motion.div>
);

export default Header;
