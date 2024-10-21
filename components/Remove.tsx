"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface RemoveProps {
  id: string;
  onDelete: (id: string) => void; // Declare onDelete as a prop
}

export default function Remove({ id, onDelete }: RemoveProps) {
  const router = useRouter();

  const removeHackthon = async () => {
    const confirmed = confirm("Are you sure you want to delete this hackathon?");
    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(id); // Call the onDelete function after successful deletion
        router.refresh(); // Refresh the page after deletion
      } else {
        console.error("Failed to delete hackathon");
      }
    }
  };

  return (
    <div>
      <button onClick={removeHackthon} className="text-red-500">
        <HiOutlineTrash size={24} />
      </button>
    </div>
  );
}
