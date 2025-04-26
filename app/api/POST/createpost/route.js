import prisma from "@app/DB/db.config";
import { NextResponse } from "@node_modules/next/server";

export const POST = async (request) => {
  const { title, description, user_id } = await request.json();
  if (!title || !description || !user_id) {
    return NextResponse.json({ message: "Missing Fields" });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "Login First" });
  }
  const post = await prisma.post.create({
    data: {
      title,
      description,
      user_id,
    },
  });
  if (!post) {
    return NextResponse.json({ message: "Couldn't create the post" });
  }
  return NextResponse.json({ message: "Created post successfully", post });
};
