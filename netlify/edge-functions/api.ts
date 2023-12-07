import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log("################# METHOD", request.method);
  console.log("################# HEADERS", request.headers);
  if (request.method === "POST") {
    const data = await request.text();
    console.log("################# DATA: ", data);
  }
  return new Response("Hello, World!", {
    headers: { "content-type": "text/json" },
  });
};

export const config: Config = {
  path: "/",
};
