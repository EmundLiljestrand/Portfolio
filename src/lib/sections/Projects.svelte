<script>
  import CaseStudy from '../components/CaseStudy.svelte'
  import { reveal } from '../actions/reveal.js'

  const coachAgent = {
    id: 'project-agent',
    index: '02',
    title: 'AI Coach Agent',
    tagline:
      'En autonom AI-agent som analyserar tränings- och hälsodata och genererar personliga coachmeddelanden, med en coach i beslutsslingan innan något når användaren.',
    status: ['Async pipeline', 'GDPR-safe', 'Local LLM', 'Human-in-loop'],
    problem:
      'Probits ville kunna ge användare personliga, datadrivna coachmeddelanden varje vecka, utan att en coach skulle behöva skriva varje meddelande för hand. Men det fick inte ske helt på egen hand: en coach måste kunna läsa igenom och godkänna varje meddelande innan det går ut till användaren.',
    role:
      'Jag byggde agenten från grunden: agentlogiken, arkitekturen och backend-API:et.',
    flow: [
      { title: 'Användaren sparar sin veckoreflektion i appen' },
      { title: 'Probits backend skickar en payload till microservicen', detail: 'via HTTP-trigger' },
      { title: 'Django-Q lägger jobbet på en asynkron kö', detail: 'och svarar 202 direkt' },
      { title: 'En bakgrundsworker kör LangGraph-agenten', detail: 'analyze_week → generate_draft (Ollama, llama3.1:8b)' },
      { title: 'Draften sparas som PENDING i databasen' },
      { title: 'Coachen granskar, redigerar och godkänner', detail: 'callback → meddelandet sparas i användarens chatt' },
    ],
    challenges: [
      {
        title: 'Human-in-the-loop',
        body: 'Coachen kan redigera AI-texten innan godkännande. Kräver ett eget draft-lager med status-hantering och ownership-kontroll.',
      },
      {
        title: 'IDOR-säkerhet',
        body: 'En coach får bara se drafts för sina egna användare. Token-validering mot Probits backend som returnerar managed_user_ids per anrop. Microservicen har ingen egen användartabell.',
      },
      {
        title: 'Asynkron pipeline',
        body: 'LLM-generering tar 15–60s. Triggern svarar 202 direkt och genereringen sker på en worker-kö. Idempotency-check hindrar duplicerade drafts.',
      },
      {
        title: 'Felhantering',
        body: 'Ollama-anrop har retry med backoff, payload valideras tidigt i kedjan, och IntegrityError vid race condition hanteras kontrollerat.',
      },
      {
        title: 'Deployment',
        body: 'Dockeriserad stack (6 containers) på Safespring GPU-VM med Nvidia A2. LLM:en kör helt lokalt, så ingen data lämnar servern.',
      },
    ],
    stack: [
      'Python', 'Django', 'LangGraph', 'FastAPI', 'Ollama (llama3.1:8b)',
      'Django-Q2', 'PostgreSQL', 'Docker', 'Safespring (OpenStack)', 'REST API', 'GitHub Actions',
    ],
    learned:
      'Här byggde jag ett system där två separata tjänster pratar med varandra, vilket tvingade mig att tänka mer på hur de kommunicerar säkert och vad som händer när något går fel mitt i kedjan. Jag lärde mig också varför tunga jobb måste köras i bakgrunden, så att användaren slipper sitta och vänta medan AI:n jobbar.',
  }

  const coachChatbot = {
    id: 'project-chatbot',
    index: '01',
    title: 'AI Coach Chatbot',
    tagline:
      'En GDPR-medveten AI-chatbot för hälsocoaching med lokal LLM, RAG-sökning och realtids-streaming, utan att personuppgifter lämnar servern.',
    status: ['Local LLM', 'GDPR by design', 'RAG', 'SSE-streaming'],
    problem:
      'Probits ville erbjuda användare en AI där de kan ställa hälso- och träningsfrågor och få svar som förstår deras kontext. Haken: hälsodata är känslig, så lösningen fick inte skicka personuppgifter till externa API:er.',
    role:
      'Jag var med i alla tekniska beslut och ansvarade för stora delar av implementationen, säkerhetslagret och backend-arkitekturen.',
    flow: [
      { title: 'Användaren skickar ett meddelande' },
      { title: 'AI Safety Middleware körs först', detail: 'anonymiserar personuppgifter som telefonnummer, e-post och personnummer med spaCy, blockerar prompt injection' },
      { title: 'Anonymiserad text går till RAG-pipelinen', detail: 'embeddings (KBLab Swedish BERT) söker i kunskapsdatabasen via pgvector' },
      { title: 'Kontext + meddelande skickas till Ollama', detail: 'lokal LLM genererar svaret' },
      { title: 'Svaret streamar tillbaka via SSE', detail: 'användaren ser texten växa fram i realtid' },
      { title: 'Färdigt svar postas tillbaka till Probits backend', detail: 'callback / push-arkitektur' },
    ],
    challenges: [
      {
        title: 'GDPR by design',
        body: 'Personuppgifter anonymiseras innan de når LLM:en. Lokal modell innebär att ingen data skickas till OpenAI eller liknande.',
      },
      {
        title: 'Stateless auth',
        body: 'Microservicen har ingen egen användartabell. Varje anrop valideras mot Probits backend, så det finns ingen lokal användardata som kan läcka.',
      },
      {
        title: 'Throttling & säkerhet',
        body: 'Rate limiting per användare, och middleware som blockerar responses som råkar innehålla t.ex. databasconnection-strängar.',
      },
    ],
    stack: [
      'Python', 'Django', 'Django REST Framework', 'spaCy', 'pgvector',
      'sentence-transformers', 'Ollama', 'SSE', 'PostgreSQL', 'Docker', 'GitHub Actions',
    ],
    learned:
      'Den största lärdomen var att se hur ett helt system hänger ihop och hur alla delar passar in i varandra. Jag fick också tänka på säkerhet och hur lagar och regler som GDPR måste byggas in i arkitekturen från början, inte läggas på i efterhand.',
  }
</script>

<section id="projects" class="container">
  <header class="section-head" use:reveal>
    <span class="section-kicker pixel">✦ Quest Log</span>
    <h2 class="section-title pixel">Vad jag har byggt</h2>
  </header>

  <div class="case-list">
    <CaseStudy {...coachChatbot} />
    <CaseStudy {...coachAgent} />
  </div>
</section>

<style>
  #projects {
    padding-block: var(--space-32);
  }

  .section-head {
    margin-bottom: var(--space-16);
  }

  .case-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
  }

  .section-kicker {
    font-size: var(--text-xs);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .section-title {
    font-size: clamp(1.25rem, 3.5vw, 2rem);
    line-height: 1.4;
    margin-top: var(--space-4);
    color: var(--text);
    text-shadow: 3px 3px 0 var(--bg-sunken);
  }
</style>
