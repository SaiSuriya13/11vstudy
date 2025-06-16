"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

const WelcomePage = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black p-6 text-center">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-4 text-5xl font-extrabold text-white drop-shadow-lg"
      >
        Welcome to Your Virtual Study Room
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="mb-6 max-w-xl text-lg text-gray-300"
      >
        Connect, focus, and collaborate with others in a distraction-free
        environment.
      </motion.p>

      {/* Animated Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex space-x-6"
      >
        {/* Start Studying Button */}
        <button
          type="button"
          onClick={() => {
            if (isSignedIn) {
              router.push("/home");
            } else {
              router.push("/sign-in");
            }
          }}
          className="group relative cursor-pointer border-none bg-transparent p-0 font-mono text-base font-light uppercase outline-none"
        >
          <span className="duration-700 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:duration-200 absolute left-0 top-0 size-full translate-y-0.5 rounded-lg bg-black bg-opacity-25 transition group-hover:translate-y-1 group-active:translate-y-px"></span>
          <span className="absolute left-0 top-0 size-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>
          <div className="duration-700 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:duration-200 relative flex -translate-y-1 items-center justify-between gap-3 rounded-lg bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] px-6 py-3 text-lg text-white brightness-100 transition group-hover:-translate-y-1.5 group-hover:brightness-110 group-active:-translate-y-0.5">
            <span className="select-none">Start Studying</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="duration-200 -mr-1 ml-2 size-5 transition group-hover:translate-x-1"
            >
              <path
                clipRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>

        {/* Learn More Button */}
        <button
          type="button"
          onClick={() => router.push("/learn-more")}
          className="group relative cursor-pointer border-none bg-transparent p-0 font-mono text-base font-light uppercase outline-none"
        >
          <span className="duration-700 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:duration-200 absolute left-0 top-0 size-full translate-y-0.5 rounded-lg bg-black bg-opacity-25 transition group-hover:translate-y-1 group-active:translate-y-px"></span>
          <span className="absolute left-0 top-0 size-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>
          <div className="duration-700 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:duration-200 relative flex -translate-y-1 items-center justify-between gap-3 rounded-lg bg-gradient-to-r from-[#21d4fd] to-[#b721ff] px-6 py-3 text-lg text-white brightness-100 transition group-hover:-translate-y-1.5 group-hover:brightness-110 group-active:-translate-y-0.5">
            <span className="select-none">Learn More</span>
          </div>
        </button>

        {/* About Us Button */}
        <button
          type="button"
          onClick={() => router.push("/about")}
          className="group relative cursor-pointer border-none bg-transparent p-0 font-mono text-base font-light uppercase outline-none"
        >
          <span className="duration-700 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:duration-200 absolute left-0 top-0 size-full translate-y-0.5 rounded-lg bg-black bg-opacity-25 transition group-hover:translate-y-1 group-active:translate-y-px"></span>
          <span className="absolute left-0 top-0 size-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>
          <div className="duration-700 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:duration-200 relative flex -translate-y-1 items-center justify-between gap-3 rounded-lg bg-gradient-to-r from-[#ff512f] to-[#dd2476] px-6 py-3 text-lg text-white brightness-100 transition group-hover:-translate-y-1.5 group-hover:brightness-110 group-active:-translate-y-0.5">
            <span className="select-none">About Us</span>
          </div>
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
