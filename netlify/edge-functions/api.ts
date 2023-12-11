import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log("################# METHOD", request.method);
  if (request.method === "POST") {
    const data: WilliotSenseEvent = await request.json();
    console.log("################# ACTIVE EVENT", data);
  }
  return new Response("Hello, World!", {
    headers: { "content-type": "text/json" },
  });
};

export const config: Config = {
  path: "/",
};
