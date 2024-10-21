'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditHackthonForm({ id, name, startDate, endDate, description, upload, level }) {
  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [newStartDate, setNewStartDate] = useState(startDate.split('T')[0]); // Format date for input
  const [newEndDate, setNewEndDate] = useState(endDate.split('T')[0]); // Format date for input
  const [newDescription, setNewDescription] = useState(description);
  const [newUpload, setNewUpload] = useState(upload);
  const [newLevel, setNewLevel] = useState(level);
  const [file, setFile] = useState(null); // State for the uploaded file

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const updatedData = {
      newName,
      newStartDate,
      newEndDate,
      newDescription,
      newUpload: file ? await uploadToCloudinary(file) : newUpload, // Handle image upload if a new file is selected
      newLevel,
    };

    try {
      const response = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update challenge');
      }

      const result = await response.json();
      alert(result.message); // Show success message
      // Optionally, you can redirect or update state after success
      router.push('/');
    } catch (error) {
      console.error('Error updating challenge:', error);
      alert('Error updating challenge: ' + error.message);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your Cloudinary upload preset

    const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', { // Replace with your Cloudinary URL
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Image upload failed');
    }

    const data = await res.json();
    return data.secure_url;
  };

  return (
    <div className='p-8'>
      <h1 className="text-3xl font-bold mb-4">Edit Challenge Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="challengeName" className="block text-lg font-medium">Challenge Name</label>
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            type="text"
            id="challengeName"
            name="challengeName"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-lg font-medium">Start Date</label>
          <input
            onChange={(e) => setNewStartDate(e.target.value)}
            value={newStartDate}
            type="date"
            id="startDate"
            name="startDate"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-lg font-medium">End Date</label>
          <input
            onChange={(e) => setNewEndDate(e.target.value)}
            value={newEndDate}
            type="date"
            id="endDate"
            name="endDate"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            id="description"
            name="description"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
            rows={4}
          ></textarea>
        </div>
{/* 
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block text-lg font-medium">Upload Image</label>
          <input
            onChange={(e) => setFile(e.target.files[0])} // Store the new file
            type="file"
            id="imageUpload"
            name="imageUpload"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
            accept="image/*"
          />
        </div> */}

        <div className="mb-4">
          <label htmlFor="level" className="block text-lg font-medium">Level</label>
          <select
            onChange={(e) => setNewLevel(e.target.value)}
            value={newLevel}
            id="level"
            name="level"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg"
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
          Edit Challenge
        </button>
      </form>
    </div>
  );
}
