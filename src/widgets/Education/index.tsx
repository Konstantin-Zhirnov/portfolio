import React from 'react'

import { education, heads, ui } from '../../shared/content'
import { SectionHead } from '../../shared/ui/SectionHead'

import classes from './Education.module.sass'

const Education: React.FC = () => (
  <section className={`section ${classes.education}`}>
    <div className="container">
      <SectionHead head={heads.education} />

      <div className={classes.grid} data-tilt>
        {education.map((item) => (
          <article className={classes.card} key={item.n}>
            <div className={classes.top}>
              <span className={classes.tag}>{item.tag}</span>
              <span className={classes.n}>{item.n}</span>
            </div>
            <h3 className={classes.title}>{item.title}</h3>
            <p className={classes.issuer}>
              <span>{ui.issuedBy}</span>
              {item.issuer}
            </p>
            <p className={classes.years}>{item.years}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export { Education }
