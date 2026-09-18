import React from 'react'

import { gsap } from '../../shared/lib/useMotion'

import classes from './Cursor.module.sass'

/** Everything the ring should react to. */
const HOT = 'a, button, [data-cursor]'

/**
 * Two-part cursor: a hard dot that tracks the pointer almost exactly and a ring
 * that lags behind it. The ring is the only part that changes state — it opens up
 * on anything clickable and fills with the accent when an element carries a label
 * (`data-cursor="View site"`), which is how the project cards announce themselves.
 *
 * Coarse pointers and reduced motion never see it: the effect bails out before the
 * native cursor is hidden, so the page stays usable exactly as it is today.
 */
const Cursor: React.FC = () => {
  const ring = React.useRef<HTMLDivElement>(null)
  const dot = React.useRef<HTMLDivElement>(null)
  const label = React.useRef<HTMLSpanElement>(null)

  React.useLayoutEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Windows high-contrast repaints every colour the ring relies on; the reader
    // keeps the system cursor they chose rather than a disc that may vanish
    const forced = window.matchMedia('(forced-colors: active)').matches
    if (!fine || still || forced) return

    const ringEl = ring.current
    const dotEl = dot.current
    const labelEl = label.current
    if (!ringEl || !dotEl || !labelEl) return

    const root = document.documentElement
    root.classList.add('has-cursor')

    const rx = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3' })
    const ry = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3' })
    const dx = gsap.quickTo(dotEl, 'x', { duration: 0.14, ease: 'power3' })
    const dy = gsap.quickTo(dotEl, 'y', { duration: 0.14, ease: 'power3' })

    let visible = false
    let active: HTMLElement | null = null

    const move = (event: PointerEvent) => {
      if (!visible) {
        visible = true
        // land on the pointer instead of flying in from the corner
        gsap.set([ringEl, dotEl], { x: event.clientX, y: event.clientY })
        gsap.to([ringEl, dotEl], { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
      }
      rx(event.clientX)
      ry(event.clientY)
      dx(event.clientX)
      dy(event.clientY)
    }

    const enter = (event: PointerEvent) => {
      const hit = (event.target as HTMLElement | null)?.closest<HTMLElement>(HOT) ?? null
      if (hit === active) return
      active = hit
      const text = hit?.dataset.cursor ?? ''
      labelEl.textContent = text
      ringEl.classList.toggle(classes.hot, Boolean(hit))
      ringEl.classList.toggle(classes.labelled, Boolean(text))
      gsap.to(dotEl, { scale: hit ? 0 : 1, duration: 0.3, ease: 'power3.out' })
    }

    const press = (down: boolean) =>
      gsap.to(ringEl, { scale: down ? 0.84 : 1, duration: 0.25, ease: 'power3.out' })
    // named, so the cleanup can remove exactly what was added
    const pressDown = () => press(true)
    const pressUp = () => press(false)

    const leave = () => {
      visible = false
      gsap.to([ringEl, dotEl], { autoAlpha: 0, duration: 0.25 })
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', enter, { passive: true })
    window.addEventListener('pointerdown', pressDown, { passive: true })
    window.addEventListener('pointerup', pressUp, { passive: true })
    document.addEventListener('pointerleave', leave)

    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', enter)
      window.removeEventListener('pointerdown', pressDown)
      window.removeEventListener('pointerup', pressUp)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className={classes.cursor} aria-hidden="true">
      <div className={classes.ring} ref={ring}>
        <div className={classes.box} />
        <span className={classes.label} ref={label} />
      </div>
      <div className={classes.dot} ref={dot} />
    </div>
  )
}

export { Cursor }
