<script>
  import { onMount } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  let { index, title, tagline, status = [], problem, role, flow, challenges, stack, learned } = $props()

  let flowEl

  // Färgkoda teknik-badges efter roll (RPG-inventory)
  function techColor(name) {
    const n = name.toLowerCase()
    if (/(postgres|mongo|sqlite)/.test(n)) return 'var(--blue)' // databas
    if (/(langgraph|rag|ollama|spacy|pgvector|sentence|embedding|llama|bert)/.test(n)) return 'var(--berry)' // ai/data
    if (/(docker|nginx|github actions|safespring|openstack|aws|\bci\b)/.test(n)) return 'var(--gold)' // infra
    return 'var(--green)' // språk & ramverk
  }

  onMount(() => {
    const s = getComputedStyle(document.documentElement)
    const green = s.getPropertyValue('--green').trim() || '#8bd94e'
    const muted = s.getPropertyValue('--muted').trim() || '#a8b394'
    const border = s.getPropertyValue('--border-strong').trim() || '#6a8a4e'

    const nodes = flowEl.querySelectorAll('.flow-node')
    const fills = flowEl.querySelectorAll('.flow-line-fill')

    const active = {
      borderColor: green,
      backgroundColor: green,
      color: '#11260f',
      boxShadow: `3px 3px 0 ${muted}33`,
    }
    const inactive = {
      borderColor: border,
      backgroundColor: 'transparent',
      color: muted,
      boxShadow: `0 0 0 ${green}00`,
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(nodes, active)
      gsap.set(fills, { scaleY: 1 })
      return
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

    return () => ctx.revert()
  })
</script>

<article class="case frame">
  <header class="case-head">
    <span class="case-index pixel">Quest {index}</span>
    <h3 class="case-title pixel">{title}</h3>
    <p class="case-tagline">{tagline}</p>

    {#if status.length}
      <ul class="status">
        {#each status as s}
          <li class="status-item"><span class="dot"></span>{s}</li>
        {/each}
      </ul>
    {/if}
  </header>

  <div class="case-grid">
    <div class="case-block">
      <h4 class="block-label pixel">▸ Problemet</h4>
      <p>{problem}</p>
    </div>
    <div class="case-block">
      <h4 class="block-label pixel">▸ Min roll</h4>
      <p>{role}</p>
    </div>
  </div>

  <div class="case-block">
    <h4 class="block-label pixel">▸ Så fungerar det</h4>
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
    <h4 class="block-label pixel">▸ Tekniska utmaningar</h4>
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
    <h4 class="block-label pixel">▸ Inventory</h4>
    <ul class="stack">
      {#each stack as tech}
        <li class="badge" style="--c: {techColor(tech)}">{tech}</li>
      {/each}
    </ul>
  </div>

  <div class="learned">
    <h4 class="block-label pixel">★ Vad jag lärde mig</h4>
    <p>{learned}</p>
  </div>
</article>

<style>
  .case {
    padding: clamp(1.5rem, 4vw, 2.75rem);
  }

  .case-head {
    margin-bottom: var(--space-12);
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
    color: var(--green);
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
    background: var(--green);
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
    background: var(--green);
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
    border-left: 4px solid var(--clay);
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

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-3);
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-ui);
    font-size: var(--text-base);
    letter-spacing: 0.03em;
    padding: 2px var(--space-3);
    border: 2px solid var(--c);
    color: var(--text);
    background: var(--bg-sunken);
  }
  .badge::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--c);
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
