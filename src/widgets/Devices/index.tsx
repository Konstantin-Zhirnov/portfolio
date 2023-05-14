import React from 'react'

import { ReactComponent as DevicesSVG } from './devices-original.svg'

import classes from './Devices.module.sass'

const Devices: React.FC = () => {
  // const targetRef = React.useRef(null)

  // const isVisible = useElementOnScreen(
  //   {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0.3,
  //   },
  //   targetRef,
  // )

  return (
    <section className={classes.devices}>
      <DevicesSVG />
    </section>
  )
}

export { Devices }
