# Career Exploration app

> This app was originally built for the LLama-3 hackathon in San Francisco.

This app lets people upload their resumes, fill in some of their interests, and get a list of possible careers they could do.

## v0.5 – get something working where a user can upload their resume & get some possible careers

- [x] Code up a landing page, use PDFToChat/QRGPT as inspo
- [x] Dashboard screen with upload functionality using Bytescale
- [x] Use PDF parsing logic & add it as context along with the form data
- [x] Possible careers page built with reactflow.dev with timeline, average salary, & difficulty level
- [x] Add Groq endpoint that takes in a user's info & outputs job summaries.
- [ ] Add loading state that goes between resume upload & showing the final list of careers

## v1 – add more info in modal w/ extra call + more context of what the user wants

- [ ] Add a text box right next to the resume to add context on interests & likes/dislikes, then add this to context
- [ ] Code modal that provides a plan for how to transition to each career
- [ ] Add another Groq endpoint to generate things for each specific job modal
- [ ] Present at the hackathon for now
- [ ] Add multi-step form where people can add their interests and add this to the prompt of the first endpoint to use someone's interests in there

## Future tasks

- [ ] Add observability with helicone for this app to try out something new
- [ ] Add authentication with Clerk to make people create accounts and remember their resumes
- [ ] Add a settings screen where users can go update their resume and interests overall
- [ ] Add functionality to let users suggest new careers themselves and get a developed plan for it
- [ ] Use Crew AI agents to make this workflow more robust overall: An agent that takes resume & extra info then outputs a very nice summary with keywords. An agent that comes up with multiple possible career paths from that summary. An agent that then constructs a plan for each career.
- [ ] Add functionality for people to alternatively paste in their LinkedIn URL instead of resume with [scrapedin](https://github.com/linkedtales/scrapedin/tree/master)
- [ ] Who do I want to be more like functionality where users can add a famous person & get suggestions for how to be more like them. This might be good as a separate app
- [ ] Fine-tune Llama-3-8B on making the job plan. Maybe fine-tune Llama-3-8B on GPT-4 outputs
- [ ] Improve PDF parsing functionality to include image detection and OCR to be able to read resumes even better

## Inspiration

I took heavy inspiration from [wanderer.space](https://www.wanderer.space) for this app. Check them out if you want a more complete app that has even more features!
