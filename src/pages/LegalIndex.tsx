import { Link } from 'react-router-dom'
import { legalDocs } from '../data/legal'
import styles from './LegalIndex.module.css'

export function LegalIndex() {
  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.eyebrow}>Legal</p>
      <h1 className={styles.title}>Legal</h1>
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
