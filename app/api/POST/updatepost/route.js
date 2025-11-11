import prisma from "@DB/db.config";
import { NextResponse } from "@node_modules/next/server";

export const POST = async (request) => {
  const { id, title, description } = await request.json();
  const isPost = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  if (!isPost) {
    return NextResponse.json({ message: "No post exist" }, { status: 404 });
  } else {
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
      },
    });
    return NextResponse.json(
      { message: "Thought updated successfully", updatedPost },
      { status: 200 }
    );
  }
};
