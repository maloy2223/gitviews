import { redis } from "@/database/redis";
import { createRepoViewsKey } from "@/lib/keys";

export async function incrementRepoViews(username: string, repo: string) {
  const key = createRepoViewsKey(username, repo);
  const views = await redis.incr(key);

  return views;
}
