import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { activeRequestsGauge } from "@/utils/requestGauge";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { TaskType } from "@prisma/client";
import { Queue } from "bullmq";
import { NextRequest } from "next/server";
export const config = {
  api: {
    bodyParser: false, // Required for formidable to handle file uploads
  },
};
type SupportedMethod = {
  split_screen_video: string;
  one_split_screen_video: string;
  generate_audio: string;
  full_functional: string;
  audio_based: string;
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

const createTask = async (
  projectName: string,
  username: string,
  taskId: string,
  taskType: TaskType
) => {
  await prisma.task.create({
    data: {
      id: taskId,
      name: projectName,
      userId: username,
      status: "processing",
      type: taskType,
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

const handleSplitScreenVideo = async (
  projectName: string,
  username: string,
  video1: Blob,
  video2: Blob,
  method: string
) => {
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
    const methodJson = {
      method,
    };

    const jsonContent = JSON.stringify(methodJson);

    await uploadToS3(`${basePath}method.json`, jsonContent);
    await myQueue.add("task", { data: basePath });
    await createTask(
      projectName,
      username as string,
      taskId.toString(),
      "video"
    );
    return Response.json({ task_id: taskId });
  } catch (uploadError) {
    console.error("Error uploading to S3:", uploadError);
    return Response.json({
      error: "Failed to upload files to S3",
      status: 500,
    });
  }
};
const handleOneSplitScreenVideo = async (
  projectName: string,
  username: string,
  video1: Blob,
  gameplay: string,
  method: string
) => {
  if (!username || !video1 || !gameplay) {
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
    const methodJson = {
      method,
      gameplay,
    };

    const jsonContent = JSON.stringify(methodJson);

    await uploadToS3(`${basePath}method.json`, jsonContent);
    await myQueue.add("task", { data: basePath });
    await createTask(
      projectName,
      username as string,
      taskId.toString(),
      "video"
    );
    return Response.json({ task_id: taskId });
  } catch (uploadError) {
    console.error("Error uploading to S3:", uploadError);
    return Response.json({
      error: "Failed to upload files to S3",
      status: 500,
    });
  }
};
const handleAudioGeneration = async (
  projectName: string,
  username: string,
  speaker: string,
  method: string,
  script: string
) => {
  if (!username || !speaker || !script) {
    return Response.json({
      error: "Missing required fields",
      status: 400,
    });
  }
  const taskId = Date.now();
  const basePath = `${username}/tasks/${taskId}/`;
  try {
    const methodJson = {
      method,
      speaker,
      script,
    };

    const jsonContent = JSON.stringify(methodJson);

    await uploadToS3(`${basePath}method.json`, jsonContent);
    await myQueue.add("task", { data: basePath });
    await createTask(
      projectName,
      username as string,
      taskId.toString(),
      "audio"
    );
    return Response.json({ task_id: taskId });
  } catch (uploadError) {
    console.error("Error uploading to S3:", uploadError);
    return Response.json({
      error: "Failed to upload files to S3",
      status: 500,
    });
  }
};
const handleFullFunctional = async (
  projectName: string,
  username: string,
  speaker: string,
  gameplay: string,
  method: string,
  script: string
) => {
  if (!username || !script || !speaker || !gameplay) {
    return Response.json({
      error: "Missing required fields",
      status: 400,
    });
  }
  const taskId = Date.now();
  const basePath = `${username}/tasks/${taskId}/`;
  try {
    const methodJson = {
      method,
      gameplay,
      speaker,
      script,
    };

    const jsonContent = JSON.stringify(methodJson);

    await uploadToS3(`${basePath}method.json`, jsonContent);
    await myQueue.add("task", { data: basePath });
    await createTask(
      projectName,
      username as string,
      taskId.toString(),
      "video"
    );
    return Response.json({ task_id: taskId });
  } catch (uploadError) {
    console.error("Error uploading to S3:", uploadError);
    return Response.json({
      error: "Failed to upload files to S3",
      status: 500,
    });
  }
};
const handleAudioBased = async (
  projectName: string,
  username: string,
  voice: Blob,
  method: string,
  script: string
) => {
  if (!username || !voice || !script) {
    return Response.json({
      error: "Missing required fields",
      status: 400,
    });
  }
  const taskId = Date.now();
  const basePath = `${username}/tasks/${taskId}/`;
  try {
    const methodJson = {
      method,
      script,
    };

    const jsonContent = JSON.stringify(methodJson);

    await uploadToS3(`${basePath}method.json`, jsonContent);
    await uploadToS3(
      `${basePath}voice.wav`,
      Buffer.from(await voice.arrayBuffer())
    );
    await myQueue.add("task", { data: basePath });
    await createTask(
      projectName as string,
      username as string,
      taskId.toString(),
      "audio"
    );
    return Response.json({ task_id: taskId });
  } catch (uploadError) {
    console.error("Error uploading to S3:", uploadError);
    return Response.json({
      error: "Failed to upload files to S3",
      status: 500,
    });
  }
};
export async function POST(req: NextRequest) {
  activeRequestsGauge.inc();
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
  const projectName = formData.get("project_name") as string;
  const video1 = formData.get("video1") as Blob;
  const video2 = formData.get("video2") as Blob;
  const gameplay = formData.get("gameplay") as string;
  const script = formData.get("script") as string;
  const speaker = formData.get("speaker") as string;
  const method = formData.get("method") as string;
  const voice = formData.get("voice") as Blob;

  let response;
  switch (method) {
    case "split_screen_video":
      response = await handleSplitScreenVideo(
        projectName,
        username,
        video1,
        video2,
        method
      );
      break;
    case "one_split_screen_video":
      response = await handleOneSplitScreenVideo(
        projectName,
        username,
        video1,
        gameplay,
        method
      );
      break;
    case "generate_audio":
      response = await handleAudioGeneration(
        projectName,
        username,
        speaker,
        method,
        script
      );
      break;
    case "full_functional":
      response = await handleFullFunctional(
        projectName,
        username,
        speaker,
        gameplay,
        method,
        script
      );
      break;
    case "audio_based":
      response = await handleAudioBased(
        projectName,
        username,
        voice,
        method,
        script
      );
    default:
      activeRequestsGauge.dec();
      return Response.json({
        error: "Invalid method",
        status: 400,
      });
  }
  activeRequestsGauge.dec();
  return Response.json({
    message: response.message,
    status: 200,
  });
}
