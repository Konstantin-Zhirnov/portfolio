import React from 'react'

import classes from './Recent.module.sass'
import { Item } from './Item'
import { items } from './items'

const Recent: React.FC = () => {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2>Recent projects</h2>

        <div className={classes.grid_container}>
          {items.map((item, index) => (
            <Item key={item.id} id={item.id} text={item.text} url={item.url} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Recent }
