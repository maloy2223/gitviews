export const prerender = false;

import type { APIRoute } from "astro";

import { generateBadge } from "@/lib/badge";
import { getUserRepoViews } from "@/services/user.service";

export const GET: APIRoute = async ({ params, request }) => {
  const username = params.username!;
  const views = await getUserRepoViews(username);

  const { searchParams } = new URL(request.url);
  const style = searchParams.get("style");
  const labelColor = searchParams.get("label-color");
  const color = searchParams.get("color");

  const badge = generateBadge("Repo Views", String(views.toLocaleString()), {
    style,
    color,
    labelColor,
  });

  return new Response(badge, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};
