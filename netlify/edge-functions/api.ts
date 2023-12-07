import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log("################# METHOD", request.method);
  console.log("################# REQUEST:", request);
  const body = request.body;
  console.log("################# BODY: ", body);
  if (request.method === "POST") {
    const blob_data = await request.blob();
    console.log("################# JSON_DATA: ", blob_data);
  }
  console.log("################# CONTEXT: ", context);
  return new Response("Hello, World!", {
    headers: { "content-type": "text/json" },
  });
};

export const config: Config = {
  path: "/",
};
