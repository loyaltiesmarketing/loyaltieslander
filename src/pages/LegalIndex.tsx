import { Link } from 'react-router-dom'
import { legalDocs } from '../data/legal'
import { usePageMeta } from '../lib/usePageMeta'
import styles from './LegalIndex.module.css'

export function LegalIndex() {
  usePageMeta(
    'Legal policies | Loyalties',
    'Terms, privacy, acceptable use and other policies that govern Loyalties Marketing.',
  )

  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.eyebrow}>Legal</p>
      <h1 className={styles.title}>Legal policies for Loyalties Marketing</h1>
      <p className={styles.lede}>
        Policies that govern Loyalties Marketing — for venues and the people who
        join their programs.
      </p>

      <ul className={styles.list}>
        {legalDocs.map((doc) => (
          <li key={doc.slug}>
            <Link to={`/legal/${doc.slug}`} className={styles.card}>
              <span className={styles.cardTitle}>{doc.title}</span>
              <span className={styles.cardArrow} aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
