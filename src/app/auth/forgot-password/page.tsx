"use client";

import { supabase } from "@/utils/supabaseClient";
import { SubmitHandler, useForm } from "react-hook-form";

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<ForgotPasswordFormValues>();

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: "localhost:3000/auth/reset-password",
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Password reset email sent! Please check your inbox.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 text-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>

        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600"
        >
          Send Reset Email
        </button>

        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-green-400 hover:underline">
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
