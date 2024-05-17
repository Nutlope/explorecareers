import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const together = new OpenAI({
  baseURL: 'https://together.hconeai.com/v1',
  apiKey: process.env.TOGETHER_API_KEY,
  defaultHeaders: {
    'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

interface GetCareersRequest {
  resumeInfo: string;
  context: string;
}

export async function POST(request: NextRequest) {
  const { resumeInfo, context } = (await request.json()) as GetCareersRequest;

  const chatCompletion = await together.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful career expert that ONLY responds in JSON.',
      },
      {
        role: 'user',
        content: `Give me 6 career paths that the following user could transition into based on their resume and any additional context. Respond like this in JSON: {jobTitle: string, jobDescription: string, timeline: string, salary: string, difficulty: string}.

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

      <additionalContext>
      ${context}
      </additionalContext>

    ONLY respond with JSON, nothing else.
      `,
      },
    ],
    model: 'meta-llama/Llama-3-70b-chat-hf',
  });
  const careers = chatCompletion.choices[0].message.content;

  const careerInfoJSON = JSON.parse(careers!);

  let finalResults = await Promise.all(
    careerInfoJSON.map(async (career: any) => {
      try {
        const completion = await together.chat.completions.create({
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful career expert that ONLY responds in JSON.',
            },
            {
              role: 'user',
              content: `You are helping a person transition into the ${career.jobTitle} role in ${career.timeline}. Given the context about the person, return more information about the ${career.jobTitle} role in JSON as follows: {workRequired: string, aboutTheRole: string, whyItsagoodfit: array[], roadmap: [{string: string}, ...]

          <example>
          {"role": "DevOps Engineer",
          "workRequired": "20-30 hrs/week",
          "whyItsagoodfit": [
            "Leverages your extensive experience in software engineering and developer advocacy.",
            "Utilizes your skills in Python, JavaScript, Node.js, React, and cloud services like AWS.",
            "Aligns with your experience in building and maintaining large-scale applications and infrastructure.",
            "Allows you to continue working with cutting-edge technologies and practices."
          ],
          "aboutTheRole": "As a DevOps Engineer, you will work closely with development, operations, and QA teams to streamline the software development lifecycle. Your responsibilities will include automating infrastructure provisioning, monitoring system performance, and ensuring security and compliance. The goal is to enhance the efficiency, reliability, and scalability of software deployments.",
          "roadmap": [
            {"Weeks 1-2": "Learn the basics of DevOps tools and practices, including Docker and Kubernetes. Start with online courses or tutorials to build foundational knowledge."},
            {"Weeks 3-4": "Set up a local development environment with Docker and Kubernetes. Practice creating and managing containers and clusters."},
            {"Weeks 5-6": "Explore continuous integration and continuous delivery (CI/CD) concepts. Implement a simple CI/CD pipeline using tools like Jenkins or GitLab CI."},
            {"Weeks 7-8": "Familiarize yourself with configuration management tools like Ansible or Terraform. Practice writing scripts to automate infrastructure provisioning."},
            {"Weeks 9-10": "Obtain a relevant certification such as AWS Certified DevOps Engineer or Google Cloud Professional DevOps Engineer to validate your skills."},
            {"Weeks 11-12": "Set up monitoring and logging solutions using tools like Prometheus, Grafana, and ELK stack. Learn to monitor system performance and troubleshoot issues."},
            {"Weeks 13-14": "Optimize your CI/CD pipelines for efficiency, scalability, and reliability. Implement advanced deployment strategies such as blue-green deployments or canary releases."},
            {"Weeks 15-16": "Collaborate with development and operations teams on real projects to apply your skills in a practical setting. Seek feedback and continuously improve your processes."}
          ]}
          </example>

          <context>
          ${resumeInfo}
          ${context}
          </context>

          ONLY respond with JSON, nothing else.`,
            },
          ],
          model: 'meta-llama/Llama-3-70b-chat-hf',
        });
        const specificCareer = completion.choices[0].message.content;
        const specificCareerJSON = JSON.parse(specificCareer!);

        const individualCareerInfo = { ...career, ...specificCareerJSON };
        return individualCareerInfo;
      } catch (error) {
        console.log('Career that errored: ', career.jobTitle);
        console.log({ error });
        return new Response(JSON.stringify({ error }), {
          status: 500,
        });
      }
    })
  );

  return new Response(JSON.stringify(finalResults), {
    status: 200,
  });
}
