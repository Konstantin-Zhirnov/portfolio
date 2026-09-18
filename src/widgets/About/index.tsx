import React from 'react'

import { aboutChips, heads, profile, stats } from '../../shared/content'
import { Title } from '../../shared/ui/SectionHead'
import { Portrait } from './Portrait'

import classes from './About.module.sass'

const About: React.FC = () => (
  <section className={`section ${classes.about}`} id="about">
    <div className="container">
      <div className={classes.grid}>
        <Portrait alt={`${profile.name}, ${profile.role}`} caption={profile.location} />

        <div className={classes.text}>
          <p className="eyebrow">{heads.about.eyebrow}</p>

          <Title lines={heads.about.title} className={classes.title} />

          <div className={classes.body} data-reveal="stagger">
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className={classes.chips} data-reveal="stagger">
            {aboutChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </div>

      <dl className={classes.stats} data-reveal="stagger">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt data-count={stat.value}>{stat.value}</dt>
            <dd>{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)

export { About }
