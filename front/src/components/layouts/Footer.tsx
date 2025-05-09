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
    icon: (
      <GiStopwatch className="mx-auto text-[var(--secondary-red)] text-4xl" />
    ),
    value: "2.4K",
    label: "Online players",
  },
  {
    icon: <GiChart className="mx-auto text-[var(--secondary-red)] text-4xl" />,
    value: "18.7K",
    label: "Predictions / day",
  },
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-900 text-[var(--primary-white)] border-t border-[var(--primary-red)] text-[15px]">
      <div className="w-full h-[3px] scroll-bar absolute top-0 left-0 z-10" />

      <div className="relative z-0">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="flex items-center gap-2 text-[var(--primary-white)]">
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
            <p className="text-xl text-[var(--primary-grey)]">
              In each race, only one number counts... the 10ᵉ. Will you be
              worthy of finding it?
            </p>
          </div>

          <div className="flex justify-center gap-8 text-center">
            {stats.map(({ icon, value, label }, idx) => (
              <div key={idx}>
                {icon}
                <div className="text-xl font-semibold text-[var(--primary-white)]">
                  {value}
                </div>
                <div className="text-lg text-[var(--primary-white)]">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end text-right gap-1">
            <div className="flex items-center gap-2 text-[var(--primary-grey)] text-xl uppercase font-medium">
              <GiCheckeredFlag className="text-[var(--secondary-red)] text-xl" />
              The next race
            </div>
            <div className="text-xl font-bold text-[var(--primary-white)]">
              28/07 - 15:00
            </div>
          </div>
        </div>

        <div className="pt-1 mt-1 px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-lg font-semibold tracking-wide uppercase text-[var(--primary-grey)]">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative group transition"
                >
                  <span className="group-hover:text-[var(--primary-red)] transition">
                    {label}
                  </span>
                  <span className="block h-[1px] w-0 bg-[var(--primary-red)] transition-all group-hover:w-full mt-1"></span>
                </Link>
              ))}
            </nav>

            <div className="h-6 w-px bg-[var(--primary-grey)]/30" />

            <nav
              aria-label="Social networking"
              className="flex items-center gap-4 text-lg font-semibold tracking-wide uppercase text-[var(--primary-grey)]"
            >
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
        </div>

        <div className="pt-4 mt-4 px-4 text-center text-sm text-[var(--primary-grey)] space-y-2">
          <p>© {currentYear} P10 app - Not affiliated with Formula 1</p>
          <Link
            href="/privacyPolicy"
            className="hover:text-[var(--secondary-red)] transition block mb-2"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
