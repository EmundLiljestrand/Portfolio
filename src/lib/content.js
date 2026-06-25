// All copy i sv + en.
export const content = {
  sv: {
    nav: { projects: 'Projekt', about: 'Om mig', contact: 'Kontakt' },

    hero: {
      eyebrow: 'Webbutvecklare · Kristinehamn',
      lead: 'Jag löser problem, oavsett var i stacken lösningen sitter.',
      bodyPre: 'Nyexaminerad webbutvecklare som ',
      bodyHl: 'inte ger upp förrän koden funkar',
      bodyPost:
        '. Under min LIA dök jag ner i AI och byggde autonoma agenter, RAG-pipelines och lösningar med lokala språkmodeller.',
      ctaProjects: 'Se mina projekt',
      ctaContact: 'Kontakt',
    },

    projects: { kicker: 'Quest Log', kickerPlain: 'Projekt', title: 'Vad jag har byggt' },

    about: {
      kicker: 'Om mig',
      title: 'Problemlösaren i systemet',
      leadPre:
        'Jag är webbutvecklare med en frontend-grund i React, TypeScript och JavaScript. Under min LIA på Probits hamnade jag i något jag inte visste att jag skulle fastna för: backend-arkitektur och ',
      leadNb: 'AI-system',
      leadPost: '.',
      p2: 'Jag började med JavaScript och React. Sedan dess har jag lärt mig att bygga autonoma AI-agenter, köra lokala språkmodeller på GPU och förstå hur ett större system faktiskt fungerar: inloggning och säkerhet, asynkrona köer, hur olika tjänster pratar med varandra, och GDPR-krav som formar hela arkitekturen.',
      p3: 'Det jag drivs av är att förstå hela bilden och veta varför något fungerar, inte bara att få det att gå. Helst sitter jag med problem som spänner över flera lager och kräver att man ser hur delarna spelar ihop.',
      p4: 'Nu söker jag mitt nästa kliv som utvecklare. Jag är öppen för det mesta och vill framför allt fortsätta växa och lösa riktiga problem. Att få jobba mer med AI lockar, men det är ett plus snarare än ett krav.',
      invTitle: 'Inventory',
      invTitlePlain: 'Kompetens',
      slots: 'slots',
      groups: {
        languages: 'Språk & ramverk',
        ai: 'AI & Data',
        infra: 'Infrastruktur & drift',
        databases: 'Databaser',
        tools: 'Verktyg & arbetssätt',
        design: 'Design & UX',
      },
    },

    contact: {
      kicker: 'Kontakt',
      title: 'Hör av dig',
      lead: 'Jag är öppen för nya uppdrag och svarar snabbt. Gäller det ett jobb eller bara en fråga? Skriv en rad, så hörs vi.',
      emailTag: 'Skicka meddelande',
      emailTagPlain: 'E-post',
      footer: 'Byggd i Svelte · se källkoden ↗',
    },

    agent: {
      intro:
        'Hej, äventyrare! Jag är {name}, Emunds guide här i världen. Fråga mig om hans quests (projekt), hans bakgrund eller kompetenser, så visar jag dig vägen.',
      starters: ['Vad har Emund byggt?', 'Vilka kompetenser har han?', 'Berätta om hans bakgrund', 'Hur når jag honom?'],
      placeholder: 'Skriv ditt svar…',
      disclaimer: 'AI-svar · dela inga personuppgifter här',
      thinking: 'tänker',
      ask: 'Fråga {name}',
      errorTail: ' Maila gärna istället, se kontaktrutan.',
      errorOffline: 'Följeslagaren svarar inte just nu.',
      errorBroken: 'Förbindelsen bröts.',
      toolScroll: '▸ Bläddrar till {target}…',
      toolHighlight: '▸ Pekar ut {target}…',
      toolSkills: '▸ Öppnar {target} i ryggsäcken…',
      toolSearch: '▸ Letar i ryggsäcken…',
      sections: { hero: 'startskärmen', projects: 'Quest Log', about: 'karaktärsbladet', contact: 'kontaktrutan' },
    },

    caseUi: {
      quest: 'Quest',
      project: 'Projekt',
      unroll: '▶ Rulla ut',
      rollUp: '▼ Rulla ihop',
      showMore: 'Visa mer',
      showLess: 'Visa mindre',
      problem: '▸ Problemet',
      problemPlain: 'Problem',
      role: '▸ Min roll',
      rolePlain: 'Min roll',
      how: '▸ Så fungerar det',
      howPlain: 'Så fungerar det',
      challenges: '▸ Tekniska utmaningar',
      challengesPlain: 'Tekniska utmaningar',
      tech: '▸ Inventory',
      techPlain: 'Tekniker',
      learned: '★ Vad jag lärde mig',
      learnedPlain: 'Vad jag lärde mig',
    },

    cases: {
      chatbot: {
        title: 'AI Coach Chatbot',
        tagline:
          'En GDPR-medveten AI-chatbot för hälsocoaching med lokal LLM, RAG-sökning och realtids-streaming, utan att personuppgifter lämnar servern.',
        problem:
          'Probits ville erbjuda användare en AI där de kan ställa hälso- och träningsfrågor och få svar som förstår deras kontext. Haken: hälsodata är känslig, så lösningen fick inte skicka personuppgifter till externa API:er.',
        role: 'Jag var med i alla tekniska beslut och ansvarade för stora delar av implementationen, säkerhetslagret och backend-arkitekturen.',
        flow: [
          { title: 'Användaren skickar ett meddelande' },
          { title: 'AI Safety Middleware körs först', detail: 'anonymiserar personuppgifter som telefonnummer, e-post och personnummer med spaCy, blockerar prompt injection' },
          { title: 'Anonymiserad text går till RAG-pipelinen', detail: 'embeddings (KBLab Swedish BERT) söker i kunskapsdatabasen via pgvector' },
          { title: 'Kontext + meddelande skickas till Ollama', detail: 'lokal LLM genererar svaret' },
          { title: 'Svaret streamar tillbaka via SSE', detail: 'användaren ser texten växa fram i realtid' },
          { title: 'Färdigt svar postas tillbaka till Probits backend', detail: 'callback / push-arkitektur' },
        ],
        challenges: [
          { title: 'GDPR by design', body: 'Personuppgifter anonymiseras innan de når LLM:en. Lokal modell innebär att ingen data skickas till OpenAI eller liknande.' },
          { title: 'Stateless auth', body: 'Microservicen har ingen egen användartabell. Varje anrop valideras mot Probits backend, så det finns ingen lokal användardata som kan läcka.' },
          { title: 'Throttling & säkerhet', body: 'Rate limiting per användare, och middleware som blockerar responses som råkar innehålla t.ex. databasconnection-strängar.' },
        ],
        learned:
          'Den största lärdomen var att se hur ett helt system hänger ihop och hur alla delar passar in i varandra. Jag fick också tänka på säkerhet och hur lagar och regler som GDPR måste byggas in i arkitekturen från början, inte läggas på i efterhand.',
      },
      agent: {
        title: 'AI Coach Agent',
        tagline:
          'En autonom AI-agent som analyserar tränings- och hälsodata och genererar personliga coachmeddelanden, med en coach i beslutsslingan innan något når användaren.',
        problem:
          'Probits ville kunna ge användare personliga, datadrivna coachmeddelanden varje vecka, utan att en coach skulle behöva skriva varje meddelande för hand. Men det fick inte ske helt på egen hand: en coach måste kunna läsa igenom och godkänna varje meddelande innan det går ut till användaren.',
        role: 'Jag byggde agenten från grunden: agentlogiken, arkitekturen och backend-API:et.',
        flow: [
          { title: 'Användaren sparar sin veckoreflektion i appen' },
          { title: 'Probits backend skickar en payload till microservicen', detail: 'via HTTP-trigger' },
          { title: 'Django-Q lägger jobbet på en asynkron kö', detail: 'och svarar 202 direkt' },
          { title: 'En bakgrundsworker kör LangGraph-agenten', detail: 'analyze_week → generate_draft (Ollama, llama3.1:8b)' },
          { title: 'Draften sparas som PENDING i databasen' },
          { title: 'Coachen granskar, redigerar och godkänner', detail: 'callback → meddelandet sparas i användarens chatt' },
        ],
        challenges: [
          { title: 'Human-in-the-loop', body: 'Coachen kan redigera AI-texten innan godkännande. Kräver ett eget draft-lager med status-hantering och ownership-kontroll.' },
          { title: 'IDOR-säkerhet', body: 'En coach får bara se drafts för sina egna användare. Token-validering mot Probits backend som returnerar managed_user_ids per anrop. Microservicen har ingen egen användartabell.' },
          { title: 'Asynkron pipeline', body: 'LLM-generering tar 15–60s. Triggern svarar 202 direkt och genereringen sker på en worker-kö. Idempotency-check hindrar duplicerade drafts.' },
          { title: 'Felhantering', body: 'Ollama-anrop har retry med backoff, payload valideras tidigt i kedjan, och IntegrityError vid race condition hanteras kontrollerat.' },
          { title: 'Deployment', body: 'Dockeriserad stack (6 containers) på Safespring GPU-VM med Nvidia A2. LLM:en kör helt lokalt, så ingen data lämnar servern.' },
        ],
        learned:
          'Här byggde jag ett system där två separata tjänster pratar med varandra, vilket tvingade mig att tänka mer på hur de kommunicerar säkert och vad som händer när något går fel mitt i kedjan. Jag lärde mig också varför tunga jobb måste köras i bakgrunden, så att användaren slipper sitta och vänta medan AI:n jobbar.',
      },
    },
  },

  en: {
    nav: { projects: 'Projects', about: 'About', contact: 'Contact' },

    hero: {
      eyebrow: 'Web Developer · Kristinehamn',
      lead: 'I solve problems, wherever they reside in the stack.',
      bodyPre: 'A newly graduated web developer who ',
      bodyHl: "won't quit until the code works",
      bodyPost:
        '. During my internship I went deep into AI and built autonomous agents, RAG pipelines, and solutions powered by local language models.',
      ctaProjects: 'See my work',
      ctaContact: 'Contact',
    },

    projects: { kicker: 'Quest Log', kickerPlain: 'Projects', title: "What I've built" },

    about: {
      kicker: 'About me',
      title: 'The problem-solver in the system',
      leadPre:
        "I'm a web developer with a frontend foundation in React, TypeScript and JavaScript. During my internship at Probits I stumbled upon something I didn't expect to fall for: backend architecture and ",
      leadNb: 'AI systems',
      leadPost: '.',
      p2: "I started with JavaScript and React. Since then I've learned to build autonomous AI agents, run local language models on a GPU, and understand how a larger system actually works: auth and security, async queues, how different services talk to each other, and the GDPR requirements that shape the whole architecture.",
      p3: "What drives me is understanding the whole picture and knowing why something works, not just getting it to run. I most enjoy problems that span several layers and force you to see how the parts work together.",
      p4: "Now I'm looking for my next step as a developer. I'm open to most things and, above all, want to keep growing and solving real problems. Working more with AI appeals to me, but it's a bonus rather than a requirement.",
      invTitle: 'Inventory',
      invTitlePlain: 'Skills',
      slots: 'slots',
      groups: {
        languages: 'Languages & frameworks',
        ai: 'AI & data',
        infra: 'Infrastructure & ops',
        databases: 'Databases',
        tools: 'Tools & ways of working',
        design: 'Design & UX',
      },
    },

    contact: {
      kicker: 'Contact',
      title: 'Get in touch',
      lead: "I'm open to new opportunities and reply quickly. Whether it's a job or just a question, drop me a message and we'll talk.",
      emailTag: 'Send a message',
      emailTagPlain: 'Email',
      footer: 'Built with Svelte · view the source ↗',
    },

    agent: {
      intro:
        "Hey, traveler! I'm {name}, Emund's guide here in this world. Ask me about his quests (projects), his background or his skills, and I'll show you the way.",
      starters: ['What has Emund built?', 'What are his skills?', 'Tell me about his background', 'How do I reach him?'],
      placeholder: 'Type your reply…',
      disclaimer: "AI answers · don't share personal data here",
      thinking: 'thinking',
      ask: 'Ask {name}',
      errorTail: ' Feel free to email instead — see the contact box.',
      errorOffline: "The companion isn't responding right now.",
      errorBroken: 'The connection dropped.',
      toolScroll: '▸ Scrolling to {target}…',
      toolHighlight: '▸ Pointing out {target}…',
      toolSkills: '▸ Opening {target} in the backpack…',
      toolSearch: '▸ Searching the backpack…',
      sections: { hero: 'the home screen', projects: 'the Quest Log', about: 'the character sheet', contact: 'the contact box' },
    },

    caseUi: {
      quest: 'Quest',
      project: 'Project',
      unroll: '▶ Unroll',
      rollUp: '▼ Roll up',
      showMore: 'Show more',
      showLess: 'Show less',
      problem: '▸ The problem',
      problemPlain: 'The problem',
      role: '▸ My role',
      rolePlain: 'My role',
      how: '▸ How it works',
      howPlain: 'How it works',
      challenges: '▸ Technical challenges',
      challengesPlain: 'Technical challenges',
      tech: '▸ Inventory',
      techPlain: 'Tech',
      learned: '★ What I learned',
      learnedPlain: 'What I learned',
    },

    cases: {
      chatbot: {
        title: 'AI Coach Chatbot',
        tagline:
          'A GDPR-aware AI coaching chatbot with a local LLM, RAG search and real-time streaming, no personal data ever leaves the server.',
        problem:
          "Probits wanted to give users an AI they could ask health and training questions and get answers that understood their context. The catch: health data is sensitive, so the solution couldn't send any personal data to external APIs.",
        role: 'I was part of every technical decision and owned large parts of the implementation, the security layer and the backend architecture.',
        flow: [
          { title: 'A user sends a message' },
          { title: 'An AI safety middleware runs first', detail: 'strips personal data like phone numbers, emails and ID numbers with spaCy, and blocks prompt injection' },
          { title: 'The anonymized text enters the RAG pipeline', detail: 'embeddings (KBLab Swedish BERT) search the knowledge base via pgvector' },
          { title: 'Context + message go to Ollama', detail: 'a local LLM generates the answer' },
          { title: 'The answer streams back over SSE', detail: 'the user watches the text appear in real time' },
          { title: "The finished answer is posted back to Probits' backend", detail: 'callback / push architecture' },
        ],
        challenges: [
          { title: 'GDPR by design', body: 'Personal data is anonymized before it reaches the LLM. A local model means nothing is ever sent to OpenAI or similar.' },
          { title: 'Stateless auth', body: "The microservice has no user table of its own. Every request is validated against Probits' backend, so there's no local user data that could leak." },
          { title: 'Throttling & security', body: 'Per-user rate limiting, plus middleware that blocks responses accidentally containing things like database connection strings.' },
        ],
        learned:
          'My biggest takeaway was seeing how a whole system fits together and how the pieces depend on each other. I also learned to think about security, and how rules like GDPR have to be built into the architecture from the start rather than bolted on afterwards.',
      },
      agent: {
        title: 'AI Coach Agent',
        tagline:
          'An autonomous AI agent that analyzes training and health data and generates personal coaching messages, with a coach in the loop before anything reaches the user.',
        problem:
          "Probits wanted to give users personal, data-driven coaching messages every week without a coach having to write each one by hand. But it couldn't run fully on its own: a coach had to be able to review and approve every message before it went out.",
        role: 'I built the agent from the ground up: the agent logic, the architecture and the backend API.',
        flow: [
          { title: 'A user saves their weekly reflection in the app' },
          { title: "Probits' backend sends a payload to the microservice", detail: 'via an HTTP trigger' },
          { title: 'Django-Q puts the job on an async queue', detail: 'and responds 202 immediately' },
          { title: 'A background worker runs the LangGraph agent', detail: 'analyze_week → generate_draft (Ollama, llama3.1:8b)' },
          { title: 'The draft is saved as PENDING in the database' },
          { title: 'The coach reviews, edits and approves', detail: "callback → the message is saved to the user's chat" },
        ],
        challenges: [
          { title: 'Human-in-the-loop', body: "The coach can edit the AI's text before approving. This needs a dedicated draft layer with status handling and ownership checks." },
          { title: 'IDOR security', body: "A coach can only see drafts for their own users. Token validation against Probits' backend, which returns managed_user_ids per request. The microservice has no user table of its own." },
          { title: 'Async pipeline', body: 'LLM generation takes 15–60s. The trigger responds 202 right away and generation happens on a worker queue. An idempotency check prevents duplicate drafts.' },
          { title: 'Error handling', body: 'Ollama calls retry with backoff, the payload is validated early in the chain, and IntegrityErrors from race conditions are handled gracefully.' },
          { title: 'Deployment', body: 'Dockerized stack (6 containers) on a Safespring GPU VM with an Nvidia A2. The LLM runs fully locally, so no data leaves the server.' },
        ],
        learned:
          "Here I built a system where two separate services talk to each other, which forced me to think harder about how they communicate securely and what happens when something fails mid-chain. I also learned why heavy jobs need to run in the background, so the user isn't left waiting while the AI works.",
      },
    },
  },
}
