import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  console.log("################# METHOD", request.method);
  console.log("################# HEADERS", request.headers);
  if (request.method === "POST") {
    const data = await request.json();
    console.log("################# DATA: ", data);
  }
  return new Response("Hello, World!", {
    headers: { "content-type": "text/json" },
  });
};

export const config: Config = {
  path: "/",
};

/*

TODO: we need to add this:

{
  "assetId": "{{assetId}}",
  "categoryId": "{{categoryId}}",
  "timestamp":{{start}},
  "eventName":"{{eventName}}",
  "value":" {{value}}",
  "confidence": {{confidence}}
}

as the body of the request in williot so that we can parse it here

*/
