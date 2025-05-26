"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { GiCheckeredFlag, GiCompass } from "react-icons/gi";
import { FaRankingStar, FaUsers } from "react-icons/fa6";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { AccountButtonProps } from "@/lib/types/other";

const navItems = [
  { name: "Home", icon: GiCompass, minWidth: 640, path: "/" },
  { name: "Leagues", icon: FaUsers, minWidth: 0, path: "/leagues" },
  { name: "Racing", icon: GiCheckeredFlag, minWidth: 768, path: "/racing" },
  { name: "Results", icon: FaRankingStar, minWidth: 768, path: "/results" },
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

type NavLinkItemProps = {
  item: (typeof navItems)[number];
  active: boolean;
  onClick: () => void;
  className?: string;
};

const NavLinkItem = React.memo(function NavLinkItem({
  item,
  active,
  onClick,
  className = "",
}: NavLinkItemProps) {
  return (
    <Link
      href={item.path}
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-red)] ${
        active
          ? "bg-red-600/10 text-[var(--primary-red)]"
          : "text-gray-800 hover:bg-gray-300"
      } ${className}`}
      aria-current={active ? "page" : undefined}
      role="menuitem"
      tabIndex={0}
    >
      <item.icon className="h-5 w-5 mr-3" />
      <span className="text-xl">{item.name}</span>
    </Link>
  );
});

const AccountButton = React.memo(function AccountButton({
  onClick,
  className = "",
}: AccountButtonProps) {
  return (
    <SignedOut>
      <SignInButton mode="modal">
        <button
          onClick={onClick}
          className={`w-full flex items-center px-4 py-3 rounded-full text-gray-800 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-red)] ${className}`}
        >
          <FiUser className="h-5 w-5 mr-3" />
          <span className="text-xl">Login</span>
        </button>
      </SignInButton>
    </SignedOut>
  );
});

const Navbar = () => {
  const pathname = usePathname();
  const activeTab = useMemo(() => {
    const found = navItems.find((item) => item.path === pathname);
    return found ? found.name : navItems[0].name;
  }, [pathname]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(
    () => navItems.filter((item) => windowWidth >= item.minWidth),
    [windowWidth]
  );

  const handleTabClick = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      const firstFocusable = mobileMenuRef.current.querySelector("a, button");
      if (firstFocusable && firstFocusable instanceof HTMLElement) {
        firstFocusable.focus();
      }
    }
  }, [isMenuOpen]);

  return (
    <nav
      className="fixed top-4 left-0 right-0 mx-4 bg-white/50 backdrop-blur-sm border-b border-gray-200 z-50 rounded-3xl md:rounded-full"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
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
                    onClick={handleTabClick}
                    className={`min-w-[80px] flex items-center justify-center w-full px-2 py-1 sm:px-3 sm:py-2 text-lg transition-colors
                      ${
                        activeTab === item.name
                          ? "text-[var(--primary-red)] font-medium"
                          : "text-gray-900 hover:text-[var(--primary-red)] hover:underline hover:underline-offset-4"
                      }`}
                  >
                    <item.icon className="h-7 w-7 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                  {activeTab === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--primary-red)]"
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
                <button className="hidden sm:flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-br from-white/70 to-white/20 border-2 border-[var(--primary-red)] shadow-lg text-gray-900 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_24px_rgba(217,4,41,0.25)] hover:bg-gradient-to-br hover:from-[var(--primary-red)]/90 hover:to-white/30 hover:text-white">
                  <FiUser className="h-5 w-5" />
                  <span>Account</span>
                </button>
              </SignInButton>
            </SignedOut>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="md:hidden p-2 text-gray-600 hover:text-[var(--secondary-red)] focus:outline-none"
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
              role="menu"
            >
              <div className="px-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <NavLinkItem
                    key={item.name}
                    item={item}
                    active={activeTab === item.name}
                    onClick={handleTabClick}
                  />
                ))}
                <div className="pt-4 border-t border-gray-300">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <AccountButton onClick={() => setIsMenuOpen(false)} />
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
