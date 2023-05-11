import React from 'react'
import { ReactComponent as DevicesSVG } from './devices.svg'

import classes from './Devices.module.sass'

const Devices: React.FC = () => {
  return (
    <section className={classes.devices}>
      <DevicesSVG />
    </section>
  )
}

export { Devices }
