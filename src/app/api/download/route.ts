import { auth } from "@/auth";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest } from "next/server";
const s3 = new S3Client({
  endpoint: process.env.AWS_S3_ENDPOINT,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
export const GET = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return Response.json({
      error: "You are not authenticated",
      status: 401,
    });
  }
  const searchParams = req.nextUrl.searchParams;
  const taskId = searchParams.get("taskId");
  const extension = searchParams.get("extension");
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  // Define your logic to construct the key using folderId
  const key = `${session.user.email}/tasks/${taskId}/${extension}`;
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return Response.json({ url });
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Error generating download link",
      status: 500,
    });
  }
};
