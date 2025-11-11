import prisma from "@DB/db.config";
import { NextResponse } from "@node_modules/next/server";

export const POST = async (request) => {
  const { name } = await request.json();
  const updated = await prisma.user.updateMany({
    where: {
      name: "",
    },
    data: {
      name: name,
    },
  });
  if (updated) {
    return NextResponse.json({ message: "updated", updated });
  }
};
