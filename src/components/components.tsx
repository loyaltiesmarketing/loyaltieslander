/**
 * Loyalties Landing — interactive blog embeds
 *
 * Styling lives in components.module.css (CSS Modules + lander tokens).
 * No Tailwind required for these components.
 */

import { useState, useCallback, useId, type FC } from 'react'
import styles from './components.module.css'

// ═══════════════════════════════════════════════════════════════
// 1. RoiCalculator
// ═══════════════════════════════════════════════════════════════

export const RoiCalculator: FC = () => {
  const [members, setMembers] = useState(250)
  const [extraVisits, setExtraVisits] = useState(4)
  const [spendPerVisit, setSpendPerVisit] = useState(16)
  const [margin, setMargin] = useState(30)

  const monthlyRevenue = members * extraVisits * spendPerVisit
  const monthlyProfit = monthlyRevenue * (margin / 100)
  const yearlyProfit = monthlyProfit * 12

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${Math.round(n)}`

  const sliders = [
    {
      label: 'Members',
      val: members,
      set: setMembers,
      min: 50,
      max: 5000,
      step: 50,
      display: members.toLocaleString(),
    },
    {
      label: 'Extra visits / mo',
      val: extraVisits,
      set: setExtraVisits,
      min: 1,
      max: 30,
      step: 1,
      display: String(extraVisits),
    },
    {
      label: 'Spend / visit',
      val: spendPerVisit,
      set: setSpendPerVisit,
      min: 5,
      max: 80,
      step: 1,
      display: `$${spendPerVisit}`,
    },
    {
      label: 'Margin',
      val: margin,
      set: setMargin,
      min: 20,
      max: 90,
      step: 1,
      display: `${margin}%`,
    },
  ] as const

  return (
    <div className={styles.roi}>
      <div className={styles.roiTop}>
        <h3 className={styles.roiTitle}>Revenue calculator</h3>
        <p className={styles.roiHint}>Loyalty-driven visits only</p>
      </div>

      <div className={styles.roiGrid}>
        {sliders.map((s) => {
          const pct = ((s.val - s.min) / (s.max - s.min)) * 100
          return (
            <label key={s.label} className={styles.roiSlider}>
              <div className={styles.sliderHead}>
                <span className={styles.sliderLabel}>{s.label}</span>
                <span className={styles.sliderValue}>{s.display}</span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={s.val}
                onChange={(e) => s.set(Number(e.target.value))}
                className={styles.roiRange}
                style={{
                  background: `linear-gradient(to right, #000 0%, #000 ${pct}%, #efefef ${pct}%, #efefef 100%)`,
                }}
              />
            </label>
          )
        })}
      </div>

      <div className={styles.results}>
        <div className={styles.resultSoft}>
          <p className={styles.resultEyebrow}>Monthly</p>
          <p className={styles.resultNum}>{fmt(monthlyProfit)}</p>
        </div>
        <div className={styles.resultDark}>
          <p className={styles.resultEyebrow}>Yearly</p>
          <p className={styles.resultNum}>{fmt(yearlyProfit)}</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 2. ShareBar — SocialFollowPill style from social-platform-icon.tsx
// ═══════════════════════════════════════════════════════════════

function InstagramBrandedIcon({ className }: { className?: string }) {
  const gradId = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id={gradId} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  )
}

function LinkedInBrandedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#525252"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  )
}

interface ShareBarProps {
  url?: string
  title?: string
  /** Optional Instagram profile — defaults to Loyalties IG */
  instagramUrl?: string
}

/** Same pill pattern as SocialFollowPill on the loyalty card page. */
export const ShareBar: FC<ShareBarProps> = ({
  url = typeof window !== 'undefined'
    ? window.location.href
    : 'https://loyalties.marketing',
  instagramUrl = 'https://www.instagram.com/loyaltiesapp',
}) => {
  const [copied, setCopied] = useState(false)

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }, [url])

  return (
    <div className={styles.shareBar}>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.sharePill}
      >
        <LinkedInBrandedIcon className={styles.sharePillIcon} />
        <span>LinkedIn</span>
      </a>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.sharePill}
      >
        <InstagramBrandedIcon className={styles.sharePillIcon} />
        <span>Instagram</span>
      </a>
      <button type="button" onClick={() => void copyLink()} className={styles.sharePill}>
        <LinkIcon className={styles.sharePillIcon} />
        <span>{copied ? 'Copied' : 'Copy link'}</span>
      </button>
    </div>
  )
}
