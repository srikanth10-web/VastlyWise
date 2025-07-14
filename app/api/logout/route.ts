import { logoutAction } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST() {
  await logoutAction();
  return NextResponse.json({ success: true });
} 