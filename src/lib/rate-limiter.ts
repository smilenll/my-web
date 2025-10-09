/**
 * Simple in-memory rate limiter
 * In production, consider using Redis or a database-backed solution
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(
    private windowMs: number = 15 * 60 * 1000, // 15 minutes
    private maxRequests: number = 5, // 5 requests per window
    private cleanupIntervalMs: number = 60 * 1000 // Cleanup every minute
  ) {
    // Only start cleanup in Node.js environment (not during build)
    if (typeof window === 'undefined') {
      this.cleanupInterval = setInterval(() => {
        this.cleanup();
      }, this.cleanupIntervalMs);
    }
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier (IP, user ID, etc.)
   * @returns true if request should be allowed, false if rate limited
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry) {
      // First request
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (now > entry.resetTime) {
      // Window expired, reset
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      // Rate limited
      return false;
    }

    // Increment count
    entry.count++;
    return true;
  }

  /**
   * Get remaining requests for an identifier
   */
  getRemainingRequests(identifier: string): number {
    const entry = this.store.get(identifier);
    if (!entry) return this.maxRequests;

    const now = Date.now();
    if (now > entry.resetTime) return this.maxRequests;

    return Math.max(0, this.maxRequests - entry.count);
  }

  /**
   * Get reset time for an identifier
   */
  getResetTime(identifier: string): number {
    const entry = this.store.get(identifier);
    if (!entry) return Date.now() + this.windowMs;

    return entry.resetTime;
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Destroy the rate limiter and cleanup
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.store.clear();
  }
}

// Export singleton instances for different use cases
export const contactFormRateLimiter = new RateLimiter(
  15 * 60 * 1000, // 15 minutes
  3, // 3 contact form submissions per 15 minutes
  60 * 1000 // Cleanup every minute
);

export const authRateLimiter = new RateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 auth attempts per 15 minutes
  60 * 1000 // Cleanup every minute
);

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
  // Try various headers that might contain the real IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(',')[0].trim();
  
  // Fallback to a default identifier
  return 'unknown';
}
