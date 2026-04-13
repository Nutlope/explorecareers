import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { NextRequest } from "next/server";

export const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY ?? "",
});

export function getUserId(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent') || '';
  return ip ? `${ip}:${userAgent.slice(0, 50)}` : userAgent || 'anonymous';
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: Add sharability later on
export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export function removePII(input: string): string {
  let cleaned = input;

  // Remove email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  cleaned = cleaned.replace(emailRegex, "[EMAIL_REMOVED]");

  // Remove phone numbers (various formats including international)
  // Matches: +41 78 646 55 77, (123) 456-7890, 123-456-7890, +1 123 456 7890, etc.
  const phoneRegex =
    /\+?\d{1,3}[\s\-\.]?\(?\d{1,4}\)?[\s\-\.]?\d{1,4}[\s\-\.]?\d{1,4}[\s\-\.]?\d{0,4}/g;
  cleaned = cleaned.replace(phoneRegex, "[PHONE_REMOVED]");

  // Remove LinkedIn profile URLs
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+/gi;
  cleaned = cleaned.replace(linkedinRegex, "[LINKEDIN_PROFILE_REMOVED]");

  // Remove personal websites (domains with usernames)
  const websiteRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9\-_]+\.[a-z]{2,}(?:\.[a-z]{2,})?\b/gi;
  cleaned = cleaned.replace(websiteRegex, "[WEBSITE_REMOVED]");

  return cleaned;
}

export function normalizeText(input: string): string {
  // First remove PII
  let normalized = removePII(input);
  // Replace multiple spaces with a single space
  normalized = normalized.replace(/\s+/g, " ");
  // Replace multiple line breaks with a single line break
  normalized = normalized.replace(/\n+/g, "\n");
  // Trim leading/trailing whitespace
  return normalized.trim();
}

export const uploaderOptions = {
  apiKey: !!process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    ? process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    : "free",
  maxFileCount: 1,
  mimeTypes: ["application/pdf"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#000",
    },
  },
  tags: ["career_explorer"],
  locale: {
    orDragDropFile: "Your resume is automatically deleted after 24h",
    uploadFileBtn: "Upload your Resume",
  },
};
