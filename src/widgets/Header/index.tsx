import React from 'react'
import { ReactComponent as Logo } from './react.svg'

import classes from './Header.module.sass'

const Header: React.FC = () => {
  return (
    <header className={classes.container}>
      <Logo />
    </header>
  )
}

export { Header }
