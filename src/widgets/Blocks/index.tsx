import React from 'react'
import { FaCode } from 'react-icons/fa'
import { FaFeatherAlt } from 'react-icons/fa'
import { FaDatabase } from 'react-icons/fa'

import classes from './Blocks.module.sass'

const Blocks: React.FC = () => {
  return (
    <section className={classes.blocks}>
      <div className={classes.box}>
        <div className={classes.column}>
          <div className={classes.icon}>
            <FaCode />
          </div>
          <h3>Web development</h3>
          <p>JavaScript, React, Next.js,</p>
          <p>TypeScript, Redux, Cypress,</p>
          <p>Jest, React Testing Library,</p>
          <p>Apollo GraphQL, REST API,</p> <p>HTML5, CSS3, SASS,</p>
          <p>LESS, Node.js, Express,</p>
          <p>WebSocket, AG-GRID, JSON</p>
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
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <h3>Version Control</h3>
          <p>Git with GitHub and Bitbucket</p>
        </div>
      </div>
    </section>
  )
}

export { Blocks }
