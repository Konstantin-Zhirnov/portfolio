import React from 'react'

import { heads, stack } from '../../shared/content'
import { SectionHead } from '../../shared/ui/SectionHead'

import classes from './Stack.module.sass'

const Stack: React.FC = () => (
  <section className={`section ${classes.stack}`} id="stack">
    <div className="container">
      <SectionHead head={heads.stack} className={classes.head} />
    </div>

    <div className={classes.rows}>
      {stack.map((group, i) => (
        <div className={classes.row} key={group.group}>
          <span className={classes.label}>{group.group}</span>
          <div className={classes.viewport}>
            <div
              className={classes.track}
              // one direction at slightly different speeds reads as a calm drift;
              // alternating rows read as five things competing for the eye
              style={{ animationDuration: `${72 + i * 10}s` }}
            >
              {[0, 1].map((clone) => (
                <div className={classes.chips} key={clone} aria-hidden={clone === 1}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export { Stack }
