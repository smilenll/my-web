'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Script from 'next/script';
import { Button } from '@/components/ui';
import { sendContactEmail } from '@/actions/contact-actions';
import type { ContactFormData } from '@/lib/email/email-provider';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function ContactForm() {
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
  } = useForm<ContactFormData>({
    mode: 'onTouched', // Validate when field is touched and loses focus
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitMessage(null);

    // Execute reCAPTCHA v3
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && recaptchaLoaded) {
      try {
        // Use grecaptcha.ready() to ensure the script is fully loaded
        await new Promise<void>((resolve) => {
          window.grecaptcha.ready(() => {
            resolve();
          });
        });

        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: 'submit_contact_form' }
        );

        // Call Server Action with captcha token
        const result = await sendContactEmail({ ...data, captchaToken: token });

        if (result.success) {
          setSubmitMessage({ type: 'success', text: result.message });
          reset();
        } else {
          setSubmitMessage({ type: 'error', text: result.message });
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        setSubmitMessage({ type: 'error', text: 'reCAPTCHA verification failed. Please try again.' });
      }
    } else if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      // No reCAPTCHA configured, send without it
      const result = await sendContactEmail(data);

      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message });
        reset();
      } else {
        setSubmitMessage({ type: 'error', text: result.message });
      }
    } else {
      // reCAPTCHA not loaded yet
      setSubmitMessage({ type: 'error', text: 'Please wait for reCAPTCHA to load and try again.' });
    }
  };

  return (
    <>
      {/* Load reCAPTCHA v3 script */}
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onReady={() => {
            setRecaptchaLoaded(true);
          }}
          onError={(e) => {
            console.error('Failed to load reCAPTCHA script:', e);
          }}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-2xl font-semibold">Send me a message</h3>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
            maxLength: {
              value: 50,
              message: 'Name must not exceed 50 characters',
            },
            pattern: {
              value: /^[a-zA-Z\s'-]+$/,
              message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
            },
          })}
          className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject', {
            required: 'Subject is required',
            minLength: {
              value: 3,
              message: 'Subject must be at least 3 characters',
            },
            maxLength: {
              value: 100,
              message: 'Subject must not exceed 100 characters',
            },
          })}
          className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Project Inquiry"
        />
        {errors.subject && (
          <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters',
            },
            maxLength: {
              value: 1000,
              message: 'Message must not exceed 1000 characters',
            },
          })}
          className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tell me about your project..."
        />
        {errors.message && (
          <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Success/Error Message */}
      {submitMessage && (
        <div
          className={`p-4 rounded-md ${
            submitMessage.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {/* reCAPTCHA v3 badge notice */}
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <p className="text-xs text-muted-foreground text-center">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
            Terms of Service
          </a>{' '}
          apply.
        </p>
      )}
    </form>
    </>
  );
}
