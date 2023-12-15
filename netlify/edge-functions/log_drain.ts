import type { Config, Context } from "@netlify/edge-functions";
import { createClient, QueryObject } from "postchain-client";

export type GetAllLogDumpsReturnType = {
  asset_id: string;
  category_id: string;
  time: number;
  event_name: string;
  value: string;
  confidence: number;
};
export function getAllLogDumpsQueryObject(): QueryObject<
  GetAllLogDumpsReturnType[]
> {
  return { name: "tag.get_all_log_dumps", args: undefined };
}

export default async (request: Request, context: Context) => {
  const client = await createClient({
    nodeUrlPool: "https://node0.devnet1.chromia.dev:7740",
    blockchainRid:
      "273DC754C1259C8ECF2B146969AB37372172D4F1FC3D763DE94DA0FF50591412",
  });
  const bcRes = await client.query(getAllLogDumpsQueryObject());
  const formattedRes = bcRes.map((item) => ({
    ...item,
    time: new Date(item.time).toLocaleString(),
  }));

  return new Response(JSON.stringify(formattedRes), {
    headers: {
      "content-type": "text/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

export const config: Config = {
  path: "/log-drain",
  method: "GET",
};
