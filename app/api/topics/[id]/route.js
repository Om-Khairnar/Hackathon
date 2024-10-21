import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";

// PUT: Update a specific challenge by ID
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const {
      newName: name,
      newStartDate: startDate,
      newEndDate: endDate,
      newDescription: description,
      newUpload: upload, // This can be a string URL from Cloudinary
      newLevel: level,
    } = await request.json();

    await connectMongoDB();

    const updatedChallenge = await Topic.findByIdAndUpdate(
      id,
      {
        name,
        startDate,
        endDate,
        description,
        upload, // Image upload URL from Cloudinary
        level,
      },
      { new: true }
    );

    if (!updatedChallenge) {
      return NextResponse.json(
        { message: "Challenge not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Challenge updated successfully", updatedChallenge },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating challenge:", error);
    return NextResponse.json(
      { message: "Failed to update challenge", error: error.message },
      { status: 500 }
    );
  }
}

// GET: Fetch a specific challenge by ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();
    const challenge = await Topic.findById(id);

    if (!challenge) {
      return NextResponse.json(
        { message: "Challenge not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ challenge }, { status: 200 });
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return NextResponse.json(
      { message: "Failed to fetch challenge", error: error.message },
      { status: 500 }
    );
  }
}

