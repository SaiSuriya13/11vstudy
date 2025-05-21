"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LOCAL_VIDEO = "/media/focus-video.mp4";
const ONLINE_VIDEO = "https://cdn.coverr.co/videos/coverr-moonlight-night-4679/1080p.mp4";

const FocusMode = () => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isLocked, setIsLocked] = useState(true);
  const [videoSrc, setVideoSrc] = useState(LOCAL_VIDEO);
  const [useOnlineVideo, setUseOnlineVideo] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [achievement, setAchievement] = useState("");
  const [customMinutes, setCustomMinutes] = useState("");

  // Load audio on mount
  useEffect(() => {
    const audio = new Audio("/media/focus-music.mp3");
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Manage audio play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isStarted) return;

    if (isAudioPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isAudioPlaying, isStarted]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && isStarted) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && isStarted) {
      setIsStarted(false);
      setIsLocked(false);
      setAchievement("🎉 You completed your focus session!");
      audioRef.current?.pause();
    }
  }, [timeLeft, isStarted]);

  const handleStartFocus = (duration: number) => {
    setTimeLeft(duration);
    setIsStarted(true);
    setIsLocked(true);
    setAchievement("");
    setIsAudioPlaying(true);
  };

  const handleCustomStart = () => {
    const mins = parseInt(customMinutes);
    if (!isNaN(mins) && mins > 0) {
      handleStartFocus(mins * 60);
    } else {
      alert("Please enter a valid number of minutes.");
    }
  };

  const handleUnlock = () => setIsLocked(false);

  const toggleBackground = () => {
    const newState = !useOnlineVideo;
    setUseOnlineVideo(newState);
    setVideoSrc(newState ? ONLINE_VIDEO : LOCAL_VIDEO);
  };

  const formatTime = (sec: number) =>
    `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
      <video
        className="w-full max-w-5xl rounded-2xl shadow-lg"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      <h1 className="mt-6 text-4xl font-extrabold text-blue-400 drop-shadow-lg">Focus Mode</h1>

      <Button className="mt-2 bg-gray-700 hover:bg-gray-600" onClick={toggleBackground}>
        Toggle {useOnlineVideo ? "Local" : "Night"} Background
      </Button>

      {isStarted ? (
        <>
          <p className="mt-4 text-xl">
            Time Left: <span className="font-mono">{formatTime(timeLeft)}</span>
          </p>

          <div className="mt-4 flex gap-4 flex-wrap justify-center">
            <Button
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={() => setIsAudioPlaying((prev) => !prev)}
            >
              {isAudioPlaying ? "Pause Music" : "Play Music"}
            </Button>

            {isLocked ? (
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleUnlock}>
                Unlock Focus Mode
              </Button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/home")}>
                Exit Focus Mode
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="mt-6 text-xl font-semibold text-gray-300">Select Focus Duration</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
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

          <div className="mt-6 flex flex-col items-center gap-2">
            <input
              type="number"
              placeholder="Custom Minutes (e.g., 45)"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              className="rounded-md px-4 py-2 text-black"
              min="1"
            />
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleCustomStart}>
              Start Custom Session
            </Button>
          </div>
        </>
      )}

      {achievement && (
        <p className="mt-4 text-2xl text-green-400 font-bold animate-bounce">{achievement}</p>
      )}
    </div>
  );
};

export default FocusMode;
