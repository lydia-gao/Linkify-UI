"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Mock registration - replace with actual API call
    const user = {
      id: "1",
      email: email,
      name: `${firstName} ${lastName}`,
    };

    dispatch(setUser(user));
    router.push("/dashboard");
  };

  const handleGoogleSignup = () => {
    // Mock Google signup
    const user = {
      id: "1",
      email: "user@gmail.com",
      name: "Google User",
    };

    dispatch(setUser(user));
    router.push("/dashboard");
  };

  return (
    <AuthLayout title="Register">
      {/* Google Sign-in */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Sign up with</p>
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Google</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-sm text-gray-500">OR</span>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Your Name</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-1/2 border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-1/2 border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
      </div>

      {/* Login Details */}
      <div>
        <label className="block text-sm font-medium mb-1">Login Details</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-3 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          Minimum 8 characters with at least one uppercase, one lowercase, one
          special character and a number
        </p>
      </div>

      {/* Terms */}
      <div className="space-y-2">
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          <span>
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
          </span>
        </label>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
          />
          <span>
            Keep me logged in - applies to all log in options below. More info
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
      >
        REGISTER →
      </button>
    </AuthLayout>
  );
}
