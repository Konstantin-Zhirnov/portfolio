import React from 'react'

import { experience, heads } from '../../shared/content'
import { SectionHead } from '../../shared/ui/SectionHead'

import classes from './Work.module.sass'

const Work: React.FC = () => (
  <section className={`section ${classes.work}`} id="work">
    <div className="container">
      <SectionHead head={heads.work} />

      <ol className={classes.list} data-reveal="stagger">
        {experience.map((job) => (
          <li className={classes.row} key={job.company + job.years}>
            <span className={classes.years}>{job.years}</span>

            <div className={classes.main}>
              <h3 className={classes.company}>{job.company}</h3>
              <p className={classes.role}>{job.role}</p>
              <p className={classes.text}>{job.text}</p>
            </div>

            <ul className={classes.tech}>
              {job.tech.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export { Work }
