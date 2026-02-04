import type { N8nRequest, N8nResponse } from '@/types/workflow';

/**
 * n8n Webhook Client
 * Handles communication with n8n workflow via webhook
 */

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';
const AUTH_KEY = process.env.N8N_AUTH_KEY || process.env.NEXT_PUBLIC_N8N_AUTH_KEY || '';

export class N8nClientError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'N8nClientError';
  }
}

/**
 * Sends a message to the n8n AI fitness coach workflow
 */
export async function sendMessage(
  sessionId: string,
  message: string
): Promise<string> {
  if (!WEBHOOK_URL) {
    throw new N8nClientError('N8N_WEBHOOK_URL is not configured');
  }

  if (!AUTH_KEY) {
    throw new N8nClientError('N8N_AUTH_KEY is not configured');
  }

  try {
    // Create form data as n8n expects form-data format
    const formData = new FormData();
    formData.append('sessionId', sessionId);
    formData.append('message', message);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'key': AUTH_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new N8nClientError(
        `n8n webhook returned ${response.status}: ${errorText}`,
        response.status
      );
    }

    const data: any = await response.json();

    console.log('n8n response:', data);

    // n8n returns an array with objects
    const responseData = Array.isArray(data) ? data[0] : data;

    // Try different response formats
    if (responseData.output) {
      return responseData.output;
    }

    if (responseData.message) {
      return responseData.message;
    }

    if (responseData.response) {
      return responseData.response;
    }

    if (typeof responseData === 'string') {
      return responseData;
    }

    // If we get here, log the full response
    console.error('Unexpected n8n response format:', data);
    throw new N8nClientError(`Invalid response from n8n: ${JSON.stringify(data)}`);
  } catch (error) {
    if (error instanceof N8nClientError) {
      throw error;
    }

    throw new N8nClientError(
      'Failed to communicate with n8n workflow',
      undefined,
      error
    );
  }
}

/**
 * Validates webhook configuration
 */
export function validateConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!WEBHOOK_URL) {
    errors.push('N8N_WEBHOOK_URL is not set');
  }

  if (!AUTH_KEY) {
    errors.push('N8N_AUTH_KEY is not set');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
