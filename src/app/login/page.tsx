"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, fetchUser } from "@/store/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, access_token, user } = useAppSelector((s) => s.auth);
  const [checking, setChecking] = useState(true);

  // On mount, if token exists but no user, validate it; else allow login form.
  useEffect(() => {
    const token =
      access_token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null);
    if (!token) {
      setChecking(false);
      return;
    }
    if (user) {
      router.replace("/dashboard");
      return;
    }
    dispatch(fetchUser())
      .unwrap()
      .then(() => router.replace("/dashboard"))
      .catch(() => {
        // invalid token removed by slice; stay on login
      })
      .finally(() => setChecking(false));
  }, [access_token, user, dispatch, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username: email, password }));
  };

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center text-sm text-gray-500">
        Checking session...
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Left side (background + logo) */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/white_link.png"
          alt="background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <Image src="/logo.png" alt="Linkify Logo" width={120} height={40} />
        </div>
      </div>

      {/* Right side (form area) */}
      <div className="flex w-full md:w-1/2 justify-center items-center px-8">
        <div className="max-w-md w-full space-y-6">
          {/* Title */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Login</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mt-1"
              />
              <span>
                Keep me logged in – applies to all log in options below.
                <br />
                More info
              </span>
            </label>

            {error && <p className="text-sm text-red-600">{String(error)}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "LOGGING IN..." : "EMAIL LOGIN →"}
            </button>
          </form>

          {/* Google Login */}
          <button className="btn-secondary">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width={20}
              height={20}
            />
            <span className="font-medium">Google</span>
          </button>

          {/* Switch to Register */}
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 underline">
              Sign up
            </Link>
          </p>

          {/* Terms */}
          <p className="text-xs text-gray-500">
            By clicking &#39;Log In&#39; you agree to our website LinkifyClub{" "}
            <a href="#" className="text-blue-600 underline">
              Terms & Conditions
            </a>
            ,{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Notice
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Terms & Conditions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
