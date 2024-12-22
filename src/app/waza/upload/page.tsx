"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/utils/supabaseClient";
import {
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { user } = useUser();
  const technique = searchParams.get("technique");
  const category = searchParams.get("category");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !technique || !category) {
      alert(
        "Please select a file and ensure technique and category are specified."
      );
      return;
    }

    if (!user) {
      alert("You need to be logged in to upload a video.");
      return;
    }

    setUploading(true);
    try {
      const fileName = `${user.id}/${category}/${technique}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("waza-videos")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Storage Upload Error:", uploadError);
        throw new Error("Failed to upload the file to storage.");
      }

      const publicUrl = supabase.storage
        .from("waza-videos")
        .getPublicUrl(fileName).data.publicUrl;
      if (!publicUrl) {
        throw new Error("Failed to retrieve public URL for uploaded file.");
      }

      setVideoUrl(publicUrl);

      const { error: dbError } = await supabase.from("waza").insert({
        user_id: user.id,
        technique,
        category,
        video_url: publicUrl,
        correct: false,
        feedback: null,
        uploaded_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error("Database Insert Error:", dbError);
        throw new Error("Failed to insert video details into the database.");
      }

      setSuccess(true);
    } catch (error) {
      console.error("Error during upload:", error.message || error);
      alert(`Upload failed: ${error.message || "Unknown error occurred."}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">
        Upload Video for {technique} in {category}
      </h1>
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-lg">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded p-6 cursor-pointer hover:border-gray-500"
        >
          <AiOutlineCloudUpload size={48} className="text-gray-400" />
          <span className="text-gray-400 mt-2">Click to select a file</span>
          <input
            id="file-upload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && (
          <p className="text-center text-gray-300 mt-4">
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full mt-6 py-2 rounded text-white ${
            uploading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {uploading ? (
            <span className="flex items-center justify-center space-x-2">
              <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              <span>Uploading...</span>
            </span>
          ) : (
            "Upload Video"
          )}
        </button>

        {success && videoUrl && (
          <div className="mt-6">
            <p className="text-center text-green-400">Upload successful!</p>
            <video
              className="mt-4 w-full max-w-md mx-auto rounded"
              controls
              src={videoUrl}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
