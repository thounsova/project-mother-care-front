// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Key, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import MotherCareLogo from "@/app/img/mother.png";

// ✅ Zod schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    console.log("Form submitted", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden">

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6 sm:p-10">
          <div className="w-full max-w-md aspect-[4/3] relative">
            <Image
              src={MotherCareLogo}
              alt="Mother Care"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <div className="w-full max-w-md">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center leading-tight">
              Welcome to <span className="text-blue-700">Mother Care</span>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email */}
              <div>
                <div className="flex items-center gap-3 border-2 rounded-xl px-4 py-3 bg-gray-50">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-none focus-visible:ring-0 bg-transparent text-base sm:text-lg"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm sm:text-base mt-2">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center gap-3 border-2 rounded-xl px-4 py-3 bg-gray-50">
                  <Key className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-none focus-visible:ring-0 bg-transparent text-base sm:text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm sm:text-base mt-2">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 h-14 py-6 text-lg sm:text-xl rounded-xl"
              >
                Login
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
