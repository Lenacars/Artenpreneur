import { NextResponse } from "next/server";
import { getPresignedUrl } from "@/lib/r2.js"; // uzantısı .js olacak

export async function GET() {
  const videoUrl = await getPresignedUrl("ornek-dosya.mp4"); // R2'deki dosya adı
  return NextResponse.json({ url: videoUrl });
}
