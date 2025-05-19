"use client";

import { useRouter } from "next/navigation";
import React from 'react';
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const LearnMorePage: React.FC = () => {
    const router = useRouter(); // ✅ Add useRouter

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black p-6 text-center text-white">
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-6 text-5xl font-extrabold drop-shadow-lg"
            >
                Learn More About Virtual Study Room
            </motion.h1>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="max-w-3xl text-lg text-gray-300"
            >
                Our Virtual Study Room is designed to create an immersive, productive, and collaborative study environment.
                Enjoy features like **video calls, focus mode, shared library, AI distraction detection, study timetables, and more** to enhance your learning experience.
            </motion.p>

            {/* Features List */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {/* Feature Cards */}
                {[
                    { title: "📹 Video Calls", desc: "High-quality, real-time video calls for study sessions." },
                    { title: "🎵 Focus Mode", desc: "Stay focused with background music and a custom timer." },
                    { title: "📚 Shared Library", desc: "Upload, share, and access study materials easily." },
                    { title: "🤖 AI Distraction Detection", desc: "AI alerts you when distracted to keep you on track." },
                    { title: "📅 Study Timetable", desc: "Plan your study sessions effectively." },
                    { title: "💬 Chat & File Sharing", desc: "Communicate and share notes with study partners." }
                ].map((feature, index) => (
                    <div key={index} className="rounded-lg bg-gray-800 p-6 shadow-lg">
                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                        <p className="text-gray-300">{feature.desc}</p>
                    </div>
                ))}
            </motion.div>

            {/* 🔙 Back to Home Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-10"
            >
                <button
                    onClick={() => router.push("/welcome")} // ✅ Navigate to welcome page
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-lg transition-transform hover:scale-105 hover:bg-blue-700"
                >
                    <FaArrowLeft /> Back to Home
                </button>
            </motion.div>
        </div>
    );
};

export default LearnMorePage;
