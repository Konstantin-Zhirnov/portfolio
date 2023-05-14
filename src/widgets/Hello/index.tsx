import React from 'react'

import classes from './Hello.module.sass'

const Hello: React.FC = () => {
  return (
    <section className={classes.section}>
      <p className={classes.title}>Front-end &amp; React</p>
      <p className={`${classes.title} ${classes.last}`}>Developer</p>
      <p className={classes.text}>
        I’m Konstantin Zhirnov, an IT professional with over five years of solid experience in
        front-end development, based in Canada.
      </p>
      <a href="tel:+12507972834">get in touch</a>
    </section>
  )
}

export { Hello }
