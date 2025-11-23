export const prerender = false;

import { redis } from "@/database/redis";
import {
  createRepoViewsKey,
  createStatsKey,
  createUserRepoViewsKey,
} from "@/lib/keys";
import type { APIRoute } from "astro";
import { makeBadge } from "badge-maker";

export const GET: APIRoute = async ({ params }) => {
  const username = params.username;
  const repo = params.repo;
  const key = createRepoViewsKey(username, repo);
  const views = await redis.incr(key);
  const badge = makeBadge({ label: "Repo Views", message: String(views) });

  const statsKey = createStatsKey("views");
  const allReposKey = createUserRepoViewsKey(username);

  await Promise.all([redis.incr(statsKey), redis.incr(allReposKey)]);

  return new Response(badge, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};
