import prisma from "@DB/db.config";
import { NextResponse } from "@node_modules/next/server";
export async function POST(request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 500 });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found" });
  }
  if (password != user.password) {
    return NextResponse.json({ message: "Incorrect Password" });
  }
  return NextResponse.json({ message: "login successfully", user: user });
}
