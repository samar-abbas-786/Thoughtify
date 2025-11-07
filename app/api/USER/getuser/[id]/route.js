import prisma from "@/DB/db.config";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "No user ID found" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: { post: true },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "User found successfully",
    user,
  });
};
