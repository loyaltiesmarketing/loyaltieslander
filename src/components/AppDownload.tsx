import styles from './AppDownload.module.css'

export function AppDownload() {
  return (
    <section className={styles.section} aria-labelledby="app-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="app-heading" className={styles.heading}>
            Download the Loyaltys app for your team
          </h2>
          <p className={styles.support}>
            Staff stamp and manage from the floor. Customers never need to
            download anything — they tap your QR and use the card you give them.
          </p>
          <div className={styles.badges}>
            <a
              href="#"
              className={styles.badge}
              aria-label="Download on the App Store (coming soon)"
              onClick={(e) => e.preventDefault()}
            >
              <span className={styles.badgeEyebrow}>Download on the</span>
              <span className={styles.badgeStore}>App Store</span>
            </a>
            <a
              href="#"
              className={styles.badge}
              aria-label="Get it on Google Play (coming soon)"
              onClick={(e) => e.preventDefault()}
            >
              <span className={styles.badgeEyebrow}>Get it on</span>
              <span className={styles.badgeStore}>Google Play</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
