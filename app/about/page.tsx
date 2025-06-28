"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About the Creators</h1>

      <p className="text-lg text-center max-w-xl mb-10">
        This Virtual Study Room was built with ❤️ by <span className="text-blue-400 font-semibold">Sai Suriya</span> and{" "}
        <span className="text-green-400 font-semibold">Manigandan</span> to help students stay focused and collaborate online.
      </p>

      <div className="text-sm text-gray-400 mb-12 text-center">
        Reach us on GitHub: <br />
        <a href="https://github.com/SaiSuriya13" className="text-blue-400 underline block">Sai Suriya</a>
        <a href="https://github.com/manigandan9845" className="text-green-400 underline block">Manigandan</a>
      </div>

      <button
        onClick={() => router.push("/welcome")}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white flex items-center space-x-2 transition"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Back to Welcome Page</span>
      </button>
    </main>
  );
}
