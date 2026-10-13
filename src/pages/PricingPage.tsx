import { APP_URL, PRICING_COPY } from '../data/site'
import styles from './PricingPage.module.css'

const pricingAppUrl = `${APP_URL}?utm_source=site&utm_medium=pricing-page&utm_campaign=pricing`

function CellValue({ value }: { value: string | string[] }) {
  if (Array.isArray(value)) {
    return (
      <ul className={styles.cellList}>
        {value.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  return <>{value}</>
}

export function PricingPage() {
  const [free, pro] = PRICING_COPY.tiers

  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heading}>{PRICING_COPY.heading}</h1>
        </div>
      </section>

      <section className={styles.plans} aria-label="Plans">
        <div className={`container ${styles.planGrid}`}>
          <article className={styles.plan}>
            <h2 className={styles.planName}>{free.name}</h2>
            <ul className={styles.pointList}>
              {free.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className={styles.planFoot}>
              <p className={styles.planPrice}>
                <span className={styles.priceAmount}>{free.price}</span>
                <span className={styles.priceNote}>{free.priceNote}</span>
              </p>
              <a href={pricingAppUrl} className={styles.cta}>
                {free.cta}
              </a>
            </div>
          </article>

          <article className={`${styles.plan} ${styles.planFeatured}`}>
            <h2 className={styles.planName}>{pro.name}</h2>
            <ul className={styles.pointList}>
              {pro.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className={styles.planFoot}>
              <p className={styles.planPrice}>
                <span className={styles.priceAmount}>{pro.price}</span>
                <span className={styles.priceNote}>{pro.priceNote}</span>
              </p>
              <a href={pricingAppUrl} className={styles.cta}>
                {pro.cta}
              </a>
            </div>
          </article>
        </div>
        <p className={`container ${styles.footnote}`}>{PRICING_COPY.footnote}</p>
      </section>

      <section className={styles.compare} aria-labelledby="compare-heading">
        <div className="container">
          <h2 id="compare-heading" className={styles.compareHeading}>
            Side by side
          </h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Free</th>
                  <th scope="col">Pro — $8/week</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_COPY.comparison.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td>
                      <CellValue value={row.free} />
                    </td>
                    <td className={row.emphasizePro ? styles.proCell : undefined}>
                      <CellValue value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.banner}>
        <div className={styles.bannerBg} aria-hidden />
        <div className={`container ${styles.bannerInner}`}>
          <h2 className={styles.bannerHeading}>{PRICING_COPY.ctaHeading}</h2>
          <a href={pricingAppUrl} className={styles.bannerCta}>
            {PRICING_COPY.cta}
          </a>
        </div>
      </section>
    </main>
  )
}
