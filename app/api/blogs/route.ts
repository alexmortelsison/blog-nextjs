import { NextRequest } from "next/server";
import { prisma } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const { title, overview, description, image } = await req.json();

  if (!title || !overview || !description || !image) {
    throw new Error("All fields are required");
  }

  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name ?? "",
        image: session.user.image ?? "",
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

  return Response.json(blog, { status: 201 });
}
