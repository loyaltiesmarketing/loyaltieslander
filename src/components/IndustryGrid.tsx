import { Link } from 'react-router-dom'
import { industries } from '../data/site'
import { industryAssetUrl } from '../lib/assets'
import styles from './IndustryGrid.module.css'

/** All industries except service businesses — two rows of four on desktop */
const HOME_INDUSTRY_SLUGS = [
  'cafes',
  'restaurants',
  'bars',
  'bakeries',
  'hairdressers',
  'barbers',
  'nail-techs',
  'clothing',
] as const

/** Prefer image 2 for these home thumbnails */
const HOME_IMAGE_2 = new Set(['cafes', 'barbers', 'restaurants', 'clothing'])

export function IndustryGrid() {
  const featured = HOME_INDUSTRY_SLUGS.map((slug) =>
    industries.find((item) => item.slug === slug),
  ).filter((item): item is (typeof industries)[number] => Boolean(item))

  return (
    <section id="industries" className={styles.section} aria-labelledby="industries-heading">
      <div className="container">
        <div className={styles.intro}>
          <h2 id="industries-heading" className={styles.heading}>
            Recommended for your business
          </h2>
          <p className={styles.support}>
            Pick your trade — same product, tailored angle.
          </p>
        </div>

        <div className={styles.grid}>
          {featured.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className={styles.card}
            >
              <div className={styles.photo}>
                <img
                  src={industryAssetUrl(
                    industry.assetKey,
                    HOME_IMAGE_2.has(industry.slug) ? 2 : 1,
                  )}
                  alt=""
                  className={styles.photoImg}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{industry.name}</h3>
                <p className={styles.blurb}>{industry.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
