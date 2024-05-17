import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { customAlphabet } from 'nanoid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add sharability
export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

export function normalizeText(input: string): string {
  // Replace multiple spaces with a single space
  let normalized = input.replace(/\s+/g, ' ');
  // Replace multiple line breaks with a single line break
  normalized = normalized.replace(/\n+/g, '\n');
  // Trim leading/trailing whitespace
  return normalized.trim();
}

export const uploaderOptions = {
  apiKey: !!process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    ? process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    : 'free',
  maxFileCount: 1,
  mimeTypes: ['application/pdf'],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: '#000',
    },
  },
};
