import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  console.log(event);
  console.log(context);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };