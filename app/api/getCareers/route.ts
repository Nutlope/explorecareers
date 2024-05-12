import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const groq = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env['GROQ_API_KEY'],
});

interface PDFParseRequest {
  resumeInfo: string;
}

export async function POST(request: NextRequest) {
  const { resumeInfo } = (await request.json()) as PDFParseRequest;

  const prompt = `
  Give me 6 career paths that the following user could transition into based on their resume. Respond like this in JSON: {jobTitle: string, jobDescription: string, timeline: string, salary: string, difficulty: string}.

  <example>
  [
    {
    "jobTitle": "UX Designer",
    "jobDescription": "Creates user-centered design solutions to improve product usability and user experience.",
    "timeline": "3-6 months",
    "salary": "$85k - $110k",
    "difficulty": "Medium"
    },
    {
    "jobTitle": "Digital Marketing Specialist",
    "jobDescription": "Develops and implements online marketing campaigns to drive business growth.",
    "timeline": "2-4 months",
    "salary": "$50k - $70k",
    "difficulty": "Low"
    },
    {
    "jobTitle": "Software Engineer",
    "jobDescription": "Designs, develops, and tests software applications to meet business needs.",
    "timeline": "6-12 months",
    "salary": "$100k - $140k",
    "difficulty": "High"
    },
    {
    "jobTitle": "Business Analyst",
    "jobDescription": "Analyzes business needs and develops solutions to improve operations and processes.",
    "timeline": "3-6 months",
    "salary": "$65k - $90k",
    "difficulty": "Medium"
    },
    {
    "jobTitle": "Cybersecurity Specialist",
    "jobDescription": "Protects computer systems and networks from cyber threats by developing and implementing security protocols.",
    "timeline": "6-12 months",
    "salary": "$80k - $120k",
    "difficulty": "High"
    }
    ]
  </example>

  <resume>
  ${resumeInfo}
  </resume>

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

  const careers = chatCompletion.choices[0].message.content;

  console.log({ careers });

  return new Response(JSON.stringify(careers), {
    status: 200,
  });
}
