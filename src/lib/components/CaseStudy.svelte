<script>
  import { onMount } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import Rupee from './Rupee.svelte'
  import { theme } from '../theme.svelte.js'
  import { i18n } from '../i18n.svelte.js'
  import { content } from '../content.js'

  const ui = $derived(content[i18n.lang].caseUi)

  gsap.registerPlugin(ScrollTrigger)

  let { id, accent = 'green', index, title, tagline, status = [], problem, role, flow, challenges, stack, learned } = $props()

  let flowEl
  // I ren/kompakt vy startar questen hopfälld (täta rader); i spelvyn öppen
  let open = $state(!(typeof document !== 'undefined' && document.documentElement.classList.contains('plain')))

  function toggle() {
    open = !open
    // höjden ändras när en quest öppnas/stängs → räkna om scroll-positionerna
    setTimeout(() => ScrollTrigger.refresh(), 380)
  }

  // Färgkoda teknik-badges efter roll (RPG-inventory)
  function techColor(name) {
    const n = name.toLowerCase()
    if (/(postgres|mongo|sqlite)/.test(n)) return 'var(--blue)' // databas
    if (/(langgraph|rag|ollama|spacy|pgvector|sentence|embedding|llama|bert)/.test(n)) return 'var(--berry)' // ai/data
    if (/(docker|nginx|github actions|safespring|openstack|aws|\bci\b)/.test(n)) return 'var(--gold)' // infra
    return 'var(--green)' // språk & ramverk
  }

  onMount(() => {
    // Om agenten ber om denna quest medan den är stängd: öppna den först
    const onHighlight = (e) => {
      if (e.detail === id && !open) {
        open = true
        setTimeout(() => ScrollTrigger.refresh(), 380)
      }
    }
    window.addEventListener('agent:highlight', onHighlight)

    // Vid temabyte: fäll ihop i ren vy, fäll ut i spelvy
    const onTheme = (e) => {
      open = !e.detail
      setTimeout(() => ScrollTrigger.refresh(), 380)
    }
    window.addEventListener('theme:change', onTheme)

    const s = getComputedStyle(document.documentElement)
    const accentColor = s.getPropertyValue('--' + accent).trim() || '#8bd94e'
    const muted = s.getPropertyValue('--muted').trim() || '#a8b394'
    const border = s.getPropertyValue('--border-strong').trim() || '#6a8a4e'

    const nodes = flowEl.querySelectorAll('.flow-node')
    const fills = flowEl.querySelectorAll('.flow-line-fill')

    const active = {
      borderColor: accentColor,
      backgroundColor: accentColor,
      color: '#11260f',
      boxShadow: `0 0 10px ${accentColor}`,
    }
    const inactive = {
      borderColor: border,
      backgroundColor: 'transparent',
      color: muted,
      boxShadow: `0 0 0 ${accentColor}00`,
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(nodes, active)
      gsap.set(fills, { scaleY: 1 })
      return () => {
        window.removeEventListener('agent:highlight', onHighlight)
        window.removeEventListener('theme:change', onTheme)
      }
    }

    const ctx = gsap.context(() => {
      gsap.set(nodes, inactive)
      gsap.set(fills, { scaleY: 0, transformOrigin: 'top' })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: flowEl, start: 'top 75%', end: 'bottom 65%', scrub: 1.2 },
      })

      nodes.forEach((node, i) => {
        // steps-easing = pixliga "klick" istället för mjuk glidning
        tl.to(node, { ...active, ease: 'steps(1)', duration: 1 })
        if (fills[i]) tl.to(fills[i], { scaleY: 1, ease: 'none', duration: 1.5 })
      })
    }, flowEl)

    return () => {
      window.removeEventListener('agent:highlight', onHighlight)
      window.removeEventListener('theme:change', onTheme)
      ctx.revert()
    }
  })
</script>

<article {id} class="case scroll" style="--accent: var(--{accent})">
  <span class="scroll-rod scroll-rod--top" aria-hidden="true"></span>
  <div class="scroll-paper">
  <header class="case-head">
    <span class="case-index pixel">{theme.plain ? `${ui.project} ${index}` : `${ui.quest} ${index}`}</span>
    <h3 class="case-title pixel">{title}</h3>
    <p class="case-tagline">{tagline}</p>

    {#if status.length}
      <ul class="status">
        {#each status as s}
          <li class="status-item"><span class="dot"></span>{s}</li>
        {/each}
      </ul>
    {/if}

    <button class="case-toggle" type="button" onclick={toggle} aria-expanded={open}>
      {theme.plain ? (open ? ui.showLess : ui.showMore) : (open ? ui.rollUp : ui.unroll)}
    </button>
  </header>

  <div class="case-body" class:open>
    <div class="case-body-inner">

  <div class="case-grid">
    <div class="case-block">
      <h4 class="block-label pixel">{theme.plain ? ui.problemPlain : ui.problem}</h4>
      <p>{problem}</p>
    </div>
    <div class="case-block">
      <h4 class="block-label pixel">{theme.plain ? ui.rolePlain : ui.role}</h4>
      <p>{role}</p>
    </div>
  </div>

  <div class="case-block">
    <h4 class="block-label pixel">{theme.plain ? ui.howPlain : ui.how}</h4>
    <ol class="flow" bind:this={flowEl}>
      {#each flow as step, i}
        <li class="flow-step">
          <div class="flow-rail">
            <span class="flow-node pixel">{i + 1}</span>
            {#if i < flow.length - 1}
              <span class="flow-line"><span class="flow-line-fill"></span></span>
            {/if}
          </div>
          <div class="flow-text">
            <strong>{step.title}</strong>
            {#if step.detail}<span>{step.detail}</span>{/if}
          </div>
        </li>
      {/each}
    </ol>
  </div>

  <div class="case-block">
    <h4 class="block-label pixel">{theme.plain ? ui.challengesPlain : ui.challenges}</h4>
    <ul class="challenges">
      {#each challenges as c}
        <li class="challenge">
          <strong>{c.title}</strong>
          <p>{c.body}</p>
        </li>
      {/each}
    </ul>
  </div>

  <div class="case-block">
    <h4 class="block-label pixel">{theme.plain ? ui.techPlain : ui.tech}</h4>
    <ul class="inv-grid">
      {#each stack as tech}
        <li class="inv-slot" style="--c: {techColor(tech)}">
          <Rupee />
          <span>{tech}</span>
        </li>
      {/each}
    </ul>
  </div>

  <div class="learned">
    <h4 class="block-label pixel">{theme.plain ? ui.learnedPlain : ui.learned}</h4>
    <p>{learned}</p>
  </div>

    </div>
  </div>
  </div>
  <span class="scroll-rod scroll-rod--bottom" aria-hidden="true"></span>
</article>

<style>
  .case {
    position: relative;
  }

  /* Pergamentrulle: trästavar i topp/botten, varmt åldrat papper emellan.
     När den rullas ihop kryper bottenstaven upp mot rubriken. */
  .scroll-paper {
    position: relative;
    padding: clamp(1.5rem, 4vw, 2.75rem);
    background-color: #2c2417;
    background-image:
      repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0 2px, transparent 2px 4px),
      radial-gradient(120% 80% at 50% 0%, rgba(247, 203, 77, 0.07), transparent 60%),
      linear-gradient(180deg, #332a18, #2a2214);
    border-left: 3px solid #15110a;
    border-right: 3px solid #15110a;
    box-shadow:
      inset 0 0 44px rgba(0, 0, 0, 0.45),
      inset 0 0 0 1px rgba(247, 203, 77, 0.08);
  }

  .scroll-rod {
    display: block;
    position: relative;
    height: 32px;
    margin-inline: -10px;
    z-index: 2;
    background: linear-gradient(
      to bottom,
      #1b130a 0%,
      #6e4f22 20%,
      #a9772f 40%,
      #e0b15c 50%,
      #a9772f 60%,
      #6e4f22 80%,
      #1b130a 100%
    );
    border: 2px solid #100b06;
  }
  /* runda knoppar i ändarna på staven */
  .scroll-rod::before,
  .scroll-rod::after {
    content: "";
    position: absolute;
    top: -6px;
    bottom: -6px;
    width: 18px;
    background: linear-gradient(to bottom, #1b130a, #c79a36 50%, #1b130a);
    border: 2px solid #100b06;
  }
  .scroll-rod::before { left: -14px; }
  .scroll-rod::after { right: -14px; }
  .scroll-rod--top { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.45); }
  .scroll-rod--bottom { box-shadow: 0 -8px 16px rgba(0, 0, 0, 0.45); }

  .case-head {
    margin-bottom: var(--space-12);
  }

  .case-toggle {
    position: absolute;
    top: clamp(1.5rem, 4vw, 2.75rem);
    right: clamp(1.5rem, 4vw, 2.75rem);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--accent);
    background: var(--bg-sunken);
    border: 2px solid var(--border-strong);
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
    transition: border-color 0.1s, color 0.1s, transform 0.1s steps(2);
  }
  .case-toggle:hover {
    border-color: var(--accent);
    transform: translate(-1px, -1px);
  }
  @media (max-width: 640px) {
    .case-toggle {
      position: static;
      margin-top: var(--space-6);
    }
  }

  /* Mjuk collapse utan att mäta höjd i JS: grid-rows 1fr <-> 0fr */
  .case-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.35s ease;
  }
  .case-body.open {
    grid-template-rows: 1fr;
  }
  .case-body-inner {
    overflow: hidden;
    min-height: 0;
  }

  .case-index {
    font-size: var(--text-xs);
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .case-title {
    font-size: clamp(1.1rem, 3vw, 1.75rem);
    line-height: 1.4;
    margin: var(--space-4) 0 var(--space-4);
    color: var(--accent);
    text-shadow: 2px 2px 0 var(--bg-sunken);
  }

  .case-tagline {
    font-size: var(--text-lg);
    color: var(--muted);
    max-width: 60ch;
  }

  .status {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
    margin-top: var(--space-6);
  }
  .status-item {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-ui);
    font-size: var(--text-base);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .dot {
    width: 9px;
    height: 9px;
    background: var(--accent);
    box-shadow: 2px 2px 0 var(--bg-sunken);
  }

  .case-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
    margin-bottom: var(--space-12);
  }

  .case-block {
    margin-bottom: var(--space-12);
  }

  .block-label {
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--gold);
    margin-bottom: var(--space-6);
  }

  .case-block > p {
    color: var(--text);
    max-width: 65ch;
  }

  .flow {
    display: flex;
    flex-direction: column;
  }
  .flow-step {
    display: flex;
    gap: var(--space-4);
    padding-bottom: var(--space-6);
  }
  .flow-step:last-child {
    padding-bottom: 0;
  }
  .flow-rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
  }
  .flow-node {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border: 2px solid var(--border-strong);
    color: var(--muted);
    font-size: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-sunken);
  }
  .flow-line {
    flex: 1;
    width: 3px;
    min-height: var(--space-6);
    margin-block: 3px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }
  .flow-line-fill {
    position: absolute;
    inset: 0;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: top;
  }
  .flow-text {
    padding-top: 4px;
    padding-bottom: var(--space-4);
  }
  .flow-text strong {
    color: var(--text);
    font-weight: 400;
    display: block;
    font-size: var(--text-lg);
  }
  .flow-text span {
    color: var(--muted);
    font-size: var(--text-base);
  }

  .challenges {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }
  .challenge {
    border-left: 4px solid var(--accent);
    padding: var(--space-2) var(--space-4);
    background: var(--bg-sunken);
  }
  .challenge strong {
    color: var(--gold);
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    letter-spacing: 0.03em;
    display: block;
    margin-bottom: var(--space-1);
  }
  .challenge p {
    color: var(--text);
    font-size: var(--text-base);
  }


  .learned {
    border-top: 2px solid var(--border);
    padding-top: var(--space-8);
  }
  .learned .block-label {
    color: var(--gold);
  }
  .learned p {
    color: var(--text);
    font-size: var(--text-lg);
    max-width: 65ch;
    font-style: italic;
  }

  @media (max-width: 640px) {
    .case-grid,
    .challenges {
      grid-template-columns: 1fr;
    }
  }
</style>
