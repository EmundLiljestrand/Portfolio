<script>
  import CaseStudy from '../components/CaseStudy.svelte'

  const coachAgent = {
    index: '01',
    title: 'AI Coach Agent',
    tagline:
      'En autonom AI-agent som analyserar tränings- och hälsodata och genererar personliga coachmeddelanden — med en coach i beslutsslingan innan något når användaren.',
    status: ['Deployed', 'GDPR-safe', 'Local LLM', 'Human-in-loop'],
    problem:
      'Probits hälsoplattform har coacher som följer upp klienters veckovisa träning och reflektion. Att skriva personliga, datadrivna meddelanden till varje klient varje vecka tar tid och skalar dåligt. Lösningen behövde vara autonom men inte blind — en coach måste kunna granska och godkänna innan något skickas.',
    role:
      'Designade och implementerade hela agentpipelinen och backend-API:et. Byggdes i samarbete med en kollega — jag ansvarade för agentlogik, arkitektur och majoriteten av implementationen.',
    flow: [
      { title: 'Användaren sparar sin veckoreflektion i appen' },
      { title: 'Probits backend skickar en payload till microservicen', detail: 'via HTTP-trigger' },
      { title: 'Django-Q lägger jobbet på en asynkron kö', detail: 'och svarar 202 direkt' },
      { title: 'En bakgrundsworker kör LangGraph-agenten', detail: 'analyze_week → generate_draft (Ollama, llama3.1:8b)' },
      { title: 'Draften sparas som PENDING i databasen' },
      { title: 'Coachen granskar, redigerar och godkänner', detail: 'callback → meddelandet sparas i klientens chatt' },
    ],
    challenges: [
      {
        title: 'Human-in-the-loop',
        body: 'Coachen kan redigera AI-texten innan godkännande. Kräver ett eget draft-lager med status-hantering och ownership-kontroll.',
      },
      {
        title: 'IDOR-säkerhet',
        body: 'En coach får bara se sina egna klienters drafts. Token-validering mot Probits backend som returnerar managed_user_ids per anrop. Microservicen har ingen egen användartabell.',
      },
      {
        title: 'Asynkron pipeline',
        body: 'LLM-generering tar 15–60s. Triggern svarar 202 direkt och genereringen sker på en worker-kö. Idempotency-check hindrar duplicerade drafts.',
      },
      {
        title: 'Felhantering',
        body: 'Ollama-anrop har retry med backoff, payload valideras tidigt i kedjan, och IntegrityError vid race condition hanteras gracefully.',
      },
      {
        title: 'Deployment',
        body: 'Dockeriserad stack (6 containers) på Safespring GPU-VM med Nvidia A2. LLM:en kör helt lokalt — ingen data lämnar servern.',
      },
    ],
    stack: [
      'Python', 'Django', 'LangGraph', 'FastAPI', 'Ollama (llama3.1:8b)',
      'Django-Q2', 'PostgreSQL', 'Docker', 'Safespring (OpenStack)', 'REST API', 'GitHub Actions',
    ],
    learned:
      'Att bygga ett distribuerat system där två separata backends pratar med varandra tvingade mig att tänka på kontraktsgränser, auth-flöden och felscenarier på ett helt annat sätt än i en monolitisk app. Jag lärde mig också att asynkron arkitektur inte är en optimering — det är ibland ett krav.',
  }

  const coachChatbot = {
    index: '02',
    title: 'AI Coach Chatbot',
    tagline:
      'En GDPR-medveten AI-chatbot för hälsocoaching med lokal LLM, RAG-sökning och realtids-streaming — utan att en enda personuppgift lämnar servern.',
    status: ['Local LLM', 'GDPR by design', 'RAG', 'SSE-streaming'],
    problem:
      'Probits klienter behövde kunna ställa hälso- och träningsfrågor och få svar från en AI som förstår deras kontext — men hälsodata är känslig. Lösningen fick inte skicka PII till externa API:er, och svaren behövde komma i realtid utan att browsern låste sig.',
    role:
      'Byggdes i samarbete med en kollega. Jag var med i alla tekniska beslut och ansvarade för stora delar av implementationen, säkerhetslagret och backend-arkitekturen.',
    flow: [
      { title: 'Användaren skickar ett meddelande' },
      { title: 'AI Safety Middleware körs först', detail: 'anonymiserar PII (telefon, e-post, personnummer) med spaCy, blockerar prompt injection' },
      { title: 'Anonymiserad text går till RAG-pipelinen', detail: 'embeddings (KBLab Swedish BERT) söker i kunskapsdatabasen via pgvector' },
      { title: 'Kontext + meddelande skickas till Ollama', detail: 'lokal LLM genererar svaret' },
      { title: 'Svaret streamar tillbaka via SSE', detail: 'användaren ser texten växa fram i realtid' },
      { title: 'Färdigt svar postas tillbaka till Probits backend', detail: 'callback / push-arkitektur' },
    ],
    challenges: [
      {
        title: 'GDPR by design',
        body: 'PII anonymiseras innan det når LLM:en. Lokal modell innebär att ingen data skickas till OpenAI eller liknande.',
      },
      {
        title: 'SSE-streaming',
        body: 'Django hanterar inte streaming naturligt. Kräver en custom view utanför DRF:s normala request/response-cykel.',
      },
      {
        title: 'Stateless auth',
        body: 'Microservicen har ingen egen användartabell. Varje anrop valideras mot Probits backend, vilket eliminerar en hel klass av dataläckage-risker.',
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
      'Att säkerhet inte är något man lägger på efteråt. AI Safety Middleware sitter i request/response-kedjan och körs på varje anrop — det designbeslutet krävde att jag förstod Djangos middleware-pipeline på djupet, inte bara hur man bygger en view.',
  }
</script>

<section id="projects" class="container">
  <header class="section-head">
    <span class="section-kicker">Utvalda projekt</span>
    <h2 class="section-title">Vad jag har byggt</h2>
  </header>

  <div class="case-list">
    <CaseStudy {...coachAgent} />
    <CaseStudy {...coachChatbot} />
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
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-top: var(--space-3);
    color: var(--text);
  }
</style>
