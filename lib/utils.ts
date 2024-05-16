import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { customAlphabet } from 'nanoid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

const hardcodedCareerInfo: finalCareerInfo[] = [
  {
    jobTitle: 'Market Research Analyst',
    jobDescription:
      'Analyzes data to identify market trends and opportunities to inform business decisions.',
    timeline: '2-4 months',
    salary: '$55k - $75k',
    difficulty: 'Low',
    workedRequired: '20-30 hrs/week',
    aboutTheRole:
      'Market Research Analysts gather and analyze data to help businesses understand their target audience, competitors, and market trends. They design and implement research studies, collect and analyze data, and present findings to stakeholders to inform business decisions.',
    whyItsagoodfit: [
      'You have a strong background in marketing and international business, which is a great foundation for a market research role.',
      "You're detail-oriented and organized, which is essential for collecting and analyzing data.",
      "You're fluent in Spanish, which can be an asset in a market research role, especially in the financial services industry.",
      "You've expressed interest in working remotely, and many market research analyst positions can be done remotely.",
    ],
    roadmap: [
      {
        'Weeks 1-4':
          'Update your resume to highlight your analytical and research skills, and start applying for Market Research Analyst positions.',
      },
      {
        'Weeks 5-8':
          'Take online courses or attend webinars to learn more about market research tools and methodologies, such as survey design and data analysis.',
      },
      {
        'Weeks 9-12':
          'Network with professionals in the market research industry, and consider joining professional organizations like the Insights Association.',
      },
      {
        'After 3 months':
          'Land an entry-level Market Research Analyst position, and continue to develop your skills and knowledge in the field.',
      },
    ],
  },
  {
    jobTitle: 'Digital Content Creator',
    jobDescription:
      'Develops and publishes engaging online content to drive brand awareness and customer engagement.',
    timeline: '1-3 months',
    salary: '$40k - $60k',
    difficulty: 'Low',
    workRequired: '20-30 hrs/week',
    aboutTheRole:
      'Market Research Analysts gather and analyze data to help businesses understand their target audience, competitors, and market trends. They design and implement research studies, collect and analyze data, and present findings to stakeholders to inform business decisions.',
    whyItsagoodfit: [
      'You have a strong background in marketing and international business, which is a great foundation for a market research role.',
      'You have excellent communication skills, which are essential for presenting research findings to stakeholders.',
      'You are detail-oriented and organized, which is critical for managing multiple projects and deadlines in a market research role.',
      'You have experience working with diverse groups, including children and professional artists, which can help you understand different target audiences.',
      'You are fluent in Spanish, which can be an asset in a market research role, especially in the financial services industry.',
    ],
    roadmap: [
      {
        'Weeks 1-4':
          'Update your resume to highlight your analytical and research skills, and start applying for Market Research Analyst positions.',
      },
      {
        'Weeks 5-8':
          'Take online courses or attend webinars to learn more about market research tools and methodologies, such as survey design and data analysis.',
      },
      {
        'Weeks 9-12':
          'Network with professionals in the market research industry, and consider joining professional organizations, such as the Insights Association.',
      },
      {
        'After 3 months':
          'Consider pursuing a certification, such as the Certified Market Research Professional (CMRP) designation, to demonstrate your expertise and commitment to the field.',
      },
      {
        'Long-term':
          'As you gain experience, consider specializing in a particular industry, such as financial services, or a specific type of research, such as user experience (UX) research.',
      },
    ],
  },
  {
    jobTitle: 'Remote Marketing Specialist',
    jobDescription:
      'Develops and implements online marketing campaigns to drive business growth, with a focus on remote work arrangements.',
    timeline: '2-4 months',
    salary: '$50k - $70k',
    difficulty: 'Medium',
    workRequired: '20-30 hrs/week',
    aboutTheRole:
      'Market Research Analysts gather and analyze data to help businesses understand their target audience, competitors, and market trends. They design and implement research studies, collect and analyze data, and present findings to stakeholders to inform business decisions.',
    whyItsagoodfit: [
      'You have a strong background in marketing and international business, which is a great foundation for a market research role.',
      "You're detail-oriented and organized, which is essential for collecting and analyzing data.",
      "You're fluent in Spanish, which can be an asset in a market research role, especially in the financial services industry.",
      "You've expressed interest in working remotely, and many market research analyst positions can be done remotely.",
    ],
    roadmap: [
      {
        'Weeks 1-4':
          'Update your resume to highlight your analytical and research skills, and start applying for Market Research Analyst positions.',
      },
      {
        'Weeks 5-8':
          'Take online courses or attend webinars to learn more about market research tools and methodologies, such as survey design and data analysis.',
      },
      {
        'Weeks 9-12':
          'Network with professionals in the market research industry, and consider joining professional organizations like the Insights Association.',
      },
      {
        'After 3 months':
          'Land an entry-level Market Research Analyst position, and continue to develop your skills and knowledge in the field.',
      },
    ],
  },
  {
    jobTitle: 'Business Development Representative',
    jobDescription:
      'Identifies and pursues new business opportunities to drive revenue growth.',
    timeline: '3-6 months',
    salary: '$60k - $80k',
    difficulty: 'Medium',
    workRequired: '20-30 hrs/week',
    aboutTheRole:
      'Market Research Analysts gather and analyze data to help businesses understand their target audience, competitors, and market trends. They design and implement research studies, collect and analyze data, and present findings to stakeholders to inform business decisions.',
    whyItsagoodfit: [
      'You have a strong background in marketing and international business, which is a great foundation for a market research role.',
      "You're detail-oriented and organized, which is essential for collecting and analyzing data.",
      "You're fluent in Spanish, which can be an asset in a market research role, especially in the financial services industry.",
      "You've expressed interest in working remotely, and many market research analyst positions can be done remotely.",
    ],
    roadmap: [
      {
        'Weeks 1-4':
          'Update your resume to highlight your analytical and research skills, and start applying for Market Research Analyst positions.',
      },
      {
        'Weeks 5-8':
          'Take online courses or attend webinars to learn more about market research tools and methodologies, such as survey design and data analysis.',
      },
      {
        'Weeks 9-12':
          'Network with professionals in the market research industry, and consider joining professional organizations like the Insights Association.',
      },
      {
        'After 3 months':
          'Land an entry-level Market Research Analyst position, and continue to develop your skills and knowledge in the field.',
      },
    ],
  },
  {
    jobTitle: 'UX Researcher',
    jobDescription:
      'Conducts research to inform user-centered design solutions and improve product usability.',
    timeline: '3-6 months',
    salary: '$65k - $85k',
    difficulty: 'Medium',
    workRequired: '20-30 hrs/week',
    aboutTheRole:
      'Market Research Analysts gather and analyze data to help businesses understand their target audience, competitors, and market trends. They design and implement research studies, collect and analyze data, and present findings to stakeholders to inform business decisions.',
    whyItsagoodfit: [
      'You have a strong background in marketing and international business, which is a great foundation for a market research role.',
      "You're detail-oriented and organized, which is essential for collecting and analyzing data.",
      "You're fluent in Spanish, which can be an asset in a market research role, especially in the financial services industry.",
      "You've expressed interest in working remotely, and many market research analyst positions can be done remotely.",
    ],
    roadmap: [
      {
        'Weeks 1-4':
          'Update your resume to highlight your analytical and research skills, and start applying for Market Research Analyst positions.',
      },
      {
        'Weeks 5-8':
          'Take online courses or attend webinars to learn more about market research tools and methodologies, such as survey design and data analysis.',
      },
      {
        'Weeks 9-12':
          'Network with professionals in the market research industry, and consider joining professional organizations like the Insights Association.',
      },
      {
        'After 3 months':
          'Land an entry-level Market Research Analyst position, and continue to develop your skills and knowledge in the field.',
      },
    ],
  },
  {
    jobTitle: 'E-Learning Developer',
    jobDescription:
      'Creates online educational content and courses to engage learners and improve knowledge retention.',
    timeline: '2-4 months',
    salary: '$50k - $70k',
    difficulty: 'Low',
    workRequired: '20-30 hrs/week',
    aboutTheRole:
      'Market Research Analysts gather and analyze data to help businesses understand their target audience, competitors, and market trends. They design and implement research studies, collect and analyze data, and present findings to stakeholders to inform business decisions.',
    whyItsagoodfit: [
      'You have a strong background in marketing and international business, which is a great foundation for a market research role.',
      "You're detail-oriented and organized, which is essential for collecting and analyzing data.",
      "You're fluent in Spanish, which can be an asset in a market research role, especially in the financial services industry.",
      "You've expressed interest in working remotely, and many market research analyst positions can be done remotely.",
    ],
    roadmap: [
      {
        'Weeks 1-4':
          'Update your resume to highlight your analytical and research skills, and start applying for Market Research Analyst positions.',
      },
      {
        'Weeks 5-8':
          'Take online courses or attend webinars to learn more about market research tools and methodologies, such as survey design and data analysis.',
      },
      {
        'Weeks 9-12':
          'Network with professionals in the market research industry, and consider joining professional organizations like the Insights Association.',
      },
      {
        'After 3 months':
          'Land an entry-level Market Research Analyst position, and continue to develop your skills and knowledge in the field.',
      },
    ],
  },
];
