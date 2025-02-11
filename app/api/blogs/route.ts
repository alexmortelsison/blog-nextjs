import { prisma } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized.");
  }

  const { title, overview, description, image } = await req.json();

  if (!title || !overview || !description || !image) {
    throw new Error("All fields are required.");
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
        image: session.user.image,
        email: session.user.email,
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
    console.log(blogs);
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Failed fetching data", error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
