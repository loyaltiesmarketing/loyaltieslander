import { STAMP_ICON_PATHS, type BakeryStampIconId } from '../lib/stamp-icon-paths'
import styles from './HowItWorksPreviews.module.css'

export type HowItWorksPreviewProps = {
  businessName: string
  brandColor: string
  heroImage?: string
  reward: string
  subject: string
  stampIndex?: number
}

function initials(name: string) {
  const parts = name.replace(/^Your\s+/i, '').split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'L'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function contrastOn(hex: string) {
  const h = hex.replace('#', '')
  if (h.length < 6) return '#ffffff'
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#000000' : '#ffffff'
}

/** Same icon set used on the wallet card examples */
const STAMP_ICON_IDS: BakeryStampIconId[] = [
  'coffee',
  'takeaway-coffee',
  'croissant',
  'donut',
  'nails',
  'chef-hat',
  'pizza',
  'cocktail',
  'scissors',
  'tshirt',
  'shopping-bag',
  'tools',
]

function StampIconCell({ id }: { id: BakeryStampIconId }) {
  const icon = STAMP_ICON_PATHS[id]
  return (
    <svg
      viewBox={icon.viewBox}
      fill="currentColor"
      aria-hidden
      dangerouslySetInnerHTML={{ __html: icon.html }}
    />
  )
}

export function PreviewConfig({
  businessName,
  brandColor,
  reward,
  stampIndex = 0,
}: HowItWorksPreviewProps) {
  const active = Math.min(Math.max(stampIndex, 0), STAMP_ICON_IDS.length - 1)
  return (
    <div className={styles.frame}>
      <div className={styles.chrome}>
        <span className={styles.dotR} />
        <span className={styles.dotY} />
        <span className={styles.dotG} />
        <span className={styles.chromeTitle}>Card setup</span>
      </div>
      <div className={styles.configBody}>
        <div className={styles.block}>
          <p className={styles.label}>Logo</p>
          <div className={styles.logoRow}>
            <div className={styles.logoCircle} style={{ background: brandColor, color: contrastOn(brandColor) }}>
              {initials(businessName)}
            </div>
            <div className={styles.uploadBtn}>
              <svg viewBox="0 0 16 16" fill="none" width="10" height="10" aria-hidden>
                <path d="M8 11V3M8 3L5 6M8 3l3 3M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Upload logo
            </div>
          </div>
        </div>

        <div className={styles.block}>
          <p className={styles.label}>Business name</p>
          <div className={styles.field}>{businessName}</div>
        </div>

        <div className={styles.colorRow}>
          <div>
            <p className={styles.label}>Card colour</p>
            <div className={styles.swatchField}>
              <span className={styles.swatch} style={{ background: '#FFFFFF' }} />
              <span className={styles.swatchHex}>#FFFFFF</span>
            </div>
          </div>
          <div>
            <p className={styles.label}>Stamp colour</p>
            <div className={styles.swatchField}>
              <span className={styles.swatch} style={{ background: brandColor }} />
              <span className={styles.swatchHex}>{brandColor.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className={styles.block}>
          <p className={styles.label}>Stamp icon</p>
          <div className={styles.iconGrid}>
            {STAMP_ICON_IDS.map((id, i) => (
              <div key={id} className={i === active ? styles.iconActive : styles.iconCell}>
                <StampIconCell id={id} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <p className={styles.label}>Reward</p>
          <div className={styles.tabs}>
            <span className={styles.tabOn}>Free item</span>
            <span className={styles.tab}>Discount</span>
            <span className={styles.tab}>Custom</span>
          </div>
          <div className={styles.field}>{reward}</div>
        </div>
      </div>
    </div>
  )
}

export function PreviewJoin({ businessName, brandColor }: HowItWorksPreviewProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.joinBody}>
        <div className={styles.joinLogo} style={{ background: brandColor, color: contrastOn(brandColor) }}>
          {initials(businessName)}
        </div>
        <p className={styles.joinName}>{businessName}</p>
        <p className={styles.joinSub}>Join and earn rewards today.</p>

        <div className={styles.authStack}>
          <div className={styles.btnApple}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.authIcon} aria-hidden>
              <path d="M16.365 1.43c0 1.14-.433 2.203-1.226 3.033-.854.902-2.26 1.596-3.437 1.505-.154-1.103.482-2.27 1.247-3.012.854-.83 2.311-1.426 3.416-1.526zM20.48 17.44c-.55 1.27-.81 1.836-1.516 2.957-.986 1.55-2.376 3.48-4.1 3.496-1.532.016-1.928-.996-4.01-.984-2.082.012-2.52 1.004-4.052.988-1.724-.016-3.044-1.76-4.03-3.31C.87 17.79-.36 13.37 1.55 10.4c1.206-1.88 3.116-2.98 4.9-2.98 1.828 0 2.978 1.004 4.492 1.004 1.46 0 2.35-1.008 4.49-1.008 1.602 0 3.294.874 4.494 2.386-3.948 2.164-3.31 7.8.554 7.638z" />
            </svg>
            Sign in with Apple
          </div>
          <div className={styles.btnOutline}>
            <svg viewBox="0 0 24 24" className={styles.authIcon} aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </div>
          <div className={styles.btnOutline}>
            <svg viewBox="0 0 24 24" fill="none" className={styles.authIcon} aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#4b4b4b" strokeWidth="1.8" />
              <path d="M3 7l9 7 9-7" stroke="#4b4b4b" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Sign in with email
          </div>
        </div>

        <label className={styles.consent}>
          <span className={styles.checkbox} />
          I want to receive communications from {businessName}
        </label>

        <p className={styles.joinLegal}>
          By filling out this form you agree to our <span>terms of use</span> and <span>privacy policy</span>.
        </p>
        <p className={styles.powered}>Powered by loyalties.marketing</p>
      </div>
    </div>
  )
}

export function PreviewEmail({ businessName, brandColor, heroImage, reward, subject }: HowItWorksPreviewProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.emailChrome}>
        <span className={styles.emailChromeTitle}>Email Preview</span>
        <div className={styles.themeToggle}>
          <span className={styles.themeToggleActive}>Light</span>
          <span>Dark</span>
        </div>
      </div>

      <div className={styles.emailMeta}>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>From</span>
          <span className={styles.metaValue}>{businessName} &lt;hello@news.local&gt;</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>To</span>
          <span className={styles.metaValue}>Your members</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Subject</span>
          <span className={styles.metaValue}>{subject}</span>
        </div>
      </div>

      <div className={styles.emailCanvas}>
        <div className={styles.emailCard}>
          <div className={styles.emailBrand} style={{ background: brandColor, color: contrastOn(brandColor) }}>
            {businessName}
          </div>
          {heroImage && (
            <div className={styles.emailHero}>
              <img src={heroImage} alt="Hero image" />
            </div>
          )}
          <div className={styles.emailBody}>
            <h4>An offer just for you</h4>
            <p>We appreciate your loyalty. Here is something special to say thank you.</p>

            <div className={styles.emailOfferBox}>{reward}</div>

            <div className={styles.emailButton} style={{ background: brandColor, color: contrastOn(brandColor) }}>
              Use this offer
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const STAMP_BY_SLUG: Record<string, number> = {
  cafes: 0,
  restaurants: 5,
  bars: 7,
  bakeries: 2,
  hairdressers: 8,
  barbers: 8,
  'nail-techs': 4,
  clothing: 9,
  services: 11,
}

export function HowItWorksPreviews({
  step,
  businessName,
  brandColor,
  heroImage,
  reward,
  subject,
  slug,
}: HowItWorksPreviewProps & { step: 0 | 1 | 2; slug: string }) {
  const props: HowItWorksPreviewProps = {
    businessName,
    brandColor,
    heroImage,
    reward,
    subject,
    stampIndex: STAMP_BY_SLUG[slug] ?? 0,
  }
  if (step === 0) return <PreviewConfig {...props} />
  if (step === 1) return <PreviewJoin {...props} />
  return <PreviewEmail {...props} />
}
