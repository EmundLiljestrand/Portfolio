<section id="hero">
  <div class="container hero-inner">
    <p class="eyebrow">Webbutvecklare · Karlstad</p>

    <h1 class="name">
      Emund<br />Liljestrand
    </h1>

    <p class="lead">
      Jag löser problem — oavsett var i stacken lösningen sitter.
    </p>

    <p class="body">
      Under min LIA gick jag från React och JavaScript till produktionssatt
      AI-infrastruktur: autonoma agenter, GDPR-säkra system och GPU-drift som
      lever i skarp miljö. <span class="hl">Jag bygger system, inte demos.</span>
    </p>

    <div class="cta">
      <a href="#projects" class="btn btn-primary">Se mina projekt</a>
      <a href="#contact" class="btn btn-ghost">Kontakt</a>
    </div>
  </div>

  <a href="#projects" class="scroll-hint" aria-label="Scrolla till projekt">
    <span></span>
  </a>
</section>

<style>
  #hero {
    position: relative;
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
  }

  .hero-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 820px;
  }

  /* Staggered entrance */
  .eyebrow,
  .name,
  .lead,
  .body,
  .cta {
    opacity: 0;
    transform: translateY(16px);
    animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .eyebrow { animation-delay: 0.05s; }
  .name    { animation-delay: 0.15s; }
  .lead    { animation-delay: 0.30s; }
  .body    { animation-delay: 0.42s; }
  .cta     { animation-delay: 0.54s; }

  @keyframes rise {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: var(--space-6);
  }

  .name {
    font-size: clamp(2.75rem, 9vw, 5.5rem);
    line-height: 0.98;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text);
    margin-bottom: var(--space-8);
  }

  .lead {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 500;
    color: var(--text);
    margin-bottom: var(--space-6);
    max-width: 36ch;
  }

  .body {
    font-size: var(--text-lg);
    color: var(--muted);
    max-width: 56ch;
    margin-bottom: var(--space-12);
  }

  .hl {
    color: var(--text);
    font-weight: 500;
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
    border-radius: 8px;
    font-size: var(--text-base);
    font-weight: 500;
    letter-spacing: 0.01em;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease,
      border-color 0.2s ease, color 0.2s ease;
  }

  .btn-primary {
    background: var(--accent);
    color: #07140d;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 30%, transparent);
  }

  .btn-ghost {
    border: 1px solid var(--border);
    color: var(--text);
  }
  .btn-ghost:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Scroll hint */
  .scroll-hint {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
    width: 26px;
    height: 42px;
    border: 2px solid var(--border);
    border-radius: 14px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
  .scroll-hint span {
    width: 4px;
    height: 8px;
    border-radius: 2px;
    background: var(--accent);
    animation: scroll-bob 1.6s ease-in-out infinite;
  }

  @keyframes scroll-bob {
    0%   { transform: translateY(0);    opacity: 1; }
    70%  { transform: translateY(12px); opacity: 0; }
    100% { transform: translateY(0);    opacity: 0; }
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
    .scroll-hint span { animation: none; }
  }
</style>
