import { HeroStampGrid } from '../components/HeroStampGrid'
import { IndustryGrid } from '../components/IndustryGrid'
import { LogoCarousel } from '../components/LogoCarousel'
import { LoyaltyCardShowcase } from '../components/LoyaltyCardShowcase'
import { usePageMeta } from '../lib/usePageMeta'
import styles from './Home.module.css'

export function Home() {
  usePageMeta()

  return (
    <>
      <HeroStampGrid />
      <LogoCarousel />
      <section className={styles.about} aria-labelledby="about-heading">
        <div className={`container ${styles.aboutInner}`}>
          <h2 id="about-heading" className={styles.aboutHeading}>
            A loyalty card people actually keep
          </h2>
          <div className={styles.aboutCopy}>
            <p>
              Most stamp cards get lost. Most loyalty apps never get installed.
              Loyalties puts your branded card in the wallet that is already on
              the customer&apos;s phone — Apple Wallet or Google Wallet — so
              joining takes about a minute and staff can add a stamp with one
              scan.
            </p>
            <p>
              You set the logo, colours, stamp icon and reward. Customers scan
              a QR at the till, choose whether to hear from you, and add the
              card. There is no extra app, no hardware to buy, and no list to
              export into another tool. The dashboard shows who joined, who is
              close to a reward, and who has gone quiet.
            </p>
            <p>
              The free plan is built for smaller, community-focused venues: a
              working stamp card, join page, wallet passes, members list and
              standalone rewards. When you want to fill a quiet Tuesday or
              announce an event, Pro adds email campaigns to the people who
              already opted in.
            </p>
            <p>
              Cafes, restaurants, bars, bakeries, hairdressers, barbers, nail
              salons and clothing stores use the same product with a reward
              that fits their trade. Start free, then upgrade when the list is
              worth talking to.
            </p>
          </div>
        </div>
      </section>
      <IndustryGrid />
      <LoyaltyCardShowcase section />
    </>
  )
}
