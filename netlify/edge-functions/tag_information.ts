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
  const bcRes = await client.query(getAllTagLogsQueryObject());
  return new Response(JSON.stringify(bcRes), {
    headers: {
      "content-type": "text/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

export const config: Config = {
  path: "/tag-data",
  method: "GET",
};
