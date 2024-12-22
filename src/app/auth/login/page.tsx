"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 text-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <a href="/auth/signup" className="text-green-400 hover:underline">
            Don’t have an account? Sign Up
          </a>
          <br />
          <a
            href="/auth/forgot-password"
            className="text-green-400 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
