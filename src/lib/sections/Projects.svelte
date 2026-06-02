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
</script>

<section id="projects" class="container">
  <header class="section-head">
    <span class="section-kicker">Utvalda projekt</span>
    <h2 class="section-title">Vad jag har byggt</h2>
  </header>

  <CaseStudy {...coachAgent} />
</section>

<style>
  #projects {
    padding-block: var(--space-32);
  }

  .section-head {
    margin-bottom: var(--space-16);
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
