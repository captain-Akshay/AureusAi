import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return Response.json({
      error: "You are not authenticated",
      status: 401,
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  return Response.json(user);
};
