'use server';

import { requireRole } from '@/lib/auth-server';
import { securityLogger } from '@/lib/security-monitor';
import { SecurityEventType } from '@/lib/security-monitor';

export interface SecurityDashboardData {
  recentEvents: unknown[];
  rateLimitEvents: unknown[];
  authFailures: unknown[];
  recaptchaFailures: unknown[];
  suspiciousActivity: unknown[];
}

export async function getSecurityDashboardData(): Promise<SecurityDashboardData> {
  // Require admin role to access security data
  await requireRole('admin');

  const recentEvents = securityLogger.getRecentEvents(100);
  const rateLimitEvents = securityLogger.getEventsByType(SecurityEventType.RATE_LIMIT_EXCEEDED, 50);
  const authFailures = securityLogger.getEventsByType(SecurityEventType.AUTH_FAILURE, 50);
  const recaptchaFailures = securityLogger.getEventsByType(SecurityEventType.RECAPTCHA_FAILURE, 50);
  const suspiciousActivity = securityLogger.getEventsByType(SecurityEventType.SUSPICIOUS_ACTIVITY, 50);

  return {
    recentEvents,
    rateLimitEvents,
    authFailures,
    recaptchaFailures,
    suspiciousActivity,
  };
}

export async function clearOldSecurityEvents(): Promise<void> {
  // Require admin role to clear security data
  await requireRole('admin');

  // Clear events older than 7 days
  securityLogger.clearOldEvents(7 * 24 * 60 * 60 * 1000);
}
