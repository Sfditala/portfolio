/**
 * Rate limiting behind a small interface so the in-memory version can be
 * swapped for Upstash (@upstash/ratelimit) without touching the routes.
 */
export type RateLimitResult = {
  success: boolean;
  remaining: number;
  /** Epoch ms when the window resets. */
  reset: number;
};

export interface RateLimiter {
  limit(key: string): Promise<RateLimitResult>;
}

/**
 * Fixed-window limiter kept in process memory. Good enough for a single
 * serverless instance; counts are not shared across instances or restarts.
 */
export function createMemoryRateLimiter({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}): RateLimiter {
  const hits = new Map<string, { count: number; reset: number }>();

  return {
    async limit(key) {
      const now = Date.now();

      // Drop expired entries so the map can't grow without bound.
      if (hits.size > 5_000) {
        for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
      }

      const entry = hits.get(key);
      if (!entry || entry.reset <= now) {
        const reset = now + windowMs;
        hits.set(key, { count: 1, reset });
        return { success: true, remaining: limit - 1, reset };
      }

      entry.count += 1;
      return {
        success: entry.count <= limit,
        remaining: Math.max(0, limit - entry.count),
        reset: entry.reset,
      };
    },
  };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
