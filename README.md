<a href="https://www.explorecareers.io">
  <img alt="Explore Careers." src="./public/og-image.png">
  <h1 align="center">ExploreCareers</h1>
</a>

<p align="center">
  Explore careers relevant for you in seconds. Powered by LLama-3.
</p>

<p align="center">
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#tasks"><strong>Tasks</strong></a> ·
  <a href="#architecture"><strong>Architecture</strong></a> ·
  <a href="#future-tasks"><strong>Future Tasks</strong></a> ·
    <a href="#inspiration"><strong>Inspiration</strong></a>
</p>
<br/>

> This app was originally built for the LLama-3 hackathon in San Francisco.

## Tech Stack

- Llama-3 through [Groq](https://groq.com/) for LLM inference
- [S3 / ByteScale](https://www.bytescale.com/) for the PDF storage
- Next.js [App Router](https://nextjs.org/docs/app) for the framework
- [Vercel](https://vercel.com/) for hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Architecture

Here's the architecture for this app.

<img alt="Explore Careers." src="./public/architecture.png">

## Tasks

This app lets people upload their resumes, fill in some of their interests, and get a list of possible careers they could do.

- [x] Code up a landing page, use PDFToChat/QRGPT as inspo
- [x] Dashboard screen with upload functionality using Bytescale
- [x] Use PDF parsing logic & add it as context along with the form data
- [x] Possible careers page built with reactflow.dev with timeline, average salary, & difficulty level
- [x] Add Groq endpoint that takes in a user's info & outputs job summaries.
- [x] Add loading state that goes between resume upload & showing the final list of careers
- [x] Add a text box right next to the resume to add context on interests & likes/dislikes, then add this to context
- [x] Add another Groq endpoint to generate things for each specific job modal
- [x] Code modal that provides a plan for how to transition to each career
- [ ] Figure out how to set nodes dynamically in React flow from the backend
- [ ] Combine two groq endpoints into one so one can return a big object for everything that's needed
- [ ] Test full end to end flow and fix any issues, including on prod

## Future tasks

- [ ] Add multi-step form where people can add their interests and add this to the prompt of the first endpoint to use someone's interests in there
- [ ] Add observability with helicone for this app to try out something new
- [ ] Add authentication with Clerk to make people create accounts and remember their resumes
- [ ] Add rate limiting with Redis Upstash
- [ ] Add a settings screen where users can go update their resume and interests overall
- [ ] Add functionality to let users suggest new careers themselves and get a developed plan for it
- [ ] Use Crew AI agents to make this workflow more robust overall: An agent that takes resume & extra info then outputs a very nice summary with keywords. An agent that comes up with multiple possible career paths from that summary. An agent that then constructs a plan for each career.
- [ ] Add functionality for people to alternatively paste in their LinkedIn URL instead of resume with [scrapedin](https://github.com/linkedtales/scrapedin/tree/master)
- [ ] Who do I want to be more like functionality where users can add a famous person & get suggestions for how to be more like them. This might be good as a separate app
- [ ] Fine-tune Llama-3-8B on making the job plan. Maybe fine-tune Llama-3-8B on GPT-4 outputs
- [ ] Improve PDF parsing functionality to include image detection and OCR to be able to read resumes even better

## Inspiration

I took inspiration from [wanderer.space](https://www.wanderer.space) for this app.
