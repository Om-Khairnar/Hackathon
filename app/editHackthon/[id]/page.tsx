'use client';
import React, { useState, useEffect } from 'react';
import EditHackthonForm from "@/components/EditHackthonForm"; 

interface ChallengeData {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  upload: string; 
  level?: string; 
}

interface EditHackthonProps {
  params: {
    id: string; 
  };
}

export default function EditHackthon({ params }: EditHackthonProps) {
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 
  const { id } = params; 

  useEffect(() => {
    if (!id) return; 

    const fetchChallengeData = async () => {
      try {
        const response = await fetch(`/api/topics/${id}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch challenge data');
        }
        const data = await response.json();
        setChallengeData(data.challenge); 
      } catch (err) {
        console.error('Error fetching challenge data:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChallengeData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Challenge</h1>
      {challengeData && (
        <EditHackthonForm
          id={challengeData._id} 
          name={challengeData.name}
          startDate={challengeData.startDate}
          endDate={challengeData.endDate}
          description={challengeData.description}
          upload={challengeData.upload} 
          level={challengeData.level}
        />
      )}
    </div>
  );
}
