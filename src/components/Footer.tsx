import { Link } from 'react-router-dom'
import { APP_URL } from '../data/site'
import styles from './Footer.module.css'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Pricing', to: '/pricing' },
      { label: 'Industries', href: '/#industries' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Resources', to: '/resources' },
      { label: 'Report a concern', to: '/abuse' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/legal/privacy' },
      { label: 'Terms', to: '/legal/terms' },
      { label: 'All legal policies', to: '/legal' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact us', to: '/contact' },
      { label: 'Submit a ticket', to: '/support' },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.columns}>
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <p className={styles.columnTitle}>{column.title}</p>
              <ul className={styles.columnList}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {'to' in link && link.to ? (
                      <Link to={link.to}>{link.label}</Link>
                    ) : (
                      <a
                        href={link.href}
                        {...(link.href?.startsWith('http')
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {column.title === 'Product' ? (
                <a href={APP_URL} className={styles.cta}>
                  Get started
                </a>
              ) : null}
            </div>
          ))}
        </div>

        <div className={styles.mid}>
          <Link to="/" className={styles.brand} aria-label="Loyaltys home">
            <img src="/logo.png" alt="Loyaltys" width={160} height={28} />
          </Link>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Loyalties Marketing. All rights reserved.
          </p>
          <nav className={styles.legalRow} aria-label="Legal">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a>
            <span aria-hidden>|</span>
            <Link to="/legal/privacy">Privacy</Link>
            <span aria-hidden>|</span>
            <Link to="/legal/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
