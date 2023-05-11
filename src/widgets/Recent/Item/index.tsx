import React from 'react'

import { ReactComponent as Logo } from '../images/react.svg'

import classes from './Item.module.sass'

type PropType = Record<'text' | 'url', string> & { id: number }

const Item: React.FC<PropType> = ({ text, url, id }) => {
  return (
    <figure className={classes[`figure_${id}`]}>
      <figcaption className={classes.figcaption}>
        <p className={classes.text}>{text}</p>

        <a href={url} target="_blank" rel="noreferrer" className={classes.btn}>
          Visit Website
        </a>
      </figcaption>

      <div className={classes.icon}>{id === 1 && <Logo />}</div>
    </figure>
  )
}

export { Item }
