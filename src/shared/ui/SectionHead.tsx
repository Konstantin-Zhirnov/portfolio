import React from 'react'

import type { Head } from '../content'

type TitleProps = {
  lines: string[]
  className?: string
  /** class for the last line only — Contact's red "real." */
  lastLineClassName?: string
}

/** The house display heading: one masked line per entry, risen by `data-lines`. */
const Title: React.FC<TitleProps> = ({ lines, className, lastLineClassName }) => (
  <h2 className={className ? `h2 ${className}` : 'h2'} data-lines>
    {lines.map((line, i) => (
      <span className="line" key={line}>
        <span className={i === lines.length - 1 ? lastLineClassName : undefined}>{line}</span>
      </span>
    ))}
  </h2>
)

/** Section head: eyebrow → display heading → lead. `className` swaps the global .head layout. */
const SectionHead: React.FC<{ head: Head; className?: string }> = ({
  head,
  className = 'head',
}) => (
  <div className={className}>
    <p className="eyebrow">{head.eyebrow}</p>
    <Title lines={head.title} />
    {head.lead && (
      <p className="lead" data-reveal>
        {head.lead}
      </p>
    )}
  </div>
)

export { SectionHead, Title }
