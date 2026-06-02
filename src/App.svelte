<script>
  import Hero    from './lib/sections/Hero.svelte'
  import Projects from './lib/sections/Projects.svelte'
  import About   from './lib/sections/About.svelte'
  import Contact from './lib/sections/Contact.svelte'
</script>

<nav>
  <div class="container nav-inner">
    <span class="nav-logo">EL</span>
    <ul class="nav-links">
      <li><a href="#projects">Projekt</a></li>
      <li><a href="#about">Om mig</a></li>
      <li><a href="#contact">Kontakt</a></li>
    </ul>
  </div>
</nav>

<main>
  <Hero />
  <Projects />
  <About />
  <Contact />
</main>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    border-bottom: 1px solid var(--border);
    background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(12px);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  .nav-logo {
    font-size: var(--text-lg);
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--accent);
  }

  .nav-links {
    display: flex;
    gap: var(--space-8);
  }

  .nav-links a {
    font-size: var(--text-sm);
    color: var(--muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .nav-links a:hover {
    color: var(--text);
  }

  main {
    padding-top: 64px;
  }
</style>
