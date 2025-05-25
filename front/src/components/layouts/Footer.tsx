"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";
import { GiCheckeredFlag } from "react-icons/gi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Leagues", href: "/leagues" },
  { label: "Racing", href: "/racing" },
  { label: "Results", href: "/results" },
  { label: "FAQ", href: "/faq" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Formula1/",
    icon: FiFacebook,
  },
  { name: "Twitter", href: "https://x.com/f1", icon: FaXTwitter },
  {
    name: "Instagram",
    href: "https://www.instagram.com/f1/",
    icon: FiInstagram,
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@Formula1",
    icon: FiYoutube,
  },
];

const logoClass = "object-contain h-12 sm:h-16 lg:h-12 w-auto";
const ambianceClass =
  "text-lg sm:text-xl lg:text-lg text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] rounded-xl px-4 py-2 text-center sm:text-left max-w-md font-medium sm:font-semibold lg:font-medium";

type NextRaceCardProps = {
  socialClass: string;
};

const NextRaceCard = ({ socialClass }: NextRaceCardProps) => (
  <div className="w-full max-w-[220px] mx-auto bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow p-2 flex flex-col items-center gap-1">
    <div className="flex items-center gap-1 text-lg text-[var(--primary-white)] uppercase font-semibold tracking-wider">
      <GiCheckeredFlag className="text-[var(--secondary-red)] text-xl animate-pulse" />
      The next race
    </div>
    <div className="text-lg font-semibold text-[var(--primary-red)] tracking-wide text-center">
      Belgian Grand Prix
    </div>
    <div className="text-lg font-extrabold text-[var(--primary-white)] tracking-widest bg-gradient-to-r from-[var(--primary-red)] to-white/80 bg-clip-text">
      28/07 - 15:00
    </div>
    <nav aria-label="Social networking" className={socialClass}>
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="hover:text-[var(--primary-red)] transition-colors p-1"
        >
          <Icon className="text-2xl" />
        </a>
      ))}
    </nav>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-900 backdrop-blur-md border-t border-[var(--primary-red)] text-[var(--primary-white)] text-[15px] shadow-lg">
      <div className="w-full h-[3px] scroll-bar absolute top-0 left-0 z-10" />

      <div className="relative z-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-12 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col gap-4 items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Logo P10"
                  width={360}
                  height={84}
                  className={logoClass}
                  priority
                />
              </div>
              <p className={ambianceClass}>
                In each race, only one number counts... the 10ᵉ. <br />
                Will you be worthy of finding it?
              </p>
            </div>

            <div className="flex flex-col gap-6 items-center sm:items-end text-center sm:text-right lg:hidden">
              <nav className="flex flex-wrap sm:justify-end gap-x-6 gap-y-3 text-lg font-semibold tracking-wide uppercase text-[var(--primary-white)] mt-6">
                {quickLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="relative group transition whitespace-nowrap"
                  >
                    <span className="group-hover:text-[var(--primary-red)] group-hover:underline group-hover:underline-offset-4 group-hover:drop-shadow-[0_1px_4px_rgba(217,4,41,0.4)] transition">
                      {label}
                    </span>
                    <span className="block h-[1px] w-0 bg-[var(--primary-red)] transition-all group-hover:w-full mt-1"></span>
                  </Link>
                ))}
              </nav>
              <NextRaceCard socialClass="flex items-center gap-4 text-lg font-semibold tracking-wide uppercase text-[var(--primary-white)] justify-center sm:justify-end mt-2" />
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center">
              <nav className="flex flex-wrap md:flex-nowrap justify-center gap-x-6 gap-y-3 text-lg font-semibold tracking-wide uppercase text-[var(--primary-white)]">
                {quickLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="relative group transition whitespace-nowrap"
                  >
                    <span className="group-hover:text-[var(--primary-red)] group-hover:underline group-hover:underline-offset-4 group-hover:drop-shadow-[0_1px_4px_rgba(217,4,41,0.4)] transition">
                      {label}
                    </span>
                    <span className="block h-[1px] w-0 bg-[var(--primary-red)] transition-all group-hover:w-full mt-1"></span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-2 text-right">
              <NextRaceCard socialClass="flex items-center gap-4 text-lg font-semibold tracking-wide uppercase text-[var(--primary-white)] justify-end mt-2" />
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 px-4">
          <div className="max-w-6xl mx-auto border-t border-[var(--primary-grey)]/20 flex flex-col items-center gap-3 text-sm text-gray-300 pb-4 pt-4">
            <p>© {currentYear} P10 app - Not affiliated with Formula 1</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
