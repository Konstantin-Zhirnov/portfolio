import React from 'react'
import { TbArrowDown } from 'react-icons/tb'

import { hero, profile, ui } from '../../shared/content'
import { gsap, scrollToId } from '../../shared/lib/useMotion'

import classes from './Hero.module.sass'

const Hero: React.FC = () => {
  const root = React.useRef<HTMLElement>(null)
  const title = React.useRef<HTMLHeadingElement>(null)
  const l1 = React.useRef<HTMLSpanElement>(null)
  const l2 = React.useRef<HTMLSpanElement>(null)
  const eyebrow = React.useRef<HTMLParagraphElement>(null)
  const aside = React.useRef<HTMLDivElement>(null)
  const cue = React.useRef<HTMLParagraphElement>(null)
  const ring = React.useRef<HTMLDivElement>(null)
  const core = React.useRef<HTMLDivElement>(null)
  const guides = React.useRef<HTMLDivElement>(null)
  const marquee = React.useRef<HTMLDivElement>(null)
  const veil = React.useRef<HTMLDivElement>(null)

  const [role, setRole] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setRole((i) => (i + 1) % profile.roles.length), 3600)
    return () => window.clearInterval(id)
  }, [])

  React.useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // ── entrance ──
      gsap.from(title.current!.querySelectorAll('.line > span'), {
        yPercent: 110,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
        delay: 0.15,
      })
      gsap.from([eyebrow.current, ...Array.from(aside.current!.children), cue.current], {
        autoAlpha: 0,
        y: 16,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.45,
      })
      gsap.from(ring.current, { autoAlpha: 0, scale: 0.82, duration: 1.8, ease: 'power3.out' })

      // ── set piece: the hero scrolls OUT — the two headline lines tilt away in 3D
      //    under a blur veil while the ring's black core swallows the stage
      gsap
        .timeline({
          defaults: { ease: 'power3.inOut' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
        })
        .to(core.current, { scale: 3, duration: 1.3, ease: 'power2.inOut' }, 0)
        .to(l1.current, { rotationX: -18, filter: 'blur(1px)', duration: 1.15 }, 0)
        .to(l2.current, { rotationX: 18, filter: 'blur(1px)', duration: 1.2 }, 0)
        .to(veil.current, { autoAlpha: 1, duration: 0.8, ease: 'power1.inOut' }, 0)
        .to(aside.current, { y: -10, scale: 0.9, rotationX: -15, autoAlpha: 0, duration: 0.8 }, 0)
        .to(marquee.current, { y: -30, scale: 0.9, autoAlpha: 0, duration: 0.8 }, 0)
        // the entrance fades the cue in too; a refresh during it would record a
        // half-faded start here, and scrolling back up would restore that
        .fromTo(
          cue.current,
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 0.4, immediateRender: false },
          0,
        )
        .to(guides.current, { scale: 2.2, rotationX: 25, duration: 1, ease: 'power2.inOut' }, 0)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className={classes.hero} id="top" ref={root}>
      <div className={classes.stage} aria-hidden="true">
        <div className={classes.guides} ref={guides}>
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <i key={deg} style={{ transform: `rotate(${deg}deg)` }} />
          ))}
        </div>
        <div className={classes.ring} ref={ring}>
          <div className={classes.core} ref={core} />
        </div>
      </div>

      <div className={`container ${classes.inner}`}>
        <p className={`eyebrow ${classes.eyebrow}`} ref={eyebrow}>
          {hero.greeting}
        </p>

        <h1 className={classes.title} ref={title}>
          <span className="sr-only">
            {profile.name} — {profile.role}
          </span>
          <span className={`line ${classes.l1}`} ref={l1} aria-hidden="true">
            <span>
              <em key={role} className={classes.word}>
                {profile.roles[role]}
              </em>
            </span>
          </span>
          <span className={`line ${classes.l2}`} ref={l2} aria-hidden="true">
            <span>{hero.title}</span>
          </span>
        </h1>

        <div className={classes.aside} ref={aside}>
          <p className={classes.kicker}>
            <b>{hero.mark}</b> {hero.kicker}
          </p>
          <p className={classes.lead}>{profile.heroLead}</p>
          <div className={classes.actions}>
            <a
              className={classes.solid}
              href={hero.primary.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(hero.primary.href)
              }}
            >
              {hero.primary.label}
            </a>
            <a
              className={classes.ghost}
              href={ui.cta.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(ui.cta.href)
              }}
            >
              {ui.cta.label}
            </a>
          </div>
        </div>

        <p className={classes.cue} ref={cue}>
          <TbArrowDown aria-hidden="true" />
          {hero.cue}
        </p>
      </div>

      <div className={classes.marquee} ref={marquee} aria-hidden="true">
        <div className={classes.track}>
          {[0, 1].map((clone) => (
            <div className={classes.row} key={clone}>
              {hero.marquee.map((item) => (
                <span key={item}>
                  {item}
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={classes.veil} ref={veil} aria-hidden="true" />
    </section>
  )
}

export { Hero }
