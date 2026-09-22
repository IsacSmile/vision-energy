import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { getAdminSession } from "@/lib/auth";
import { env } from "@/lib/env";
import crypto from "crypto";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3 MB

// Magic bytes signatures for JPEG, PNG, WEBP, AVIF
function isValidImageSignature(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 12) return false;

  if (mimeType === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mimeType === "image/png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    );
  }
  if (mimeType === "image/webp") {
    return (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    );
  }
  if (mimeType === "image/avif") {
    const ftyp = buffer.subarray(4, 12).toString("utf-8");
    return ftyp.includes("avif") || ftyp.includes("mif1");
  }

  return false;
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blobToken = env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    return NextResponse.json(
      {
        error: "BLOB_READ_WRITE_TOKEN is not configured. Please use a direct image URL or set BLOB_READ_WRITE_TOKEN in environment variables.",
      },
      { status: 400 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "general"; // products | services | blog

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: "File exceeds maximum allowed size of 3 MB" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WEBP and AVIF images are permitted." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!isValidImageSignature(buffer, file.type)) {
      return NextResponse.json(
        { error: "File validation failed: signature does not match an allowed image type." },
        { status: 400 }
      );
    }

    // Generate random filename to strip original file metadata
    const ext = file.name.split(".").pop() || "jpg";
    const randomName = `${crypto.randomBytes(16).toString("hex")}.${ext}`;
    const pathName = `cms/${type}/${randomName}`;

    const blob = await put(pathName, buffer, {
      access: "public",
      contentType: file.type,
      token: blobToken,
    });

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch (error: any) {
    console.error("Vercel Blob Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blobToken = env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN missing" }, { status: 400 });
  }

  try {
    const { url } = await request.json();
    if (url && url.includes("public.blob.vercel-storage.com")) {
      await del(url, { token: blobToken });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blob image" }, { status: 500 });
  }
}
