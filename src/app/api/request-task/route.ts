import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Queue } from "bullmq";
import { NextRequest } from "next/server";
export const config = {
  api: {
    bodyParser: false, // Required for formidable to handle file uploads
  },
};

const s3 = new S3Client({
  endpoint: process.env.AWS_S3_ENDPOINT,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const myQueue = new Queue("aureus_tasks", {
  connection: {
    host: process.env.UPSTASH_URL,
    port: 6379,
    password: process.env.UPSTASH_TOKEN,
    tls: {},
  },
});
// Function to upload to S3
const uploadToS3 = async (bucketPath, fileStream) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: bucketPath,
    Body: fileStream,
  };

  await s3.send(new PutObjectCommand(params));
};

const createTask = async (username: string, taskId: string) => {
  await prisma.task.create({
    data: {
      id: taskId,
      userId: username,
      status: "processing",
    },
  });
};
const checkCurrency = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });
  if (user.currency <= 0) {
    return false;
  }
  await prisma.user.update({
    where: {
      email: username,
    },
    data: {
      currency: user.currency - 1,
    },
  });
  return true;
};
// API Route Handler
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return Response.json({
      error: "You are not authenticated",
      status: 401,
    });
  }
  if (!checkCurrency(session.user.email)) {
    return Response.json({
      error: "You don't have enough currency",
      status: 401,
    });
  }
  const formData = await req.formData();
  const username = session.user.email;
  const video1 = formData.get("video1") as Blob;
  const video2 = formData.get("video2") as Blob;
  const txt = formData.get("txt");
  if (!username || !video1 || !video2) {
    return Response.json({
      error: "Missing required fields",
      status: 400,
    });
  }

  const taskId = Date.now();
  const basePath = `${username}/tasks/${taskId}/`;
  try {
    // Upload videos
    await uploadToS3(
      `${basePath}video1.mp4`,
      Buffer.from(await video1.arrayBuffer())
    );
    await uploadToS3(
      `${basePath}video2.mp4`,
      Buffer.from(await video2.arrayBuffer())
    );

    // Upload optional text document if provided
    if (txt) {
      await uploadToS3(`${basePath}details.txt`, txt);
    }

    // Create and upload JSON file
    const methodJson = {
      method: formData.get("method"),
    };
    const jsonContent = JSON.stringify(methodJson);

    await uploadToS3(`${basePath}method.json`, jsonContent);
    await myQueue.add("task", { data: basePath });
    await createTask(username as string, taskId.toString());
    return Response.json({ task_id: taskId });
  } catch (uploadError) {
    console.error("Error uploading to S3:", uploadError);
    return Response.json({
      error: "Failed to upload files to S3",
      status: 500,
    });
  }
}
