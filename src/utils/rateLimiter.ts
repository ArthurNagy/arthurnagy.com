const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

const requests = new Map<string, number[]>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE;
  
  // Get existing timestamps for this IP
  const timestamps = requests.get(ip) || [];
  
  // Filter out old timestamps
  const validTimestamps = timestamps.filter(time => time > windowStart);
  
  // Check if under limit
  if (validTimestamps.length >= MAX_REQUESTS) {
    return false;
  }
  
  // Add new timestamp
  validTimestamps.push(now);
  requests.set(ip, validTimestamps);
  
  return true;
} 