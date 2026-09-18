import React from 'react'

import {
  Nav,
  Cursor,
  Hero,
  About,
  Now,
  Expertise,
  Stack,
  Work,
  Projects,
  Education,
  Contact,
  Footer,
} from '../widgets'
import { ui } from '../shared/content'
import { useMotion } from '../shared/lib/useMotion'
import { Boundary } from '../shared/ui/Boundary'

import './App.sass'

const App = () => {
  useMotion()

  return (
    <>
      {/* lands on the hero, past the ten stops in the bar */}
      <a className="skip" href="#main">
        {ui.skip}
      </a>

      <Boundary name="nav">
        <Nav />
      </Boundary>

      {/* every section is fenced off: one widget throwing removes that widget,
          not the page */}
      <main id="main" tabIndex={-1}>
        <Boundary name="hero">
          <Hero />
        </Boundary>
        <Boundary name="about">
          <About />
        </Boundary>
        <Boundary name="now">
          <Now />
        </Boundary>
        <Boundary name="expertise">
          <Expertise />
        </Boundary>
        <Boundary name="stack">
          <Stack />
        </Boundary>
        <Boundary name="work">
          <Work />
        </Boundary>
        <Boundary name="projects">
          <Projects />
        </Boundary>
        <Boundary name="education">
          <Education />
        </Boundary>
        <Boundary name="contact">
          <Contact />
        </Boundary>
      </main>

      <Boundary name="footer">
        <Footer />
      </Boundary>

      <div className="grain" aria-hidden="true" />
      <Boundary name="cursor">
        <Cursor />
      </Boundary>
    </>
  )
}

export default App
