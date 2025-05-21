"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomeRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/welcome");
  }, [router]);

  return null;
};

export default HomeRedirect;
