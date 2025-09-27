"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Mock login - replace with actual API call
    const user = {
      id: "1",
      email: email,
      name: "John Doe",
    };

    dispatch(setUser(user));
    router.push("/dashboard");
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    const user = {
      id: "1",
      email: "user@gmail.com",
      name: "Google User",
    };

    dispatch(setUser(user));
    router.push("/dashboard");
  };

  return (
    <AuthLayout title="Login" subtitle="Forgot your password?">
      {/* Login form */}
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
        />

        {/* Keep me logged in */}
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
          />
          <span>
            Keep me logged in - applies to all log in options below.
            <br />
            More info
          </span>
        </label>
      </div>

      {/* Email Login button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
      >
        EMAIL LOGIN →
      </button>

      {/* Google Login button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="font-medium">Google</span>
      </button>

      {/* Terms */}
      <p className="text-xs text-gray-500">
        By clicking 'Log In' you agree to our website LinkifyClub{" "}
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
    </AuthLayout>
  );
}
