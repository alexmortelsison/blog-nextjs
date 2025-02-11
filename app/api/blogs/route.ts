import { authOptions } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { supabase } from "@/app/utils/supabase";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const overview = formData.get("overview") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    if (!title || !overview || !description || !image) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 🖼 Upload image to Supabase Storage
    const fileExt = image.name.split(".").pop(); // Get file extension
    const filePath = `blog-images/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("blog-images") // Bucket name
      .upload(filePath, image, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Image Upload Error:", error.message);
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 500 }
      );
    }

    // Get Public URL
    const { data: imageUrlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);
    const imageUrl = imageUrlData.publicUrl;

    // 🔥 Save blog to Prisma
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        overview,
        description,
        image: imageUrl, // ✅ Save the Supabase image URL
        authorId: user.id,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(blogs);
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Failed fetching data", error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
