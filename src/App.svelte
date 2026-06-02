<script>
  import { onMount } from 'svelte'
  import Lenis from 'lenis'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import Hero    from './lib/sections/Hero.svelte'
  import Projects from './lib/sections/Projects.svelte'
  import About   from './lib/sections/About.svelte'
  import Contact from './lib/sections/Contact.svelte'

  gsap.registerPlugin(ScrollTrigger)

  onMount(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Lenis och ScrollTrigger delar samma loop
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Mjuk scroll vid klick på ankarlänkar (kompenserar för fast nav)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -64 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  })
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
