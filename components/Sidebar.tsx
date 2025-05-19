"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`transition-all duration-700 ease-in-out${isMounted ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
      <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-800 bg-dark-1/90 p-6 pt-28 text-white shadow-xl backdrop-blur-lg transition-all duration-300 max-sm:hidden lg:w-[264px]">
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks
            .filter((item) => item.label !== "Focus Mode")
            .map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

              return (
                <Link
                  key={item.label}
                  href={item.route}
                  className={cn(
                    "group relative flex gap-4 items-center p-4 rounded-lg justify-start transition-all duration-300 transform hover:translate-x-2",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg scale-105"
                      : "bg-transparent hover:bg-blue-500/60 hover:text-white hover:scale-105"
                  )}
                >
                  {isActive && <span className="absolute left-0 top-1/2 h-3/4 w-1 -translate-y-1/2 rounded-r-lg bg-blue-400"></span>}

                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={24}
                    height={24}
                    priority
                    className="group-hover:drop-shadow-glow transition-transform duration-200 group-hover:scale-110"
                  />
                  <p className="text-lg font-semibold max-lg:hidden">{item.label}</p>
                </Link>
              );
            })}

          {/* Focus Mode Button */}
          <Link
            href="/focus-mode"
            className={cn(
              "group relative flex gap-4 items-center p-4 rounded-lg justify-start transition-all duration-300 transform hover:translate-x-2",
              pathname === "/focus-mode"
                ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg scale-105"
                : "bg-transparent hover:bg-purple-500/60 hover:text-white hover:scale-105"
            )}
          >
            {pathname === "/focus-mode" && <span className="absolute left-0 top-1/2 h-3/4 w-1 -translate-y-1/2 rounded-r-lg bg-purple-400"></span>}

            <Image
  src="/icons/focus.svg"
  alt="Focus Mode"
  width={24}
  height={24}
  priority
  className="group-hover:drop-shadow-glow transition-transform duration-200 group-hover:scale-110"
/>

            <p className="text-lg font-semibold max-lg:hidden">Focus Mode</p>
          </Link>

          {/* YouTube Redirect Button */}
          <a
            href="https://www.youtube.com/results?search_query=study+with+me"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-start gap-4 rounded-lg bg-transparent p-4 transition-all duration-300 hover:translate-x-2 hover:scale-105 hover:bg-red-600/80"
          >
            <Image
              src="/icons/youtube.svg"
              alt="YouTube"
              width={24}
              height={24}
              priority
              className="group-hover:drop-shadow-glow transition-transform duration-200 group-hover:scale-110"
            />
            <p className="text-lg font-semibold text-white max-lg:hidden">Study on YouTube</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
