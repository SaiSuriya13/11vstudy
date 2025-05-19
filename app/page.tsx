"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from 'react';

const HomeRedirect: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/welcome"); // Redirect to the Welcome page
    }, [router]);

    return null; // Avoid rendering anything on this page
};

export default HomeRedirect;
