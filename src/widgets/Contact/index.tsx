import React from 'react'
import { TbBrandTelegram, TbBrandWhatsapp } from 'react-icons/tb'

import { contact, heads, profile } from '../../shared/content'
import { Title } from '../../shared/ui/SectionHead'

import classes from './Contact.module.sass'

// LinkedIn and GitHub already sit in the list on the left, so the card
// only carries the two channels that start a conversation immediately
const buttons = [
  { label: 'Telegram', href: profile.telegram, Icon: TbBrandTelegram },
  { label: 'WhatsApp', href: profile.whatsapp, Icon: TbBrandWhatsapp },
]

// sites and the résumé open beside the page; tel: and mailto: hand off to an app
const opensTab = (href: string) => /^https?:|\.pdf$/.test(href)

const Contact: React.FC = () => (
  <section className={`section ${classes.contact}`} id="contact">
    <div className="container">
      <div className={classes.grid}>
        <div className={classes.left}>
          <p className="eyebrow">{heads.contact.eyebrow}</p>

          <Title
            lines={heads.contact.title}
            className={classes.title}
            lastLineClassName={classes.accent}
          />

          <p className="lead" data-reveal>
            {heads.contact.lead}
          </p>

          <ul className={classes.channels} data-reveal="stagger">
            {contact.channels.map((channel) => (
              <li key={channel.label}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    target={opensTab(channel.href) ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    <span className={classes.channelLabel}>{channel.label}</span>
                    <span className={classes.channelValue}>{channel.value}</span>
                  </a>
                ) : (
                  <div className={classes.channelStatic}>
                    <span className={classes.channelLabel}>{channel.label}</span>
                    <span className={classes.channelValue}>{channel.value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.card} data-tilt="self">
          <p className={classes.cardHead}>{contact.cardHead}</p>

          <a className={classes.mail} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>

          <p className={classes.cardNote}>{contact.cardNote}</p>

          <div className={classes.buttons}>
            {buttons.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                <Icon />
                <span>{label}</span>
              </a>
            ))}
          </div>

          <a className={classes.call} href={`tel:${profile.phoneRaw}`}>
            <span>{contact.call}</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </section>
)

export { Contact }
