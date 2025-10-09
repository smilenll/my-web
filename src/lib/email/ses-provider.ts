import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { EmailProvider, SendEmailParams, EmailResponse } from './email-provider';

// Initialize SES client once
const sesClient = new SESClient({
  region: process.env.SES_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || '',
  },
});

export const sesProvider: EmailProvider = {
  async sendEmail(params: SendEmailParams): Promise<EmailResponse> {
    const { to, from, replyTo, subject, html, text } = params;

    // Format the Source with display name if it's noreply
    const sourceAddress = from.includes('noreply')
      ? `Greensmil <${from}>`
      : from;

    const command = new SendEmailCommand({
      Source: sourceAddress,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: html,
            Charset: 'UTF-8',
          },
          Text: {
            Data: text,
            Charset: 'UTF-8',
          },
        },
      },
      ReplyToAddresses: [replyTo],
    });

    try {
      const response = await sesClient.send(command);
      return {
        success: true,
        messageId: response.MessageId,
      };
    } catch (error) {
      console.error('SES Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  },
};
