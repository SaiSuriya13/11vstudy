"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About the Creators</h1>

      <p className="text-lg text-center max-w-xl mb-10">
        VSTUDY was built by <span className="text-blue-400 font-semibold">Sai Suriya</span> and{" "}
        <span className="text-green-400 font-semibold">Manigandan</span> to help students stay focused and collaborate online.
      </p>

      <button
        onClick={() => router.push("/welcome")}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white transition"
      >
        Back to Welcome Page
      </button>
    </main>
  );
}
