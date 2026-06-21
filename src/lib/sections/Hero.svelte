<script>
  import { onMount } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  let heroEl

  onMount(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-inner', {
        yPercent: 10,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroEl)

    return () => ctx.revert()
  })
</script>

<section id="hero" bind:this={heroEl}>
  <div class="container hero-inner">
    <p class="eyebrow"><span class="arrow">▶</span> Webbutvecklare · Kristinehamn</p>

    <h1 class="name pixel">
      Emund<br />Liljestrand<span class="cursor" aria-hidden="true">▮</span>
    </h1>

    <p class="lead">
      Jag löser problem — oavsett var i stacken lösningen sitter.
    </p>

    <p class="body">
      Nyutexaminerad utvecklare med en envishet jag tagit med mig från
      tusentals timmar i komplexa system: jag sitter kvar tills det funkar.
      Under min LIA byggde jag AI-system i produktionsnära miljö —
      <span class="hl">på riktigt, inte som demos.</span>
    </p>

    <nav class="cta" aria-label="Snabbnavigering">
      <a href="#projects" class="btn btn-primary pixel">Se mina projekt</a>
      <a href="#contact" class="btn btn-ghost pixel">Kontakt</a>
    </nav>
  </div>

  <a href="#projects" class="scroll-hint pixel" aria-label="Scrolla till projekt">▼</a>

  <div class="hero-ground" aria-hidden="true"></div>
</section>

<style>
  #hero {
    position: relative;
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    padding-block: var(--space-16);
    overflow: hidden;
  }

  .hero-ground {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 96px;
    background: url('/treeline.svg') repeat-x bottom / 120px 96px;
    image-rendering: pixelated;
    opacity: 0.9;
    pointer-events: none;
    z-index: 0;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 760px;
  }

  .eyebrow,
  .name,
  .lead,
  .body,
  .cta {
    opacity: 0;
    transform: translateY(14px);
    animation: rise 0.6s steps(8) forwards;
  }
  .eyebrow { animation-delay: 0.05s; }
  .name    { animation-delay: 0.18s; }
  .lead    { animation-delay: 0.34s; }
  .body    { animation-delay: 0.46s; }
  .cta     { animation-delay: 0.58s; }

  @keyframes rise {
    to { opacity: 1; transform: translateY(0); }
  }

  .eyebrow {
    font-family: var(--font-ui);
    font-size: var(--text-xl);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: var(--space-6);
  }
  .eyebrow .arrow {
    color: var(--gold);
  }

  .name {
    font-size: clamp(1.5rem, 4.5vw, 2.75rem);
    line-height: 1.35;
    color: var(--text);
    text-shadow: 3px 3px 0 var(--bg-sunken);
    margin-bottom: var(--space-8);
  }

  .cursor {
    color: var(--green);
    margin-left: 0.1em;
    animation: blink 1s steps(1) infinite;
  }
  @keyframes blink {
    0%, 50% { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }

  .lead {
    font-size: clamp(1.25rem, 2.6vw, 1.625rem);
    font-style: italic;
    color: var(--text);
    margin-bottom: var(--space-6);
    max-width: 34ch;
  }

  .body {
    font-size: var(--text-lg);
    color: var(--muted);
    max-width: 58ch;
    margin-bottom: var(--space-12);
  }

  .hl {
    color: var(--gold);
    font-style: italic;
  }

  .cta {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-xs);
    text-transform: uppercase;
    border: 2px solid;
    transition: transform 0.1s steps(2), background 0.1s, color 0.1s;
  }

  .btn-primary {
    background: var(--gold);
    border-color: var(--gold-dim);
    color: #20180a;
  }
  .btn-primary:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--bg-sunken);
  }

  .btn-ghost {
    background: transparent;
    border-color: var(--border-strong);
    color: var(--text);
  }
  .btn-ghost:hover {
    border-color: var(--green);
    color: var(--green);
  }

  .scroll-hint {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
    color: var(--gold);
    font-size: var(--text-base);
    animation: bob 1.6s steps(4) infinite;
  }
  @keyframes bob {
    0%, 100% { transform: translate(-50%, 0); }
    50%      { transform: translate(-50%, 6px); }
  }

  @media (max-width: 640px) {
    .scroll-hint { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .eyebrow, .name, .lead, .body, .cta {
      opacity: 1;
      transform: none;
      animation: none;
    }
    .cursor, .scroll-hint { animation: none; }
  }
</style>
