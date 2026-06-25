<script>
  import CaseStudy from '../components/CaseStudy.svelte'
  import { reveal } from '../actions/reveal.js'
  import { theme } from '../theme.svelte.js'
  import { i18n } from '../i18n.svelte.js'
  import { content } from '../content.js'

  // Språkoberoende fält (id, accent, index, status, stack) bor här;
  // textfälten kommer från ordboken och slås ihop per språk.
  const base = {
    chatbot: {
      id: 'project-chatbot',
      accent: 'blue',
      index: '01',
      status: ['Local LLM', 'GDPR by design', 'RAG', 'SSE-streaming'],
      stack: [
        'Python', 'Django', 'Django REST Framework', 'spaCy', 'pgvector',
        'sentence-transformers', 'Ollama', 'SSE', 'PostgreSQL', 'Docker', 'GitHub Actions',
      ],
    },
    agent: {
      id: 'project-agent',
      accent: 'sand',
      index: '02',
      status: ['Async pipeline', 'GDPR-safe', 'Local LLM', 'Human-in-loop'],
      stack: [
        'Python', 'Django', 'LangGraph', 'FastAPI', 'Ollama (llama3.1:8b)',
        'Django-Q2', 'PostgreSQL', 'Docker', 'Safespring (OpenStack)', 'REST API', 'GitHub Actions',
      ],
    },
  }

  const c = $derived(content[i18n.lang])
  const coachChatbot = $derived({ ...base.chatbot, ...c.cases.chatbot })
  const coachAgent = $derived({ ...base.agent, ...c.cases.agent })
</script>

<section id="projects">
  <div class="container">
    <header class="section-head" use:reveal>
      <span class="section-kicker pixel">{theme.plain ? c.projects.kickerPlain : '✦ ' + c.projects.kicker}</span>
      <h2 class="section-title pixel">{c.projects.title}</h2>
    </header>

    <div class="case-list">
      <CaseStudy {...coachChatbot} />
      <CaseStudy {...coachAgent} />
    </div>
  </div>
</section>

<style>
  #projects {
    position: relative;
    overflow: hidden;
    padding-block: var(--space-32);
    /* Pixel-art-bakgrund + scrim, fast bakgrund → parallax */
    background-image:
      radial-gradient(78% 92% at 50% 50%, rgba(10, 18, 12, 0.5), rgba(10, 18, 12, 0.26)),
      url('/bg-projekt.webp');
    background-size: cover, cover;
    background-position: center, center;
    background-attachment: scroll, fixed;
    background-repeat: no-repeat, no-repeat;
  }
  #projects > .container {
    position: relative;
    z-index: 1;
  }
  @media (max-width: 768px) {
    #projects { background-attachment: scroll, scroll; }
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
    text-shadow: 0 0 10px color-mix(in srgb, var(--gold) 55%, transparent);
  }

  .section-title {
    font-size: clamp(1.25rem, 3.5vw, 2rem);
    line-height: 1.4;
    margin-top: var(--space-4);
    color: var(--text);
    text-shadow: 3px 3px 0 var(--bg-sunken);
  }
</style>
