"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Checkbox } from "../../components/ui/checkbox";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - just redirect to dashboard
    router.push("/dashboard");
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Side - Image */}
      <div className="w-1/2 relative bg-gray-100 overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ctext font-family='monospace' font-size='12' fill='%23000000' fill-opacity='0.1'%3Ehttp:%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-8">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            LINKIFY
          </h1>
          <p className="text-xl text-center max-w-md text-gray-700 leading-relaxed">
            Manage and track your links with powerful analytics and insights.
          </p>
        </div>

        {/* Centered image - fixed size, not filling container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 opacity-15">
            <Image
              src="/white_link.png"
              alt="Linkify Logo"
              width={192}
              height={192}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
                className="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Keep me logged in - applies to all log in options below.
              </label>
            </div>

            <span className="text-xs text-gray-500 mb-4 block">More info</span>

            <Button
              type="submit"
              className="w-full h-12 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors mb-4"
            >
              EMAIL LOGIN
            </Button>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 flex items-center justify-center border-gray-300 hover:bg-gray-50 mb-4"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            <div className="text-xs text-gray-500 mt-4">
              By clicking &apos;Log In&apos; you agree to our website
              LinkifyClub Terms & Conditions, Linkify Privacy Notice and Terms &
              Conditions.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
