'use server';

import { sesProvider } from '@/lib/email/ses-provider';
import {
  generateContactEmailHtml,
  generateContactEmailText,
  generateCustomerConfirmationHtml,
  generateCustomerConfirmationText
} from '@/lib/email/email-templates';
import type { ContactFormData } from '@/lib/email/email-provider';

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set');
    return { success: false };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // reCAPTCHA v3 returns a score between 0.0 (bot) and 1.0 (human)
    // Recommended threshold is 0.5
    const SCORE_THRESHOLD = 0.5;

    if (data.success && data.score !== undefined) {
      const isHuman = data.score >= SCORE_THRESHOLD;

      if (!isHuman) {
        console.warn(`reCAPTCHA score too low: ${data.score} (threshold: ${SCORE_THRESHOLD})`);
      }

      return { success: isHuman, score: data.score };
    }

    return { success: data.success === true };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false };
  }
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Verify reCAPTCHA token
    if (data.captchaToken) {
      const captchaResult = await verifyRecaptcha(data.captchaToken);

      if (!captchaResult.success) {
        return {
          success: false,
          message: 'reCAPTCHA verification failed. You may be flagged as a bot. Please try again or contact us directly.',
        };
      }

      console.log(`reCAPTCHA verified successfully. Score: ${captchaResult.score}`);
    } else if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      // If reCAPTCHA is configured but no token provided
      return {
        success: false,
        message: 'Please complete the CAPTCHA verification.',
      };
    }

    // Validate environment variables
    if (!process.env.SES_FROM_EMAIL || !process.env.SES_TO_EMAIL) {
      console.error('Email configuration error: Missing SES environment variables');
      return {
        success: false,
        message: 'Something went wrong. Please try again later.',
      };
    }

    // Send notification email to admin (web@greensmil.com)
    const adminHtml = generateContactEmailHtml(data);
    const adminText = generateContactEmailText(data);

    const adminResult = await sesProvider.sendEmail({
      to: process.env.SES_TO_EMAIL, // web@greensmil.com
      from: process.env.SES_FROM_EMAIL, // noreply@greensmil.com
      replyTo: data.email, // Customer's email
      subject: `[Contact Form] ${data.subject}`,
      html: adminHtml,
      text: adminText,
    });

    if (!adminResult.success) {
      console.error('Failed to send admin notification:', adminResult.error);
      throw new Error(adminResult.error || 'Failed to send notification email');
    }

    // Send confirmation email to customer
    const customerHtml = generateCustomerConfirmationHtml(data);
    const customerText = generateCustomerConfirmationText(data);

    const customerResult = await sesProvider.sendEmail({
      to: data.email, // Customer's email
      from: process.env.SES_FROM_EMAIL, // noreply@greensmil.com
      replyTo: process.env.SES_TO_EMAIL, // web@greensmil.com (so customer can reply)
      subject: 'Thank you for contacting Greensmil',
      html: customerHtml,
      text: customerText,
    });

    // Don't fail the entire operation if customer confirmation fails
    // But log it for monitoring
    if (!customerResult.success) {
      console.error('Failed to send customer confirmation:', customerResult.error);
      // Still return success since the main notification was sent
      return {
        success: true,
        message: 'Your message has been sent successfully! (Note: Confirmation email may be delayed)',
      };
    }

    return {
      success: true,
      message: 'Your message has been sent successfully!',
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    };
  }
}
