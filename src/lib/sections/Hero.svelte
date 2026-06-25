<script>
  import { onMount } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { i18n } from '../i18n.svelte.js'
  import { content } from '../content.js'

  gsap.registerPlugin(ScrollTrigger)

  const t = $derived(content[i18n.lang].hero)

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
    <p class="eyebrow"><span class="arrow">▶</span> {t.eyebrow}</p>

    <h1 class="name pixel">
      Emund<br />Liljestrand
    </h1>

    <p class="lead">{t.lead}</p>

    <p class="body">
      {t.bodyPre}<span class="hl">{t.bodyHl}</span>{t.bodyPost}
    </p>

    <nav class="cta" aria-label="Snabbnavigering">
      <a href="#projects" class="btn btn-primary pixel">{t.ctaProjects}</a>
      <a href="#contact" class="btn btn-ghost pixel">{t.ctaContact}</a>
    </nav>
    </div>

    <div class="hero-portrait frame">
      <img src="/emund-portrait.png" alt="Pixelporträtt av Emund Liljestrand" width="300" height="300" />
    </div>
  </div>

  <!-- Levande eldflugor ovanpå pixel-art-bakgrunden -->
  <div class="hero-fireflies" aria-hidden="true">
    <span class="firefly ff-gold"></span>
    <span class="firefly ff-navi"></span>
    <span class="firefly ff-gold"></span>
    <span class="firefly ff-navi"></span>
  </div>
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
    /* Pixel-art-bakgrund + scrim (mörkare till vänster där texten sitter).
       Fast bakgrund → parallax när man scrollar. */
    background-image:
      linear-gradient(to right, rgba(8, 14, 10, 0.55), rgba(8, 14, 10, 0.18) 55%, rgba(8, 14, 10, 0.05)),
      url('/bg-hero.webp');
    background-size: cover, cover;
    background-position: center, center;
    background-attachment: scroll, fixed;
    background-repeat: no-repeat, no-repeat;
  }
  /* Mobil: sektionen blir transparent → det fasta mobil-lagret (.page-bg) syns */
  @media (max-width: 768px) {
    #hero { background: transparent; }
  }

  /* ── Eldflugor ── små glödande motes som svävar */
  .hero-fireflies {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 5;
  }
  .firefly {
    position: absolute;
    width: 4px;
    height: 4px;
    opacity: 0;
  }
  .ff-gold {
    background: var(--gold);
    box-shadow: 0 0 8px 2px color-mix(in srgb, var(--gold) 70%, transparent);
  }
  .ff-navi {
    background: var(--navi);
    box-shadow: 0 0 8px 2px color-mix(in srgb, var(--navi) 70%, transparent);
  }
  .firefly:nth-child(1) { left: 16%; top: 64%; animation: ff-drift-a 11s ease-in-out infinite; }
  .firefly:nth-child(2) { left: 38%; top: 72%; animation: ff-drift-b 14s ease-in-out infinite 2s; }
  .firefly:nth-child(3) { left: 70%; top: 60%; animation: ff-drift-a 13s ease-in-out infinite 4s; }
  .firefly:nth-child(4) { left: 86%; top: 70%; animation: ff-drift-b 12s ease-in-out infinite 1s; }
  @keyframes ff-drift-a {
    0%   { transform: translate(0, 0);        opacity: 0; }
    15%  { opacity: 0.9; }
    50%  { transform: translate(34px, -46px); opacity: 0.7; }
    85%  { opacity: 0.2; }
    100% { transform: translate(64px, -8px);  opacity: 0; }
  }
  @keyframes ff-drift-b {
    0%   { transform: translate(0, 0);         opacity: 0; }
    20%  { opacity: 0.8; }
    55%  { transform: translate(-30px, -52px); opacity: 0.6; }
    90%  { opacity: 0.15; }
    100% { transform: translate(-50px, -12px); opacity: 0; }
  }

  .hero-grid {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-12);
  }

  .hero-inner {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 auto;
    max-width: 600px;
  }

  .hero-portrait {
    flex: 0 0 auto;
    z-index: 10;
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
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  }
  .eyebrow .arrow {
    color: var(--gold);
  }

  .name {
    font-size: clamp(1.5rem, 4.5vw, 2.75rem);
    line-height: 1.2;
    color: var(--text);
    text-shadow: 3px 3px 0 var(--bg-sunken), 0 2px 12px rgba(0, 0, 0, 0.5);
    margin-bottom: var(--space-6);
  }

  .lead {
    font-size: clamp(1.25rem, 2.6vw, 1.625rem);
    font-style: italic;
    color: var(--text);
    margin-bottom: var(--space-4);
    max-width: 34ch;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  }

  .body {
    font-size: var(--text-lg);
    color: var(--text);
    max-width: 58ch;
    margin-bottom: var(--space-8);
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.7);
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
    background: color-mix(in srgb, var(--bg) 55%, transparent);
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
    .eyebrow { font-size: var(--text-base); }
  }

  @media (prefers-reduced-motion: reduce) {
    .eyebrow, .name, .lead, .body, .cta {
      opacity: 1;
      transform: none;
      animation: none;
    }
    .hero-portrait { animation: none; }
    .firefly { animation: none; opacity: 0; }
  }
</style>
