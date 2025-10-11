"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser } from "@/store/slices/authSlice";
import type { RootState } from "@/store";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { access_token, user } = useAppSelector((s: RootState) => s.auth);
  const [checking, setChecking] = useState(true);
  const started = useRef(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token =
      access_token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null);
    if (!token) {
      setChecking(false);
      router.replace("/login");
      return;
    }
    // If we already have user or already started fetch, stop
    if (user || started.current) {
      setChecking(false);
      return;
    }
    started.current = true;
    dispatch(fetchUser())
      .unwrap()
      .catch(() => {
        // fetchUser already clears token on 401 in slice
        router.replace("/login");
      })
      .finally(() => setChecking(false));
  }, [access_token, user, dispatch, router]);

  if (checking) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
        Authenticating...
      </div>
    );
  }

  return <>{children}</>;
}
