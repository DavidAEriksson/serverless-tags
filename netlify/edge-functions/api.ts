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
      "440BAAD2850394E97FAB9DAF32267086E3EDDCBF0A9C00694FD7D45BF76ADDDB",
  });
  if (request.method === "POST") {
    const data: WilliotSenseEvent = await request.json();
    if (data.eventName === "active" && data.value.trim() === "1") {
      const txRes = await client.sendTransaction({
        name: "tag.create_tag_presence_log",
        args: [data.assetId, data.categoryId, data.timestamp],
      });
      console.log(txRes);
    }
  }
  const bcRes = await client.query(getAllTagLogsQueryObject());
  return new Response(JSON.stringify(bcRes), {
    headers: { "content-type": "text/json" },
  });
};

export const config: Config = {
  path: "/",
};
