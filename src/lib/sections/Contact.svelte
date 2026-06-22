<script>
  import { reveal } from '../actions/reveal.js'

  const email = 'emund@emundliljestrand.com'

  const links = [
    { label: 'LinkedIn', href: 'https://se.linkedin.com/in/emund-lorch-falch-liljestrand-1b2b77311' },
    { label: 'GitHub', href: 'https://github.com/EmundLiljestrand' },
  ]

  const year = new Date().getFullYear()
</script>

<section id="contact" class="container">
  <div class="contact-inner" use:reveal>
    <span class="section-kicker pixel">✦ Kontakt</span>
    <h2 class="contact-title pixel">Hör av dig</h2>
    <p class="contact-lead">
      Jag är öppen för nya uppdrag och svarar snabbt. Gäller det ett jobb eller
      bara en fråga? Skriv en rad, så hörs vi.
    </p>

    <a class="email frame" href="mailto:{email}">
      <span class="pixel email-tag">▸ Skicka meddelande</span>
      <span class="email-addr">{email}</span>
    </a>

    <ul class="links">
      {#each links as link}
        <li>
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            <span class="arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<footer class="container">
  <span>© {year} Emund Liljestrand</span>
  <a
    class="built"
    href="https://github.com/EmundLiljestrand/Portfolio"
    target="_blank"
    rel="noreferrer"
  >
    Byggd i Svelte · se källkoden ↗
  </a>
</footer>

<style>
  #contact {
    padding-block: var(--space-32);
    border-top: 2px solid var(--border);
  }

  .section-kicker {
    font-size: var(--text-xs);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .contact-title {
    font-size: clamp(1.25rem, 3.5vw, 2rem);
    line-height: 1.5;
    margin: var(--space-4) 0 var(--space-6);
    color: var(--text);
    text-shadow: 3px 3px 0 var(--bg-sunken);
  }

  .contact-lead {
    font-size: var(--text-lg);
    color: var(--muted);
    max-width: 50ch;
    margin-bottom: var(--space-12);
  }

  /* Mejl som ett pixel-ramat "dialogval" */
  .email {
    display: inline-flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-6);
    color: var(--text);
    transition: transform 0.1s steps(2), box-shadow 0.1s;
  }
  .email:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--bg-sunken);
  }
  .email-tag {
    font-size: var(--text-xs);
    text-transform: uppercase;
    color: var(--gold);
  }
  .email-addr {
    font-family: var(--font-ui);
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    color: var(--text);
    letter-spacing: 0.02em;
  }

  .links {
    display: flex;
    gap: var(--space-6);
    margin-top: var(--space-12);
  }
  .links a {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.15s;
  }
  .links a:hover {
    color: var(--gold);
  }
  .arrow {
    transition: transform 0.1s steps(2);
  }
  .links a:hover .arrow {
    transform: translate(2px, -2px);
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: var(--space-8);
    border-top: 2px solid var(--border);
    font-family: var(--font-ui);
    font-size: var(--text-base);
    color: var(--muted);
    letter-spacing: 0.04em;
    background: var(--bg-sunken);
  }
  footer .built {
    color: var(--muted);
    transition: color 0.15s;
  }
  footer .built:hover {
    color: var(--gold);
  }

  @media (max-width: 480px) {
    footer {
      flex-direction: column;
      gap: var(--space-2);
      text-align: center;
    }
  }
</style>
