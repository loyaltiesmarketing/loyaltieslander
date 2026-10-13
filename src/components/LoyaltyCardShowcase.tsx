import { useEffect, useState, type ReactNode } from 'react'
import { APP_URL } from '../data/site'
import styles from './LoyaltyCardShowcase.module.css'
import { STAMP_ICON_PATHS } from '../lib/stamp-icon-paths'

// ─── Types ─────────────────────────────────────────────────────────────────

type IndustryKey =
  | 'cafes' | 'restaurants' | 'bars' | 'bakeries'
  | 'hairdressers' | 'barbers' | 'nail-techs'
  | 'clothing' | 'services'

type StampIconType = keyof typeof STAMP_ICON_PATHS

interface CardDesign {
  id: string
  brandName: string
  memberName: string
  industryKey: IndustryKey
  stampsFilled: number
  stampsTotal: number
  rewardText: string
  cardBg: string
  stampFill: string
  stampIcon: StampIconType
  isDark: boolean
  stampIconColor: string
  fontFamily?: string
  logoBg?: string
  logoColor?: string
}

// ─── 27 Card Designs ───────────────────────────────────────────────────────

const cardLibrary: Record<IndustryKey, CardDesign[]> = {
  cafes: [
    { id: 'cafe-1', brandName: 'Morning Press', memberName: 'Sarah', industryKey: 'cafes', stampsFilled: 5, stampsTotal: 8, rewardText: 'Free coffee', cardBg: '#2B1D14', stampFill: '#E28E45', stampIcon: 'coffee', isDark: true, stampIconColor: '#2B1D14', fontFamily: 'Lora', logoBg: '#E28E45', logoColor: '#2B1D14' },
    { id: 'cafe-2', brandName: 'Copper Cup', memberName: 'James', industryKey: 'cafes', stampsFilled: 3, stampsTotal: 8, rewardText: 'Free coffee', cardBg: '#F7F2ED', stampFill: '#483020', stampIcon: 'coffee', isDark: false, stampIconColor: '#F7F2ED', fontFamily: 'Space Grotesk', logoBg: '#FFFFFF', logoColor: '#483020' },
    { id: 'cafe-3', brandName: 'Blue State', memberName: 'Mia', industryKey: 'cafes', stampsFilled: 6, stampsTotal: 8, rewardText: 'Free coffee', cardBg: '#0B2545', stampFill: '#F7F2ED', stampIcon: 'takeaway-coffee', isDark: true, stampIconColor: '#0B2545', fontFamily: 'Outfit', logoBg: '#4884C6', logoColor: '#FFFFFF' },
  ],
  restaurants: [
    { id: 'rest-1', brandName: 'Casa Verde', memberName: 'Carlos', industryKey: 'restaurants', stampsFilled: 2, stampsTotal: 8, rewardText: 'Free dessert', cardBg: '#1A3626', stampFill: '#F5CC73', stampIcon: 'chef-hat', isDark: true, stampIconColor: '#1A3626', fontFamily: 'Playfair Display', logoBg: '#F5CC73', logoColor: '#1A3626' },
    { id: 'rest-2', brandName: 'Garden Table', memberName: 'Sophie', industryKey: 'restaurants', stampsFilled: 5, stampsTotal: 8, rewardText: 'Free dessert', cardBg: '#FFFFFF', stampFill: '#E35845', stampIcon: 'burger', isDark: false, stampIconColor: '#FFFFFF', fontFamily: 'Lora', logoBg: '#E35845', logoColor: '#FFFFFF' },
    { id: 'rest-3', brandName: 'Shore Dining', memberName: 'Alex', industryKey: 'restaurants', stampsFilled: 3, stampsTotal: 8, rewardText: 'Free dessert', cardBg: '#E6EBEF', stampFill: '#214365', stampIcon: 'pizza', isDark: false, stampIconColor: '#E6EBEF', fontFamily: 'Space Grotesk', logoBg: '#214365', logoColor: '#FFFFFF' },
  ],
  bars: [
    { id: 'bar-1', brandName: 'The Oak', memberName: 'Ryan', industryKey: 'bars', stampsFilled: 4, stampsTotal: 8, rewardText: 'Free snack', cardBg: '#121212', stampFill: '#C9A86A', stampIcon: 'pint', isDark: true, stampIconColor: '#121212', fontFamily: 'Playfair Display', logoBg: '#C9A86A', logoColor: '#121212' },
    { id: 'bar-2', brandName: 'Parchment', memberName: 'Luna', industryKey: 'bars', stampsFilled: 6, stampsTotal: 8, rewardText: 'Free snack', cardBg: '#3B1D25', stampFill: '#E4B5BD', stampIcon: 'wine', isDark: true, stampIconColor: '#3B1D25', fontFamily: 'Lora', logoBg: '#FFFFFF', logoColor: '#3B1D25' },
    { id: 'bar-3', brandName: 'Violet Nite', memberName: 'Jack', industryKey: 'bars', stampsFilled: 3, stampsTotal: 8, rewardText: 'Free snack', cardBg: '#251433', stampFill: '#A26BE2', stampIcon: 'cocktail', isDark: true, stampIconColor: '#251433', fontFamily: 'Outfit', logoBg: '#A26BE2', logoColor: '#251433' },
  ],
  bakeries: [
    { id: 'bake-1', brandName: 'Flour & Co', memberName: 'Emma', industryKey: 'bakeries', stampsFilled: 6, stampsTotal: 8, rewardText: 'Free pastry', cardBg: '#FAF6F0', stampFill: '#C45A30', stampIcon: 'croissant', isDark: false, stampIconColor: '#FAF6F0', fontFamily: 'Lora', logoBg: '#C45A30', logoColor: '#FFFFFF' },
    { id: 'bake-2', brandName: 'Dark Crumb', memberName: 'Oliver', industryKey: 'bakeries', stampsFilled: 3, stampsTotal: 8, rewardText: 'Free pastry', cardBg: '#221C19', stampFill: '#EBB44D', stampIcon: 'donut', isDark: true, stampIconColor: '#221C19', fontFamily: 'Space Grotesk', logoBg: '#EBB44D', logoColor: '#221C19' },
    { id: 'bake-3', brandName: 'Golden Grain', memberName: 'Zoe', industryKey: 'bakeries', stampsFilled: 5, stampsTotal: 8, rewardText: 'Free pastry', cardBg: '#E5A852', stampFill: '#5C3112', stampIcon: 'cake', isDark: false, stampIconColor: '#E5A852', fontFamily: 'Outfit', logoBg: '#5C3112', logoColor: '#E5A852' },
  ],
  hairdressers: [
    { id: 'hair-1', brandName: 'Studio Noir', memberName: 'Ava', industryKey: 'hairdressers', stampsFilled: 5, stampsTotal: 8, rewardText: 'Free treatment', cardBg: '#000000', stampFill: '#FFFFFF', stampIcon: 'scissors', isDark: true, stampIconColor: '#000000', fontFamily: 'Playfair Display', logoBg: '#FFFFFF', logoColor: '#000000' },
    { id: 'hair-2', brandName: 'Maison Rose', memberName: 'Lucas', industryKey: 'hairdressers', stampsFilled: 2, stampsTotal: 8, rewardText: 'Free treatment', cardBg: '#F1DCE2', stampFill: '#8C314E', stampIcon: 'scissors', isDark: false, stampIconColor: '#F1DCE2', fontFamily: 'Lora', logoBg: '#FFFFFF', logoColor: '#8C314E' },
    { id: 'hair-3', brandName: 'Verde Salon', memberName: 'Nina', industryKey: 'hairdressers', stampsFilled: 7, stampsTotal: 8, rewardText: 'Free treatment', cardBg: '#37483B', stampFill: '#DDE3D5', stampIcon: 'scissors', isDark: true, stampIconColor: '#37483B', fontFamily: 'Space Grotesk', logoBg: '#DDE3D5', logoColor: '#37483B' },
  ],
  barbers: [
    { id: 'barb-1', brandName: 'Duke & Co', memberName: 'Marcus', industryKey: 'barbers', stampsFilled: 3, stampsTotal: 8, rewardText: 'Free cut', cardBg: '#121B2A', stampFill: '#E5E7EB', stampIcon: 'scissors', isDark: true, stampIconColor: '#121B2A', fontFamily: 'Space Grotesk', logoBg: '#FFFFFF', logoColor: '#121B2A' },
    { id: 'barb-2', brandName: 'The Blade', memberName: 'Tyler', industryKey: 'barbers', stampsFilled: 5, stampsTotal: 8, rewardText: 'Free cut', cardBg: '#7C482A', stampFill: '#FDE8D4', stampIcon: 'scissors', isDark: true, stampIconColor: '#7C482A', fontFamily: 'Outfit', logoBg: '#251811', logoColor: '#FDE8D4' },
    { id: 'barb-3', brandName: 'Arch Studio', memberName: 'Leo', industryKey: 'barbers', stampsFilled: 4, stampsTotal: 8, rewardText: 'Free cut', cardBg: '#EBEBEB', stampFill: '#202020', stampIcon: 'scissors', isDark: false, stampIconColor: '#EBEBEB', fontFamily: 'Lora', logoBg: '#202020', logoColor: '#EBEBEB' },
  ],
  'nail-techs': [
    { id: 'nail-1', brandName: 'Blush Studio', memberName: 'Bella', industryKey: 'nail-techs', stampsFilled: 6, stampsTotal: 8, rewardText: 'Free gel set', cardBg: '#F9E7EE', stampFill: '#C02C5E', stampIcon: 'nails', isDark: false, stampIconColor: '#F9E7EE', fontFamily: 'Outfit', logoBg: '#FFFFFF', logoColor: '#C02C5E' },
    { id: 'nail-2', brandName: 'Amethyst', memberName: 'Jade', industryKey: 'nail-techs', stampsFilled: 4, stampsTotal: 8, rewardText: 'Free gel set', cardBg: '#1B112C', stampFill: '#C4B5FD', stampIcon: 'nails', isDark: true, stampIconColor: '#1B112C', fontFamily: 'Space Grotesk', logoBg: '#C4B5FD', logoColor: '#1B112C' },
    { id: 'nail-3', brandName: 'Petal Nails', memberName: 'Rosa', industryKey: 'nail-techs', stampsFilled: 2, stampsTotal: 8, rewardText: 'Free gel set', cardBg: '#0E3F30', stampFill: '#A7F3D0', stampIcon: 'nails', isDark: true, stampIconColor: '#0E3F30', fontFamily: 'Lora', logoBg: '#A7F3D0', logoColor: '#0E3F30' },
  ],
  'clothing': [
    { id: 'cloth-1', brandName: 'Blanc Studio', memberName: 'Chloe', industryKey: 'clothing', stampsFilled: 3, stampsTotal: 8, rewardText: 'Store credit', cardBg: '#FFFFFF', stampFill: '#111111', stampIcon: 'tshirt', isDark: false, stampIconColor: '#FFFFFF', fontFamily: 'Space Grotesk', logoBg: '#111111', logoColor: '#FFFFFF' },
    { id: 'cloth-2', brandName: 'Atlas & Co', memberName: 'David', industryKey: 'clothing', stampsFilled: 5, stampsTotal: 8, rewardText: 'Store credit', cardBg: '#162035', stampFill: '#DFCCB8', stampIcon: 'tshirt', isDark: true, stampIconColor: '#162035', fontFamily: 'Playfair Display', logoBg: '#DFCCB8', logoColor: '#162035' },
    { id: 'cloth-3', brandName: 'Sorrel Edit', memberName: 'Isla', industryKey: 'clothing', stampsFilled: 6, stampsTotal: 8, rewardText: 'Store credit', cardBg: '#DFD4C5', stampFill: '#402E23', stampIcon: 'shopping-bag', isDark: false, stampIconColor: '#DFD4C5', fontFamily: 'Lora', logoBg: '#FFFFFF', logoColor: '#402E23' },
  ],
  'services': [
    { id: 'trade-1', brandName: 'Greenline', memberName: 'Dan', industryKey: 'services', stampsFilled: 2, stampsTotal: 4, rewardText: 'Free tidy-up', cardBg: '#2B3B1B', stampFill: '#CED6B8', stampIcon: 'tools', isDark: true, stampIconColor: '#2B3B1B', fontFamily: 'Outfit', logoBg: '#CED6B8', logoColor: '#2B3B1B' },
    { id: 'trade-2', brandName: 'Fresh Start', memberName: 'Kira', industryKey: 'services', stampsFilled: 3, stampsTotal: 4, rewardText: 'Free clean', cardBg: '#ECF6FA', stampFill: '#1F7CA7', stampIcon: 'tools', isDark: false, stampIconColor: '#ECF6FA', fontFamily: 'Space Grotesk', logoBg: '#FFFFFF', logoColor: '#1F7CA7' },
    { id: 'trade-3', brandName: 'Bright Care', memberName: 'Ben', industryKey: 'services', stampsFilled: 1, stampsTotal: 4, rewardText: 'Free session', cardBg: '#4635B8', stampFill: '#F0EEFF', stampIcon: 'tools', isDark: true, stampIconColor: '#4635B8', fontFamily: 'Outfit', logoBg: '#F0EEFF', logoColor: '#4635B8' },
  ],
}

const TABS: { id: IndustryKey; label: string }[] = [
  { id: 'cafes',           label: 'Cafes'        },
  { id: 'restaurants',     label: 'Restaurants'  },
  { id: 'bars',            label: 'Bars'         },
  { id: 'bakeries',        label: 'Bakeries'     },
  { id: 'hairdressers',    label: 'Hairdressers' },
  { id: 'barbers',         label: 'Barbers'      },
  { id: 'nail-techs',      label: 'Nail Techs'   },
  { id: 'clothing', label: 'Clothing'     },
  { id: 'services',  label: 'Trade'        },
]

// ─── Stamp Icons (Directly from @public/stamp-icons) ──────────────────────

function StampIcon({ icon, color }: { icon: StampIconType; color: string }) {
  const iconData = STAMP_ICON_PATHS[icon]
  return (
    <svg
      viewBox={iconData.viewBox}
      fill={color}
      style={{ color }} // `fill="currentColor"` in paths reads CSS color, not SVG fill attr
      className={styles.stampSvg}
      dangerouslySetInnerHTML={{ __html: iconData.html }}
    />
  )
}

// ─── Authentic Vector Logos per Brand ─────────────────────────────────────

function BrandLogo({ id, color }: { id: string; color: string }) {
  const base = { viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: styles.brandLogoSvg }
  
  if (id === 'cafe-1') {
    // Morning Press: Sunrise over coffee bowl
    return (
      <svg {...base}>
        <path d="M4 14a8 8 0 0 0 16 0H4z" fill={color} fillOpacity="0.2" />
        <path d="M12 4v3M7 6l2 2M17 6l-2 2" />
        <circle cx="12" cy="11" r="2.5" fill={color} stroke="none" />
      </svg>
    )
  }
  if (id === 'cafe-2') {
    // Copper Cup: Classic double C concentric seal
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="9" strokeWidth="1.2" />
        <path d="M15 8.5a4.5 4.5 0 1 0 0 7" strokeWidth="2" />
      </svg>
    )
  }
  if (id === 'cafe-3') {
    // Blue State: Modern geometric star & circle
    return (
      <svg {...base}>
        <polygon points="12,3 15,9 21,9.5 16.5,14 18,20 12,17 6,20 7.5,14 3,9.5 9,9" fill={color} fillOpacity="0.25" strokeWidth="1.2" />
      </svg>
    )
  }
  if (id === 'rest-1') {
    // Casa Verde: Botanical leaf in circle
    return (
      <svg {...base}>
        <path d="M12 21c-5 0-9-4-9-9 0-6 7-10 9-10s9 4 9 10c0 5-4 9-9 9z" fill={color} fillOpacity="0.2" />
        <path d="M12 2v19M12 11l5-3M12 16l-4-2" />
      </svg>
    )
  }
  if (id === 'rest-2') {
    // Garden Table: Wheat laurel / farm
    return (
      <svg {...base}>
        <path d="M12 3v18M8 7l4 3 4-3M7 12l5 3 5-3M8 17l4 3 4-3" strokeWidth="1.8" />
      </svg>
    )
  }
  if (id === 'rest-3') {
    // Shore Dining: Oceanic twin waves
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="9.5" strokeWidth="1" />
        <path d="M6 11c2-1.5 4-1.5 6 0s4 1.5 6 0M6 14.5c2-1.5 4-1.5 6 0s4 1.5 6 0" strokeWidth="1.8" />
      </svg>
    )
  }
  if (id === 'bar-1') {
    // The Oak: Oak leaf crest
    return (
      <svg {...base}>
        <path d="M12 2C8 6 7 11 8 16c1 3 3 5 4 6 1-1 3-3 4-6 1-5 0-10-4-14z" fill={color} fillOpacity="0.2" />
        <path d="M12 2v20M12 9l3-2M12 14l-3-2" strokeWidth="1.6" />
      </svg>
    )
  }
  if (id === 'bar-2') {
    // Parchment: Vintage wax seal monogram
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeDasharray="2 2" />
        <path d="M9 7h4a3 3 0 0 1 0 6H9v4" strokeWidth="1.8" />
      </svg>
    )
  }
  if (id === 'bar-3') {
    // Violet Nite: Cocktail coupe & star
    return (
      <svg {...base}>
        <path d="M5 6h14L12 14z" fill={color} fillOpacity="0.2" strokeWidth="1.5" />
        <path d="M12 14v6M8 20h8" strokeWidth="1.8" />
        <circle cx="17" cy="4" r="1.5" fill={color} stroke="none" />
      </svg>
    )
  }
  if (id === 'bake-1') {
    // Flour & Co: Baker rolling pin / crossed wheat
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="9" strokeWidth="1.2" />
        <path d="M7 17L17 7M10 7l7 7M7 10l7 7" strokeWidth="1.4" />
      </svg>
    )
  }
  if (id === 'bake-2') {
    // Dark Crumb: Hearth flame
    return (
      <svg {...base}>
        <path d="M12 3c-3 4-6 8-6 12a6 6 0 0 0 12 0c0-4-3-8-6-12z" fill={color} fillOpacity="0.25" />
        <path d="M12 11c-1 2-2 4-2 6a2 2 0 0 0 4 0c0-2-1-4-2-6z" fill={color} stroke="none" />
      </svg>
    )
  }
  if (id === 'bake-3') {
    // Golden Grain: Wheat sheaf
    return (
      <svg {...base}>
        <path d="M12 21V3M12 5a3 3 0 0 1 3 3c0 2-3 3-3 3M12 5a3 3 0 0 0-3 3c0 2 3 3 3 3M12 11a3 3 0 0 1 3 3c0 2-3 3-3 3M12 11a3 3 0 0 0-3 3c0 2 3 3 3 3" strokeWidth="1.5" />
      </svg>
    )
  }
  if (id === 'hair-1') {
    // Studio Noir: Luxury geometric monogram
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="9.5" strokeWidth="1" />
        <text x="12" y="16" fill={color} stroke="none" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">SN</text>
      </svg>
    )
  }
  if (id === 'hair-2') {
    // Maison Rose: Single line botanical rose
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="4" fill={color} fillOpacity="0.2" />
        <path d="M12 8a6 6 0 1 1-5 9M12 4a9.5 9.5 0 0 1 8 13" strokeWidth="1.4" />
      </svg>
    )
  }
  if (id === 'hair-3') {
    // Verde Salon: Stylized shears
    return (
      <svg {...base}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <path d="M8.5 6L18 15M16 6l-6 6" strokeWidth="1.6" />
      </svg>
    )
  }
  if (id === 'barb-1') {
    // Duke & Co: Classic barbershop crown
    return (
      <svg {...base}>
        <path d="M4 16l2-9 4.5 4L12 5l1.5 6 4.5-4 2 9z" fill={color} fillOpacity="0.2" strokeWidth="1.5" />
        <circle cx="6" cy="6" r="1" fill={color} stroke="none" />
        <circle cx="12" cy="4" r="1" fill={color} stroke="none" />
        <circle cx="18" cy="6" r="1" fill={color} stroke="none" />
        <path d="M4 18h16" strokeWidth="1.8" />
      </svg>
    )
  }
  if (id === 'barb-2') {
    // The Blade: Straight razor silhouette
    return (
      <svg {...base}>
        <rect x="5" y="8" width="14" height="4" rx="1" transform="rotate(-30 12 10)" fill={color} fillOpacity="0.2" strokeWidth="1.5" />
        <line x1="5" y1="18" x2="16" y2="12" strokeWidth="2" />
      </svg>
    )
  }
  if (id === 'barb-3') {
    // Arch Studio: Architectural arch
    return (
      <svg {...base}>
        <path d="M6 20V10a6 6 0 0 1 12 0v10" strokeWidth="1.8" />
        <path d="M4 20h16M9 13h6" strokeWidth="1.4" />
      </svg>
    )
  }
  if (id === 'nail-1') {
    // Blush Studio: Sparkle star diamond
    return (
      <svg {...base}>
        <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" fill={color} fillOpacity="0.25" strokeWidth="1.4" />
      </svg>
    )
  }
  if (id === 'nail-2') {
    // Amethyst: Faceted jewel
    return (
      <svg {...base}>
        <path d="M6 9l6-6 6 6-6 12z" fill={color} fillOpacity="0.2" strokeWidth="1.5" />
        <path d="M6 9h12M12 3v18" strokeWidth="1.2" />
      </svg>
    )
  }
  if (id === 'nail-3') {
    // Petal Nails: 4-leaf floral blossom
    return (
      <svg {...base}>
        <circle cx="12" cy="8" r="3.5" fill={color} fillOpacity="0.25" />
        <circle cx="12" cy="16" r="3.5" fill={color} fillOpacity="0.25" />
        <circle cx="8" cy="12" r="3.5" fill={color} fillOpacity="0.25" />
        <circle cx="16" cy="12" r="3.5" fill={color} fillOpacity="0.25" />
        <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
      </svg>
    )
  }
  if (id === 'cloth-1') {
    // Blanc Studio: Minimalist atelier square
    return (
      <svg {...base}>
        <rect x="5" y="5" width="14" height="14" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3.5" fill={color} fillOpacity="0.2" strokeWidth="1" />
      </svg>
    )
  }
  if (id === 'cloth-2') {
    // Atlas & Co: Tailor needle & thread compass
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="9.5" strokeWidth="1.2" />
        <polygon points="12,5 14,11 12,19 10,11" fill={color} stroke="none" />
      </svg>
    )
  }
  if (id === 'cloth-3') {
    // Sorrel Edit: Clothing hanger monogram
    return (
      <svg {...base}>
        <circle cx="12" cy="6" r="2" />
        <path d="M12 8v2l-8 5h16z" strokeWidth="1.5" fill={color} fillOpacity="0.2" />
      </svg>
    )
  }
  if (id === 'trade-1') {
    // Greenline: Eco leaf sprout circle
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="9.5" strokeWidth="1" />
        <path d="M12 17c-3-2-4-5-4-8 4 0 7 2 8 5" fill={color} fillOpacity="0.2" strokeWidth="1.6" />
        <path d="M8 17l8-8" strokeWidth="1.4" />
      </svg>
    )
  }
  if (id === 'trade-2') {
    // Fresh Start: Clean starburst
    return (
      <svg {...base}>
        <circle cx="10" cy="14" r="5" fill={color} fillOpacity="0.2" />
        <path d="M16 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill={color} stroke="none" />
        <path d="M7 6l.5 1.5L9 8l-1.5.5L7 10l-.5-1.5L5 8l1.5-.5z" fill={color} stroke="none" />
      </svg>
    )
  }
  // trade-3 / default: Bright Care (Protecting hands / heart)
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="9.5" strokeWidth="1" />
      <path d="M12 7.5c-1.5-2-4.5-1-4.5 1.5 0 2.5 4.5 6 4.5 6s4.5-3.5 4.5-6c0-2.5-3-3.5-4.5-1.5z" fill={color} fillOpacity="0.3" strokeWidth="1.2" />
    </svg>
  )
}

// ─── Utilities ─────────────────────────────────────────────────────────────

export function contrastColor(hex: string): '#000000' | '#FFFFFF' {
  if (hex.startsWith('rgba') || hex === 'transparent') {
    return '#000000'
  }
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

// ─── Wallet Badges (Apple + Google) ────────────────────────────────────────

function AppleWalletBadge() {
  return (
    <a href="#" className={styles.walletBadgeBtn} aria-label="Add to Apple Wallet">
      <img src="/apple.png" alt="Add to Apple Wallet" className={styles.walletBadgeImg} />
    </a>
  )
}

function GoogleWalletBadge() {
  return (
    <a href="#" className={styles.walletBadgeBtn} aria-label="Add to Google Wallet">
      <img src="/google.png" alt="Add to Google Wallet" className={styles.walletBadgeImg} />
    </a>
  )
}

// ─── Crisp black & white QR (no grey anti-alias seams) ─────────────────────

function PassQr() {
  // 21×21 modules — finder patterns + solid data modules, pure #000 / #fff
  const modules = [
    '111111101001010111111',
    '100000101110010100001',
    '101110101011010101110',
    '101110100100110101110',
    '101110101101010101110',
    '100000101010110100001',
    '111111101010101111111',
    '000000001101000000000',
    '110101110010111010101',
    '001001001111001100110',
    '110110110001011011001',
    '010010001100100101010',
    '101101111011011101101',
    '000000001010100100010',
    '111111101101011010101',
    '100000101001100111010',
    '101110101110010100111',
    '101110100011101011001',
    '101110101100010110100',
    '100000101011101001011',
    '111111101010010110110',
  ]
  const size = 21
  const rects: ReactNode[] = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (modules[y][x] === '1') {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />)
      }
    }
  }
  return (
    <svg
      viewBox="0 0 21 21"
      className={styles.qrGraphic}
      fill="#000000"
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect width="21" height="21" fill="#FFFFFF" />
      {rects}
    </svg>
  )
}

type StampCount = 4 | 5 | 6 | 8 | 10

/** Stable 8-char A–Z / 0–9 code per card (looks random, doesn't flicker on re-render) */
function passCodeForCard(id: string): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let hash = 2166136261
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  let out = ''
  let n = hash >>> 0
  for (let i = 0; i < 8; i++) {
    out += alphabet[n % alphabet.length]
    n = Math.imul(n ^ (n >>> 13), 1274126177) >>> 0
  }
  return out
}

/** Mixed stamp totals per card — cafes/restaurants/bars (non-wine) are 8 or 10 only */
function stampConfigForCard(
  d: CardDesign,
  cardIndex: number,
): { total: StampCount; filled: number } {
  const highOnly =
    (d.industryKey === 'cafes' ||
      d.industryKey === 'restaurants' ||
      d.industryKey === 'bars') &&
    d.stampIcon !== 'wine'

  const mixOrders: StampCount[][] = highOnly
    ? [
        [8, 10, 8],
        [10, 8, 10],
        [8, 8, 10],
        [10, 10, 8],
        [8, 10, 10],
        [10, 8, 8],
      ]
    : [
        [4, 8, 10],
        [5, 10, 6],
        [6, 8, 5],
        [8, 5, 10],
        [10, 4, 8],
        [4, 6, 10],
        [5, 8, 4],
        [6, 10, 8],
        [8, 4, 5],
        [10, 6, 4],
        [4, 5, 8],
        [5, 6, 10],
        [8, 10, 6],
        [10, 5, 8],
        [4, 10, 5],
        [6, 4, 10],
      ]

  let hash = 0
  for (let i = 0; i < d.id.length; i++) hash = (hash + d.id.charCodeAt(i) * (i + 3)) % 97
  const order = mixOrders[hash % mixOrders.length]
  const total = order[cardIndex % 3]
  const filledByTotal: Record<StampCount, number[]> = {
    4: [1, 2, 3],
    5: [1, 2, 3, 4],
    6: [2, 3, 4, 5],
    8: [2, 3, 4, 5, 6, 7],
    10: [3, 4, 5, 6, 7, 8, 9],
  }
  const filledOptions = filledByTotal[total]
  const filled = filledOptions[(hash + cardIndex * 5) % filledOptions.length]
  return { total, filled }
}

// ─── iPhone Mockup Component ───────────────────────────────────────────────

function PhoneCard({ d, cardIndex }: { d: CardDesign; cardIndex: number }) {
  const { total: stampTotal, filled } = stampConfigForCard(d, cardIndex)
  const stamps = Array.from({ length: stampTotal }, (_, i) => i < filled)
  // 4→1×4, 5→1×5, 6→2×3, 8→2×4, 10→2×5
  const cols =
    stampTotal === 10 || stampTotal === 5 ? 5 : stampTotal === 6 ? 3 : 4
  // 5-across rows need smaller stamps to fit with padding
  const stampSizeCqi = stampTotal === 10 || stampTotal === 5 ? 12.2 : 13.5
  const isCompactRow = stampTotal === 10 || stampTotal === 5

  const textPrimary    = contrastColor(d.cardBg)
  const isCardWhite    = textPrimary === '#000000'
  // All pass text is solid black or white — no grey / muted weights
  const textColor      = textPrimary
  const logoBg         = d.logoBg || (isCardWhite ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)')
  const logoBorder     = d.logoBg ? 'transparent' : (isCardWhite ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.22)')
  const logoIconColor  = d.logoColor || textPrimary
  const emptyBorder    = isCardWhite ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.25)'
  const emptyIconColor = isCardWhite ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.35)'
  const filledIconColor = contrastColor(d.stampFill)
  const passCode = passCodeForCard(d.id)
  return (
    <div className={styles.phoneChassis}>
      <div className={styles.screen}>

        {/* ── Realistic Notch ── */}
        <div className={styles.notch}>
          <div className={styles.notchSpeaker} />
          <div className={styles.notchCamera} />
        </div>

        {/* ── Status Bar (flanking the notch in the ears) ── */}
        <div className={styles.statusBar} style={{ color: '#fff' }}>
          <span className={styles.statusTime}>9:41</span>
          <div className={styles.statusIcons}>
            {/* iOS Signal Bars */}
            <svg viewBox="0 0 16 12" fill="currentColor" className={styles.signalIcon} aria-hidden>
              <rect x="0.5" y="8"   width="2.8" height="4"    rx="0.8" />
              <rect x="4.8" y="5.5" width="2.8" height="6.5"  rx="0.8" />
              <rect x="9.1" y="3"   width="2.8" height="9"    rx="0.8" />
              <rect x="13.4" y="0.5" width="2.8" height="11.5" rx="0.8" />
            </svg>
            {/* iOS Wi-Fi Symbol */}
            <svg viewBox="0 0 16 12" fill="currentColor" className={styles.wifiIcon} aria-hidden>
              <circle cx="8" cy="10.4" r="1.2" />
              <path d="M4.6 7.4a4.8 4.8 0 0 1 6.8 0 .8.8 0 0 0 1.1-1.1 6.4 6.4 0 0 0-9 0 .8.8 0 0 0 1.1 1.1z" />
              <path d="M2.1 4.7a8.4 8.4 0 0 1 11.8 0 .8.8 0 0 0 1.1-1.1 10 10 0 0 0-14 0 .8.8 0 1 0 1.1 1.1z" />
            </svg>
            {/* iOS Battery */}
            <svg viewBox="0 0 24 12" fill="currentColor" className={styles.batteryIcon} aria-hidden>
              <rect x="0.5" y="0.5" width="20" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              <rect x="2" y="2" width="13" height="8" rx="1.8" />
              <path d="M22 4.2c.6 0 1 .4 1 1v1.6c0 .6-.4 1-1 1v-3.6z" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* ── Wallet Card Inside Phone Screen ── */}
        <div className={styles.walletCard} style={{ background: d.cardBg }}>

          {/* Header */}
          <div className={styles.cardHeader}>
            <div className={styles.brandGroup}>
              <div className={styles.logoBadge} style={{ background: logoBg, borderColor: logoBorder }}>
                <BrandLogo id={d.id} color={logoIconColor} />
              </div>
              <span className={styles.brandTitle} style={{ color: textColor }}>{d.brandName}</span>
            </div>
            <div className={styles.memberGroup}>
              <span className={styles.memberTag} style={{ color: textColor }}>MEMBER</span>
              <span className={styles.memberName} style={{ color: textColor }}>{d.memberName}</span>
            </div>
          </div>

          {/* Stamp Grid */}
          <div
            className={`${styles.stampGrid} ${isCompactRow ? styles.stampGridCompact : ''}`}
            style={{
              gridTemplateColumns: `repeat(${cols}, ${stampSizeCqi}cqi)`,
              ['--stamp-size' as string]: `${stampSizeCqi}cqi`,
            }}
          >
            {stamps.map((isFilled, i) => {
              const isLast = i === stampTotal - 1
              if (isFilled) {
                return (
                  <div key={i} className={styles.stampFilled} style={{ background: d.stampFill }}>
                    <StampIcon icon={d.stampIcon} color={filledIconColor} />
                  </div>
                )
              }
              if (isLast) {
                return (
                  <div key={i} className={styles.stampEmpty} style={{ borderColor: emptyBorder }}>
                    <span className={styles.freeText} style={{ color: emptyIconColor }}>Free</span>
                  </div>
                )
              }
              return (
                <div key={i} className={styles.stampEmpty} style={{ borderColor: emptyBorder }}>
                  <StampIcon icon={d.stampIcon} color={emptyIconColor} />
                </div>
              )
            })}
          </div>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div>
              <span className={styles.statTag} style={{ color: textColor }}>STAMPS</span>
              <span className={styles.statVal} style={{ color: textColor }}>{filled} / {stampTotal}</span>
            </div>
            <div className={styles.statRight}>
              <span className={styles.statTag} style={{ color: textColor }}>REWARD</span>
              <span className={styles.statVal} style={{ color: textColor }}>{d.rewardText}</span>
            </div>
          </div>

          <div className={styles.qrContainer}>
            <div className={styles.qrCard}>
              <PassQr />
            </div>
            <span className={styles.qrLabel} style={{ color: textColor }}>{passCode}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Main Exported Component ───────────────────────────────────────────────

interface Props {
  industry?: string
  section?: boolean
}

export function LoyaltyCardShowcase({ industry, section = false }: Props) {
  const industryKey = industry && industry in cardLibrary
    ? (industry as IndustryKey)
    : null
  const [active, setActive] = useState<IndustryKey>(industryKey ?? 'cafes')

  // Keep in sync when navigating between industry pages
  useEffect(() => {
    if (industryKey) setActive(industryKey)
  }, [industryKey])

  const cards = cardLibrary[industryKey ?? active] ?? cardLibrary.cafes
  const showTabs = !industryKey

  const phoneTrack = (
    <div className={styles.phoneTrack}>
      {cards.map((d, i) => (
        <div key={d.id} className={styles.phoneSlot}>
          <PhoneCard d={d} cardIndex={i} />
        </div>
      ))}
    </div>
  )

  if (section) {
    return (
      <section className={styles.sectionDark}>
        <div className="container">

          {/* Section Header */}
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Your card, on every customer's phone</h2>
            <p className={styles.sectionSub}>
              Fully branded. No app to download. Pick your industry to see example designs.
            </p>
          </div>

          {/* Digital Wallet Integration Row (Horizontally aligned, Apple + Google) */}
          <div className={styles.walletIntegrationRow}>
            <span className={styles.walletRowLabel}>
              Seamlessly integrates with your digital wallet
            </span>
            <div className={styles.walletRowBadges}>
              <AppleWalletBadge />
              <GoogleWalletBadge />
            </div>
          </div>

          {/* Industry Category Tabs */}
          {showTabs && (
            <div className={styles.tabsScroll}>
              <div className={styles.tabs}>
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    className={`${styles.tab} ${active === t.id ? styles.tabActive : ''}`}
                    onClick={() => setActive(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phone Mockups Track */}
          {phoneTrack}

          {/* Call to Action */}
          <div className={styles.sectionCta}>
            <a href={APP_URL} className={styles.ctaBtn}>
              Create your card free
            </a>
          </div>

        </div>
      </section>
    )
  }

  // Embed mode (blog / industry pages) — blends into page, transparent
  return (
    <div className={styles.embedWrap}>
      <p className={styles.embedNote}>Example card designs</p>
      {phoneTrack}
    </div>
  )
}
