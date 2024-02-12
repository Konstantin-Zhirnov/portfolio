import React from 'react'

import classes from './About.module.sass'
import { FaCode, FaDatabase, FaFeatherAlt } from 'react-icons/fa'

const About: React.FC = () => {
  return (
    <section className={classes.section}>
      <div className={classes.container_text}>
        <p>
          I enjoy front-end because my work ensures an application is accessible, responsive, and
          delivers a great user experience.{' '}
          <span>To accomplish that, I am constantly working on improving my chops.</span>
        </p>
      </div>

      <div className={classes.container_blocks}>
        <div className={classes.blocks}>
          <div className={classes.column}>
            <div className={classes.icon}>
              <FaCode />
            </div>
            <h3>Web development</h3>
            <p>JavaScript, React, Next.js,</p>
            <p>TypeScript, Redux, Cypress, Jest,</p>
            <p>React Testing Library,</p>
            <p>Apollo GraphQL, REST API, HTML5,</p>
            <p>CSS3, SASS, LESS, Node.js, Express,</p>
            <p>Nest.js, WebSocket, JSON</p>
          </div>

          <div className={classes.column}>
            <div className={classes.icon}>
              <FaFeatherAlt />
            </div>
            <h3>Design</h3>
            <p>Material-UI</p>
            <p>Ant design</p>
            <p>Bootstrap</p>
            <p>Chakra UI</p>
            <p>Styled component</p>
          </div>

          <div className={classes.column}>
            <div className={classes.icon}>
              <FaDatabase />
            </div>
            <h3>Data Base</h3>
            <p>MongoDB</p>
            <p>MySQL</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { About }
