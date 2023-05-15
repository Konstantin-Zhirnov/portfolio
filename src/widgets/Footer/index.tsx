import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { TbBrandTelegram } from 'react-icons/tb'
import { BsWhatsapp } from 'react-icons/bs'

import classes from './Footer.module.sass'

const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <p className={classes.title}>Interested in working</p>
      <p className={`${classes.title} ${classes.last}`}>together?</p>

      <a className={classes.phone} href="tel:+12507972834">
        get in touch
      </a>

      <a className={classes.resume} href="/Konstantin_Zhirnov.pdf" target="_blank" rel="noreferrer">
        see resume
      </a>

      <div className={classes.links}>
        <a href="https://www.linkedin.com/in/kostya-zhirnov/">
          <FaLinkedinIn />
        </a>
        <a href="mailto:kostya.zhirnov@gmail.com">
          <FiMail />
        </a>
        <a href="https://t.me/+12507972834">
          <TbBrandTelegram />
        </a>
        <a href="https://api.whatsapp.com/send?phone=12507972834">
          <BsWhatsapp />
        </a>
      </div>

      <div className={classes.thanks}>
        <a href="https://vovavindar.com/?" target="_blank">
          Designed by Vova Vindar
        </a>
      </div>
    </footer>
  )
}

export { Footer }
