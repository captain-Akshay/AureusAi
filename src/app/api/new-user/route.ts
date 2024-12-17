import { requestCounter } from "@/utils/requestCounter";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  requestCounter.inc({
    method: "GET",
    route: "/api/new-user",
    status_code: 200,
  });

  return Response.json({ message: "New user visited" });
};
