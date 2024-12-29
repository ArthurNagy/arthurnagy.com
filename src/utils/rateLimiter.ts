interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE;

  // Clean up old entries
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < windowStart) {
      delete store[key];
    }
  });

  // Initialize or get existing record
  if (!store[ip]) {
    store[ip] = {
      count: 0,
      resetTime: now + WINDOW_SIZE,
    };
  }

  // Reset if window has expired
  if (store[ip].resetTime < now) {
    store[ip] = {
      count: 0,
      resetTime: now + WINDOW_SIZE,
    };
  }

  // Increment count
  store[ip].count++;

  // Check if over limit
  return store[ip].count <= MAX_REQUESTS;
} 