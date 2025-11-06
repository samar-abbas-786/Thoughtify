import prisma from "@DB/db.config";
import { NextResponse } from "@node_modules/next/server";

export const GET = async (request) => {
  const post = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  return NextResponse.json({ message: "Posts find successfully", post });
};
