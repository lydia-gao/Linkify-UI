"use client";

import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submit:", {
      firstName,
      lastName,
      email,
      password,
      agreeTerms,
      keepLoggedIn,
    });
  };

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
          <h2 className="text-2xl font-bold">Register</h2>

          {/* Google Sign-in */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Sign up with</p>
            <button className="btn-secondary">
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
              />
              <span className="font-medium">Google</span>
            </button>
          </div>

          {/* Divider */}
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
                className="form-input w-1/2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input w-1/2"
              />
            </div>
          </div>

          {/* Login Details */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Login Details
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 8 characters with at least one uppercase, one lowercase,
              one special character and a number
            </p>
          </div>

          {/* Terms */}
          <div className="space-y-2 text-sm">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1"
              />
              <span>
                By clicking 'Register' you agree to our website LinkifyClub{" "}
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

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="mt-1"
              />
              <span>
                Keep me logged in – applies to all log in options below. More
                info
              </span>
            </label>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} className="btn-primary">
            REGISTER →
          </button>
        </div>
      </div>
    </div>
  );
}
