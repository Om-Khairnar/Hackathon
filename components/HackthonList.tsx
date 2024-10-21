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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch("/api/topics");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setHackathons(data.topics);
      } catch (err) {
        setError(err.message);
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
    <div>
      <div className="bg-dark-blue pt-24 pb-20">
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
        <div className="bg-custom-blue">
          <div className="flex justify-between items-center p-4 space-x-4">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon._id}
                className="card w-1/5 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* <img
                  src={hackathon.upload}
                  alt={hackathon.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />{" "} */}
                <Image
                  src={hackathon.upload}
                  alt={hackathon.name}
                  width={400} 
                  height={200} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h2>{hackathon.name}</h2>
                  <h3>{hackathon.description}</h3>
                  <h4>
                    {new Date(hackathon.startDate).toLocaleDateString()}
                  </h4>{" "}
                  <h4>{new Date(hackathon.endDate).toLocaleDateString()}</h4>{" "}
                </div>
                <div className="flex gap-2">
                  <Remove id={hackathon._id} onDelete={handleDelete} />
                  <Link href={`/editHackthon/${hackathon._id}`}>
                    <HiPencilAlt size={24} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
