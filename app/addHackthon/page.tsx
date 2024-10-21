"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from 'next/image';

export default function AddHackthon() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const router = useRouter();



  const handleSendFile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const challengeData = {
      name: (e.target as HTMLFormElement).challengeName.value,
      startDate: (e.target as HTMLFormElement).startDate.value,
      endDate: (e.target as HTMLFormElement).endDate.value,
      description: (e.target as HTMLFormElement).description.value,
      upload: preview, 
      level: (e.target as HTMLFormElement).level.value,
    };

    try {
      const res = await axios.post("/api/topics", challengeData);
      console.log(res.data);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining to handle cases where no file is selected

    if (file) { // Check if a file is selected
      const reader = new FileReader();
      reader.onloadend = function () {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Challenge Details</h1>
      <form onSubmit={handleSendFile}>
        <div className="mb-4">
          <label htmlFor="challengeName" className="block text-lg font-medium">
            Challenge Name
          </label>
          <input
            type="text"
            id="challengeName"
            name="challengeName"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-lg font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-lg font-medium">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="imageUpload" className="block text-lg font-medium">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            onChange={handleFileUpload}
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
            accept="image/*"
            required
          />
          {preview && (
            
            <Image
              src={preview as string} 
              alt="Preview"
              width={200} 
              height={200} 
              style={{ objectFit: "cover" }} 
            />
          )}        
        </div>

        <div className="mb-4">
          <label htmlFor="level" className="block text-lg font-medium">
            Level
          </label>
          <select
            id="level"
            name="level"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Create Challenge
        </button>
      </form>
    </div>
  );
}
