import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log("################# REQUEST:", request);
  const body = request.body;
  console.log("################# BODY: ", body);
  console.log("################# CONTEXT: ", context);
  return new Response("Hello, World!", {
    headers: { "content-type": "text/json" },
  });
};

export const config: Config = {
  path: "/",
};
