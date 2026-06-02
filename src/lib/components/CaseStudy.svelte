<script>
  let { index, title, tagline, status = [], problem, role, flow, challenges, stack, learned } = $props()
</script>

<article class="case">
  <header class="case-head">
    <span class="case-index">{index}</span>
    <h3 class="case-title">{title}</h3>
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
      <h4 class="block-label">Problemet</h4>
      <p>{problem}</p>
    </div>
    <div class="case-block">
      <h4 class="block-label">Min roll</h4>
      <p>{role}</p>
    </div>
  </div>

  <div class="case-block">
    <h4 class="block-label">Så fungerar det</h4>
    <ol class="flow">
      {#each flow as step, i}
        <li class="flow-step">
          <span class="flow-node">{i + 1}</span>
          <div class="flow-text">
            <strong>{step.title}</strong>
            {#if step.detail}<span>{step.detail}</span>{/if}
          </div>
        </li>
      {/each}
    </ol>
  </div>

  <div class="case-block">
    <h4 class="block-label">Tekniska utmaningar</h4>
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
    <h4 class="block-label">Teknikstack</h4>
    <ul class="stack">
      {#each stack as tech}
        <li class="badge">{tech}</li>
      {/each}
    </ul>
  </div>

  <div class="learned">
    <h4 class="block-label">Vad jag lärde mig</h4>
    <p>{learned}</p>
  </div>
</article>

<style>
  .case {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: clamp(1.5rem, 4vw, 3rem);
    background: var(--bg-raised);
  }

  .case-head {
    margin-bottom: var(--space-12);
  }

  .case-index {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--accent);
    letter-spacing: 0.1em;
  }

  .case-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: var(--space-2) 0 var(--space-4);
    color: var(--text);
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
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: 0.05em;
    color: var(--muted);
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px color-mix(in srgb, var(--accent) 70%, transparent);
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
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: var(--space-4);
    font-weight: 500;
  }

  .case-block > p {
    color: var(--muted);
    max-width: 65ch;
  }

  /* Flow */
  .flow {
    display: flex;
    flex-direction: column;
  }

  .flow-step {
    display: flex;
    gap: var(--space-4);
    padding-bottom: var(--space-6);
    position: relative;
  }

  .flow-step:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 32px;
    bottom: 0;
    width: 2px;
    background: var(--border);
  }

  .flow-node {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--accent);
    color: var(--accent);
    font-size: var(--text-sm);
    font-family: var(--font-mono);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    z-index: 1;
  }

  .flow-text {
    padding-top: 3px;
  }
  .flow-text strong {
    color: var(--text);
    font-weight: 500;
    display: block;
  }
  .flow-text span {
    color: var(--muted);
    font-size: var(--text-sm);
  }

  /* Challenges */
  .challenges {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }

  .challenge {
    border-left: 2px solid var(--border);
    padding-left: var(--space-4);
    transition: border-color 0.2s;
  }
  .challenge:hover {
    border-left-color: var(--accent);
  }
  .challenge strong {
    color: var(--text);
    font-weight: 500;
    display: block;
    margin-bottom: var(--space-1);
  }
  .challenge p {
    color: var(--muted);
    font-size: var(--text-sm);
  }

  /* Stack badges */
  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .badge {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--muted);
    transition: color 0.2s, border-color 0.2s;
  }
  .badge:hover {
    color: var(--text);
    border-color: var(--accent);
  }

  /* Learned */
  .learned {
    border-top: 1px solid var(--border);
    padding-top: var(--space-8);
  }
  .learned p {
    color: var(--text);
    font-size: var(--text-lg);
    max-width: 65ch;
  }

  @media (max-width: 640px) {
    .case-grid,
    .challenges {
      grid-template-columns: 1fr;
    }
  }
</style>
