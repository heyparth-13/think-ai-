interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Limit: 20 requests per minute per IP
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;

export function checkRateLimit(ip: string): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return { success: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0, reset: entry.resetTime };
  }

  entry.count += 1;
  return { success: true, remaining: MAX_REQUESTS - entry.count, reset: entry.resetTime };
}
