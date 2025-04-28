import prisma from "@DB/db.config";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const alluser = await prisma.user.findMany();
  return NextResponse.json({
    message: "Users find successfully",
    users: alluser,
  });
};
