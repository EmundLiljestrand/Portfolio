<script>
  import { reveal } from '../actions/reveal.js'
  import { theme } from '../theme.svelte.js'
  import { i18n } from '../i18n.svelte.js'
  import { content } from '../content.js'

  const ct = $derived(content[i18n.lang].contact)

  const email = 'emund@emundliljestrand.com'

  const links = [
    { label: 'LinkedIn', href: 'https://se.linkedin.com/in/emund-lorch-falch-liljestrand-1b2b77311' },
    { label: 'GitHub', href: 'https://github.com/EmundLiljestrand' },
  ]

  const year = new Date().getFullYear()
</script>

<section id="contact">
  <div class="container contact-inner" use:reveal>
    <span class="section-kicker pixel">{theme.plain ? ct.kicker : '✦ ' + ct.kicker}</span>
    <h2 class="contact-title pixel">{ct.title}</h2>
    <p class="contact-lead">{ct.lead}</p>

    <a class="email frame" href="mailto:{email}">
      <span class="pixel email-tag">{theme.plain ? ct.emailTagPlain : '▸ ' + ct.emailTag}</span>
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
    {ct.footer}
  </a>
</footer>

<style>
  #contact {
    position: relative;
    overflow: hidden;
    padding-block: var(--space-32);
    border-top: 2px solid var(--border);
    /* Pixel-art-bakgrund (månbelyst sjö) + scrim, fast → parallax */
    background-image:
      radial-gradient(78% 92% at 50% 50%, rgba(10, 18, 12, 0.5), rgba(10, 18, 12, 0.28)),
      url('/bg-kontakt.webp');
    background-size: cover, cover;
    background-position: center, center;
    background-attachment: scroll, fixed;
    background-repeat: no-repeat, no-repeat;
  }
  #contact > .container {
    position: relative;
    z-index: 1;
  }
  /* Mobil: transparent → det fasta mobil-lagret (.page-bg) syns */
  @media (max-width: 768px) {
    #contact { background: transparent; }
  }

  .section-kicker {
    font-size: var(--text-xs);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
    text-shadow: 0 0 10px color-mix(in srgb, var(--gold) 55%, transparent);
  }

  /* text ligger direkt på sjöbilden → starkare skugga för säker läsbarhet */
  .contact-inner {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
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
    color: var(--text);
    max-width: 50ch;
    margin-bottom: var(--space-12);
  }

  /* Mejl som ett pixel-ramat "dialogval" */
  .email {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    max-width: 100%;
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
    font-size: clamp(1.05rem, 5vw, 2.25rem);
    color: var(--text);
    letter-spacing: 0.02em;
    max-width: 100%;
    overflow-wrap: anywhere;
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
