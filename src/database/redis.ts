import { getSecret } from "astro:env/server";

import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: getSecret("UPSTASH_REDIS_URL"),
  token: getSecret("UPSTASH_REDIS_TOKEN"),
});
