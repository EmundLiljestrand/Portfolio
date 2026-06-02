import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Svelte-action: fadar och glider in elementet när det scrollar in i vyn.
 * Spelas en gång. Respekterar prefers-reduced-motion.
 *
 * Användning: <div use:reveal> eller <div use:reveal={{ y: 32, delay: 0.1 }}>
 */
export function reveal(node, params = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return {}

  const { y = 24, duration = 0.7, delay = 0 } = params

  const tween = gsap.fromTo(
    node,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: node,
        start: 'top 85%',
        once: true,
      },
    }
  )

  return {
    destroy() {
      tween.scrollTrigger?.kill()
      tween.kill()
    },
  }
}
