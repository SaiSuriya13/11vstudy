"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomeRedirect: React.FC = () => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      router.push("/welcome");
    }
  }, [hasMounted, router]);

  return null;
};

export default HomeRedirect;
