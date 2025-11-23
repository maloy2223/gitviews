import { redis } from "@/database/redis";
import { createStatsKey } from "@/lib/keys";

export async function incrementTotal() {
  const key = createStatsKey("views");
  const total = await redis.incr(key);

  return total;
}
