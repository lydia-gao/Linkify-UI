"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linkify-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-linkify-text-primary mb-4">
          Linkify
        </h1>
        <p className="text-linkify-text-secondary">Redirecting to login...</p>
      </div>
    </div>
  );
}
