import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getAdminSession, checkUploadRateLimit } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateCheck = checkUploadRateLimit(session.email, 30, 60 * 60 * 1000);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: `Upload rate limit exceeded. Retry after ${rateCheck.retryAfterSeconds} seconds.` },
      { status: 429 }
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Enforce file extension check
        const extMatch = pathname.match(/\.(jpe?g|png|webp)$/i);
        if (!extMatch) {
          throw new Error("Invalid file format. Only JPEG, PNG, and WebP are allowed.");
        }

        let parsedPayload: { productId?: string; imageId?: string } = {};
        if (clientPayload) {
          try {
            parsedPayload = JSON.parse(clientPayload);
          } catch {
            // ignore JSON parse error
          }
        }

        const productId = parsedPayload.productId || "draft";
        const imageId = parsedPayload.imageId || String(Date.now());
        const filename = pathname.split("/").pop() || "image";
        const sanitizedFilename = filename.toLowerCase().replace(/[^a-z0-9.-]/g, "_");

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 5 * 1024 * 1024, // 5MB limit
          pathname: `products/${productId}/${imageId}-${sanitizedFilename}`,
          tokenPayload: JSON.stringify({
            productId,
            imageId,
            email: session.email,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Upload finished event logger
        try {
          const payload = tokenPayload ? JSON.parse(tokenPayload) : {};
          console.log(`[Blob Upload Complete] URL: ${blob.url} Path: ${blob.pathname} for Product: ${payload.productId}`);
        } catch {
          // ignore parsing error
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Upload token generation failed" },
      { status: 400 }
    );
  }
}
