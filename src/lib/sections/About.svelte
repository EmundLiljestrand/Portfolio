<script>
  import { onMount } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { reveal } from '../actions/reveal.js'
  import Rupee from '../components/Rupee.svelte'

  gsap.registerPlugin(ScrollTrigger)

  let invEl

  // Item-slotsen "samlas" in en i taget när inventoryt scrollar in i vyn
  onMount(() => {
    const slots = invEl.querySelectorAll('.inv-slot')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      gsap.set(slots, { opacity: 0, scale: 0.5 })
      gsap.to(slots, {
        opacity: 1,
        scale: 1,
        ease: 'steps(4)',
        duration: 0.3,
        stagger: 0.03,
        scrollTrigger: { trigger: invEl, start: 'top 80%', once: true },
      })
    }, invEl)

    return () => ctx.revert()
  })

  const skillGroups = [
    {
      key: 'languages',
      label: 'Språk & ramverk',
      color: 'var(--green)',
      items: ['JavaScript', 'TypeScript', 'React', 'Svelte', 'Python', 'Django', 'Node.js', 'Express', 'HTML/CSS'],
    },
    {
      key: 'ai',
      label: 'AI & Data',
      color: 'var(--berry)',
      items: ['LangGraph', 'RAG', 'Embeddings', 'Local LLMs (Ollama)', 'spaCy', 'pgvector'],
    },
    {
      key: 'infra',
      label: 'Infrastruktur & drift',
      color: 'var(--gold)',
      items: ['Docker', 'Nginx', 'GitHub Actions', 'Safespring (OpenStack)', 'AWS'],
    },
    {
      key: 'databases',
      label: 'Databaser',
      color: 'var(--blue)',
      items: ['PostgreSQL', 'MongoDB', 'Supabase', 'DynamoDB'],
    },
  ]

  const totalSkills = skillGroups.reduce((n, g) => n + g.items.length, 0)
</script>

<section id="about">
  <div class="container">
    <header class="section-head" use:reveal>
      <span class="section-kicker pixel">✦ Om mig</span>
      <h2 class="section-title pixel">Problemlösaren i systemet</h2>
    </header>

    <div class="about-grid">
      <div class="about-text" use:reveal={{ delay: 0.1 }}>
        <div class="about-intro">
          <img
            class="about-img frame"
            src="/emund-desk.png"
            alt="Pixelillustration av Emund vid en retrodator"
            width="220"
            height="220"
          />
          <p class="lead">
            Jag är webbutvecklare med en frontend-grund i React, TypeScript och
            JavaScript. Under min LIA på Probits hamnade jag i något jag inte
            visste att jag skulle fastna för: backend-arkitektur och
            <span class="nb">AI-system</span>.
          </p>
        </div>

        <p>
          Jag började med JavaScript och React. Sedan dess har jag lärt mig att
          bygga autonoma AI-agenter, köra lokala språkmodeller på GPU och förstå
          hur ett större system faktiskt fungerar: inloggning och säkerhet,
          asynkrona köer, hur olika tjänster pratar med varandra, och GDPR-krav
          som formar hela arkitekturen.
        </p>

        <p>
          Det jag drivs av är att förstå hela bilden och veta varför något
          fungerar, inte bara att få det att gå. Helst sitter jag med problem
          som spänner över flera lager och kräver att man ser hur delarna spelar
          ihop.
        </p>

        <p>
          Nu söker jag mitt nästa kliv som utvecklare. Jag är öppen för det mesta
          och vill framför allt fortsätta växa och lösa riktiga problem. Att få
          jobba mer med AI lockar, men det är ett plus snarare än ett krav.
        </p>
      </div>

      <div class="inventory frame" bind:this={invEl}>
        <span class="inv-title pixel">▸ Inventory <span class="inv-count">{totalSkills} slots</span></span>
        {#each skillGroups as group}
          <div class="inv-group" id="skill-{group.key}" style="--c: {group.color}">
            <h3 class="inv-label">{group.label}</h3>
            <ul class="inv-grid">
              {#each group.items as item}
                <li class="inv-slot">
                  <Rupee />
                  <span>{item}</span>
                </li>
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
    color: var(--berry);
    text-shadow: 0 0 10px color-mix(in srgb, var(--berry) 60%, transparent);
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

  .about-intro {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    margin-bottom: var(--space-6);
  }

  .about-text .lead {
    font-size: var(--text-xl);
    color: var(--text);
  }
  .about-text p {
    color: var(--muted);
    margin-bottom: var(--space-6);
    max-width: 60ch;
  }
  .about-text p:last-child {
    margin-bottom: 0;
  }

  .about-img {
    flex-shrink: 0;
    width: clamp(180px, 40%, 270px);
    padding: var(--space-2);
    box-shadow: 5px 5px 0 var(--bg-sunken);
  }
  @media (max-width: 640px) {
    .about-img {
      display: none;
    }
  }

  .inventory {
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

  .inv-group {
    margin-bottom: var(--space-6);
  }
  .inv-group:last-child {
    margin-bottom: 0;
  }

  .inv-label {
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c);
    margin-bottom: var(--space-3);
  }

  .inv-count {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    letter-spacing: 0.02em;
    color: var(--muted);
  }

  .nb {
    white-space: nowrap;
  }

  @media (max-width: 820px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: var(--space-12);
    }
  }
</style>
