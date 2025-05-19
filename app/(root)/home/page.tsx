"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import MeetingTypeList from "@/components/MeetingTypeList";
import FileUploader from "@/components/FileUploader";

const Home = () => {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);

  // Redirect to Welcome page if user is not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  // Time and date updater
  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    setDate(new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now));

    const interval = setInterval(() => {
      const updatedTime = new Date();
      setTime(updatedTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col gap-6 p-6 text-white">
      {/* Hero Section */}
      <div className="relative flex h-[320px] w-full flex-col justify-between rounded-2xl bg-hero bg-cover p-6 lg:p-11">
        <h2 className="glassmorphism max-w-[300px] rounded py-2 text-center text-base font-normal">
          Upcoming Meeting at: 12:30 PM
        </h2>
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold lg:text-7xl">{time}</h1>
          <p className="text-lg font-medium text-sky-400 lg:text-2xl">{date}</p>
        </div>
      </div>

      {/* Meeting Type Options */}
      <MeetingTypeList />

      {/* Home Page Buttons */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Study Timetable */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("/home/study-timetable")}
          onKeyDown={(e) => e.key === "Enter" && router.push("/home/study-timetable")}
          className="flex cursor-pointer flex-col items-center rounded-lg bg-pink-500 p-6 font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-pink-600"
        >
          <span className="text-3xl">📅</span>
          <h3 className="mt-2 text-lg">Study Timetable</h3>
          <p className="text-center text-sm opacity-80">Plan your study sessions</p>
        </div>

        {/* Shared Library */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setShowLibrary((prev) => !prev)}
          onKeyDown={(e) => e.key === "Enter" && setShowLibrary((prev) => !prev)}
          className="flex cursor-pointer flex-col items-center rounded-lg bg-purple-600 p-6 font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-purple-700"
        >
          <span className="text-3xl">📚</span>
          <h3 className="mt-2 text-lg">Shared Library</h3>
          <p className="text-center text-sm opacity-80">Upload and share your files</p>
        </div>
      </div>

      {/* FileUploader Section */}
      {showLibrary && (
        <div className="mt-10 rounded-xl bg-white p-6 text-black shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Upload to Shared Library</h2>
          <FileUploader />
        </div>
      )}
    </section>
  );
};

export default Home;
