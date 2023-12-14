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
      "081D30836EACF3B355EF405A2C772BBE13F348EDF0E4E7F4DA0E2864B1EE5FDB",
  });
  if (request.method === "POST") {
    const data: WilliotSenseEvent = await request.json();
    if (data.eventName === "active" && data.value.trim() === "1") {
      const tx = {
        operations: [
          {
            name: "tag.create_tag_presence_log",
            args: [data.assetId, data.categoryId, ""],
          },
        ],
        signers: [],
      };
      client.addNop(tx);
      const txRes = await client.sendTransaction(tx);
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
