<script>
  import { reveal } from '../actions/reveal.js'

  const skillGroups = [
    {
      label: 'Språk & ramverk',
      color: 'var(--green)',
      items: ['JavaScript', 'TypeScript', 'React', 'Svelte', 'Python', 'Django', 'Node.js', 'Express', 'HTML/CSS'],
    },
    {
      label: 'AI & Data',
      color: 'var(--berry)',
      items: ['LangGraph', 'RAG', 'Embeddings', 'Local LLMs (Ollama)', 'spaCy', 'pgvector'],
    },
    {
      label: 'Infrastruktur & drift',
      color: 'var(--gold)',
      items: ['Docker', 'Nginx', 'GitHub Actions', 'Safespring (OpenStack)', 'AWS'],
    },
    {
      label: 'Databaser',
      color: 'var(--blue)',
      items: ['PostgreSQL', 'MongoDB', 'Supabase', 'DynamoDB'],
    },
  ]
</script>

<section id="about">
  <div class="container">
    <header class="section-head" use:reveal>
      <span class="section-kicker pixel">✦ Om mig</span>
      <h2 class="section-title pixel">Problemlösaren i systemet</h2>
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
          Jag har aldrig varit en naturbegåvning som tar saker på studs — men jag
          ger mig inte. Genom att nöta, göra fel och försöka igen tar jag mig
          dit. Samma envishet bar mig genom hundratals timmar i komplexa system,
          och den tar jag med mig till varje kodbas.
        </p>

        <p>
          Innan jag kodade jobbade jag som fibertekniker. Det lärde mig att
          felsöka logiska system i skarpt läge, utan facit och ofta ensam.
        </p>
      </div>

      <div class="about-skills frame" use:reveal={{ delay: 0.2 }}>
        <span class="inv-title pixel">▸ Inventory</span>
        {#each skillGroups as group}
          <div class="skill-group">
            <h3 class="skill-label" style="--c: {group.color}">{group.label}</h3>
            <ul class="skill-list">
              {#each group.items as item}
                <li class="skill" style="--c: {group.color}">{item}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  #about {
    padding-block: var(--space-32);
    border-top: 2px solid var(--border);
    background: var(--bg-sunken);
  }

  .section-head {
    margin-bottom: var(--space-16);
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

  .about-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: var(--space-16);
    align-items: start;
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

  .about-skills {
    padding: var(--space-8);
  }

  .inv-title {
    display: block;
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--gold);
    margin-bottom: var(--space-6);
  }

  .skill-group {
    margin-bottom: var(--space-6);
  }
  .skill-group:last-child {
    margin-bottom: 0;
  }

  .skill-label {
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c);
    margin-bottom: var(--space-3);
  }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .skill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-ui);
    font-size: var(--text-base);
    letter-spacing: 0.02em;
    padding: 1px var(--space-3);
    border: 2px solid var(--c);
    color: var(--text);
    background: var(--bg);
  }
  .skill::before {
    content: '';
    width: 7px;
    height: 7px;
    background: var(--c);
  }

  @media (max-width: 820px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: var(--space-12);
    }
  }
</style>
