const prefix = "gitviews";

function normalize(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_-]/g, "-");
}

export function createUserViewsKey(username: string) {
  const u = normalize(username);

  return `${prefix}:user:${u}:views`;
}

export function createUserRepoViewsKey(username: string) {
  const u = normalize(username);

  return `${prefix}:user:${u}:repo_views`;
}

export function createRepoViewsKey(username: string, repo: string) {
  const u = normalize(username);
  const r = normalize(repo);

  return `${prefix}:repo:${u}:${r}:views`;
}

export function createStatsKey(type: "views") {
  const key = `${prefix}:stats:${type}:total`;

  return key;
}
