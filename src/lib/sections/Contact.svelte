<script>
  import { reveal } from '../actions/reveal.js'

  const email = 'emund.l@hotmail.com'

  // TODO: fyll i dina riktiga profiler
  const links = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/DITT-ANVÄNDARNAMN' },
    { label: 'GitHub', href: 'https://github.com/EmundLiljestrand' },
  ]

  const year = new Date().getFullYear()
</script>

<section id="contact" class="container">
  <div class="contact-inner" use:reveal>
    <span class="section-kicker">Kontakt</span>
    <h2 class="contact-title">Har du ett problem som behöver lösas?</h2>
    <p class="contact-lead">
      Jag söker LIA-plats och jobb som utvecklare. Hör gärna av dig — jag svarar
      snabbt.
    </p>

    <a class="email" href="mailto:{email}">{email}</a>

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
  <span class="built">Byggd i Svelte</span>
</footer>

<style>
  #contact {
    padding-block: var(--space-32);
    border-top: 1px solid var(--border);
  }

  .section-kicker {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .contact-title {
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: var(--space-3) 0 var(--space-6);
    color: var(--text);
    max-width: 18ch;
  }

  .contact-lead {
    font-size: var(--text-lg);
    color: var(--muted);
    max-width: 50ch;
    margin-bottom: var(--space-12);
  }

  .email {
    display: inline-block;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
    border-bottom: 2px solid var(--border);
    padding-bottom: var(--space-2);
    transition: color 0.2s, border-color 0.2s;
  }
  .email:hover {
    color: var(--accent);
    border-bottom-color: var(--accent);
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
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--muted);
    transition: color 0.2s;
  }
  .links a:hover {
    color: var(--accent);
  }
  .arrow {
    transition: transform 0.2s;
  }
  .links a:hover .arrow {
    transform: translate(2px, -2px);
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: var(--space-8);
    border-top: 1px solid var(--border);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  @media (max-width: 480px) {
    footer {
      flex-direction: column;
      gap: var(--space-2);
    }
  }
</style>
