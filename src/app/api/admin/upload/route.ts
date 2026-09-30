import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { getAdminSession } from "@/lib/auth";
import { env } from "@/lib/env";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

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

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "general"; // products | services | blog

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const maxSizeBytes = type === "services" ? 500 * 1024 : MAX_FILE_SIZE_BYTES;
    const maxSizeLabel = type === "services" ? "500 KB" : "3 MB";

    if (file.size > maxSizeBytes) {
      return NextResponse.json(
        { error: `File exceeds maximum allowed size of ${maxSizeLabel} (uploaded size: ${(file.size / 1024).toFixed(1)} KB)` },
        { status: 400 }
      );
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
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const randomName = `${crypto.randomBytes(16).toString("hex")}.${ext}`;
    const blobToken = env.BLOB_READ_WRITE_TOKEN;

    // 1. If Vercel Blob token is available, upload to Vercel Blob
    if (blobToken) {
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
    }

    // 2. Try to save locally to public/uploads/cms/... (local dev / persistent servers)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "cms", type);
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, randomName);
      await fs.writeFile(filePath, buffer);

      const localUrl = `/uploads/cms/${type}/${randomName}`;
      return NextResponse.json({
        url: localUrl,
        pathname: localUrl,
      });
    } catch (fsError: any) {
      // 3. If running on Serverless / Vercel (read-only filesystem /var/task), fallback to Base64 Data URL
      console.warn("Filesystem write unavailable (serverless environment), falling back to Data URL:", fsError?.message);
      const base64Data = buffer.toString("base64");
      const dataUrl = `data:${file.type};base64,${base64Data}`;

      return NextResponse.json({
        url: dataUrl,
        pathname: `data-uri-${randomName}`,
      });
    }
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error?.message || "Image upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blobToken = env.BLOB_READ_WRITE_TOKEN;

  try {
    const { url } = await request.json();

    // Handle local file deletion
    if (url && typeof url === "string" && url.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", url.replace(/^\//, ""));
      try {
        await fs.unlink(filePath);
      } catch (err) {
        // ignore if already deleted
      }
      return NextResponse.json({ success: true });
    }

    // Handle Vercel Blob deletion
    if (blobToken && url && url.includes("public.blob.vercel-storage.com")) {
      await del(url, { token: blobToken });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
