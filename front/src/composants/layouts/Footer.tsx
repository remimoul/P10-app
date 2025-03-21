"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { GiStopwatch, GiChart, GiCheckeredFlag } from "react-icons/gi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Ranking", href: "/ranking" },
  { label: "Rules", href: "/rules" },
  { label: "Schedule", href: "/schedule" },
  { label: "FAQ", href: "/faq" },
];

const stats = [
  {
    icon: <GiStopwatch className="mx-auto text-red-500 text-2xl" />,
    value: "2.4K",
    label: "Online players",
  },
  {
    icon: <GiChart className="mx-auto text-red-500 text-2xl" />,
    value: "18.7K",
    label: "Predictions / day",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-900 text-gray-300 border-t border-red-600 text-[15px]">
      <div className="w-full h-[3px] scroll-bar absolute top-0 left-0 z-10" />

      <div className="relative z-0">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="flex items-center gap-2 text-white">
              <Image
                src="/logo.png"
                alt="Logo P10"
                width={160}
                height={64}
                className="object-contain h-12 w-auto"
                priority
              />
              <span className="font-bold text-xl">
                P<span className="text-red-600">10</span>
              </span>
            </div>
            <p className="text-lg text-gray-400">
              In each race, only one number counts... the 10ᵉ. Will you be
              worthy of finding it?
            </p>
          </div>

          <div className="flex justify-center gap-8 text-center">
            {stats.map(({ icon, value, label }, idx) => (
              <div key={idx}>
                {icon}
                <div className="text-xl font-semibold text-white">{value}</div>
                <div className="text-lg text-gray-400">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end text-right gap-1">
            <div className="flex items-center gap-2 text-gray-400 text-sm uppercase font-medium">
              <GiCheckeredFlag className="text-red-500 text-lg" />
              The next race
            </div>
            <div className="text-lg font-bold text-white">28/07 - 15:00</div>
            <Link
              href="/rules"
              className="mt-2 inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md transition"
            >
              View rules
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-5 mt-6 px-4">
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-semibold tracking-wide uppercase text-gray-400">
            {quickLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="relative group transition">
                <span className="group-hover:text-red-500 transition">{label}</span>
                <span className="block h-[1px] w-0 bg-red-500 transition-all group-hover:w-full mt-1"></span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-gray-800 pt-4 mt-4 px-4 text-center text-sm text-gray-400 space-y-1">
          <p>
            Average accuracy: <span className="text-red-500 font-semibold">68%</span>
          </p>
          <p>© {currentYear} P10 app - Not affiliated with Formula 1</p>
          <Link href="/privacyPolicy" className="hover:text-red-500 transition">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
