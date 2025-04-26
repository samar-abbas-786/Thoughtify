import prisma from "@/app/DB/db.config";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, password } = await request.json();
  console.log("Body", name, email);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "New User Created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "User creation failed", details: error.message },
      { status: 500 }
    );
  }
}
