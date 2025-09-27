"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { loginUser, googleAuth } from "@/store/slices/authSlice";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await dispatch(googleAuth()).unwrap();
      router.push("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Forgot your password?">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full"
            required
          />

          <div className="flex items-start gap-2 text-sm">
            <Checkbox
              id="keepLoggedIn"
              checked={formData.keepLoggedIn}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, keepLoggedIn: !!checked }))
              }
            />
            <Label htmlFor="keepLoggedIn" className="text-sm">
              Keep me logged in - applies to all log in options below.
              <br />
              More info
            </Label>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "EMAIL LOGIN →"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Google</span>
        </Button>
      </form>

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
