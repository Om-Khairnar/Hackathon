import Link from "next/link";
import React from "react";
import Icon1 from "@/assets/assets/icons/PicsArt_04-14-04.42 1.svg";
import Group1 from "@/assets/assets/icons/Group 1000002515.svg";
import Group2 from "@/assets/assets/icons/Group 1000002516.svg";
import Group3 from "@/assets/assets/icons/Group 1000002518.svg";
import Card1 from "@/assets/assets/icons/carbon_notebook-reference.svg";

export default function Landing() {
  return (
    <div>
      <div className="bg-background p-8 bg-custom-blue text-white pt-20 pr-12">
        <Link href={"/"}>Home</Link>
        <div className="flex items-start justify-between">
          <div className="flex">
            {/* Vertical Line */}
            <div className="border-l-8 border-yellow h-full min-h-[100px] mr-4 mt-12"></div>

            {/* Content Section */}
            <div className="mt-12 ml-6">
              <h1 className="text-5xl font-bold">Accelerate Innovation</h1>
              <h1 className="text-5xl font-bold mt-2">
                with Global AI Challenges
              </h1>

              {/* Paragraph and Button Section */}
              <div className="mt-6" style={{ maxWidth: "450px" }}>
                <p className="text-muted-foreground mb-6">
                  AI Challenges at DPhi simulate real-world problems. It is a
                  great place to put your AI/Data Science skills to test on
                  diverse datasets allowing you to foster learning through
                  competitions.
                </p>
                <Link href={"/addHackthon"}>
                  <button className="bg-secondary hover:bg-secondary/80 py-2 px-4 rounded-lg mb-6 bg-white text-custom-blue font-bold">
                    Create Challenge
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Icon Section */}
          <div className="mr-20">
            <Icon1 width={300} height={300} />
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-dark-blue text-white p-12">
        {/* Stat Item 1 */}
        <div className="flex items-center space-x-4">
          <Group1 width={60} height={60} />
          <div className="flex flex-col">
            <span className="text-4xl font-bold">100K+</span>
            <span className="text-muted-foreground">AI model submissions</span>
          </div>
        </div>

        {/* Vertical Line Between Stats */}
        <div className="border-l-2 border-white mx-20"></div>

        {/* Stat Item 2 */}
        <div className="flex items-center space-x-4">
          <Group2 width={60} height={60} />
          <div className="flex flex-col">
            <span className="text-4xl font-bold">50K+</span>
            <span className="text-muted-foreground">Data Scientists</span>
          </div>
        </div>

        {/* Vertical Line Between Stats */}
        <div className="border-l-2 border-white mx-20"></div>

        {/* Stat Item 3 */}
        <div className="flex items-center space-x-4">
          <Group3 width={60} height={60} className="mb-2" />
          <div className="flex flex-col">
            <span className="text-4xl font-bold">100+</span>
            <span className="text-muted-foreground">AI Challenges hosted</span>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          Why Participate in{" "}
          <span className="text-primary text-custom-green">AI Challenges?</span>
        </h1>

        <div className="bg-white mt-9 justify-center items-center">
          <div className="grid grid-cols-2 gap-8 ml-40">
            {/* Card 1 */}
            <div className="p-6 mb-36 mt-16">
              <Card1 width={86} height={86} />
              <h1 className="text-2xl font-bold">Prove your skills</h1>
              <span
                className="text-gray-500 mt-4 block"
                style={{ maxWidth: "430px" }}
              >
                Gain substantial experience by solving real-world problems and
                pit against others to come up with innovative solutions.
              </span>
            </div>

            {/* Card 2 */}
            <div className="p-8 mb-36 mt-36">
              <h1 className="text-2xl font-bold">Learn from community</h1>
              <span
                className="text-gray-500 mt-4 block"
                style={{ maxWidth: "430px" }}
              >
                One can look and analyze the solutions submitted by the other
                Data Scientists in the community and learn from them.
              </span>
            </div>

            {/* Card 3 */}
            <div className="p-6 mb-36">
              <h1 className="text-2xl font-bold">Challenge yourself</h1>
              <span
                className="text-gray-500 mt-4 block"
                style={{ maxWidth: "430px" }}
              >
                There is nothing for you to lose by participating in a
                challenge. You can fail safe, learn out of the entire experience
                and bounce back harder.
              </span>
            </div>

            {/* Card 4 */}
            <div className="p-6 mb-36">
              <h1 className="text-2xl font-bold">Earn recognition</h1>
              <span
                className="text-gray-500 mt-4 block"
                style={{ maxWidth: "430px" }}
              >
                You will stand out from the crowd if you do well in AI
                challenges; it not only helps you shine in the community but
                also earns rewards.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


hackthon list ==>
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
