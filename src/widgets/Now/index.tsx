import React from 'react'
import { TbArrowUpRight } from 'react-icons/tb'

import { companies, heads } from '../../shared/content'
import { SectionHead } from '../../shared/ui/SectionHead'

import classes from './Now.module.sass'

const Now: React.FC = () => (
  <section className={`section ${classes.now}`} id="now">
    <div className="container">
      <SectionHead head={heads.now} />

      <div className={classes.grid} data-tilt>
        {companies.map((company) => (
          <article className={classes.card} key={company.id}>
            <header>
              <p className={classes.since}>{company.since}</p>
              <h3 className={classes.name}>{company.name}</h3>
              <p className={classes.kind}>{company.kind}</p>
            </header>

            <p className={classes.text}>{company.text}</p>

            <ul className={classes.services}>
              {company.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>

            <a className={classes.link} href={company.url} target="_blank" rel="noreferrer">
              <span>{company.url.replace(/^https?:\/\/|\/$/g, '')}</span>
              <TbArrowUpRight aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export { Now }
