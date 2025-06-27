"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub, FaArrowLeft } from "react-icons/fa";

const creators = [
  {
    name: "Sai Suriya",
    month: "SAI",
    date: "13",
    bgColor: "bg-blue-900",
    linkedin: "https://www.linkedin.com/in/sai-suriya-k-2477b9305/",
    instagram: "https://www.instagram.com/_sai_i3/",
    github: "https://github.com/SaiSuriya13",
    iconColor: "text-blue-400",
  },
  {
    name: "Manigandan",
    month: "MANI",
    date: "98",
    bgColor: "bg-green-700",
    linkedin: "https://www.linkedin.com/in/manigandan-p-751198267/",
    instagram: "https://www.instagram.com/king._.of._my_world/",
    github: "https://github.com/manigandan9845",
    iconColor: "text-green-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  hover: {
    scale: 1.05,
    rotateX: 8,
    rotateY: 8,
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  hover: { scale: 1.3, color: "#fff", transition: { repeat: Infinity, duration: 0.8 } },
};

const AboutPage: React.FC = () => {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 text-center text-white">
      {/* Floating Background Blobs */}
      <motion.div
        className="absolute top-20 left-10 size-40 rounded-full bg-blue-500 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 20, 0], borderRadius: ["20%", "40%", "20%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 size-48 rounded-full bg-green-600 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0], borderRadius: ["30%", "50%", "30%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8 max-w-md bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg sm:text-6xl"
      >
        Meet the Creators
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="mb-12 max-w-xl text-lg text-gray-300 sm:text-xl"
      >
        This Virtual Study Room was built with passion by{" "}
        <span className="font-semibold text-blue-400">Sai Suriya</span> and{" "}
        <span className="font-semibold text-green-400">Manigandan</span> to help students and professionals stay focused and collaborate effectively.
      </motion.p>

      {/* Creator Cards */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-12 md:flex-row md:gap-16"
      >
        {creators.map(({ name, month, date, bgColor, linkedin, instagram, github, iconColor }) => (
          <motion.article
            key={name}
            variants={cardVariants}
            whileHover="hover"
            className="relative w-72 cursor-pointer rounded-xl shadow-xl ring-1 ring-white/10 backdrop-blur-md"
            aria-label={`Profile of ${name}`}
          >
            {/* Date Box */}
            <div className="absolute -top-6 left-4 size-16 flex flex-col items-center justify-center rounded-r-xl bg-white/20 font-mono text-xl font-bold text-white backdrop-blur-sm shadow-lg">
              <span>{month}</span>
              <span>{date}</span>
            </div>

            {/* Content Box */}
            <div className={`${bgColor} rounded-xl p-8 pt-14 text-white`}>
              <h2 className="mb-5 text-3xl font-extrabold drop-shadow-lg">{name}</h2>
              <div className={`flex justify-center gap-8 text-4xl ${iconColor}`}>
                <motion.a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} LinkedIn`}
                  variants={iconVariants}
                  whileHover="hover"
                  className="rounded-full p-2 transition-colors duration-300 hover:text-white"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} Instagram`}
                  variants={iconVariants}
                  whileHover="hover"
                  className="rounded-full p-2 transition-colors duration-300 hover:text-white"
                >
                  <FaInstagram />
                </motion.a>
                <motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} GitHub`}
                  variants={iconVariants}
                  whileHover="hover"
                  className="rounded-full p-2 transition-colors duration-300 hover:text-white"
                >
                  <FaGithub />
                </motion.a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <button
          type="button"
          onClick={() => router.push("/welcome")}
          aria-label="Back to Welcome Page"
          className="relative mt-16 inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
        >
          <span className="mr-3 text-xl">
            <FaArrowLeft />
          </span>
          Back to Welcome Page
          <span className="absolute inset-0 -z-10 animate-ripple rounded-full bg-white/10" />
        </button>
      </motion.div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 1.5s ease-out infinite;
        }
      `}</style>
    </main>
  );
};

export default AboutPage;
