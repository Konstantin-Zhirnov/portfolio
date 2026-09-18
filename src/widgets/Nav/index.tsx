import React from 'react'

import { nav, profile, ui } from '../../shared/content'
import { gsap, ScrollTrigger, scrollToId } from '../../shared/lib/useMotion'

import classes from './Nav.module.sass'

// the width at which the bar trades its links for the burger (Nav.module.sass)
const BURGER = '(max-width: 1080px)'

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState('#top')
  const progress = React.useRef<HTMLSpanElement>(null)
  const bar = React.useRef<HTMLElement>(null)
  const burger = React.useRef<HTMLButtonElement>(null)

  // Sticky stages below the bar need its real height, which moves with the
  // safe-area inset, the burger breakpoint and the browser's zoom level — a vh
  // guess undershoots it on short or zoomed viewports.
  React.useLayoutEffect(() => {
    const el = bar.current
    if (!el) return
    const root = document.documentElement
    const write = () => root.style.setProperty('--nav-h', `${el.offsetHeight}px`)
    write()
    // older Safari has no ResizeObserver; a resize listener covers the same cases
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', write)
      return () => {
        window.removeEventListener('resize', write)
        root.style.removeProperty('--nav-h')
      }
    }
    const watch = new ResizeObserver(write)
    watch.observe(el)
    return () => {
      watch.disconnect()
      root.style.removeProperty('--nav-h')
    }
  }, [])

  React.useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', sync, { passive: true })
    sync()
    return () => window.removeEventListener('scroll', sync)
  }, [])

  // the hairline under the bar measures the page, and each section claims the
  // matching link while it holds the middle of the screen
  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progress.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })

      nav.forEach((item) => {
        const section = document.querySelector<HTMLElement>(item.href)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActive(item.href)
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  // the panel owns the scroll while it is open
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape closes the panel and hands focus back to the button that opened it
  React.useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      burger.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // A tablet turned to landscape crosses the breakpoint with the panel open: the
  // burger that could close it is gone and the page stays locked behind it.
  React.useEffect(() => {
    const query = window.matchMedia(BURGER)
    const sync = () => {
      if (!query.matches) setOpen(false)
    }
    if (query.addEventListener) {
      query.addEventListener('change', sync)
      return () => query.removeEventListener('change', sync)
    }
    query.addListener(sync)
    return () => query.removeListener(sync)
  }, [])

  const go = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setOpen(false)
    scrollToId(href)
  }

  return (
    <header className={`${classes.header} ${scrolled ? classes.scrolled : ''}`} ref={bar} data-nav>
      <a className={classes.mark} href="#top" onClick={(e) => go(e, '#top')}>
        {profile.first}
        <span>.</span>
      </a>

      <nav className={classes.links} aria-label={ui.sectionsLabel}>
        {nav.map((item, i) => (
          <React.Fragment key={item.href}>
            {i > 0 && (
              <span className={classes.sep} aria-hidden="true">
                /
              </span>
            )}
            <a
              href={item.href}
              onClick={(e) => go(e, item.href)}
              className={active === item.href ? classes.active : undefined}
              aria-current={active === item.href ? 'location' : undefined}
            >
              {item.label}
            </a>
          </React.Fragment>
        ))}
      </nav>

      <a className={classes.cta} href={ui.cta.href} onClick={(e) => go(e, ui.cta.href)}>
        <span>{ui.cta.label}</span>
        <i aria-hidden="true" />
      </a>

      <button
        className={`${classes.burger} ${open ? classes.burgerOpen : ''}`}
        ref={burger}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu"
        aria-label={open ? ui.menuClose : ui.menuOpen}
      >
        <span />
        <span />
      </button>

      <span className={classes.progress} ref={progress} aria-hidden="true" />

      <nav
        className={`${classes.panel} ${open ? classes.panelOpen : ''}`}
        id="menu"
        aria-label={ui.menuLabel}
      >
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={(e) => go(e, item.href)}>
            {item.label}
          </a>
        ))}
        <a className={classes.panelMail} href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </nav>
    </header>
  )
}

export { Nav }
