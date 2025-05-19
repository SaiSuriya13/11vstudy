"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25-minute timer
  const [isLocked, setIsLocked] = useState(true);
  const router = useRouter();
  const focusRef = useRef<HTMLDivElement | null>(null); // Corrected type

  // Timer countdown effect
  useEffect(() => {
    if (!isLocked) return; // Stop timer when unlocked

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLocked(false); // Unlock when timer ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [isLocked]);

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Enter fullscreen mode
  const enterFullScreen = () => {
    const element = focusRef.current;
    if (element instanceof HTMLElement && element.requestFullscreen) {
      element.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    }
  };

  return (
    <div
      ref={focusRef}
      className="relative flex h-screen flex-col items-center justify-center bg-black text-white"
    >
      {/* Background Video */}
      <video autoPlay loop muted className="absolute size-full object-cover">
        <source src="/media/focus-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Music */}
      <audio autoPlay loop>
        <source src="/media/focus-music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Timer & Unlock Button */}
      <div className="relative z-10 rounded-lg bg-black bg-opacity-50 p-6 text-center">
        <h1 className="text-3xl font-bold">Focus Mode</h1>
        <p className="mt-2 text-xl">Time Left: {formatTime(timeLeft)}</p>

        {/* Fullscreen Button */}
        <button
          onClick={enterFullScreen}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Enter Fullscreen
        </button>

        {/* Unlock Button */}
        <button
          onClick={() => router.push("/home")}
          className={`mt-4 rounded px-4 py-2 ${
            isLocked ? "cursor-not-allowed bg-gray-500" : "bg-red-500 hover:bg-red-700"
          }`}
          disabled={isLocked}
        >
          Unlock
        </button>
      </div>
    </div>
  );
};

export default FocusMode;
