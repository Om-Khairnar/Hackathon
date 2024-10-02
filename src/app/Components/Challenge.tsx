"use client";
import React, { useState, useEffect } from "react";
import Search from "../assets/assets/icons/search.svg";
import Image from "next/image";

function Challenge() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [cards, setCards] = useState([]);

  // Options for Status and Level
  const filterOptions = {
    Status: ["All", "Active", "Upcoming", "Past"],
    Level: ["Easy", "Medium", "Hard"],
  };

  // Toggle dropdown function
  const Dropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle selection of options
  const handleOptionClick = (option) => {
    if (!selectedFilters.includes(option)) {
      setSelectedFilters([...selectedFilters, option]);
    }
  };

  // Remove filter option
  const removeFilter = (option) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== option));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cards"); // Replace with your API endpoint
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-dark-blue pt-24 pb-20">
        <h2 className="text-2xl font-semibold text-white text-center pb-10">
          Explore Challenges
        </h2>
        <div className="flex justify-center items-center space-x-2 p-4">
          {/* Search Input */}
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

          {/* Filter Button */}
          <div className="relative">
            <button
              className="bg-white text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg"
              onClick={Dropdown}
            >
              {isOpen ? "Filter ^" : "Filter ▼"}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {/* Status Section */}
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-gray-500">Status</h3>
                  <ul>
                    {filterOptions.Status.map((status) => (
                      <li
                        key={status}
                        className="flex items-center cursor-pointer hover:bg-gray-100 p-2"
                        onClick={() => handleOptionClick(status)}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedFilters.includes(status)}
                          readOnly
                        />
                        <label className="text-gray-400">{status}</label>
                      </li>
                    ))}
                  </ul>
                </div>
                <hr />
                {/* Level Section */}
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-gray-500">Level</h3>
                  <ul>
                    {filterOptions.Level.map((level) => (
                      <li
                        key={level}
                        className="flex items-center cursor-pointer hover:bg-gray-100 p-2"
                        onClick={() => handleOptionClick(level)}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedFilters.includes(level)}
                          readOnly
                        />
                        <label className="text-gray-400">{level}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Filters Below Search Bar */}
        <div className="flex flex-wrap justify-center items-center mt-4 space-x-2">
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full flex items-center space-x-2"
            >
              <span>{filter}</span>
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={() => removeFilter(filter)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-custom-blue">
        <div className="flex justify-between items-center p-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="card w-1/3 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                src="../assets/assets/cardimage/"
                width={500}
                height={500}
                alt="avatar"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-xl">Name</h4>
                <p className="text-gray-600">title</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Challenge;
