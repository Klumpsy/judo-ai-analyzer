"use client";

import { useUser } from "@/hooks/useUser";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { belts } from "@/utils/constant";

type ProfileFormValues = {
  username: string;
  email: string;
  belt: string;
  useUsername: boolean;
};

const Profile = () => {
  const { user, setUser } = useUser();
  const { register, handleSubmit, setValue, watch } =
    useForm<ProfileFormValues>();

  const username = watch("username");

  useEffect(() => {
    if (user) {
      setValue("username", user.username || "");
      setValue("email", user.email || "");
      setValue("belt", user.rank || "");
      setValue("useUsername", user.useUsername || false);
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    const { error } = await supabase.auth.updateUser({
      email: data.email,
      data: {
        username: data.username,
        rank: data.belt,
        useUsername: data.useUsername,
      },
    });

    if (error) {
      alert("Failed to update profile");
    } else {
      alert("Profile updated successfully!");
      setUser({
        ...user!,
        username: data.username,
        email: data.email,
        rank: data.belt,
        useUsername: data.useUsername,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto"
      >
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4 flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("useUsername")}
            disabled={!username}
            className="bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
          />
          <label className="text-gray-300">Use Username for Display</label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-1">Judo Belt</label>
          <div className="grid grid-cols-2 gap-4">
            {belts.map((belt, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register("belt", { required: true })}
                  value={belt.name}
                  className="bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
                />
                <Image
                  src={belt.image}
                  alt={belt.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <span className="text-gray-300">{belt.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
