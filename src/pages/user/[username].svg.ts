export const prerender = false;

import { redis } from "@/database/redis";
import { createStatsKey, createUserViewsKey } from "@/lib/keys";
import type { APIRoute } from "astro";
import { makeBadge } from "badge-maker";

export const GET: APIRoute = async ({ params }) => {
  const username = params.username;
  const key = createUserViewsKey(username);
  const views = await redis.incr(key);
  const badge = makeBadge({ label: "Profile Views", message: String(views) });

  const statsKey = createStatsKey("views");

  await redis.incr(statsKey);

  return new Response(badge, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};
