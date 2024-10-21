export async function POST(request) {
    try {
      const { name, startDate, endDate, description, upload, level } =
        await request.json();
      await connectMongoDB();
      await Topic.create({
        name,
        startDate,
        endDate,
        description,
        upload,
        level,
      });
      return NextResponse.json({ message: "Hackathon Created" }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to create hackathon" },
        { status: 500 }
      );
    }
  }