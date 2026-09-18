/**
 * Every word and link on the site lives here, so the page components stay layout-only.
 * Sources: the CV (Feb 2026), create-website.ca and ai-solutions.live.
 */

// Contact details below are mirrored in the <noscript> block of public/index.html,
// the only thing a visitor without JavaScript sees — change both together.
export const profile = {
  name: 'Konstantin Zhirnov',
  first: 'Konstantin',
  role: 'Full Stack Developer',
  roles: ['CREATIVE', 'FULL-STACK', 'AI'],
  location: 'Nanaimo, BC · Canada',
  phone: '(250) 797-2834',
  phoneRaw: '+12507972834',
  email: 'kostya.zhirnov@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kostya-zhirnov/',
  github: 'https://github.com/Konstantin-Zhirnov',
  linkedinHandle: 'kostya-zhirnov',
  githubHandle: 'Konstantin-Zhirnov',
  telegram: 'https://t.me/+12507972834',
  whatsapp: 'https://api.whatsapp.com/send?phone=12507972834',
  resume: `${process.env.PUBLIC_URL}/Konstantin_Zhirnov.pdf`,
  resumeFile: 'Konstantin_Zhirnov.pdf',
  heroLead:
    'I build websites, web apps and AI products for businesses on Vancouver Island. Most sites go live in one to three weeks.',
  bio: [
    'I have been building for the web since 2018 — first for agencies and product teams, then for a bank, a steel company, and a B2B portal I rewrote from scratch for 26,000 new clients. Speed, accessibility and search ranking are part of the build, not the phase that gets cut.',
    'Since January 2026 I run two of my own companies out of Nanaimo: Web Solutions, a web studio for small businesses across Vancouver Island, and AI Solutions, an AI product studio. I design, build and support everything myself — you talk to the person writing the code.',
  ],
}

export const stats = [
  { value: '2018', label: 'Building for the web since' },
  { value: '30+', label: 'Websites shipped' },
  { value: '02', label: 'Companies of my own' },
  { value: '5.0', label: 'Rating on Google' },
]

export const companies = [
  {
    id: 'web-solutions',
    name: 'Web Solutions',
    url: 'https://create-website.ca/',
    since: 'Since January 2026',
    kind: 'Web studio · Nanaimo, Vancouver Island',
    text: 'Fast, SEO-optimized, mobile-first websites and web apps for small businesses — from the first sketch of a brand to the local search traffic that finds it.',
    services: [
      'Business websites',
      'E-commerce',
      'Web apps & automation',
      'UI/UX design',
      'Brand identity',
      'Local SEO',
    ],
  },
  {
    id: 'ai-solutions',
    name: 'AI Solutions',
    url: 'https://ai-solutions.live/',
    since: 'Since January 2026',
    kind: 'AI product studio',
    text: 'Frontier AI turned into working products: custom applications, agents and chatbots that resolve real tasks, LLM integration into systems already running, and automation that makes routine work disappear.',
    services: [
      'Custom AI apps',
      'AI agents & chatbots',
      'LLM integration',
      'Process automation',
      'Evaluation & guardrails',
    ],
  },
]

export const expertise = [
  {
    n: '01',
    title: 'Frontend Engineering',
    text: 'SPA and SSR applications in React and Next.js — state that scales, accessible markup and Core Web Vitals handled as a feature, not a chore.',
  },
  {
    n: '02',
    title: 'Backend & APIs',
    text: 'Secure REST APIs, authentication and server-side services on Node.js, NestJS and Express, with PostgreSQL, MongoDB and MySQL behind them.',
  },
  {
    n: '03',
    title: 'AI Product Engineering',
    text: 'LLM products that take real action: tool calling, multi-tenant SaaS, agents that answer, book and automate — shipped, not demoed.',
  },
  {
    n: '04',
    title: 'Cloud & Delivery',
    text: 'Docker, GitHub Actions and CI/CD pipelines, end-to-end and unit coverage with Cypress, Jest and React Testing Library, deployed and watched.',
  },
]

export const stack: { group: string; items: string[] }[] = [
  {
    group: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Redux Toolkit',
      'Effector',
      'Zustand',
      'React Native',
      'Apollo GraphQL',
      'HTML5',
      'CSS3',
      'SASS',
      'Tailwind CSS',
      'GSAP',
    ],
  },
  {
    group: 'Backend & data',
    items: [
      'Node.js',
      'NestJS',
      'Express',
      'REST API',
      'WebSocket',
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'Redis',
      'SQL',
    ],
  },
  {
    group: 'AI',
    items: [
      'Claude API',
      'LLM tool calling',
      'AI agents',
      'RAG',
      'Prompt engineering',
      'Semantic search',
    ],
  },
  {
    group: 'UI & testing',
    items: [
      'Material-UI',
      'Ant Design',
      'Chakra UI',
      'Bootstrap',
      'Styled Components',
      'Cypress',
      'Jest',
      'React Testing Library',
    ],
  },
  {
    group: 'Cloud & tools',
    items: [
      'Docker',
      'GitHub Actions',
      'Git',
      'Webpack',
      'Babel',
      'Vercel',
      'Stripe',
      'SEO',
      'Accessibility',
    ],
  },
]

export const experience = [
  {
    years: '2026 — now',
    company: 'Web Solutions · AI Solutions',
    role: 'Founder, Full Stack Developer',
    text: 'Run both companies end to end — design, build, deploy and support websites, web apps and AI products for clients across Vancouver Island.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Claude API', 'Stripe'],
  },
  {
    years: '2025 — 2026',
    company: 'FindPro.ca',
    role: 'Full Stack Developer',
    text: 'Performant SPAs plus the REST services behind them, with CI/CD on GitHub Actions and Docker and coverage from unit through end-to-end.',
    tech: ['React', 'Redux Toolkit', 'Zustand', 'NestJS', 'MongoDB', 'Cypress'],
  },
  {
    years: '2025',
    company: 'Severstal',
    role: 'Senior Front-End Developer',
    text: "Built the company's SPA on React with Effector as the state layer, and optimized it for performance and scale.",
    tech: ['React', 'Effector', 'TypeScript', 'Ant Design', 'Styled Components'],
  },
  {
    years: '2022 — 2025',
    company: 'Digital Nanaimo',
    role: 'Front-End Developer',
    text: 'Developed and maintained SPAs and the NestJS services behind them, working directly with designers on UX and accessibility.',
    tech: ['React', 'Redux Toolkit', 'TypeScript', 'Chakra UI', 'NestJS', 'Docker'],
  },
  {
    years: '2021 — 2022',
    company: 'Sberbank-Technology',
    role: 'Front-End Developer',
    text: 'Built a new internal banking application used by over 1,000 employees, and kept the React front-end fast and testable.',
    tech: ['React', 'Redux Toolkit', 'TypeScript', 'Jest', 'Ant Design', 'Express'],
  },
  {
    years: '2020 — 2021',
    company: 'ETM',
    role: 'Front-End Developer',
    text: 'Rewrote a legacy jQuery portal into a React/Next.js platform — a 2× cost reduction and over 26,000 new clients.',
    tech: ['Next.js', 'React', 'Redux', 'TypeScript', 'Material-UI', 'Express'],
  },
  {
    years: '2018 — 2020',
    company: 'AVA-media',
    role: 'Front-End Developer',
    text: 'Built and modernized websites for a wide range of clients, translating requirements straight from client and designer into working sites.',
    tech: ['React', 'Redux', 'JavaScript', 'SASS', 'Webpack', 'Babel'],
  },
]

export type Project = {
  id: string
  tag: string
  title: string
  text: string
  tech: string[]
  url: string
  shot: string
}

export const projects: Project[] = [
  {
    id: 'ai-solutions',
    tag: 'AI product studio',
    title: 'AI Solutions',
    text: 'A modern AI product studio website that positions the brand as an end-to-end partner for building real AI-powered products.',
    tech: ['AI-focused', 'Premium design', 'Service-led'],
    url: 'https://ai-solutions.live',
    shot: 'ai-solutions',
  },
  {
    id: 'helper',
    tag: 'AI booking SaaS',
    title: 'Helper AI',
    text: 'A polished SaaS landing page for an AI booking assistant that explains the product clearly and drives users to sign up.',
    tech: ['SaaS showcase', 'AI automation', 'Booking flow'],
    url: 'https://helper-ai.org',
    shot: 'helper',
  },
  {
    id: 'athecon',
    tag: 'Corporate website',
    title: 'Athecon Projects Inc.',
    text: 'A bold corporate site that showcases major builds, stats and safety to win commercial clients’ trust.',
    tech: ['Project showcase', 'Stats & safety', 'Mobile-first'],
    url: 'https://athecon.com',
    shot: 'athecon',
  },
  {
    id: 'p3',
    tag: 'HVAC & plumbing',
    title: 'P3 Mechanical & Electrical',
    text: 'A service site for a Nanaimo HVAC and plumbing crew that routes urgent problems to the right team and turns visits into estimate calls.',
    tech: ['Service hubs', 'Local SEO', 'Call-driven'],
    url: 'https://p3me.com',
    shot: 'p3',
  },
  {
    id: 'pahlavan',
    tag: 'Website refresh',
    title: 'PAHLAVAN General Contracting Inc',
    text: 'A clean, trustworthy redesign with clear navigation that guides visitors straight to an inquiry.',
    tech: ['Clear UX', 'Mobile-first', 'SEO'],
    url: 'https://pgcdrywall.com/',
    shot: 'pahlavan',
  },
  {
    id: 'upgreat',
    tag: 'Renovation contractor',
    title: 'UPGREAT Home Renovations',
    text: 'A renovation site that lays out every service clearly and sends visitors straight to a free estimate.',
    tech: ['Service catalogue', 'Local SEO', 'Estimate-driven'],
    url: 'https://upgreathome.ca/',
    shot: 'upgreat',
  },
  {
    id: 'yankovska',
    tag: 'Website refresh',
    title: 'Yankovska School of Rhythmic Gymnastics',
    text: 'An elegant refresh that matches the school’s brand and makes signing up effortless on any screen.',
    tech: ['Brand-led design', 'Mobile-first', 'Fast load'],
    url: 'https://yankovskaschool.com/',
    shot: 'yankovska',
  },
  {
    id: 'pdr',
    tag: 'Landing + lead-gen',
    title: 'Mobile Paintless Dent Repair',
    text: 'A high-impact landing page that explains PDR clearly and drives visitors straight to a call or quote.',
    tech: ['Conversion-focused', 'Mobile-first', 'Fast load'],
    url: 'https://paintless-dent-repair.ca',
    shot: 'pdr',
  },
]

export const education = [
  {
    n: '01',
    tag: 'Higher education',
    title: 'B.Sc. in Applied Informatics',
    issuer: 'Northern (Arctic) Federal University — NArFU',
    years: '2013 — 2017',
  },
  {
    n: '02',
    tag: 'Diploma',
    title: 'Electromechanics',
    issuer: 'Kumertau Mining College',
    years: '1997 — 2001',
  },
]

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Companies', href: '#now' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

/** Interface strings: controls, landmarks and labels that are not section copy. */
export const ui = {
  skip: 'Skip to content',
  sectionsLabel: 'Sections',
  menuLabel: 'Menu',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  cta: { label: 'Start a project', href: '#contact' },
  visitSite: 'Visit site',
  viewSite: 'View site',
  screenshot: 'website screenshot',
  studioPortfolio: { label: 'See the full studio portfolio', url: 'https://create-website.ca/' },
  issuedBy: 'Issued by',
}

export const hero = {
  greeting: `Hi, I’m ${profile.name}`,
  // the second display line; the first cycles through profile.roles
  title: 'Developer',
  mark: '(/)',
  kicker: 'Web Solutions · AI Solutions',
  primary: { label: 'See the work', href: '#projects' },
  cue: 'Scroll to begin',
  marquee: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'Claude API',
    'GSAP',
  ],
}

/** A section head: mono eyebrow, one entry per masked display line, optional lead. */
export type Head = { eyebrow: string; title: string[]; lead?: string }

export const heads: Record<
  'about' | 'now' | 'expertise' | 'stack' | 'work' | 'projects' | 'education' | 'contact',
  Head
> = {
  about: {
    eyebrow: '// Who builds it',
    title: ['Hello, I’m', profile.name],
  },
  now: {
    eyebrow: '// Currently',
    title: ['Two companies', 'of my own'],
    lead: 'Since January 2026 I have been running both out of Nanaimo — one building the web for small businesses across Vancouver Island, the other turning frontier AI into products people actually use.',
  },
  expertise: {
    eyebrow: '// Core disciplines',
    title: ['What I actually', 'do all day'],
    lead: 'Four disciplines that keep overlapping — a product usually needs all of them before it is any use to anyone.',
  },
  stack: {
    eyebrow: '// Technical stack',
    title: ['Technologies', 'I work with'],
    lead: 'The tools behind the work above, grouped by where each one sits in a build.',
  },
  work: {
    eyebrow: '// Track record',
    title: ['Where the', 'hours went'],
    lead: 'Eight years from agency work through an internal banking platform and a B2B portal rewrite, to running two companies of my own.',
  },
  projects: {
    eyebrow: '// Selected work',
    title: ['Projects that', 'define the journey'],
    lead: 'Eight sites and products, every one of them live right now, and every one designed, built and deployed by me.',
  },
  education: {
    eyebrow: '// Formal training',
    title: ['Credentials'],
  },
  contact: {
    eyebrow: '// Direct lines',
    title: ['Let’s build', 'something', 'real.'],
    // the one place full-time and contract availability is stated
    lead: 'Based in Nanaimo, working with clients across Vancouver Island and teams anywhere. Open to full-time and contract roles too.',
  },
}

export const aboutChips = ['Websites', 'Web apps', 'AI products', 'Nanaimo, BC']

export const contact = {
  channels: [
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phoneRaw}` },
    { label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin },
    { label: 'GitHub', value: profile.githubHandle, href: profile.github },
    { label: 'Résumé', value: profile.resumeFile, href: profile.resume },
    { label: 'Location', value: profile.location, href: null },
  ],
  cardHead: 'Fastest route',
  cardNote:
    'Write with what you are building and the timeline. I read every message myself and reply within one business day.',
  call: `Or call ${profile.phone}`,
}

export const footer = {
  sections: 'Sections',
  companies: 'Companies',
  elsewhere: 'Elsewhere',
  // listed in the footer beside the two companies
  products: [{ name: 'Helper AI', url: 'https://helper-ai.org/' }],
  resume: 'Résumé (PDF)',
  cta: 'Have something to build? Write to me directly.',
  credit: 'Built with React, TypeScript & GSAP',
}
