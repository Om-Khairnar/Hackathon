"use client";
import React, { useEffect, useState } from "react";
import Remove from "@/components/Remove";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import Search from "@/assets/assets/icons/search.svg";
import Image from "next/image";

interface Hackathon {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  upload: string;
}

export default function HackthonList() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch("/api/topics");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setHackathons(data.topics);
      } catch (err) {
        console.error("Error fetching hackathons:", err);
        if (err instanceof Error) {
          setError(err.message); // Access the message property safely
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  const handleDelete = (id: string) => {
    // Remove the deleted hackathon from the state
    setHackathons((prevHackathons) =>
      prevHackathons.filter((hackathon) => hackathon._id !== id)
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-dark-blue pt-24 pb-20 px-4">
      <h2 className="text-2xl font-semibold text-white text-center pb-10">
        Explore Challenges
      </h2>
      <div className="flex justify-center items-center space-x-2 p-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-12 p-2 pl-10 border border-zinc-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
          />
          <span className="absolute left-3 top-2 text-zinc-500">
            <Search width={30} height={30} />
          </span>
        </div>
      </div>

      {/* Hackathon Cards Section */}
      <div className="bg-custom-blue">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon._id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                src={hackathon.upload}
                alt={hackathon.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{hackathon.name}</h2>
                <p className="text-gray-500">{hackathon.description}</p>
                <p className="text-sm text-gray-400">
                  Start: {new Date(hackathon.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400">
                  End: {new Date(hackathon.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 p-4">
                <Remove id={hackathon._id} onDelete={handleDelete} />
                <Link href={`/editHackthon/${hackathon._id}`}>
                  <HiPencilAlt size={24} className="text-blue-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
