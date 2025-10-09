/**
 * Security monitoring utilities
 * Logs security events for monitoring and alerting
 */

export enum SecurityEventType {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  AUTH_FAILURE = 'AUTH_FAILURE',
  ADMIN_ACCESS = 'ADMIN_ACCESS',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  RECAPTCHA_FAILURE = 'RECAPTCHA_FAILURE',
}

export interface SecurityEvent {
  type: SecurityEventType;
  timestamp: number;
  ip?: string;
  userAgent?: string;
  userId?: string;
  details?: Record<string, unknown>;
}

class SecurityLogger {
  private events: SecurityEvent[] = [];
  private maxEvents = 1000; // Keep last 1000 events in memory

  /**
   * Log a security event
   */
  log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now(),
    };

    this.events.push(securityEvent);

    // Keep only the most recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('[SECURITY EVENT]', securityEvent);
    } else {
      // In production, log critical events
      if (event.type === SecurityEventType.SUSPICIOUS_ACTIVITY ||
          event.type === SecurityEventType.AUTH_FAILURE) {
        console.error('[SECURITY]', JSON.stringify(securityEvent));
      }
    }
  }

  /**
   * Get recent security events
   */
  getRecentEvents(limit: number = 50): SecurityEvent[] {
    return this.events.slice(-limit);
  }

  /**
   * Get events by type
   */
  getEventsByType(type: SecurityEventType, limit: number = 50): SecurityEvent[] {
    return this.events
      .filter(event => event.type === type)
      .slice(-limit);
  }

  /**
   * Check for suspicious activity patterns
   */
  detectSuspiciousActivity(ip: string, timeWindowMs: number = 5 * 60 * 1000): boolean {
    const now = Date.now();
    const recentEvents = this.events.filter(
      event => 
        event.ip === ip && 
        (now - event.timestamp) < timeWindowMs
    );

    // Flag as suspicious if more than 10 events in 5 minutes
    return recentEvents.length > 10;
  }

  /**
   * Clear old events (older than specified time)
   */
  clearOldEvents(olderThanMs: number): void {
    const cutoff = Date.now() - olderThanMs;
    this.events = this.events.filter(event => event.timestamp > cutoff);
  }
}

// Export singleton instance
export const securityLogger = new SecurityLogger();

/**
 * Helper functions for common security logging
 */
export const logSecurityEvent = {
  rateLimitExceeded: (ip: string, endpoint: string) => {
    securityLogger.log({
      type: SecurityEventType.RATE_LIMIT_EXCEEDED,
      ip,
      details: { endpoint },
    });
  },

  authFailure: (ip: string, reason: string, userId?: string) => {
    securityLogger.log({
      type: SecurityEventType.AUTH_FAILURE,
      ip,
      userId,
      details: { reason },
    });
  },

  adminAccess: (ip: string, userId: string, action: string) => {
    securityLogger.log({
      type: SecurityEventType.ADMIN_ACCESS,
      ip,
      userId,
      details: { action },
    });
  },

  recaptchaFailure: (ip: string, score?: number, errorCodes?: string[]) => {
    securityLogger.log({
      type: SecurityEventType.RECAPTCHA_FAILURE,
      ip,
      details: { score, errorCodes },
    });
  },

  suspiciousActivity: (ip: string, activity: string, details?: Record<string, unknown>) => {
    securityLogger.log({
      type: SecurityEventType.SUSPICIOUS_ACTIVITY,
      ip,
      details: { activity, ...details },
    });
  },
};
