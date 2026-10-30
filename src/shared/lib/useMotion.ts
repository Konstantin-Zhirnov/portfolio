import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/**
 * The site's whole motion layer: smooth scroll, the reveal system and media settle.
 * Ported from the production template the reference reels were built with —
 * Lenis is driven from gsap.ticker with lagSmoothing(0) so everything shares one clock.
 *
 * Reveals are declared in markup, never here:
 *   data-lines            → masked line rise on every .line > span inside
 *   data-reveal           → fade + rise of the element
 *   data-reveal="stagger" → same, staggered across its children
 *   data-tilt             → its children stand up out of a tilted-back pose, and
 *                           lean towards the pointer afterwards
 *   data-tilt="self"      → the element itself does, for a lone card
 *   data-count            → the number counts up to the attribute's value
 *   data-parallax         → the inner <img> settles from scale(1.18) to 1
 */
export const useMotion = () => {
  React.useLayoutEffect(() => {
    const root = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('js')
      return
    }
    root.classList.add('js')

    // pointer listeners live outside the gsap context, so they need their own undo
    const leans: Array<() => void> = []
    const raf = (time: number) => lenis?.raf(time * 1000)
    const refresh = () => ScrollTrigger.refresh()
    let ctx: gsap.Context | null = null

    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll('.line > span'),
            // y is pinned to 0 on both ends: without it GSAP parses the CSS
            // guard `translateY(110%)` into a px `y` that survives the tween
            // and pushes the line out of its own overflow-hidden box.
            { yPercent: 110, y: 0 },
            {
              yPercent: 0,
              y: 0,
              duration: 1.1,
              ease: 'power4.out',
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })

        // the house reveal: rise + defocus. The blur is what separates this from a
        // stock fade-up — it reads as a lens finding the block instead of a slide.
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          const targets = el.dataset.reveal === 'stagger' ? el.children : el
          gsap.fromTo(
            targets,
            { y: 24, autoAlpha: 0, filter: 'blur(6px)' },
            {
              y: 0,
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.08,
              // the filter is only worth its cost while the tween runs
              clearProps: 'filter',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })

        // cards stand up out of the page instead of sliding in: the group starts
        // tilted back and pushed away, then rights itself one card at a time.
        //   data-tilt          → the element's children each stand up
        //   data-tilt="self"   → the element itself does
        gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((group) => {
          const cards = group.dataset.tilt === 'self' ? [group] : Array.from(group.children)
          gsap.fromTo(
            cards,
            {
              rotationX: -12,
              y: 40,
              z: -120,
              autoAlpha: 0,
              // the perspective is written on the card itself, so the pointer lean
              // that takes over afterwards inherits the same depth
              transformPerspective: 900,
            },
            {
              rotationX: 0,
              y: 0,
              z: 0,
              autoAlpha: 1,
              duration: 1.05,
              ease: 'power3.out',
              stagger: 0.09,
              scrollTrigger: { trigger: group, start: 'top 86%', once: true },
            },
          )
        })

        // …and keep their depth afterwards: the pointer leans them, nothing else
        if (window.matchMedia('(pointer: fine)').matches) {
          gsap.utils
            .toArray<HTMLElement>('[data-tilt]:not([data-tilt="self"]) > *, [data-tilt="self"]')
            .forEach((card) => {
              const rx = gsap.quickTo(card, 'rotationX', { duration: 0.55, ease: 'power3' })
              const ry = gsap.quickTo(card, 'rotationY', { duration: 0.55, ease: 'power3' })
              const rz = gsap.quickTo(card, 'z', { duration: 0.55, ease: 'power3' })
              const lean = (event: PointerEvent) => {
                const box = card.getBoundingClientRect()
                rx(-((event.clientY - box.top) / box.height - 0.5) * 5)
                ry(((event.clientX - box.left) / box.width - 0.5) * 6)
                rz(18)
              }
              const settle = () => {
                rx(0)
                ry(0)
                rz(0)
              }
              card.addEventListener('pointermove', lean)
              card.addEventListener('pointerleave', settle)
              leans.push(() => {
                card.removeEventListener('pointermove', lean)
                card.removeEventListener('pointerleave', settle)
              })
            })
        }

        // numbers arrive by counting, not by fading: `data-count` carries the final
        // string, and its shape (padding, decimals, any `+`) is kept on the way there
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const raw = el.dataset.count ?? ''
          const parts = raw.match(/^(\D*?)(\d+(?:\.\d+)?)(\D*)$/)
          if (!parts) return
          const [, prefix, digits, suffix] = parts
          const decimals = digits.includes('.') ? digits.split('.')[1].length : 0
          const pad = decimals === 0 && digits.startsWith('0') ? digits.length : 0
          const counter = { value: 0 }
          const write = () => {
            const shown = counter.value.toFixed(decimals)
            el.textContent = prefix + (pad ? shown.padStart(pad, '0') : shown) + suffix
          }
          write()
          gsap.to(counter, {
            value: parseFloat(digits),
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: write,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })

        // media settles instead of sliding — no parallax on text, ever
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((frame) => {
          const img = frame.querySelector('img')
          if (!img) return
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: frame,
                start: 'top bottom',
                end: 'bottom center',
                scrub: 1,
              },
            },
          )
        })
      })

      if (document.fonts) document.fonts.ready.then(refresh)
      window.addEventListener('load', refresh, { once: true })
    } catch (error) {
      // A motion layer that dies half-way would leave every block behind a CSS
      // guard at opacity 0. Release the guards: the page falls back to its
      // plain, fully visible state and nothing else breaks.
      root.classList.remove('js')
      lenis?.destroy()
      lenis = null
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error('[motion] disabled after an error', error)
      }
    }

    return () => {
      leans.forEach((undo) => undo())
      ctx?.revert()
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenis = null
      window.removeEventListener('load', refresh)
    }
  }, [])
}

/** Scroll to an absolute offset through Lenis when it runs, so the two never fight. */
export const scrollToY = (y: number, duration = 0.6) => {
  if (lenis) lenis.scrollTo(y, { duration })
  else window.scrollTo({ top: y })
}

/** In-page navigation that goes through Lenis when it is running, so the two never fight. */
export const scrollToId = (hash: string) => {
  if (hash === '#top') {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return
  if (lenis) lenis.scrollTo(target, { duration: 1.4 })
  else target.scrollIntoView({ behavior: 'smooth' })
  target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

export { gsap, ScrollTrigger }
