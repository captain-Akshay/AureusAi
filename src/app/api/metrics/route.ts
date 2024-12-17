import client from "prom-client";

export async function GET(request: Request) {
  const metrics = await client.register.metrics();
  return new Response(metrics, {
    headers: {
      "Content-Type": client.register.contentType,
    },
  });
}
