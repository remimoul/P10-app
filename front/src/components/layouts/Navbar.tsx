"use client";

import Link from "next/link";
import Image from "next/image";
import { LuLayers } from "react-icons/lu";
import { GiCheckeredFlag } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiHome, FiAward, FiUser } from "react-icons/fi";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const navItems = [
  { name: "Home", icon: FiHome, minWidth: 640, path: "/" },
  { name: "Leagues", icon: LuLayers, minWidth: 0, path: "/leagues" },
  { name: "Racing", icon: GiCheckeredFlag, minWidth: 768, path: "/racing" },
  { name: "Ranking", icon: FiAward, minWidth: 768, path: "/ranking" },
];

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(
    () => navItems.filter((item) => windowWidth >= item.minWidth),
    [windowWidth]
  );

  const handleTabClick = useCallback(
    (name: string) => {
      setActiveTab(name);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      const firstFocusable = mobileMenuRef.current.querySelector("a, button");
      if (firstFocusable && firstFocusable instanceof HTMLElement) {
        firstFocusable.focus();
      }
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 w-full bg-[#EDF2F4]/70 backdrop-blur-md border-b border-[#EDF2F4] z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={160}
                height={64}
                priority
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center overflow-hidden">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5">
              {visibleItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setActiveTab(item.name)}
                    className={`min-w-[80px] flex items-center justify-center w-full px-2 py-1 sm:px-3 sm:py-2 text-lg transition-colors ${
                      activeTab === item.name
                        ? "text-[#D90429] font-medium"
                        : "text-gray-900 hover:text-[#EF233C]"
                    }`}
                  >
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                  {activeTab === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D90429]"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hidden sm:flex items-center relative overflow-hidden rounded-full px-3 py-1 group">
                  <div className="absolute inset-0 z-0 animate-gradient opacity-80 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:opacity-90" />

                  <div className="absolute inset-0 z-10 bg-cover opacity-20 mix-blend-overlay transition-all duration-500 ease-out group-hover:opacity-30" />

                  <div className="relative z-20 flex items-center gap-2 bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl px-3 py-1 border border-transparent transition-all duration-300 ease-out group-hover:border-red-500 group-hover:shadow-xl group-hover:bg-opacity-70">
                    <FiUser className="h-5 w-5 text-white transition-colors duration-300 ease-out group-hover:text-red-500" />
                    <span className="text-lg font-semibold text-white transition-colors duration-300 ease-out group-hover:text-red-500">
                      Account
                    </span>
                  </div>
                </button>
              </SignInButton>
            </SignedOut>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              className="md:hidden p-2 text-gray-600 hover:text-[#EF233C] focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    href={item.path}
                    key={item.name}
                    onClick={() => handleTabClick(item.name)}
                    className={`w-full flex items-center px-4 py-3 rounded-2xl transition-colors ${
                      activeTab === item.name
                        ? "bg-red-600/10 text-[#D90429]"
                        : "text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-xl">{item.name}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-300">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center px-4 py-3 rounded-2xl text-gray-800 hover:bg-gray-300"
                      >
                        <FiUser className="h-5 w-5 mr-3" />
                        <span className="text-xl">Login</span>
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
