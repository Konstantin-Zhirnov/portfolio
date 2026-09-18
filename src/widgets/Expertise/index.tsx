import React from 'react'

import { expertise, heads } from '../../shared/content'
import { SectionHead } from '../../shared/ui/SectionHead'

import classes from './Expertise.module.sass'

const Expertise: React.FC = () => (
  <section className={`section ${classes.expertise}`} id="expertise">
    <div className="container">
      <SectionHead head={heads.expertise} />

      <div className={classes.track} data-tilt>
        {expertise.map((item) => (
          <article className={classes.card} key={item.n}>
            <span className={classes.n}>{item.n}</span>
            <h3 className={classes.title}>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export { Expertise }
