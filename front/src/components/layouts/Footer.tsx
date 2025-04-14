"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";
import { GiStopwatch, GiChart, GiCheckeredFlag } from "react-icons/gi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Leagues", href: "/leagues" },
  { label: "Racing", href: "/racing" },
  { label: "Results", href: "/results" },
  { label: "FAQ", href: "/faq" },
];

const stats = [
  {
    icon: <GiStopwatch className="mx-auto text-[#EF233C] text-4xl" />,
    value: "2.4K",
    label: "Online players",
  },
  {
    icon: <GiChart className="mx-auto text-[#EF233C] text-4xl" />,
    value: "18.7K",
    label: "Predictions / day",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: FiFacebook,
  },
  { name: "Twitter", href: "#", icon: FaXTwitter },
  {
    name: "Instagram",
    href: "#",
    icon: FiInstagram,
  },
  {
    name: "Youtube",
    href: "#",
    icon: FiYoutube,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-900 text-[#EDF2F4] border-t border-[#D90429] text-[15px]">
      <div className="w-full h-[3px] scroll-bar absolute top-0 left-0 z-10" />

      <div className="relative z-0">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="flex items-center gap-2 text-[#EDF2F4]">
              <Image
                src="/logo.png"
                alt="Logo P10"
                width={360}
                height={84}
                className="object-contain h-12 w-auto"
                priority
              />
              <Image
                src="/logo1.png"
                alt="Flags"
                width={360}
                height={84}
                className="object-contain h-12 w-auto"
                priority
              />
            </div>
            <p className="text-xl text-[#555555]">
              In each race, only one number counts... the 10ᵉ. Will you be
              worthy of finding it?
            </p>
          </div>

          <div className="flex justify-center gap-8 text-center">
            {stats.map(({ icon, value, label }, idx) => (
              <div key={idx}>
                {icon}
                <div className="text-xl font-semibold text-[#EDF2F4]">
                  {value}
                </div>
                <div className="text-lg text-[#EDF2F4]">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end text-right gap-1">
            <div className="flex items-center gap-2 text-[#555555] text-xl uppercase font-medium">
              <GiCheckeredFlag className="text-[#EF233C] text-xl" />
              The next race
            </div>
            <div className="text-xl font-bold text-[#EDF2F4]">
              28/07 - 15:00
            </div>
          </div>
        </div>

        <div className="pt-1 mt-1 px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-lg font-semibold tracking-wide uppercase text-[#555555]">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative group transition"
                >
                  <span className="group-hover:text-[#D90429] transition">
                    {label}
                  </span>
                  <span className="block h-[1px] w-0 bg-[#D90429] transition-all group-hover:w-full mt-1"></span>
                </Link>
              ))}
            </nav>

            <div className="h-6 w-px bg-[#555555]/30" />

            <nav
              aria-label="Social networking"
              className="flex items-center gap-4 text-lg font-semibold tracking-wide uppercase text-[#555555]"
            >
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="hover:text-[#D90429] transition-colors p-1"
                >
                  <Icon className="text-2xl" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-4 mt-4 px-4 text-center text-sm text-[#555555] space-y-2">
          <p>© {currentYear} P10 app - Not affiliated with Formula 1</p>
          <Link
            href="/privacyPolicy"
            className="hover:text-[#EF233C] transition block mb-2"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
