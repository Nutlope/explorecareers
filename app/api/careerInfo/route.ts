import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const groq = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env['GROQ_API_KEY'],
});

interface PDFParseRequest {
  resumeInfo: string;
  context: string;
  role: string;
}

export async function POST(request: NextRequest) {
  const { role, resumeInfo, context } =
    (await request.json()) as PDFParseRequest;

  const prompt = `
  You are helping a person transition into the ${role} role. Given the context about the person, return more information about the ${role} role in JSON as follows: {workedRequired: string, aboutTheRole: string, whyItsagoodfit: array[], roadmap: [{string: string}, ...]

  <example>

  {role: "SEO specialist", workRequired: "10-20 hrs/week", whyItsagoodfit: ["You want to do remote work and this is a good remote job"...], aboutTheRole: "SEO Specialists optimize websites to rank higher in search engine results, aiming to increase online visibility, drive organic traffic, and improve user engagement. They conduct keyword research, analyze competitors, and implement SEO strategies that include on-page optimization, link building, and content creation.", roadmap: [{"Weeks 1-4": "Prepare your resume and start applying for SEO Specialist positions. Leverage your portfolio to showcase your expertise."}, ...]

  </example>

  <context>
  ${resumeInfo}
  ${context}
  </context>

  ONLY respond with JSON, nothing else.
  `;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful career expert that ONLY responds in JSON.',
      },
      { role: 'user', content: prompt },
    ],
    model: 'llama3-70b-8192',
  });

  const careerInfo = chatCompletion.choices[0].message.content;

  const careerInfoJSON = JSON.parse(careerInfo!);

  // for (let career of careerInfoJSON) {
  // }

  return new Response(JSON.stringify(careerInfo), {
    status: 200,
  });
}
