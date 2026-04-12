// app/api/auth/login/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "test@gmail.com" && password === "1234") {
    return NextResponse.json({ message: "Login successful" });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}