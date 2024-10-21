'use client';
import React, { useState, useEffect } from 'react';
import EditHackthonForm from "@/components/EditHackthonForm"; // Import the form component

export default function EditHackthon({ params }) {
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params; // Get the challenge ID from the params

  // Fetch the challenge data when the component mounts
  useEffect(() => {
    if (!id) return; // Wait until ID is available

    const fetchChallengeData = async () => {
      try {
        const response = await fetch(`/api/topics/${id}`); // Replace with your actual API path
        if (!response.ok) {
          throw new Error('Failed to fetch challenge data');
        }
        const data = await response.json();
        setChallengeData(data.challenge); // Set the challenge data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching challenge data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChallengeData();
  }, [id]);

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If challenge data is fetched, render the form component with the data
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Challenge</h1>
      {challengeData && (
        <EditHackthonForm
          id={challengeData._id} // Pass the ID to the form
          name={challengeData.name}
          startDate={challengeData.startDate}
          endDate={challengeData.endDate}
          description={challengeData.description}
          upload={challengeData.upload} // Cloudinary image URL or string
          level={challengeData.level}
        />
      )}
    </div>
  );
}
