import { authOptions } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized.");
  }

  const { title, overview, description, image } = await req.json();

  if (!title || !overview || !description || !image) {
    throw new Error("All fields are required!");
  }

  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
    });
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      overview,
      description,
      image,
      authorId: user.id,
    },
  });
  console.log("Blog created:", blog);
  return NextResponse.redirect("http://localhost:3000");
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
    console.log("🟢 Debug: Blogs Found Without Relations:", blogs);
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
