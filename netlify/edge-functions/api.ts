import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log("################# METHOD", request.method);
  console.log("################# HEADERS", request.headers);
  if (request.method === "POST") {
    /* const json_data = await request.json(); */
    /* console.log("################# JSON_DATA: ", json_data); */
    console.log("################# stringified", JSON.stringify(request.text));
  }
  return new Response("Hello, World!", {
    headers: { "content-type": "text/json" },
  });
};

export const config: Config = {
  path: "/",
};
