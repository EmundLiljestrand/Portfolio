<script>
  import { onMount } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { reveal } from '../actions/reveal.js'
  import Rupee from '../components/Rupee.svelte'
  import { theme } from '../theme.svelte.js'
  import { i18n } from '../i18n.svelte.js'
  import { content } from '../content.js'

  const a = $derived(content[i18n.lang].about)

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
      items: ['JavaScript', 'TypeScript', 'React', 'Svelte', 'Node.js', 'Express', 'Python', 'Django', 'HTML/CSS', 'REST APIs'],
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
      items: ['Docker', 'Nginx', 'Cloudflare (Workers/Pages)', 'Safespring (OpenStack)', 'AWS', 'Linux', 'GitHub Actions'],
    },
    {
      key: 'databases',
      label: 'Databaser',
      color: 'var(--blue)',
      items: ['PostgreSQL', 'MongoDB', 'Supabase', 'DynamoDB'],
    },
    {
      key: 'tools',
      label: 'Verktyg & arbetssätt',
      color: 'var(--sand)',
      items: ['Git', 'GitHub', 'Azure DevOps', 'Agile/Scrum'],
    },
    {
      key: 'design',
      label: 'Design & UX',
      color: 'var(--clay)',
      items: ['UX/UI', 'Responsiv design'],
    },
  ]

  const totalSkills = skillGroups.reduce((n, g) => n + g.items.length, 0)
</script>

<section id="about">
  <div class="container">
    <header class="section-head" use:reveal>
      <span class="section-kicker pixel">{theme.plain ? a.kicker : '✦ ' + a.kicker}</span>
      <h2 class="section-title pixel">{a.title}</h2>
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
          <p class="lead">{a.leadPre}<span class="nb">{a.leadNb}</span>{a.leadPost}</p>
        </div>

        <p>{a.p2}</p>
        <p>{a.p3}</p>
        <p>{a.p4}</p>
      </div>

      <div class="inventory frame" bind:this={invEl}>
        <span class="inv-title pixel">
          {theme.plain ? a.invTitlePlain : '▸ ' + a.invTitle}
          {#if !theme.plain}<span class="inv-count">{totalSkills} {a.slots}</span>{/if}
        </span>
        {#each skillGroups as group}
          <div class="inv-group" id="skill-{group.key}" style="--c: {group.color}">
            <h3 class="inv-label">{a.groups[group.key]}</h3>
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
    position: relative;
    overflow: hidden;
    padding-block: var(--space-32);
    border-top: 2px solid var(--border);
    /* Pixel-art-bakgrund (förtrollad skog) + scrim, fast → parallax */
    background-image:
      radial-gradient(78% 92% at 50% 50%, rgba(10, 18, 12, 0.52), rgba(10, 18, 12, 0.3)),
      url('/bg-about.webp');
    background-size: cover, cover;
    background-position: center, center;
    background-attachment: scroll, fixed;
    background-repeat: no-repeat, no-repeat;
  }
  #about > .container {
    position: relative;
    z-index: 1;
  }
  /* Mobil: transparent → det fasta mobil-lagret (.page-bg) syns */
  @media (max-width: 768px) {
    #about { background: transparent; }
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

  /* text ligger direkt på skogsbilden → ljus färg + skugga för stark läsbarhet */
  .about-text {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  }
  .about-text .lead {
    font-size: var(--text-xl);
    color: var(--text);
  }
  .about-text p {
    color: var(--text);
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
