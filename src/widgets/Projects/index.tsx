import React from 'react'
import { TbArrowUpRight } from 'react-icons/tb'

import { heads, projects, ui } from '../../shared/content'
import { SectionHead } from '../../shared/ui/SectionHead'
import { shots } from '../../shared/assets/work'
import { gsap, scrollToY } from '../../shared/lib/useMotion'

import classes from './Projects.module.sass'

const FLAT = '(max-width: 900px), (prefers-reduced-motion: reduce)'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The work reel: a sticky stage the projects travel across as the page scrolls.
 * The centred plate faces the reader square on; its neighbours are turned away in
 * 3D, pushed back and veiled, so the row reads as panels standing in a dark room
 * rather than a grid of cards. One scrubbed timeline drives the placement, and
 * the counter and the blurred wash follow whichever plate is centred.
 *
 * The plates carry nothing but the screenshot — every caption lives in one panel
 * on the stage, which is why it stays legible over sites that are mostly white.
 * Phones and reduced motion read the same markup flat: a snap scroller with the
 * panel underneath, kept in step by an observer instead of a scrub.
 */
const Reel: React.FC = () => {
  const rail = React.useRef<HTMLDivElement>(null)
  const track = React.useRef<HTMLDivElement>(null)
  const wash = React.useRef<HTMLImageElement>(null)
  const panel = React.useRef<HTMLDivElement>(null)

  const [flat, setFlat] = React.useState(() => window.matchMedia(FLAT).matches)
  const [active, setActive] = React.useState(0)
  const project = projects[active]

  React.useEffect(() => {
    const query = window.matchMedia(FLAT)
    const sync = () => setFlat(query.matches)
    if (query.addEventListener) {
      query.addEventListener('change', sync)
      return () => query.removeEventListener('change', sync)
    }
    query.addListener(sync)
    return () => query.removeListener(sync)
  }, [])

  // ── the reel ──
  React.useLayoutEffect(() => {
    const rows = track.current
    const railEl = rail.current
    if (!rows || !railEl) return
    const cards = Array.from(rows.children) as HTMLElement[]

    // flat reading: whichever plate is nearest the middle of the scroller is the
    // one the caption describes
    if (flat) {
      let queued = 0
      const pick = () => {
        queued = 0
        const box = rows.getBoundingClientRect()
        const middle = box.left + box.width / 2
        let nearest = 0
        let best = Infinity
        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect()
          const away = Math.abs(rect.left + rect.width / 2 - middle)
          if (away < best) {
            best = away
            nearest = i
          }
        })
        setActive(nearest)
      }
      const schedule = () => {
        if (!queued) queued = requestAnimationFrame(pick)
      }
      pick()
      rows.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      return () => {
        if (queued) cancelAnimationFrame(queued)
        rows.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
      }
    }

    const veils = cards.map((card) => card.querySelector<HTMLElement>(`.${classes.veil}`))
    const last = cards.length - 1
    let shown = 0

    // everything a plate does is a function of how far it stands from the centre
    const place = (progress: number) => {
      const centre = progress * last
      const gap = rows.clientWidth * 0.46
      cards.forEach((card, i) => {
        const away = i - centre
        const far = Math.abs(away)
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: away * gap,
          z: -Math.min(far, 4) * 240,
          rotationY: gsap.utils.clamp(-46, 46, -away * 26),
          scale: 1 - Math.min(far, 3) * 0.04,
        })
        gsap.set(veils[i], { opacity: Math.min(far * 0.82, 0.92) })
      })
      const next = Math.round(centre)
      if (next !== shown) {
        shown = next
        setActive(next)
      }
    }

    // one tweened value carries the stage, so a resize can re-place the plates
    // at exactly the progress the reader is standing on
    const state = { p: 0 }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: railEl, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        })
        .to(state, { p: 1, duration: 1, onUpdate: () => place(state.p) }, 0)
    }, railEl)

    place(0)
    const resize = () => place(state.p)
    window.addEventListener('resize', resize)

    // Seven of the eight plates sit off-stage at any moment, but all eight are in
    // the tab order. Focusing one scrolls the rail to the point where it is
    // centred, so the focus ring never lands on something the reader can't see.
    const bringIn = cards.map((card, i) => {
      const onFocus = () => {
        // engines without overflow: clip still let focus scroll the stage; undo it
        const stage = railEl.firstElementChild as HTMLElement | null
        requestAnimationFrame(() => {
          if (stage) stage.scrollLeft = 0
        })
        const top = railEl.getBoundingClientRect().top + window.scrollY
        const span = railEl.offsetHeight - window.innerHeight
        scrollToY(top + (last ? (i / last) * span : 0))
      }
      card.addEventListener('focus', onFocus)
      return () => card.removeEventListener('focus', onFocus)
    })

    return () => {
      bringIn.forEach((undo) => undo())
      ctx.revert()
      window.removeEventListener('resize', resize)
      cards.forEach((card, i) => {
        gsap.set(card, { clearProps: 'all' })
        gsap.set(veils[i], { clearProps: 'opacity' })
      })
    }
  }, [flat])

  // ── the caption changes with a short defocus, never a hard cut ──
  const first = React.useRef(true)
  React.useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (!panel.current) return
    gsap.fromTo(
      panel.current.children,
      { y: 14, autoAlpha: 0, filter: 'blur(6px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.04,
        clearProps: 'filter',
        overwrite: true,
      },
    )
  }, [active])

  // ── the wash is the active plate blown up and thrown out of focus ──
  React.useEffect(() => {
    const img = wash.current
    if (!img) return
    const next = shots[project.shot]
    if (img.getAttribute('src') === next) return
    gsap.to(img, {
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => {
        img.src = next
        gsap.to(img, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' })
      },
    })
  }, [project.shot])

  return (
    <section className={`section ${classes.projects}`} id="projects">
      <div className="container">
        <SectionHead head={heads.projects} />
      </div>

      <div
        className={`${classes.rail} ${flat ? classes.flat : ''}`}
        ref={rail}
        style={flat ? undefined : ({ '--steps': projects.length - 1 } as React.CSSProperties)}
      >
        <div className={classes.stage}>
          <div className={classes.grid} aria-hidden="true" />
          <div className={classes.stageHead} aria-hidden="true">
            <span>
              {pad(active + 1)} <i>/</i> {pad(projects.length)}
            </span>
          </div>
          <div className={classes.wash} aria-hidden="true">
            <img
              src={shots[projects[0].shot]}
              alt=""
              ref={wash}
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.visibility = 'hidden'
              }}
            />
          </div>

          <div className={classes.plates}>
            <div className={classes.track} ref={track}>
              {projects.map((item) => (
                <a
                  className={classes.card}
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={ui.viewSite}
                >
                  <img
                    src={shots[item.shot]}
                    alt={`${item.title} — ${ui.screenshot}`}
                    loading="lazy"
                    width={1400}
                    height={875}
                    onError={(event) => {
                      event.currentTarget.style.visibility = 'hidden'
                    }}
                  />
                  <span className={classes.veil} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className={classes.panel} ref={panel}>
            <p className={classes.tag}>{project.tag}</p>
            <h3 className={classes.title}>{project.title}</h3>
            <p className={classes.text}>{project.text}</p>
            <ul className={classes.tech}>
              {project.tech.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              className={classes.visit}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-cursor={ui.viewSite}
            >
              <span>{ui.visitSite}</span>
              <TbArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <a className={classes.all} href={ui.studioPortfolio.url} target="_blank" rel="noreferrer">
          <span>{ui.studioPortfolio.label}</span>
          <TbArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

/** An empty project list renders no reel at all rather than a stage with nothing on it. */
const Projects: React.FC = () => (projects.length ? <Reel /> : null)

export { Projects }
