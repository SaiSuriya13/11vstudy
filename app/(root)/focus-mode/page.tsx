"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FocusMode = () => {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(true);
  const [audio] = useState(() => new Audio("/media/focus-music.mp3")); // MP3 file
  const [videoSrc] = useState("/media/focus-video.mp4"); // MP4 file
  const [timeLeft, setTimeLeft] = useState(0); // No timer set initially
  const [isStarted, setIsStarted] = useState(false); // Track if focus mode has started

  const handleStartFocus = (duration: number) => {
    setTimeLeft(duration);
    setIsStarted(true);
  };

  useEffect(() => {
    if (isStarted) {
      audio.loop = true;
      audio.play();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, isStarted]);

  useEffect(() => {
    if (timeLeft > 0 && isStarted) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isStarted]);

  const handleUnlock = () => setIsLocked(false);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <video className="w-full max-w-4xl" src={videoSrc} autoPlay loop muted />

      <h1 className="mt-4 text-3xl font-bold">Focus Mode</h1>

      {isStarted ? (
        <>
          <p className="text-lg">
            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </p>
          {isLocked ? (
            <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={handleUnlock}>
              Unlock Focus Mode
            </Button>
          ) : (
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/home")}>
              Exit Focus Mode
            </Button>
          )}
        </>
      ) : (
        <>
          <h2 className="mt-4 text-xl">Select Focus Duration</h2>
          <div className="mt-4 flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleStartFocus(15 * 60)}>
              15 Minutes
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={() => handleStartFocus(30 * 60)}>
              30 Minutes
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => handleStartFocus(60 * 60)}>
              1 Hour
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FocusMode;
