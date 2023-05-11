import React from 'react'

import classes from './About.module.sass'

const About: React.FC = () => {
  return (
    <section className={classes.about}>
      <div className={classes.wrapper}>
        <h3>Hi, I’m Konstantin. Nice to meet you.</h3>
        <p>I have been successfully developing web interfaces for over 5 years.</p>
        <p>
          I enjoy being a front-end developer because I am responsible for implementing the
          front-end of the application, how the back-end and design interact with the user.
        </p>
        <p>
          How the application behaves on different screen resolutions and accessibility for people
          with disabilities depends on my work.
        </p>
        <p>
          I'm quietly confident, naturally curious, and perpetually working on improving my chops.
        </p>
      </div>
    </section>
  )
}

export { About }
