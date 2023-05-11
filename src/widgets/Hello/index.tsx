import React from 'react'

import classes from './Hello.module.sass'

const Hello: React.FC = () => {
  return (
    <section className={classes.hello}>
      <h1>Frontend Developer &amp; React Developer</h1>
      <h2>I design and code beautifully simple things, and I love what I do.</h2>
      <div className={classes.photo}></div>
    </section>
  )
}

export { Hello }
