// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Key, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import MotherCareLogo from "@/app/img/mother.png";
import MotherCare from "@/app/img/back.jpeg";


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
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('data:image/jpeg;base64,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')`, // <-- Put your image in public folder
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 to-blue-100/70"></div>

      {/* Card Container */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden relative z-10">
        
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
            <h1 className="text-1xl md:text-2xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center leading-tight">
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
                {errors.email && (
                  <p className="text-red-500 text-sm sm:text-base mt-2">{errors.email}</p>
                )}
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
                {errors.password && (
                  <p className="text-red-500 text-sm sm:text-base mt-2">{errors.password}</p>
                )}
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
