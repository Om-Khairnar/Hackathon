import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";

export async function POST(request) {
  const { name, startDate, endDate, description, upload, level } =
    await request.json();
  await connectMongoDB();
  await Topic.create({ name, startDate, endDate, description, upload, level });
  return NextResponse.json({ message: "hackton Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = request.nextIUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Hackthon deleted " }, { status: 200 });
}
