import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FAQ_COPY,
  GLOBAL_FAQS,
  HOW_IT_WORKS,
  PROBLEM_COPY,
  REWARD_COPY,
  SEND_COPY,
  SHOWCASE_COPY,
  appUrl,
  companyLogos,
  industries,
} from '../data/site'
import { industryAssetUrl } from '../lib/assets'
import styles from './IndustryPage.module.css'
import { LoyaltyCardShowcase } from '../components/LoyaltyCardShowcase'
import { HowItWorksPreviews } from '../components/HowItWorksPreviews'

// ── Marquee ───────────────────────────────────────────────────────────────

const MARQUEE_LOGOS = [...companyLogos, ...companyLogos, ...companyLogos]
const LARGE = new Set(['Brew Labs', 'Stand-Up Café'])
const COMPACT = new Set(['Revel Group'])

/** Stable “this month” dates for the campaign calendar tiles */
const CALENDAR_DAYS = [
  { weekday: 'Mon', date: 3 },
  { weekday: 'Wed', date: 10 },
  { weekday: 'Fri', date: 17 },
  { weekday: 'Tue', date: 24 },
] as const

function marqueeClass(name: string, s: typeof styles) {
  if (COMPACT.has(name)) return `${s.marqueeLogo} ${s.marqueeCompact}`
  if (LARGE.has(name)) return `${s.marqueeLogo} ${s.marqueeLarge}`
  return s.marqueeLogo
}

function fallbackSrc(
  assetKey: string,
  preferred: 1 | 2,
  event: React.SyntheticEvent<HTMLImageElement>,
) {
  const img = event.currentTarget
  const other = preferred === 1 ? 2 : 1
  if (img.dataset.fallbackApplied === '1') return
  img.dataset.fallbackApplied = '1'
  img.src = industryAssetUrl(assetKey, other)
}

// ── FAQ item ──────────────────────────────────────────────────────────────

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button
        className={styles.faqQuestion}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg className={styles.faqChevron} viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden>
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <p className={styles.faqAnswer}>{answer}</p>}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export function IndustryPage() {
  const { slug } = useParams()
  const industry = industries.find((item) => item.slug === slug)

  if (!industry) {
    return (
      <div className={`container ${styles.notFound}`}>
        <h1>Industry not found</h1>
        <p><Link to="/#industries">Browse industries</Link></p>
      </div>
    )
  }

  const swapAssets = industry.assetKey === 'restaurant'
  const heroImgSrc = industryAssetUrl(industry.assetKey, swapAssets ? 2 : 1)
  const bentoImgSrc = industryAssetUrl(industry.assetKey, swapAssets ? 1 : 2)
  const ctaHref = appUrl(industry.slug)

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className={styles.hero}
        style={{ '--accent': industry.accent } as React.CSSProperties}
      >
        <div className={styles.heroBg} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>{industry.name}</p>
            <h1 className={styles.heroHeading}>{industry.hero}</h1>
            <p className={styles.heroSub}>{industry.subtext}</p>
            <div className={styles.heroActions}>
              <a href={ctaHref} className={styles.heroCta}>{industry.cta}</a>
            </div>
          </div>
          <div className={styles.heroShape}>
            <img
              src={heroImgSrc}
              alt=""
              className={styles.heroImage}
              onError={(e) => fallbackSrc(industry.assetKey, swapAssets ? 2 : 1, e)}
            />
          </div>
        </div>
      </section>

      {/* ── Proof marquee ────────────────────────────────── */}
      <section
        className={styles.proof}
        aria-label="Businesses using Loyalties"
        onContextMenu={(e) => e.preventDefault()}
      >
        <p className={styles.proofLabel}>Used by businesses like yours</p>
        <div className={styles.marqueeTrack} aria-hidden>
          <div className={styles.marqueeInner}>
            {MARQUEE_LOGOS.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className={marqueeClass(logo.name, styles)}
                title={logo.name}
                style={{ backgroundImage: `url(${logo.src})` }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Problems bento ───────────────────────────────── */}
      <section className={styles.problems}>
        <div className="container">
          <h2 className={styles.problemsHeading}>{PROBLEM_COPY.heading}</h2>
          <div className={styles.problemsBento}>
            {/* Left: industry photo */}
            <div className={styles.problemsImage}>
              <img
                src={bentoImgSrc}
                alt=""
                className={styles.problemsImg}
                onError={(e) => fallbackSrc(industry.assetKey, swapAssets ? 1 : 2, e)}
              />
            </div>
            {/* Right: problem cards */}
            <div className={styles.problemsCards}>
              {industry.problems.map((p, i) => (
                <div key={i} className={styles.problemCard}>
                  <h3 className={styles.problemPain}>{p.pain}</h3>
                  <p className={styles.problemDetail}>{p.detail}</p>
                  <p className={styles.problemFix}>{p.fix}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.problemsCta}>
            <a href="#how-it-works" className={styles.problemsCtaLink}>{PROBLEM_COPY.cta}</a>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className={styles.howItWorks} id="how-it-works">
        <div className="container">
          <h2 className={styles.howHeading}>{HOW_IT_WORKS.heading}</h2>
          <div className={styles.stepsGrid}>
            {HOW_IT_WORKS.steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepPreviewWrap}>
                  <HowItWorksPreviews
                    step={i as 0 | 1 | 2}
                    slug={industry.slug}
                    businessName={industry.showcase.venueName}
                    brandColor={industry.accent}
                    heroImage={heroImgSrc}
                    reward={industry.showcase.reward}
                    subject={industry.campaignIdeas[0].subject}
                  />
                </div>
                <div className={styles.stepMeta}>
                  <span className={styles.stepNumber}>0{i + 1}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Campaign ideas + Reward ideas ────────────────── */}
      <section
        className={styles.ideas}
        style={{ '--accent': industry.accent } as React.CSSProperties}
      >
        <div className={`container ${styles.ideasGrid}`}>
          <div className={styles.ideasPanel}>
            <h2 className={styles.ideasLabel}>{SEND_COPY.heading}</h2>
            <p className={styles.ideasNote}>{SEND_COPY.body}</p>
            <div className={styles.calendarGrid}>
              {industry.campaignIdeas.map((idea, i) => {
                const day = CALENDAR_DAYS[i] ?? CALENDAR_DAYS[0]
                return (
                  <div key={i} className={styles.calendarDay}>
                    <p className={styles.calendarWeekday}>{day.weekday}</p>
                    <p className={styles.calendarDate}>{day.date}</p>
                    <div className={styles.calendarEvent}>
                      <p className={styles.calendarEventTitle}>{idea.subject}</p>
                    </div>
                    <p className={styles.calendarWhen}>{idea.when}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.ideasPanel}>
            <h2 className={styles.ideasLabel}>{REWARD_COPY.heading}</h2>
            <div className={styles.rewardBento}>
              <div className={styles.rewardCell}>
                <p className={styles.rewardType}>{REWARD_COPY.stampLabel}</p>
                <p className={styles.rewardText}>{industry.rewardIdeas.stamp}</p>
              </div>
              <div className={styles.rewardCell}>
                <p className={styles.rewardType}>{REWARD_COPY.couponLabel}</p>
                <p className={styles.rewardText}>{industry.rewardIdeas.coupon}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wallet showcase ──────────────────────────────── */}
      <section className={styles.showcase} id="showcase">
        <div className="container">
          <div className={styles.showcaseHeader}>
            <h2 className={styles.showcaseHeading}>{SHOWCASE_COPY.heading}</h2>
            <p className={styles.showcaseBody}>{SHOWCASE_COPY.body}</p>
          </div>
          <LoyaltyCardShowcase industry={industry.slug} />
          <p className={styles.showcaseTrust}>{SHOWCASE_COPY.trust}</p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className={styles.faq}>
        <div className={`container ${styles.faqInner}`}>
          <h2 className={styles.faqHeading}>{FAQ_COPY.heading}</h2>
          <div className={styles.faqList}>
            {[...industry.faqs, ...GLOBAL_FAQS].map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section
        className={styles.finalCta}
        style={{ '--accent': industry.accent } as React.CSSProperties}
      >
        <div className={styles.finalCtaBg} aria-hidden />
        <div className={`container ${styles.finalCtaInner}`}>
          <h2 className={styles.finalCtaHeading}>{industry.ctaHeading}</h2>
          <a href={ctaHref} className={styles.finalCtaButton}>{industry.cta}</a>
        </div>
      </section>

    </main>
  )
}
