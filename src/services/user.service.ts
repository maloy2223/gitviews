import { redis } from "@/database/redis";
import { createUserRepoViewsKey, createUserViewsKey } from "@/lib/keys";

export async function incrementUserViews(username: string) {
  const key = createUserViewsKey(username);
  const views = await redis.incr(key);

  return views;
}

export async function getUserRepoViews(username: string) {
  const key = createUserRepoViewsKey(username);
  const views = await redis.get<number>(key);

  return views ?? 0;
}

export async function incrementUserRepoViews(username: string) {
  const key = createUserRepoViewsKey(username);
  const views = await redis.incr(key);

  return views;
}
