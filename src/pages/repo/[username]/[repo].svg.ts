export const prerender = false;

import type { APIRoute } from "astro";

import { generateBadge } from "@/lib/badge";
import { incrementRepoViews } from "@/services/repo.service";
import { incrementUserRepoViews } from "@/services/user.service";
import { incrementTotal } from "@/services/stats.service";

export const GET: APIRoute = async ({ params, request }) => {
  const username = params.username;
  const repo = params.repo;
  const views = await incrementRepoViews(username, repo);

  const { searchParams } = new URL(request.url);
  const style = searchParams.get("style");
  const labelColor = searchParams.get("label-color");
  const color = searchParams.get("color");

  const badge = generateBadge("Repo Views", String(views), {
    style,
    color,
    labelColor,
  });

  await Promise.all([incrementUserRepoViews(username), incrementTotal()]);

  return new Response(badge, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};
