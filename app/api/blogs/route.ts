import { NextResponse } from "next/server";

interface Blog {
  id: string;
  title: string;
  overview: string;
  description: string;
  imageUrl: string;
}

// eslint-disable-next-line prefer-const
let blogs: Blog[] = []; // ✅ Using let for modification

export async function GET() {
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  try {
    const { title, overview, description, imageUrl } = await req.json();

    if (!title || !overview || !description || !imageUrl) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newBlog: Blog = {
      id: Date.now().toString(),
      title,
      overview,
      description,
      imageUrl,
    };

    blogs.push(newBlog); // ✅ Modifying the array

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
