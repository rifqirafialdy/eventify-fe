"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
  try {
    await axios.post(
      "https://minpro-931372793184.asia-southeast2.run.app/api/auth/login",
      values,
      { withCredentials: true }
    );

    alert("Login successful!");
    router.push("/");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const backendMessage = error.response.data?.message;

      if (backendMessage === "Bad credentials") {
        setError("Email or password is incorrect");
      } else if (typeof backendMessage === "string") {
        setError(backendMessage);
      } else {
        setError("Login failed");
      }
    } else {
      setError("An unexpected error occurred");
    }
  }
}

  });

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/headway-F2KRf_QfCqw-unsplash.jpg"
        alt="Event Background"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-4">
        <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-md w-full border border-amber-100">
          <h2 className="text-3xl font-extrabold text-amber-500 mb-2 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Log in to manage your events and experiences
          </p>

          {error && (
            <div className="text-red-500 mb-4 text-sm text-center">{error}</div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-amber-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-amber-500"
            />
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-md font-semibold hover:bg-amber-600 transition"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-amber-500 font-medium hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
