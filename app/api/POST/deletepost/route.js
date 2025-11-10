import prisma from "@DB/db.config";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Post ID not found" },
        { status: 400 }
      );
    }

    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Post deleted successfully", deletedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
