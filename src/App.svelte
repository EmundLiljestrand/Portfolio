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
  import { i18n } from './lib/i18n.svelte.js'
  import { content } from './lib/content.js'

  gsap.registerPlugin(ScrollTrigger)

  const nav = $derived(content[i18n.lang].nav)

  // Boring mode: flippar hela sidan till en ren, ljus, modern vy
  let plain = $state(false)

  // Mobil-bakgrund: vilken sektions scen som visas i det fasta lagret (endast mobil)
  let activeBg = $state('hero')

  function toggleTheme() {
    plain = !plain
    document.documentElement.classList.toggle('plain', plain)
    try { localStorage.setItem('theme', plain ? 'plain' : 'game') } catch (e) {}
    window.dispatchEvent(new CustomEvent('theme:change', { detail: plain }))
    ScrollTrigger.refresh()
  }

  onMount(() => {
    plain = document.documentElement.classList.contains('plain')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Agenten ber om scroll via event; App äger beteendet. Default är native
    // scroll (gäller reduced-motion-användare) och uppgraderas till Lenis nedan.
    let scrollTo = (target) => target.scrollIntoView({ block: 'start' })
    const onAgentScroll = (e) => {
      const target = document.getElementById(e.detail)
      if (target) scrollTo(target)
    }
    window.addEventListener('agent:scroll-to', onAgentScroll)

    // Agenten kan peka ut ett specifikt element: scrolla dit och pulsa det kort
    const onAgentHighlight = (e) => {
      const target = document.getElementById(e.detail)
      if (!target) return
      scrollTo(target)
      target.classList.remove('agent-pulse')
      void target.offsetWidth // tvinga reflow så animationen kan starta om
      target.classList.add('agent-pulse')
      setTimeout(() => target.classList.remove('agent-pulse'), 2400)
    }
    window.addEventListener('agent:highlight', onAgentHighlight)

    // Mobil-bakgrund: välj scen efter vilken sektion som ligger vid skärmens
    // mittlinje (robust även för höga sektioner, till skillnad mot synlig andel)
    const bgIds = ['hero', 'projects', 'about', 'contact']
    let bgRaf = 0
    const updateActiveBg = () => {
      const mid = window.innerHeight / 2
      let cur = 'hero'
      for (const id of bgIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom >= mid) { cur = id; break }
      }
      activeBg = cur
    }
    const onScrollBg = () => {
      if (bgRaf) return
      bgRaf = requestAnimationFrame(() => { bgRaf = 0; updateActiveBg() })
    }
    window.addEventListener('scroll', onScrollBg, { passive: true })
    updateActiveBg()

    const removeAgentListeners = () => {
      window.removeEventListener('agent:scroll-to', onAgentScroll)
      window.removeEventListener('agent:highlight', onAgentHighlight)
      window.removeEventListener('scroll', onScrollBg)
      if (bgRaf) cancelAnimationFrame(bgRaf)
    }

    if (reduce) {
      return removeAgentListeners
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Lenis och ScrollTrigger delar samma loop + parallax-drift på mobil-bakgrunden
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? e.scroll / max : 0
      document.documentElement.style.setProperty('--bg-parallax', `${(0.5 - p) * window.innerHeight * 0.18}px`)
    })
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
      removeAgentListeners()
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  })
</script>

{#if !plain}
  <div class="page-bg" aria-hidden="true">
    <div class="bg-track">
      <div class="bg-layer l-hero" class:active={activeBg === 'hero'}></div>
      <div class="bg-layer l-projects" class:active={activeBg === 'projects'}></div>
      <div class="bg-layer l-about" class:active={activeBg === 'about'}></div>
      <div class="bg-layer l-contact" class:active={activeBg === 'contact'}></div>
    </div>
    <div class="bg-scrim"></div>
  </div>
{/if}

<nav>
  <div class="container nav-inner">
    <span class="nav-logo pixel">EL</span>
    <div class="nav-right">
      <ul class="nav-links">
        <li><a href="#projects">{nav.projects}</a></li>
        <li><a href="#about">{nav.about}</a></li>
        <li><a href="#contact">{nav.contact}</a></li>
      </ul>
      <button
        class="lang-toggle"
        onclick={() => i18n.toggle()}
        title={i18n.lang === 'sv' ? 'Switch to English' : 'Byt till svenska'}
      >
        {i18n.lang === 'sv' ? 'EN' : 'SV'}
      </button>
      <button
        class="theme-toggle"
        onclick={toggleTheme}
        aria-pressed={plain}
        title={plain ? 'Gå tillbaka till den interaktiva vyn' : 'Byt till en ren, professionell vy'}
      >
        {plain ? '✦ Enter the world' : '[Esc] to reality'}
      </button>
    </div>
  </div>
</nav>

<main>
  <Hero />
  <Projects />
  <About />
  <Contact />
</main>

{#if !plain}
  <AgentChat />
{/if}

<style>
  /* Mobil-bakgrund: fast viewport-lager med parallax + korsfade.
     Göms på desktop (där sektionerna kör sin egen CSS-bakgrund). */
  .page-bg {
    display: none;
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
    background: var(--bg-sunken);
  }
  .bg-track {
    position: absolute;
    top: -12%;
    bottom: -12%;
    left: 0;
    right: 0;
    transform: translate3d(0, var(--bg-parallax, 0px), 0);
    will-change: transform;
  }
  .bg-layer {
    position: absolute;
    inset: 0;
    background-size: cover;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  .bg-layer.active { opacity: 1; }
  .l-hero { background-image: url('/bg-hero.webp'); background-position: center top; }
  .l-projects { background-image: url('/bg-projekt.webp'); background-position: 62% center; }
  .l-about { background-image: url('/bg-about.webp'); background-position: center; }
  .l-contact { background-image: url('/bg-kontakt.webp'); background-position: center; }
  .bg-scrim {
    position: absolute;
    inset: 0;
    background: radial-gradient(95% 80% at 50% 38%, rgba(8, 14, 10, 0.4), rgba(8, 14, 10, 0.58));
  }
  @media (max-width: 768px) {
    .page-bg { display: block; }
  }
  @media (prefers-reduced-motion: reduce) {
    .bg-layer { transition: none; }
  }

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

  .nav-right {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }

  /* Diskret språkknapp (mindre framträdande än tema-toggeln) */
  .lang-toggle {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    letter-spacing: 0.06em;
    color: var(--muted);
    background: transparent;
    border: 2px solid var(--border-strong);
    padding: var(--space-1) var(--space-2);
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }
  .lang-toggle:hover {
    color: var(--gold);
    border-color: var(--gold);
  }

  /* Guld-accentknapp som drar fokus mot de dämpade nav-länkarna */
  .theme-toggle {
    font-family: var(--font-ui);
    font-size: var(--text-base);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #20180a;
    background: var(--gold);
    border: 2px solid var(--gold-dim);
    padding: var(--space-2) var(--space-4);
    cursor: pointer;
    box-shadow: 0 0 12px color-mix(in srgb, var(--gold) 55%, transparent);
    transition: transform 0.1s steps(2), box-shadow 0.15s, background 0.15s;
    animation: toggle-glow 2.8s ease-in-out infinite;
  }
  .theme-toggle:hover {
    transform: translate(-1px, -1px);
    background: color-mix(in srgb, var(--gold) 90%, #fff);
    box-shadow:
      4px 4px 0 var(--bg-sunken),
      0 0 18px color-mix(in srgb, var(--gold) 75%, transparent);
  }
  @keyframes toggle-glow {
    0%, 100% { box-shadow: 0 0 10px color-mix(in srgb, var(--gold) 40%, transparent); }
    50%      { box-shadow: 0 0 18px color-mix(in srgb, var(--gold) 75%, transparent); }
  }
  @media (prefers-reduced-motion: reduce) {
    .theme-toggle { animation: none; }
  }

  @media (max-width: 520px) {
    .nav-links { display: none; }
  }

  main {
    padding-top: 64px;
  }
</style>
