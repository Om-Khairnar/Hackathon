import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Topic from "../../../models/topic";
import cloudinary from "../../../libs/cloudinary";

export async function POST(request) {
  try {
    const { name, startDate, endDate, description, upload, level } =
      await request.json();

    await connectMongoDB();

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(upload, {
      folder: "hackathons",
    });

    const newTopic = await Topic.create({
      name,
      startDate,
      endDate,
      description,
      upload: uploadResponse.secure_url,
      level,
    });

    // Return the created topic data if needed
    return NextResponse.json(
      { message: "Hackathon Created", topic: newTopic }, 
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create hackathon" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error fetching the Hackathons:", error); // Fixed typo: 'colsole' to 'console'
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Missing ID parameter" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json(
        { error: "Hackathon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Hackathon deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting hackathon:", error); // Optionally log the error for debugging
    return NextResponse.json(
      { error: "Error deleting hackathon" },
      { status: 500 }
    );
  }
}
