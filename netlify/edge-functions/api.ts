import type { Config, Context } from "@netlify/edge-functions";
import { createClient, QueryObject } from "postchain-client";

type GetAllTagLogsReturnType = {
  timestamp: number;
  asset_name: string;
  category: string;
  tag_id: string;
};

export function getAllTagLogsQueryObject(): QueryObject<
  GetAllTagLogsReturnType[]
> {
  return { name: "tag.get_all_tag_logs", args: undefined };
}

export default async (request: Request, context: Context) => {
  const client = await createClient({
    nodeUrlPool: "https://node0.devnet1.chromia.dev:7740",
    blockchainRid:
      "273DC754C1259C8ECF2B146969AB37372172D4F1FC3D763DE94DA0FF50591412",
  });
  if (request.method === "POST") {
    const data: WilliotSenseEvent = await request.json();
    console.log("WilliotSenseEvent: ", data);
    await client.sendTransaction({
      name: "tag.create_log_dump",
      args: [
        data.assetId,
        data.categoryId,
        data.timestamp,
        data.eventName,
        data.value,
        data.confidence,
      ],
    });
    if (data.eventName === "active" && data.value.trim() === "1") {
      const txRes = await client.sendTransaction({
        name: "tag.create_tag_presence_log",
        args: [data.assetId, data.categoryId, data.timestamp],
      });
      console.log(txRes);
    }
  }
  return new Response("Only POST here please :)", {
    headers: { "content-type": "text/json" },
  });
};

export const config: Config = {
  path: "/",
};
