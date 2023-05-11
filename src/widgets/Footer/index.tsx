import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { TbBrandTelegram } from 'react-icons/tb'
import { BsWhatsapp } from 'react-icons/bs'

import classes from './Footer.module.sass'

const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <h3>Are you interested in working together? We should discuss this.</h3>
      <h4>Konstantin Zhirnov</h4>
      <p>Living, learning, & leveling up one day at a time.</p>
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
    </footer>
  )
}

export { Footer }
