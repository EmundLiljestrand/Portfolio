<script>
  import { onMount } from 'svelte'
  import Lenis from 'lenis'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import Hero    from './lib/sections/Hero.svelte'
  import Projects from './lib/sections/Projects.svelte'
  import About   from './lib/sections/About.svelte'
  import Contact from './lib/sections/Contact.svelte'
  import AgentChat from './lib/components/AgentChat.svelte'

  gsap.registerPlugin(ScrollTrigger)

  onMount(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Agenten ber om scroll via event; App äger beteendet. Default är native
    // scroll (gäller reduced-motion-användare) och uppgraderas till Lenis nedan.
    let scrollTo = (target) => target.scrollIntoView({ block: 'start' })
    const onAgentScroll = (e) => {
      const target = document.getElementById(e.detail)
      if (target) scrollTo(target)
    }
    window.addEventListener('agent:scroll-to', onAgentScroll)

    if (reduce) {
      return () => window.removeEventListener('agent:scroll-to', onAgentScroll)
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Lenis och ScrollTrigger delar samma loop
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    scrollTo = (target) => lenis.scrollTo(target, { offset: -64 })

    // offset -64 kompenserar för den fasta navbaren vid ankarhopp
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
      window.removeEventListener('agent:scroll-to', onAgentScroll)
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  })
</script>

<nav>
  <div class="container nav-inner">
    <span class="nav-logo pixel">EL</span>
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

<AgentChat />

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    border-bottom: 2px solid var(--border);
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(8px);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  .nav-logo {
    font-size: var(--text-base);
    color: var(--green);
    text-shadow: 2px 2px 0 var(--bg-sunken);
  }

  .nav-links {
    display: flex;
    gap: var(--space-6);
  }

  .nav-links a {
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    color: var(--muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: color 0.15s;
  }

  .nav-links a:hover {
    color: var(--gold);
  }

  main {
    padding-top: 64px;
  }
</style>
