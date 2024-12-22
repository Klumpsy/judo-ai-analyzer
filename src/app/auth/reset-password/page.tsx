"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ResetPasswordFormValues = {
  password: string;
};

const ResetPassword = () => {
  const { register, handleSubmit } = useForm<ResetPasswordFormValues>();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const { query } = router;
      if (query.type === "recovery" && query.access_token) {
        const { error } = await supabase.auth.setSession({
          access_token: query.access_token as string,
          refresh_token: "",
        });
        setIsTokenValid(!error);
      }
    };

    checkToken();
  }, [router]);

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Password reset successful! You can now log in.");
      router.push("/auth/login");
    }
  };

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <h1 className="text-2xl text-white">Invalid or Expired Link</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 text-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

        <div className="mb-4">
          <label className="block text-gray-300">New Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
