"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-gradient-to-r from-[#1e1e2e] via-[#24243e] 
      to-[#1e1e2e] px-6 py-4 shadow-lg transition-all duration-500 lg:px-10">
      
      {/* Logo with Animated Glow */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/vstudy-logo.svg"
          width={40}
          height={40}
          alt="VSTUDY logo"
          className="transition-transform duration-300 hover:scale-110"
        />
        <p className="animate-text-glow text-[26px] font-extrabold text-white 
          transition-all duration-300 hover:animate-bounce max-sm:hidden">
          VSTUDY
        </p>
      </Link>

      <div className="flex items-center gap-5">
        {/* ChatGPT Button with Hover Glow */}
        <Link href="https://chat.openai.com" target="_blank">
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white 
            transition-all duration-300 hover:bg-blue-700 hover:shadow-glow">
            <Image src="/icons/chatgpt.svg" width={24} height={24} alt="ChatGPT" />
            <span className="hidden md:block">ChatGPT</span>
          </button>
        </Link>

        {/* Clerk User Button */}
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
