import React from 'react'

import { gsap } from '../../shared/lib/useMotion'
import openPose from '../../shared/assets/portrait.jpg'
import firstPose from '../../shared/assets/portrait-first.jpg'

import classes from './About.module.sass'

/**
 * Two sets so a phone never downloads the desktop plates. The counts are what the
 * build script wrote into public/portrait/<set>/, and both cover the same 2.4 seconds.
 */
const SETS = {
  desktop: { dir: 'desktop', count: 58 },
  mobile: { dir: 'mobile', count: 29 },
}

const PHONE = '(max-width: 900px)'

/**
 * The portrait is a scrubbed image sequence, not a photograph: as the About section
 * crosses the viewport, the frames play from the closed, red-rimmed pose to the open
 * one that looks straight at the reader. Scroll back and he looks away again.
 *
 * Frames are webp plates in public/portrait/, pre-cropped to the 4:5 of the figure,
 * so drawing is a straight blit with no cover maths. Reduced motion and save-data
 * never mount the canvas at all — the still poster carries the block and no plate
 * is downloaded.
 */
const Portrait: React.FC<{ alt: string; caption: string }> = ({ alt, caption }) => {
  const figure = React.useRef<HTMLElement>(null)
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const scan = React.useRef<HTMLSpanElement>(null)
  const [still, setStill] = React.useState(false)

  React.useLayoutEffect(() => {
    // A metered or slow connection does not get 780KB of plates for one
    // portrait; it gets the still, which is what reduced motion sees too.
    const link = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection
    const thrifty = Boolean(link?.saveData) || /(^|-)2g$/.test(link?.effectiveType ?? '')
    if (thrifty || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true)
      return
    }

    const el = canvas.current
    const frame = figure.current
    if (!el || !frame) return
    const paint = el.getContext('2d')
    if (!paint) return

    const { dir, count } = window.matchMedia(PHONE).matches ? SETS.mobile : SETS.desktop
    const src = (i: number) =>
      `${import.meta.env.BASE_URL}portrait/${dir}/f${String(i).padStart(3, '0')}.webp`

    const plates = new Array<HTMLImageElement | undefined>(count)
    const cursor = { frame: 0 }
    let drawn = -1
    let live = true

    const ready = (img?: HTMLImageElement) => Boolean(img && img.complete && img.naturalWidth > 0)

    // draw the plate nearest to where the scroll is, so a gap in the loading queue
    // shows a neighbour rather than a hole
    const render = (force?: boolean) => {
      const want = Math.round(cursor.frame)
      if (!force && want === drawn) return
      let found = -1
      for (let d = 0; d < count && found === -1; d += 1) {
        if (ready(plates[want - d])) found = want - d
        else if (ready(plates[want + d])) found = want + d
      }
      if (found === -1) return
      const img = plates[found] as HTMLImageElement
      paint.drawImage(img, 0, 0, el.width, el.height)
      if (drawn === -1) gsap.to(el, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' })
      drawn = found
    }

    const load = (i: number) => {
      if (plates[i] || i < 0 || i >= count) return
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (!live) return
        const want = Math.round(cursor.frame)
        if (drawn === -1 || Math.abs(want - i) < Math.abs(want - drawn)) render(true)
      }
      img.src = src(i)
      plates[i] = img
    }

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      el.width = Math.round(el.clientWidth * dpr)
      el.height = Math.round(el.clientHeight * dpr)
      render(true)
    }

    // the first handful cover the top of the section; the rest arrive coarse-to-fine
    for (let i = 0; i < 8; i += 1) load(i)
    const queue: number[] = []
    for (const step of [6, 3, 1]) {
      for (let i = 0; i < count; i += step) if (!queue.includes(i)) queue.push(i)
    }
    let sent = 0
    // Safari still has no requestIdleCallback, so the queue falls back to a timeout
    const idle = (fn: () => void) => {
      // called through `host` on purpose: a detached requestIdleCallback throws
      const host = window as unknown as {
        requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => void
      }
      if (host.requestIdleCallback) host.requestIdleCallback(fn, { timeout: 300 })
      else window.setTimeout(fn, 60)
    }
    const pump = () => {
      if (!live) return
      const until = sent + 8
      for (; sent < queue.length && sent < until; sent += 1) load(queue[sent])
      if (sent < queue.length) idle(pump)
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: frame,
          start: 'top 82%',
          end: 'bottom 30%',
          scrub: 0.6,
        },
      })
      timeline
        .to(cursor, { frame: count - 1, duration: 1, onUpdate: () => render() }, 0)
        .to(scan.current, { scaleY: 1, duration: 1 }, 0)
    }, frame)

    size()
    window.addEventListener('resize', size)
    if (document.readyState === 'complete') pump()
    else window.addEventListener('load', pump, { once: true })

    return () => {
      live = false
      ctx.revert()
      window.removeEventListener('resize', size)
      window.removeEventListener('load', pump)
    }
  }, [])

  return (
    <figure className={classes.portrait} ref={figure}>
      {/* the still under the canvas is frame 0, so nothing jumps when the plates
          arrive; without motion the block keeps the open pose instead */}
      <img src={still ? openPose : firstPose} alt={alt} loading="lazy" />
      {!still && <canvas className={classes.canvas} ref={canvas} aria-hidden="true" />}
      {!still && <span className={classes.scan} ref={scan} aria-hidden="true" />}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export { Portrait }
