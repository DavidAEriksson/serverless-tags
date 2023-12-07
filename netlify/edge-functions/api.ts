import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log(request);
  console.log(context);
  return new Response("Hello, World!", {
    headers: { "content-type": "text/json" }
  });
};

export const config: Config = {
  path: "/",
};
