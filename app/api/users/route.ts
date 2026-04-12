import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const user = await User.create(data);
  return NextResponse.json(user);
}