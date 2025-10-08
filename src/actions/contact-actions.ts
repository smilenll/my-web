'use server';

import { sesProvider } from '@/lib/email/ses-provider';
import {
  generateContactEmailHtml,
  generateContactEmailText,
  generateCustomerConfirmationHtml,
  generateCustomerConfirmationText
} from '@/lib/email/email-templates';
import type { ContactFormData } from '@/lib/email/email-provider';

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate environment variables
    if (!process.env.AWS_SES_FROM_EMAIL) {
      throw new Error('AWS_SES_FROM_EMAIL environment variable is not set');
    }

    if (!process.env.AWS_SES_TO_EMAIL) {
      throw new Error('AWS_SES_TO_EMAIL environment variable is not set');
    }

    // Send notification email to admin (web@greensmil.com)
    const adminHtml = generateContactEmailHtml(data);
    const adminText = generateContactEmailText(data);

    const adminResult = await sesProvider.sendEmail({
      to: process.env.AWS_SES_TO_EMAIL, // web@greensmil.com
      from: process.env.AWS_SES_FROM_EMAIL, // noreply@greensmil.com
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
      from: process.env.AWS_SES_FROM_EMAIL, // noreply@greensmil.com
      replyTo: process.env.AWS_SES_TO_EMAIL, // web@greensmil.com (so customer can reply)
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
      message: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
    };
  }
}
