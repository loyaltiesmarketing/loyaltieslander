import { companyLogos } from '../data/site'
import styles from './LogoCarousel.module.css'

const LARGE = new Set(['Brew Labs', 'Stand-Up Café'])
const COMPACT = new Set(['Revel Group'])

function logoClass(name: string) {
  if (COMPACT.has(name)) return `${styles.logo} ${styles.logoCompact}`
  if (LARGE.has(name)) return `${styles.logo} ${styles.logoLarge}`
  return styles.logo
}

function blockSave(event: React.SyntheticEvent) {
  event.preventDefault()
}

export function LogoCarousel() {
  // Triple the set so the loop stays seamless on wide screens
  const logos = [...companyLogos, ...companyLogos, ...companyLogos]

  return (
    <section
      className={styles.section}
      aria-label="Companies that use us"
      onContextMenu={blockSave}
    >
      <div className={styles.header}>
        <p className={styles.label}>Companies that use us</p>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track} aria-hidden>
          {logos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className={logoClass(logo.name)}
              title={logo.name}
              role="img"
              aria-label={logo.name}
              style={{ backgroundImage: `url(${logo.src})` }}
              onContextMenu={blockSave}
              onDragStart={blockSave}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
