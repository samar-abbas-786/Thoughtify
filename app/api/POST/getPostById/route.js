import prisma from "@DB/db.config";
import { NextResponse } from "@node_modules/next/server";

export const POST = async (request) => {
  const { id } = await request.json();
  console.log("id", id);
  if (!id) {
    return NextResponse.json({ message: "Id not found" });
  }
  const post = await prisma.post.findMany({
    where: {
      user_id: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (post.length == 0) {
    return NextResponse.json({ message: "No Post Added" });
  }
  return NextResponse.json({ message: "Post Found Successfully", post });
};
