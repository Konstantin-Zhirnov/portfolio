import React from 'react'
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTelegram,
  TbBrandWhatsapp,
  TbMail,
} from 'react-icons/tb'

import { companies, footer, nav, profile } from '../../shared/content'
import { scrollToId } from '../../shared/lib/useMotion'

import classes from './Footer.module.sass'

// one icon family, one stroke: the row reads as a set instead of five logos
const socials = [
  { label: 'LinkedIn', href: profile.linkedin, Icon: TbBrandLinkedin },
  { label: 'GitHub', href: profile.github, Icon: TbBrandGithub },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: TbMail },
  { label: 'Telegram', href: profile.telegram, Icon: TbBrandTelegram },
  { label: 'WhatsApp', href: profile.whatsapp, Icon: TbBrandWhatsapp },
]

// a mailto: in a new tab leaves an empty tab behind in several browsers
const tab = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}

const Footer: React.FC = () => (
  <footer className={classes.footer}>
    <div className="container">
      <div className={classes.top}>
        <div className={classes.col}>
          <p className={classes.colHead}>{footer.sections}</p>
          {nav.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(item.href)
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className={classes.col}>
          <p className={classes.colHead}>{footer.companies}</p>
          {[...companies, ...footer.products].map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
              {item.name}
            </a>
          ))}
        </div>

        <div className={classes.col}>
          <p className={classes.colHead}>{footer.elsewhere}</p>
          {socials.map((social) => (
            <a key={social.label} href={social.href} {...tab(social.href)}>
              {social.label}
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noreferrer">
            {footer.resume}
          </a>
        </div>

        <div className={classes.cta}>
          <p className={classes.ctaText}>{footer.cta}</p>
          <a className={classes.mail} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>
    </div>

    <p className={classes.wordmark} aria-hidden="true">
      {profile.first}
      <span>.</span>
    </p>

    <div className="container">
      <div className={classes.bottom}>
        <span>
          &copy; {new Date().getFullYear()} {profile.name} — {profile.location}
        </span>
        <div className={classes.icons}>
          {socials.map(({ label, href, Icon }) => (
            <a key={label} href={href} {...tab(href)} aria-label={label}>
              <Icon />
            </a>
          ))}
        </div>
        <span>{footer.credit}</span>
      </div>
    </div>
  </footer>
)

export { Footer }
