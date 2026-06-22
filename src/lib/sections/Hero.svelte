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
  <div class="container hero-grid">
    <div class="hero-inner">
    <p class="eyebrow"><span class="arrow">▶</span> Webbutvecklare · Kristinehamn</p>

    <h1 class="name pixel">
      Emund<br />Liljestrand
    </h1>

    <p class="lead">
      Jag löser problem, oavsett var i stacken lösningen sitter.
    </p>

    <p class="body">
      Nyexaminerad webbutvecklare som <span class="hl">inte ger upp förrän
      koden funkar</span>. Under min LIA dök jag ner i AI och byggde
      autonoma agenter, RAG-pipelines och lösningar med lokala språkmodeller.
    </p>

    <nav class="cta" aria-label="Snabbnavigering">
      <a href="#projects" class="btn btn-primary pixel">Se mina projekt</a>
      <a href="#contact" class="btn btn-ghost pixel">Kontakt</a>
    </nav>
    </div>

    <div class="hero-portrait frame">
      <img src="/emund-portrait.png" alt="Pixelporträtt av Emund Liljestrand" width="300" height="300" />
    </div>
  </div>

  <div class="hero-ground" aria-hidden="true"></div>
</section>

<style>
  #hero {
    position: relative;
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    padding-top: var(--space-8);
    padding-bottom: var(--space-12);
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
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  .hero-grid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-12);
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 auto;
    max-width: 600px;
  }

  .hero-portrait {
    flex: 0 0 auto;
    z-index: 1;
    padding: var(--space-2);
    box-shadow: 6px 6px 0 var(--bg-sunken);
    animation: float 4.5s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }
  .hero-portrait img {
    width: clamp(200px, 22vw, 290px);
    height: auto;
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
    margin-bottom: var(--space-4);
  }
  .eyebrow .arrow {
    color: var(--gold);
  }

  .name {
    font-size: clamp(1.5rem, 4.5vw, 2.75rem);
    line-height: 1.2;
    color: var(--text);
    text-shadow: 3px 3px 0 var(--bg-sunken);
    margin-bottom: var(--space-6);
  }

  .lead {
    font-size: clamp(1.25rem, 2.6vw, 1.625rem);
    font-style: italic;
    color: var(--text);
    margin-bottom: var(--space-4);
    max-width: 34ch;
  }

  .body {
    font-size: var(--text-lg);
    color: var(--muted);
    max-width: 58ch;
    margin-bottom: var(--space-8);
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

  @media (max-width: 820px) {
    .hero-grid {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-8);
    }
    .hero-portrait {
      order: -1;
      align-self: center;
    }
    .hero-portrait img { width: clamp(180px, 45vw, 230px); }
  }

  @media (max-width: 640px) {
    .hero-ground { display: none; }
    .eyebrow { font-size: var(--text-base); }
  }

  @media (prefers-reduced-motion: reduce) {
    .eyebrow, .name, .lead, .body, .cta {
      opacity: 1;
      transform: none;
      animation: none;
    }
    .hero-portrait { animation: none; }
  }
</style>
