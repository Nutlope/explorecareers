<a href="https://www.explorecareers.io">
  <img alt="Explore Careers." src="./public/og-image.png">
  <h1 align="center">ExploreCareers</h1>
</a>

<p align="center">
  Explore careers relevant for you in seconds. Powered by Together.ai.
</p>

<p align="center">
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#future-tasks"><strong>Future Tasks</strong></a> ·
    <a href="#inspiration"><strong>Inspiration</strong></a>
</p>
<br/>

## Tech Stack

This app lets people upload their resumes, fill in some of their interests, and get a list of possible careers they could do.

- [Llama-3-70B](https://llama.meta.com/llama3/) for the LLM
- [Together.ai](https://together.ai/) for the AI API (inference)
- [Plausible](https://plausible.io/) for website analytics
- [Reactflow](https://reactflow.dev/) for the data visualization
- [Helicone](https://helicone.ai/) for LLM observability
- Next.js [App Router](https://nextjs.org/docs/app) for the framework
- [S3 / ByteScale](https://www.bytescale.com/) for the PDF storage
- [Vercel](https://vercel.com/) for hosting & functions
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Future tasks

- [ ] Build in a PII remover so that we can remove people's personal info from their resume
- [ ] Clean up the code to not have default react node data that I have right now
- [ ] Add authentication with Clerk to make people create accounts and remember their resumes
- [ ] Improve the prompts using synthetic data from GPT-4o for the examples that I specify
- [ ] Add sharability to the URLs with nanoid
- [ ] Add rate limiting with Redis Upstash
- [ ] Add multi-step form where people can add their interests and add this to the prompt of the first endpoint to use someone's interests in there
- [ ] Add a settings screen where users can go update their resume and interests overall
- [ ] Add functionality to let users suggest new careers themselves and get a developed plan for it
- [ ] Use Crew AI agents to make this workflow more robust overall: An agent that takes resume & extra info then outputs a very nice summary with keywords. An agent that comes up with multiple possible career paths from that summary. An agent that then constructs a plan for each career.
- [ ] Add functionality for people to alternatively paste in their LinkedIn URL instead of resume with [scrapedin](https://github.com/linkedtales/scrapedin/tree/master)
- [ ] Who do I want to be more like functionality where users can add a famous person & get suggestions for how to be more like them. This might be good as a separate app
- [ ] Fine-tune Llama-3-8B on making the job plan. Maybe fine-tune Llama-3-8B on GPT-4 outputs
- [ ] Improve PDF parsing functionality to include image detection and OCR to be able to read resumes even better

## Inspiration

I took inspiration from [wanderer.space](https://www.wanderer.space) for this app. Check it out for a production version of what I built with even more features!
