import { normalizeText, getUserId } from '@/lib/utils';
import { parsingRatelimit } from '@/lib/ratelimit';
import { NextRequest } from 'next/server';
import { PDFParse } from 'pdf-parse';

interface PDFParseRequest {
  resumeUrl: string;
}

export async function POST(request: NextRequest) {
  const { resumeUrl } = (await request.json()) as PDFParseRequest;

  const userId = getUserId(request);
  const { success, limit, remaining, reset } = await parsingRatelimit.limit(userId);

  if (!success) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        limit,
        remaining,
        reset: new Date(reset).toISOString(),
      }),
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
        },
      }
    );
  }

  const response = await fetch(resumeUrl);
  const arrayBuffer = await response.arrayBuffer();
  const parser = new PDFParse({ data: Buffer.from(arrayBuffer) });
  const result = await parser.getText();
  await parser.destroy();
  const normalizedText = normalizeText(result.text);

  return new Response(JSON.stringify(normalizedText), {
    status: 200,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': new Date(reset).toISOString(),
    },
  });
}
