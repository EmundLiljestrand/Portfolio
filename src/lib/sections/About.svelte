<script>
  import { reveal } from '../actions/reveal.js'

  const skillGroups = [
    {
      label: 'Språk & ramverk',
      items: ['JavaScript', 'TypeScript', 'React', 'Svelte', 'Python', 'Django', 'Node.js', 'Express', 'HTML/CSS'],
    },
    {
      label: 'AI & Data',
      items: ['LangGraph', 'RAG', 'Embeddings', 'Local LLMs (Ollama)', 'spaCy', 'pgvector'],
    },
    {
      label: 'Infrastruktur & drift',
      items: ['Docker', 'Nginx', 'GitHub Actions', 'Safespring (OpenStack)', 'AWS'],
    },
    {
      label: 'Databaser',
      items: ['PostgreSQL', 'MongoDB'],
    },
  ]
</script>

<section id="about" class="container">
  <header class="section-head" use:reveal>
    <span class="section-kicker">Om mig</span>
    <h2 class="section-title">Problemlösaren i systemet</h2>
  </header>

  <div class="about-grid">
    <div class="about-text" use:reveal={{ delay: 0.1 }}>
      <p class="lead">
        Jag är webbutvecklare med en stark frontend-grund i React, TypeScript
        och JavaScript. Under min LIA på Probits hamnade jag djupt i något jag
        inte visste att jag skulle fastna för: backend-arkitektur och AI-system.
      </p>

      <p>
        Jag kom dit med JavaScript och React. Jag lämnade med produktionssatt
        GPU-infrastruktur, autonoma AI-agenter och en förståelse för hur
        distribuerade system faktiskt fungerar — autentisering, asynkrona köer,
        kontraktsgränser mellan tjänster och GDPR-krav som styr arkitekturval.
      </p>

      <p>
        Innan jag kodade jobbade jag som fibertekniker. Det lärde mig att
        felsöka logiska system i skarpt läge, utan facit och ofta ensam. Den
        vanan tar jag med mig till varje kodbas.
      </p>
    </div>

    <div class="about-skills" use:reveal={{ delay: 0.2 }}>
      {#each skillGroups as group}
        <div class="skill-group">
          <h3 class="skill-label">{group.label}</h3>
          <ul class="skill-list">
            {#each group.items as item}
              <li class="skill">{item}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  #about {
    padding-block: var(--space-32);
    border-top: 1px solid var(--border);
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

  .about-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: var(--space-16);
  }

  .about-text .lead {
    font-size: var(--text-xl);
    color: var(--text);
    margin-bottom: var(--space-6);
  }

  .about-text p {
    color: var(--muted);
    margin-bottom: var(--space-6);
    max-width: 60ch;
  }

  .about-text p:last-child {
    margin-bottom: 0;
  }

  .skill-group {
    margin-bottom: var(--space-8);
  }
  .skill-group:last-child {
    margin-bottom: 0;
  }

  .skill-label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: var(--space-4);
    font-weight: 500;
  }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .skill {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--muted);
    transition: color 0.2s, border-color 0.2s;
  }
  .skill:hover {
    color: var(--text);
    border-color: var(--accent);
  }

  @media (max-width: 820px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: var(--space-12);
    }
  }
</style>
