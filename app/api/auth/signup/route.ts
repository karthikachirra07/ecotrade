// app/api/auth/signup/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Dummy response (we’ll connect DB next)
  return NextResponse.json({
    message: "User registered successfully",
    email,
  });
}